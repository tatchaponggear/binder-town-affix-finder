/* เมนูกลางของทุกหน้า
   - มือถือ: ย่อเหลือ ชื่อเว็บ + หน้าปัจจุบัน + ปุ่ม ☰ (กดแล้วกางทุกหน้า)
   - รวม เวลาบอส / มินิบอส / ออโต้บอส เป็นเมนู "ล่าบอส ▾"
   - ปุ่มสลับ มืด / สว่าง มุมขวาบน (ค่าเริ่มต้น = มืด · จำค่าไว้ในเครื่อง) */
(function(){
  var css='.pz-burger{display:none}'+
    '.sitenav .pz-dd{position:relative;display:inline-flex}'+
    '.sitenav .pz-ddb{font:inherit;color:inherit;background:transparent;border:0;cursor:pointer;display:inline-flex;align-items:center;gap:4px;padding:inherit;border-radius:inherit}'+
    '.sitenav .pz-dd.has-cur>.pz-ddb{font-weight:700}'+
    '.sitenav .pz-ddm{display:none;position:absolute;left:0;top:100%;margin-top:6px;min-width:170px;z-index:80;flex-direction:column;gap:2px;padding:6px;border-radius:12px;background:var(--pz-ddbg,#fff);color:var(--pz-ddfg,#14202e);box-shadow:0 10px 28px rgba(10,30,60,.22);border:1px solid rgba(127,127,127,.25)}'+
    '[data-theme="dark"] .sitenav .pz-ddm{--pz-ddbg:#132138;--pz-ddfg:#e7edf8}'+
    '.sitenav .pz-dd.open .pz-ddm{display:flex}'+
    '.sitenav .pz-ddm a:not(.pz-no){display:block;white-space:nowrap;color:inherit!important;background:transparent;padding:8px 12px;border-radius:8px}'+
    '.sitenav .pz-dd:not(:has(.pz-ddm a:not(.pz-no))){display:none!important}'+
    '.sitenav .pz-ddm a:hover{background:rgba(127,127,127,.16)}'+
    '.sitenav .pz-ddm a[aria-current]{font-weight:700;background:rgba(127,127,127,.18)}'+
    '.sitenav .pz-tg{margin-left:auto;display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 12px;border-radius:999px;border:1px solid rgba(127,127,127,.4);background:transparent;color:inherit;font:inherit;font-size:13px;cursor:pointer;white-space:nowrap}'+
    '.sitenav .pz-tg:hover{background:rgba(127,127,127,.16)}'+
    '.pz-tg.fixed{position:fixed;top:12px;right:12px;z-index:70;display:inline-flex;align-items:center;gap:5px;height:34px;padding:0 12px;border-radius:999px;border:1px solid rgba(127,127,127,.4);background:rgba(255,255,255,.8);color:#14202e;font:13px system-ui,sans-serif;cursor:pointer}'+
    '[data-theme="dark"] .pz-tg.fixed{background:rgba(16,38,56,.8);color:#e7edf8}'+
    '@media (max-width:760px){'+
      '.sitenav{align-items:center}'+
      '.sitenav .pz-burger{display:inline-flex;align-items:center;justify-content:center;margin-left:auto;width:40px;height:36px;padding:0;border:0;border-radius:10px;background:transparent;cursor:pointer;color:inherit}'+
      '.sitenav .pz-burger:hover{background:rgba(127,127,127,.18)}'+
      '.sitenav .pz-burger svg{display:block}'+
      '.sitenav:not(.pz-open) a:not(.brand):not([aria-current]){display:none!important}'+
      '.sitenav:not(.pz-open) .pz-dd:not(.has-cur){display:none}'+
      '.sitenav:not(.pz-open) .pz-dd.has-cur .pz-ddb{display:none}'+
      '.sitenav:not(.pz-open) .pz-dd.has-cur .pz-ddm{display:flex!important;position:static;flex-direction:row;padding:0;margin:0;box-shadow:none;border:0;background:transparent;color:inherit;min-width:0}'+
      '.sitenav:not(.pz-open) .pz-dd.has-cur .pz-ddm a:not([aria-current]){display:none!important}'+
      '.sitenav.pz-open a:not(.brand){flex:1 1 40%;text-align:center}'+
      '.sitenav.pz-open .pz-dd{flex:1 1 100%;flex-direction:column}'+
      '.sitenav.pz-open .pz-ddb{display:none}'+
      '.sitenav.pz-open .pz-ddm{display:flex!important;position:static;flex-direction:row;flex-wrap:wrap;margin:0;padding:0;box-shadow:none;border:0;background:transparent;color:inherit;min-width:0;gap:inherit}'+
      '.sitenav.pz-open .pz-ddm a{flex:1 1 40%;text-align:center}'+
      '.sitenav a.brand{order:-4}.sitenav a[aria-current],.sitenav .pz-dd.has-cur{order:-3;flex:0 1 auto}.sitenav .pz-tg{order:-2;margin-left:auto;padding:0;width:36px;justify-content:center}.sitenav .pz-tg span{display:none}.sitenav .pz-burger{order:-1;margin-left:2px}'+
      '.sitenav.pz-open a:not(.brand):not([aria-current]),.sitenav.pz-open .pz-dd{order:0}'+
    '}';
  var st=document.createElement('style'); st.textContent=css; (document.head||document.documentElement).appendChild(st);
  var OPEN='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
      SHUT='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var BOSS=['boss','miniboss','autoboss'];
  function hrefId(a){ return (a.getAttribute('href')||'').replace(/^\.\//,'').replace(/\.html$/,'').split(/[?#]/)[0]; }
  var root=document.documentElement;
  function theme(){ return root.getAttribute('data-theme')==='light'?'light':'dark'; }
  function setTheme(t){ root.setAttribute('data-theme',t); try{ localStorage.setItem('pz.theme',t); sessionStorage.setItem('pz.theme',t); }catch(e){} }
  function themeBtn(fixed){
    var b=document.createElement('button'); b.type='button'; b.className='pz-tg'+(fixed?' fixed':'');
    function lab(){ var d=theme()==='dark'; b.innerHTML=d?'☀️ <span>สว่าง</span>':'🌙 <span>มืด</span>'; b.setAttribute('aria-label',d?'เปลี่ยนเป็นโหมดสว่าง':'เปลี่ยนเป็นโหมดมืด'); b.title=b.getAttribute('aria-label'); }
    lab(); b.onclick=function(e){ e.stopPropagation(); setTheme(theme()==='dark'?'light':'dark'); lab(); };
    return b;
  }
  function init(){
    var hasTheme=root.hasAttribute('data-theme');
    var navs=document.querySelectorAll('.sitenav');
    [].forEach.call(navs,function(nav){
      if(nav.querySelector('.pz-burger')) return;
      /* ล่าบอส dropdown */
      var bl=[].filter.call(nav.querySelectorAll(':scope > a'),function(a){ return BOSS.indexOf(hrefId(a))>=0; });
      if(bl.length>=2){
        var dd=document.createElement('div'); dd.className='pz-dd';
        var cur=bl.filter(function(a){ return a.hasAttribute('aria-current'); })[0];
        if(cur) dd.classList.add('has-cur');
        var db=document.createElement('button'); db.type='button'; db.className='pz-ddb'; db.setAttribute('aria-haspopup','true'); db.setAttribute('aria-expanded','false');
        db.innerHTML='ล่าบอส'+(cur?' · '+cur.textContent:'')+' <span aria-hidden="true">▾</span>';
        var m=document.createElement('div'); m.className='pz-ddm'; m.setAttribute('role','menu');
        bl[0].parentNode.insertBefore(dd,bl[0]); bl.forEach(function(a){ m.appendChild(a); });
        dd.appendChild(db); dd.appendChild(m);
        if(cur){ var ref=getComputedStyle(cur); db.style.color=ref.color; db.style.background=ref.backgroundColor; db.style.padding=ref.padding; db.style.borderRadius=ref.borderRadius; }
        else { var oth=nav.querySelector(':scope > a:not(.brand):not([aria-current])'); if(oth){ var r2=getComputedStyle(oth); db.style.color=r2.color; db.style.padding=r2.padding; db.style.fontSize=r2.fontSize; } }
        function ddSet(o){ dd.classList.toggle('open',o); db.setAttribute('aria-expanded',o?'true':'false'); }
        db.onclick=function(e){ e.stopPropagation(); ddSet(!dd.classList.contains('open')); };
        document.addEventListener('click',function(e){ if(dd.classList.contains('open')&&!dd.contains(e.target)) ddSet(false); });
        document.addEventListener('keydown',function(e){ if(e.key==='Escape') ddSet(false); });
      }
      /* ☰ มือถือ */
      var b=document.createElement('button'); b.type='button'; b.className='pz-burger'; b.setAttribute('aria-label','เปิดเมนู'); b.setAttribute('aria-expanded','false'); b.innerHTML=OPEN;
      var ref=nav.querySelector('a:not(.brand):not([aria-current])')||nav.querySelector('a'); if(ref) b.style.color=getComputedStyle(ref).color;
      var brand=nav.querySelector('.brand'); if(brand&&brand.nextSibling) nav.insertBefore(b,brand.nextSibling); else nav.appendChild(b);
      function set(o){ nav.classList.toggle('pz-open',o); b.setAttribute('aria-expanded',o?'true':'false'); b.setAttribute('aria-label',o?'ปิดเมนู':'เปิดเมนู'); b.innerHTML=o?SHUT:OPEN; }
      b.onclick=function(e){ e.stopPropagation(); set(!nav.classList.contains('pz-open')); };
      document.addEventListener('click',function(e){ if(nav.classList.contains('pz-open')&&!nav.contains(e.target)) set(false); });
      document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&nav.classList.contains('pz-open')){ set(false); b.focus(); } });
      /* มืด / สว่าง มุมขวาบน */
      if(hasTheme&&!nav.querySelector('.pz-tg')){ var tg=themeBtn(false); if(ref) tg.style.color=getComputedStyle(ref).color; nav.appendChild(tg); }
    });
    if(hasTheme&&!navs.length&&!document.querySelector('.pz-tg')&&!document.getElementById('orb')) document.body.appendChild(themeBtn(true));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
