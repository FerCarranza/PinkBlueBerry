// Simple client-side admin auth (mock).
// Not secure for production. Stores a hashed password in localStorage and a session token.

const ADMIN_KEY = 'pb_admin_v1';
const ADMIN_SESSION = 'pb_admin_session_v1';

// default credentials (only on first run) => user: admin / pass: admin123
// Provide a fallback hash if crypto.subtle is unavailable (e.g., non-secure origins)
async function sha256(str){
    try{
        if(typeof crypto !== 'undefined' && crypto.subtle){
            const buf = new TextEncoder().encode(str);
            const hash = await crypto.subtle.digest('SHA-256', buf);
            return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
        }
    }catch(e){ /* fallthrough to fallback */ }
    // Fallback: djb2-like simple hash (NOT cryptographically secure, used only to avoid runtime errors on HTTP/file)
    let h = 5381;
    for(let i=0;i<str.length;i++){ h = ((h << 5) + h) + str.charCodeAt(i); h = h | 0; }
    // Convert to hex string
    const hex = (h >>> 0).toString(16).padStart(8,'0');
    return hex.repeat(8).slice(0,64);
}

async function ensureDefaultAdmin(){
    const raw = localStorage.getItem(ADMIN_KEY);
    if(raw) return;
    const hash = await sha256('admin123');
    const admin = { user: 'admin', passwordHash: hash };
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

async function login(user, pass){
    await ensureDefaultAdmin();
    const raw = localStorage.getItem(ADMIN_KEY);
    const admin = JSON.parse(raw);
    if(user !== admin.user) return false;
    const h = await sha256(pass);
    if(h === admin.passwordHash){
        // create session token
        const token = Math.random().toString(36).slice(2);
        localStorage.setItem(ADMIN_SESSION, JSON.stringify({ token, user, createdAt: new Date().toISOString() }));
        return true;
    }
    return false;
}

function logout(){ localStorage.removeItem(ADMIN_SESSION); }

function isAuthenticated(){
    const s = localStorage.getItem(ADMIN_SESSION); if(!s) return false; try{ const obj = JSON.parse(s); return !!obj.token; }catch(e){ return false; }
}

async function changePassword(oldPass, newPass){
    const raw = localStorage.getItem(ADMIN_KEY); if(!raw) return false;
    const admin = JSON.parse(raw);
    const hOld = await sha256(oldPass);
    if(hOld !== admin.passwordHash) return false;
    admin.passwordHash = await sha256(newPass);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    return true;
}

// expose API
window.AdminAuth = { ensureDefaultAdmin, login, logout, isAuthenticated, changePassword };

// If included on admin pages, redirect to login if not authenticated
document.addEventListener('DOMContentLoaded', async ()=>{
    // Ensure defaults, but do not block auth checks if this fails
    try{ await ensureDefaultAdmin(); }catch(e){ /* continue */ }
    // login form page
    const loginForm = document.getElementById('login-form');
    if(loginForm){
        const btn = document.getElementById('login-btn');
        if(btn){
            btn.addEventListener('click', async ()=>{
                const user = document.getElementById('admin-user').value;
                const pass = document.getElementById('admin-pass').value;
                const ok = await login(user, pass);
                if(ok) window.location.href = 'admin.html';
                else alert('Credenciales incorrectas');
            });
        }
    }

    // On admin.html, check auth and redirect to login if needed
    if(window.location.pathname.endsWith('admin.html')){
        try{
            if(!isAuthenticated()){
                window.location.href = 'admin-login.html';
                return;
            }
        }catch(e){
            // If any unexpected error happens, fail-safe to login
            window.location.href = 'admin-login.html';
            return;
        }
        // If authenticated, reveal the page (body was hidden inline to avoid flash before check)
        try{ document.body.style.display = ''; }catch(e){}
        // wire logout and password change UI if present
        const btnLogout = document.getElementById('admin-logout');
        if(btnLogout) btnLogout.addEventListener('click', ()=>{ logout(); window.location.href = 'admin-login.html'; });
        const changeBtn = document.getElementById('admin-change-pass');
        if(changeBtn) changeBtn.addEventListener('click', async ()=>{
            const oldp = document.getElementById('admin-old-pass').value;
            const newp = document.getElementById('admin-new-pass').value;
            const ok = await changePassword(oldp,newp);
            alert(ok? 'Contraseña cambiada' : 'La contraseña actual es incorrecta');
        });
    }
});