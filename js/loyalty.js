// loyalty.js - simple loyalty points module (Chipotle-like: points per dollar)
(function(){
  'use strict';
  const KEY = 'pb_loyalty_profiles_v1';
  const CONFIG_KEY = 'pb_loyalty_config_v1';
  const LOG_KEY = 'pb_loyalty_log_v1';
  const DEFAULT_CONFIG = { ratePerDollar: 1 }; // 1 point per $1

  function getConfig(){
    try{ const raw = localStorage.getItem(CONFIG_KEY); return raw? JSON.parse(raw) : DEFAULT_CONFIG; }catch(e){ return DEFAULT_CONFIG; }
  }
  function setConfig(cfg){ try{ localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg||DEFAULT_CONFIG)); }catch(e){} }

  function _load(){ try{ const raw = localStorage.getItem(KEY); return raw? JSON.parse(raw) : []; }catch(e){ return []; } }
  function _save(list){ try{ localStorage.setItem(KEY, JSON.stringify(list)); }catch(e){} }
  function _loadLog(){ try{ const raw = localStorage.getItem(LOG_KEY); return raw? JSON.parse(raw) : []; }catch(e){ return []; } }
  function _saveLog(list){ try{ localStorage.setItem(LOG_KEY, JSON.stringify(list)); }catch(e){} }

  function _normEmail(email){ return String(email||'').trim().toLowerCase(); }

  function getProfile(email){
    const em = _normEmail(email); if(!em) return null;
    const list = _load();
    return list.find(p=> p.email === em) || null;
  }

  function createOrGetProfile(email, name){
    const em = _normEmail(email); if(!em) return null;
    const list = _load();
    let p = list.find(x=> x.email === em);
    if(!p){ p = { email: em, name: name||'', points: 0, updatedAt: new Date().toISOString() };
      list.push(p); _save(list);
    }
    return p;
  }

  function addPoints(email, name, points, meta){
    const em = _normEmail(email); if(!em) return 0;
    const list = _load();
    let p = list.find(x=> x.email === em);
    if(!p){ p = { email: em, name: name||'', points: 0, updatedAt: null }; list.push(p); }
    const delta = Math.max(0, Math.floor(points||0));
    p.points = Math.max(0, Number(p.points||0) + delta);
    p.updatedAt = new Date().toISOString();
    _save(list);
    // log
    try{
      const logs = _loadLog();
      logs.push({
        id: 'LG' + Math.floor(100000 + Math.random()*900000),
        email: em,
        name: name||'',
        points: delta,
        type: (meta && meta.type) || 'earn', // earn|redeem
        source: (meta && meta.source) || 'unknown', // cart|booking|admin
        amount: meta && meta.amount || null,
        orderId: meta && meta.orderId || null,
        reservationId: meta && meta.reservationId || null,
        createdAt: new Date().toISOString()
      });
      _saveLog(logs);
    }catch(e){}
    return p.points;
  }

  function getPoints(email){ const p = getProfile(email); return p? Number(p.points||0) : 0; }

  function estimatePoints(amount){
    const cfg = getConfig();
    const rate = Math.max(0, Number(cfg.ratePerDollar||0));
    return Math.max(0, Math.floor((Number(amount)||0) * rate));
  }

  function getLog(filters){
    const list = _loadLog();
    if(!filters) return list.slice().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
    let out = list.slice();
    if(filters.email){ const em = _normEmail(filters.email); out = out.filter(x=> x.email===em); }
    if(filters.source){ out = out.filter(x=> String(x.source||'')===String(filters.source)); }
    if(filters.type){ out = out.filter(x=> String(x.type||'')===String(filters.type)); }
    if(filters.from){ out = out.filter(x=> x.createdAt && x.createdAt >= filters.from); }
    if(filters.to){ out = out.filter(x=> x.createdAt && x.createdAt <= filters.to); }
    return out.sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));
  }

  window.Loyalty = { getConfig, setConfig, getProfile, addPoints, getPoints, estimatePoints, getLog };
})();
