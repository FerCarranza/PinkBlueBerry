// nav.js - rebuilt hamburger menu (simpler, robust)
(function(){
  'use strict';

  function qs(sel){ return document.querySelector(sel); }

  function createBackdrop(){
    let b = qs('.nav-backdrop');
    if(!b){ b = document.createElement('div'); b.className = 'nav-backdrop'; document.body.appendChild(b); }
    return b;
  }

  function open(nav, btn){
    const header = qs('.navbar');
    const rect = header ? header.getBoundingClientRect() : { height: 0, top: 0 };
    const top = rect.bottom || rect.height || 56;
    // set menu position and size so it sits under the header
    nav.style.position = 'fixed';
    nav.style.top = top + 'px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.maxHeight = 'calc(100vh - ' + top + 'px)';
    nav.classList.add('open');
    nav.setAttribute('aria-hidden','false');
    if(btn) btn.setAttribute('aria-expanded','true');

    const backdrop = createBackdrop();
    backdrop.classList.add('visible');
    backdrop.addEventListener('click', ()=> close(nav, btn));

    // allow interactive elements
    nav.style.pointerEvents = 'auto';
    Array.from(nav.querySelectorAll('a, button, input')).forEach(el=> el.tabIndex = 0);
    document.addEventListener('keydown', onKeyDown);
  }

  function close(nav, btn){
    if(!nav) return;
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden','true');
    if(btn) btn.setAttribute('aria-expanded','false');
    nav.style.pointerEvents = 'none';
    Array.from(nav.querySelectorAll('a, button, input')).forEach(el=> el.tabIndex = -1);
    const backdrop = qs('.nav-backdrop');
    if(backdrop){ backdrop.classList.remove('visible'); backdrop.remove(); }
    document.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown(e){
    if(e.key === 'Escape'){
      const nav = qs('.nav-links');
      const btn = qs('#hamburger');
      close(nav, btn);
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const nav = qs('.nav-links');
    if(!nav) return;
    // ensure ARIA defaults
    nav.setAttribute('role','menu');
    nav.setAttribute('aria-hidden','true');

    // create hamburger if missing
    let btn = qs('#hamburger');
    if(!btn){ btn = document.createElement('button'); btn.id = 'hamburger'; btn.className = 'hamburger'; btn.setAttribute('aria-label','Abrir menú'); btn.setAttribute('aria-expanded','false'); btn.textContent = '☰'; const actions = qs('.nav-actions') || qs('.container'); if(actions) actions.appendChild(btn); }

    // start with nav non-interactive
    nav.style.pointerEvents = 'none';
    Array.from(nav.querySelectorAll('a, button, input')).forEach(el=> el.tabIndex = -1);

    btn.addEventListener('click', (ev)=>{
      ev.preventDefault(); ev.stopPropagation();
      const isOpen = nav.classList.contains('open');
      if(isOpen) close(nav, btn); else open(nav, btn);
    });

    // ensure resize recomputes position when open
    window.addEventListener('resize', ()=>{
      if(nav.classList.contains('open')){
        // recompute top
        const header = qs('.navbar');
        const rect = header ? header.getBoundingClientRect() : { bottom: 56 };
        const top = rect.bottom || rect.height || 56;
        nav.style.top = top + 'px';
        nav.style.maxHeight = 'calc(100vh - ' + top + 'px)';
      }
    });
  });
})();
// nav.js - simple hamburger menu toggle
(function(){
  function setAriaInitial(nav){
    if(!nav) return;
    nav.setAttribute('role','menu');
    nav.setAttribute('aria-hidden', 'true');
    // mark each link as menuitem and make unfocusable until open
    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach(a=>{ a.setAttribute('role','menuitem'); a.setAttribute('tabindex','-1'); });
  }

  function enableMenuFocus(nav){
    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach(a=> a.setAttribute('tabindex','0'));
    if(links.length) links[0].focus();
  }

  function disableMenuFocus(nav){
    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach(a=> a.setAttribute('tabindex','-1'));
  }

  function openMenu(){
    const nav = document.querySelector('.nav-links');
    const btn = document.getElementById('hamburger');
    if(!nav || !btn) return;
    // ensure backdrop exists
  let backdrop = document.querySelector('.nav-backdrop');
  if(!backdrop){ backdrop = document.createElement('div'); backdrop.className = 'nav-backdrop'; document.body.appendChild(backdrop); }
  // activate backdrop on next tick so the initial click that opened the menu doesn't immediately trigger it
  setTimeout(()=> backdrop.classList.add('visible'), 50);
    nav.classList.add('open');
    nav.setAttribute('aria-hidden','false');
    btn.setAttribute('aria-expanded','true');
    enableMenuFocus(nav);
    try{ if(window && window.console && window.console.log) console.log('[nav] openMenu called'); }catch(e){}
    // add keydown listener for Esc and Tab trap
    document.addEventListener('keydown', onKeyDown);
    // backdrop click closes menu
    backdrop.addEventListener('click', closeMenu);
    // Force inline z-index and pointer-events to avoid stacking/context issues on mobile
    try{
      backdrop.style.zIndex = '2001';
      backdrop.style.pointerEvents = 'auto';
      nav.style.zIndex = '2002';
      nav.style.pointerEvents = 'auto';
      // ensure child links are interactive
      Array.from(nav.querySelectorAll('a')).forEach(a=>{ a.style.pointerEvents='auto'; });
    }catch(e){}
  }

  function closeMenu(){
    const nav = document.querySelector('.nav-links');
    const btn = document.getElementById('hamburger');
    const backdrop = document.querySelector('.nav-backdrop');
    if(!nav || !btn) return;
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden','true');
    btn.setAttribute('aria-expanded','false');
    disableMenuFocus(nav);
    btn.focus();
    document.removeEventListener('keydown', onKeyDown);
    if(backdrop){ backdrop.classList.remove('visible'); backdrop.removeEventListener('click', closeMenu); }
    try{ if(window && window.console && window.console.log) console.log('[nav] closeMenu called'); }catch(e){}
    // clean inline styles
    try{
      if(backdrop){ backdrop.style.pointerEvents='none'; backdrop.style.zIndex=''; }
      nav.style.zIndex=''; nav.style.pointerEvents='';
      Array.from(nav.querySelectorAll('a')).forEach(a=>{ a.style.pointerEvents=''; });
    }catch(e){}
  }

  function onKeyDown(e){
    const nav = document.querySelector('.nav-links');
    if(!nav || !nav.classList.contains('open')) return;
    if(e.key === 'Escape'){
      closeMenu(); return;
    }
    if(e.key === 'Tab'){
      // focus trap inside nav
      const focusable = Array.from(nav.querySelectorAll('a')).filter(x=>x.tabIndex>=0);
      if(!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // try to find nav; support legacy selectors
    const nav = document.querySelector('.nav-links') || document.querySelector('#main-nav') || document.querySelector('.main-nav');
    let btn = document.getElementById('hamburger');

    // If no hamburger button exists, create one and append to .nav-actions or .container
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'hamburger';
      btn.className = 'hamburger';
      btn.setAttribute('aria-label','Abrir menú');
      btn.setAttribute('aria-expanded','false');
      btn.textContent = '☰';
      const actions = document.querySelector('.nav-actions') || document.querySelector('.container');
      if(actions) actions.appendChild(btn);
    }
    setAriaInitial(nav);
    if(btn){
      btn.addEventListener('click', (ev)=>{
        ev.stopPropagation();
        try{ if(window && window.console && window.console.log) console.log('[nav] hamburger clicked'); }catch(e){}
        const open = nav && nav.classList.contains('open');
        if(open) closeMenu(); else openMenu();
      });
    }

    // close when clicking the backdrop on small screens (more reliable)
    document.addEventListener('click', (e)=>{
      if(window.matchMedia && window.matchMedia('(max-width:900px)').matches){
        const backdrop = document.querySelector('.nav-backdrop');
        if(backdrop && (backdrop === e.target || backdrop.contains(e.target))){
          closeMenu();
        }
      }
    });

    // close on resize to desktop
    window.addEventListener('resize', ()=>{
      if(window.matchMedia && window.matchMedia('(min-width:901px)').matches){ closeMenu(); }
    });
  });

  // expose for debugging
  window.NavMenu = { open: openMenu, close: closeMenu };
})();
