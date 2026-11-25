/* เมนูกลางของทุกหน้า
   - มือถือ: ย่อเหลือ ชื่อเว็บ + หน้าปัจจุบัน + ปุ่ม ☰ (กดแล้วกางทุกหน้า)
   - รวม เวลาบอส / มินิบอส / ออโต้บอส เป็นเมนู "ล่าบอส ▾"
   - ปุ่มสลับ มืด / สว่าง (รูปพระอาทิตย์/พระจันทร์) มุมขวาบนของหน้า (ค่าเริ่มต้น = มืด · จำค่าไว้ในเครื่อง) */
(function(){
  var css='.pz-burger{display:none}'+
    '.sitenav a.pz-gang{background:linear-gradient(135deg,#ff8a3a,#5fd0ff)!important;color:#0f1020!important;font-weight:800;border-radius:999px;box-shadow:0 2px 10px -4px rgba(0,0,0,.4)}'+
    '.sitenav a.pz-gang:hover{filter:brightness(1.08)}'+
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
    '.pz-tg{--s:52px;--i:38px;--r:46px;position:relative;display:inline-block;overflow:hidden;width:var(--s);height:var(--s);padding:0;border:0;background:transparent;cursor:pointer;border-radius:12px;-webkit-mask-image:linear-gradient(#000 62%,transparent 96%);mask-image:linear-gradient(#000 62%,transparent 96%)}'+
    '.pz-tg:hover .pz-ic{filter:brightness(1.12) drop-shadow(0 0 8px rgba(255,210,90,.45))}'+
    '.pz-tg:focus-visible{outline:2px solid rgba(127,160,255,.7);outline-offset:-2px}'+
    '.pz-wh{position:absolute;left:0;right:0;top:calc(var(--s)/2);height:calc(var(--r)*2);transform-origin:50% 50%;transition:transform 1.1s cubic-bezier(.55,0,.25,1)}'+
    '.pz-tg.pz-na .pz-wh{transition:none}'+
    '.pz-ic{position:absolute;left:50%;width:var(--i);height:var(--i);margin-left:calc(var(--i)/-2);transition:filter .2s}'+
    '.pz-ic svg{display:block;width:100%;height:100%;filter:drop-shadow(0 2px 6px rgba(0,0,0,.25))}'+
    '.pz-sun{top:calc(var(--i)/-2)}.pz-moon{bottom:calc(var(--i)/-2);transform:rotate(180deg)}'+
    '.sitenav .pz-tg{display:none}'+
    '.pz-tg.corner{position:absolute;top:8px;right:10px;z-index:70}'+
    '@media (prefers-reduced-motion:reduce){.pz-wh{transition-duration:.01s}}'+
    '@media (min-width:761px){.pz-hastg .sitenav{max-width:min(1440px,calc(100% - 128px))}}'+
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
      '.sitenav a.brand{order:-4}.sitenav a[aria-current],.sitenav .pz-dd.has-cur{order:-3;flex:0 1 auto}.sitenav .pz-tg{display:inline-block;order:-2;margin-left:auto;--s:40px;--i:30px;--r:36px}.pz-hastg .pz-tg.corner{display:none}.sitenav .pz-burger{order:-1;margin-left:2px}'+
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
  var SUN='<svg viewBox="0 0 48 48" aria-hidden="true"><defs><radialGradient id="pzs" cx="40%" cy="38%" r="65%"><stop offset="0" stop-color="#fff6c2"/><stop offset=".55" stop-color="#ffcf3f"/><stop offset="1" stop-color="#ff9a1f"/></radialGradient></defs><g stroke="#ffc43a" stroke-width="3.2" stroke-linecap="round"><path d="M24 3v6M24 39v6M3 24h6M39 24h6M9.2 9.2l4.2 4.2M34.6 34.6l4.2 4.2M9.2 38.8l4.2-4.2M34.6 13.4l4.2-4.2"/></g><circle cx="24" cy="24" r="10.5" fill="url(#pzs)"/></svg>',
      MOON='<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="pzm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fb6ff"/><stop offset="1" stop-color="#4b5fc9"/></linearGradient></defs><path d="M30.5 5.5A19 19 0 1 0 42.5 33 15.5 15.5 0 0 1 30.5 5.5z" fill="url(#pzm)"/><circle cx="20" cy="27" r="2.6" fill="#3f50b0" opacity=".45"/><circle cx="27" cy="36" r="1.8" fill="#3f50b0" opacity=".4"/><path d="M38 9l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" fill="#ffd96a"/></svg>';
  /* วงล้อ: พระอาทิตย์อยู่บน พระจันทร์อยู่ล่าง · กดแล้วหมุน 180° ตามเข็ม = ดวงหนึ่งตกขวา อีกดวงขึ้นซ้าย */
  var ang=null;
  function syncTg(){ var d=theme()==='dark'; if(ang===null) ang=d?180:0;
    [].forEach.call(document.querySelectorAll('.pz-tg'),function(b){
      var w=b.querySelector('.pz-wh'); if(w) w.style.transform='rotate('+ang+'deg)';
      b.setAttribute('aria-label',d?'เปลี่ยนเป็นโหมดสว่าง':'เปลี่ยนเป็นโหมดมืด'); b.title=b.getAttribute('aria-label'); }); }
  function themeBtn(corner){
    var b=document.createElement('button'); b.type='button'; b.className='pz-tg pz-na'+(corner?' corner':'');
    b.innerHTML='<span class="pz-wh"><span class="pz-ic pz-sun">'+SUN+'</span><span class="pz-ic pz-moon">'+MOON+'</span></span>';
    setTimeout(function(){ b.classList.remove('pz-na'); },60);
    b.onclick=function(e){ e.stopPropagation(); setTheme(theme()==='dark'?'light':'dark'); ang+=180; syncTg(); };
    return b;
  }
  function init(){
    var hasTheme=root.hasAttribute('data-theme');
    var navs=document.querySelectorAll('.sitenav');
    [].forEach.call(navs,function(nav){
      if(nav.querySelector('.pz-burger')) return;
      /* ลิงก์โปรแกรม Penguin Status */
      if(!nav.querySelector('a.pz-gang')){ var g=document.createElement('a'); g.href='penguin-status'; g.className='pz-gang'; g.textContent='🐧 อยากมีสเตตัสแก๊งไหม';
        if(/penguin-status\/?$/.test(location.pathname.replace(/\.html$/,''))) g.setAttribute('aria-current','page'); nav.appendChild(g); }
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
      if(hasTheme&&!nav.querySelector('.pz-tg')){ nav.appendChild(themeBtn(false)); root.classList.add('pz-hastg'); }
    });
    if(hasTheme&&!document.querySelector('.pz-tg.corner')&&(navs.length||!document.getElementById('orb'))) document.body.appendChild(themeBtn(true));
    syncTg();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
