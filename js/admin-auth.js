// Simple client-side admin auth (mock).
// Not secure for production. Stores a hashed password in localStorage and a session token.

const ADMIN_KEY = 'pb_admin_v1';
const ADMIN_SESSION = 'pb_admin_session_v1';

// default credentials (only on first run) => user: admin / pass: admin123
async function sha256(str){
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
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
    await ensureDefaultAdmin();
    // login form page
    const loginForm = document.getElementById('login-form');
    if(loginForm){
        document.getElementById('login-btn').addEventListener('click', async ()=>{
            const user = document.getElementById('admin-user').value;
            const pass = document.getElementById('admin-pass').value;
            const ok = await login(user, pass);
            if(ok) window.location.href = 'admin.html';
            else alert('Credenciales incorrectas');
        });
    }

    // On admin.html, check auth and redirect to login if needed
    if(window.location.pathname.endsWith('admin.html')){
        if(!isAuthenticated()){
            window.location.href = 'admin-login.html';
        } else {
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
    }
});