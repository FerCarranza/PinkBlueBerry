// nav.js - rebuilt hamburger menu (simpler, robust)
(function(){
  'use strict';

  function qs(sel){ return document.querySelector(sel); }
  function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

  // Backdrop removed per requirement: no overlay element will be added
  function createBackdrop(){ return null; }

  // Focus trap helpers
  let trap = { lastActive: null, handler: null };
  function enableFocusTrap(container){
    trap.lastActive = document.activeElement;
    const focusables = getFocusable(container);
    const first = focusables[0];
    if(first) first.focus();
    trap.handler = function(e){
      if(e.key !== 'Tab') return;
      const nodes = getFocusable(container);
      if(!nodes.length) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length-1];
      if(e.shiftKey && document.activeElement === firstEl){ e.preventDefault(); lastEl.focus(); }
      else if(!e.shiftKey && document.activeElement === lastEl){ e.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener('keydown', trap.handler, true);
  }
  function disableFocusTrap(){
    if(trap.handler) document.removeEventListener('keydown', trap.handler, true);
    if(trap.lastActive && typeof trap.lastActive.focus === 'function'){
      try{ trap.lastActive.focus(); }catch(e){}
    }
    trap.lastActive = null; trap.handler = null;
  }
  function getFocusable(container){
    return Array.from(container.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(el=>!el.hasAttribute('disabled') && el.tabIndex !== -1);
  }

  function open(nav, btn){
    const STORE_KEY = (window.AppConfig && AppConfig.storage.navOpen) || 'pb_nav_open_v1';
    const header = qs('.navbar');
    const rect = header ? header.getBoundingClientRect() : { height: 0, top: 0 };
    const top = rect.bottom || rect.height || 56;
    document.documentElement.style.setProperty('--nav-top', top + 'px');
    nav.classList.add('open');
    document.body.classList.add('nav-open');
    nav.setAttribute('aria-hidden','false');
    if(btn) btn.setAttribute('aria-expanded','true');

    // Backdrop intentionally not used

    // make interactive
    qsa('.nav-links a, .nav-links button, .nav-links input').forEach(el=> el.tabIndex = 0);
    document.addEventListener('keydown', onKeyDown);
    enableFocusTrap(nav);

    // Proactively close other overlays that could interfere (cart drawer / modals)
    try{
      if(window.Cart && typeof window.Cart.close === 'function'){
        window.Cart.close();
        const cartBtn = document.getElementById('open-cart'); if(cartBtn) cartBtn.setAttribute('aria-expanded','false');
      }
      // Close booking/payment modals if open
      const modals = ['booking-modal','payment-modal','cart-payment-modal'];
      modals.forEach(id=>{
        const el = document.getElementById(id);
        if(el && el.getAttribute('aria-hidden') === 'false'){
          // prefer dedicated close functions if exist
          if(id==='booking-modal' && typeof window.closeBookingModal === 'function') window.closeBookingModal();
          else if(id==='payment-modal' && typeof window.closePaymentModal === 'function') window.closePaymentModal();
          else { el.setAttribute('aria-hidden','true'); el.style.display='none'; }
        }
      });
    }catch(e){}
    try{ localStorage.setItem(STORE_KEY, JSON.stringify({ open: true })); }catch(e){}
  }

  function close(nav, btn){
    const STORE_KEY = 'pb_nav_open_v1';
    if(!nav) return;
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    nav.setAttribute('aria-hidden','true');
    if(btn) btn.setAttribute('aria-expanded','false');
    qsa('.nav-links a, .nav-links button, .nav-links input').forEach(el=> el.tabIndex = -1);
    // No backdrop to manage
    document.removeEventListener('keydown', onKeyDown);
    disableFocusTrap();
    try{ localStorage.setItem(STORE_KEY, JSON.stringify({ open: false })); }catch(e){}
  }

  function onKeyDown(e){
    if(e.key === 'Escape'){
      const nav = qs('.nav-links');
      const btn = qs('#hamburger');
      close(nav, btn);
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // Remove any leftover nav-backdrop elements from the DOM
    Array.from(document.querySelectorAll('.nav-backdrop')).forEach(el=> el.remove());
    const nav = qs('.nav-links');
    if(!nav) return;
    // ensure ARIA defaults
    nav.setAttribute('role','menu');
    nav.setAttribute('aria-hidden','true');
    // set role=menuitem on links
    qsa('.nav-links a').forEach(a=>{ a.setAttribute('role','menuitem'); });

    // create hamburger if missing
    let btn = qs('#hamburger');
    if(!btn){ btn = document.createElement('button'); btn.id = 'hamburger'; btn.className = 'hamburger'; btn.setAttribute('aria-label','Abrir menú'); btn.setAttribute('aria-expanded','false'); btn.textContent = '☰'; const actions = qs('.nav-actions') || qs('.container'); if(actions) actions.appendChild(btn); }

    // Responsive interactivity controller
    const bp = (window.AppConfig && AppConfig.breakpoints.desktopMin) || 900;
    const mql = window.matchMedia(`(min-width: ${bp}px)`);
    function isDesktop(){ return mql.matches; }
    function enableDesktopMode(){
      // clear mobile styles
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
      qsa('.nav-links a, .nav-links button, .nav-links input').forEach(el=> el.tabIndex = 0);
      nav.setAttribute('aria-hidden','false');
      // remove any leftover backdrop
      const backdrop = qs('.nav-backdrop'); if(backdrop){ backdrop.classList.remove('visible'); backdrop.remove(); }
      if(btn) btn.setAttribute('aria-expanded','false');
    }
    function enableMobileMode(){
      // hidden and non-interactive until opened
      if(!nav.classList.contains('open')){
        qsa('.nav-links a, .nav-links button, .nav-links input').forEach(el=> el.tabIndex = -1);
        nav.setAttribute('aria-hidden','true');
      }
    }
    function updateNavMode(){ if(isDesktop()) enableDesktopMode(); else enableMobileMode(); }
    updateNavMode();
    mql.addEventListener('change', updateNavMode);

    btn.addEventListener('click', (ev)=>{
      ev.preventDefault(); ev.stopPropagation();
      const isOpen = nav.classList.contains('open');
      if(isOpen) close(nav, btn); else open(nav, btn);
    });

    // Close menu on link click and smooth-scroll to hash targets
    nav.addEventListener('click', (e)=>{
      // If on mobile and nav is not open yet, first tap opens the menu
      if(!isDesktop() && !nav.classList.contains('open')){
        e.preventDefault();
        open(nav, btn);
        return;
      }
      const a = e.target.closest && e.target.closest('a');
      if(!a) return;
      const href = a.getAttribute('href') || '';
      if(href.startsWith('#')){
        e.preventDefault();
        const id = href.slice(1);
        const target = document.getElementById(id);
        close(nav, btn);
        // If nav link explicitly requests opening the booking modal, do so
        if(a.hasAttribute('data-open-booking') && typeof window.openBookingModal === 'function'){
          // slight timeout to let menu close animation finish
          setTimeout(()=> window.openBookingModal(), 50);
        } else if(target){
          try{ target.scrollIntoView({ behavior: 'smooth' }); }
          catch(err){ window.location.hash = href; }
        } else {
          // fallback: update hash so browser scrolls
          window.location.hash = href;
        }
      } else {
        // For external links or other pages, just close the menu and allow navigation
        close(nav, btn);
      }
    });

    // Active link highlighting
    function clearActive(){ nav.querySelectorAll('a').forEach(l=> l.classList.remove('active')); }
    function setActive(href){ clearActive(); const a = nav.querySelector(`a[href="${href}"]`); if(a) a.classList.add('active'); }
    // If we're on the admin page, highlight the Admin link and skip observer
    if(window.location.pathname.endsWith('admin.html')){
      setActive('admin.html');
    } else {
      // Set by hash on load, else default to #home
      const initialHash = window.location.hash || '#home';
      setActive(initialHash);
      // Observe sections to update while scrolling
      const sections = [
        { id: 'home', href: '#home' },
        { id: 'services', href: '#services' },
        { id: 'booking', href: '#booking' },
        { id: 'shop', href: '#shop' }
      ];
      const linkMap = new Map();
      sections.forEach(s=>{ const link = nav.querySelector(`a[href="${s.href}"]`); if(link) linkMap.set(s.id, link); });
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          const id = entry.target.id;
          const link = linkMap.get(id);
          if(!link) return;
          if(entry.isIntersecting){ clearActive(); link.classList.add('active'); }
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
      sections.forEach(s=>{ const el = document.getElementById(s.id); if(el) observer.observe(el); });
    }

    // ensure resize recomputes position when open
    window.addEventListener('resize', ()=>{
      updateNavMode();
      if(nav.classList.contains('open')){
        const header = qs('.navbar');
        const rect = header ? header.getBoundingClientRect() : { bottom: 56 };
        const top = rect.bottom || rect.height || 56;
        document.documentElement.style.setProperty('--nav-top', top + 'px');
      }
    });

    // Restore saved mobile open state (only on mobile)
    try{
      const raw = localStorage.getItem((window.AppConfig && AppConfig.storage.navOpen) || 'pb_nav_open_v1');
      const obj = raw ? JSON.parse(raw) : null;
      if(obj && obj.open && !isDesktop()){
        // ensure correct top
        const header = qs('.navbar');
        const rect = header ? header.getBoundingClientRect() : { bottom: 56 };
        const top = rect.bottom || rect.height || 56;
        document.documentElement.style.setProperty('--nav-top', top + 'px');
        open(nav, btn);
      }
    }catch(e){}
  });

  // Expose a tiny API for debugging and programmatic control
  function openMenu(){ const nav = qs('.nav-links'); const btn = qs('#hamburger'); if(nav) open(nav, btn); }
  function closeMenu(){ const nav = qs('.nav-links'); const btn = qs('#hamburger'); if(nav) close(nav, btn); }
  window.NavMenu = { open: openMenu, close: closeMenu };
})();
