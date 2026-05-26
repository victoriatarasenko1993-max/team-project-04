import{b as w,i as f,R as C,S as M,N as B,P as _,A as U,a as V}from"./assets/vendor-DJ86wize.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();async function K(e){return(await w.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function Y(e){const t=Math.floor(e),r=e%1!==0,a=5-t-(r?1:0);return`
    <div class="stars">
      
      ${Array(t).fill().map(()=>`
          <svg class="star filled">
            <use href="#icon-star"></use>
          </svg>
        `).join("")}

      ${r?`
        <svg class="star half">
          <use href="#icon-star"></use>
        </svg>
      `:""}

      ${Array(a).fill().map(()=>`
          <svg class="star empty">
            <use href="#icon-star"></use>
          </svg>
        `).join("")}

    </div>
  `}function z({name:e,description:t,composition:r,price:a,rate:s,image:n}){return`<div class="modal-inner">
    <img class="dessert-details-img" src="${n}" alt="${e}" />
    <div class="modal-text">
    <h3 class="dessert-details-title">${e}</h3>
    <p class="price">${a} грн</p>
    ${Y(s)}
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${r}</p>
    </div>
    </div>
  `}const D=document.querySelector("[data-loader]");function G(){D.classList.remove("is-hidden")}function J(){D.classList.add("is-hidden")}const Q="6852a9fcb459460cb6b47736",i={backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]"),orderBtn:document.querySelector("[data-order-btn]")};async function A(e){i.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",i.content.innerHTML="",i.orderBtn.disabled=!0,G();try{const t=await K(e);i.content.innerHTML=z(t),i.orderBtn.disabled=!1}catch{f.error({title:"Error",message:"Illegal operation"})}finally{J()}}function b(){i.backdrop.classList.add("is-hidden"),document.body.style.overflow="",i.orderBtn.disabled=!0}i.closeBtn.addEventListener("click",b);i.backdrop.addEventListener("click",e=>{e.target===i.backdrop&&b()});document.addEventListener("keydown",e=>{e.key==="Escape"&&b()});i.orderBtn.addEventListener("click",()=>{b()});A(Q);const L=document.querySelector(".desserts-list"),v=document.querySelector(".load-more-btn"),S=document.querySelector(".loader"),T=document.querySelector(".categories-list-desktop"),x=document.querySelector(".categories-list-tablet");let p=1,m="";v.addEventListener("click",Z);x.addEventListener("change",async e=>{m=e.target.value,await P()});T.addEventListener("change",async e=>{e.target.name==="dessert"&&(m=e.target.value,await P())});L.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const r=t.dataset.id;await A(r)});async function P(){p=1,L.innerHTML="",await k()}async function I(e){const{data:t}=await w(`https://deserts-store.b.goit.study/api/${e}`);return t}I("categories").then(e=>{W(e)}).catch(e=>{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function W(e){T.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:r})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${r}</label>`).join("")}`,x.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:r})=>`
       <option value="${t}">${r}</option>`).join("")}`}k();function X(e){return e.map(({_id:t,name:r,image:a,description:s,price:n,category:{name:c}})=>`
        <li class="dessert-list-item">
            <img src="${a}"
                alt="${r}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${c}</p>
            <h3 class="desserts-item-title">${r}</h3>
            <p class="desserts-item-descr">${s}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${n} грн</p>
                <button class="desserts-item-btn" data-id="${t}">
                    <svg height="24" width="24">
                        <use href="/img/icons.svg#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function Z(){p++,await k()}async function k(){v.classList.add("hidden"),S.classList.remove("hidden");try{let e=`desserts?page=${p}&limit=8`;m&&(e+=`&category=${m}`);const t=await I(e);L.insertAdjacentHTML("beforeend",X(t.desserts)),t.totalItems>p*t.limit&&v.classList.remove("hidden")}catch{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{S.classList.add("hidden")}}const ee="https://deserts-store.b.goit.study/api/feedbacks?limit=10",o={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let y=null;te();async function te(){if(o.list)try{const e=await se();re(e),o.list.hidden=!1,o.prevBtn.hidden=!1,o.nextBtn.hidden=!1,o.bottom.hidden=!1,ne(),oe()}catch(e){o.list.hidden=!1,o.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{o.loader.hidden=!0}}async function se(){const e=await fetch(ee);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function re(e){o.list.innerHTML=e.map(ae).join("")}function ae({_id:e,rate:t,description:r,author:a}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(t)}"
          aria-label="Оцінка ${Number(t)} з 5"
        ></div>
        <p class="feedback-review">"${r}"</p>
        <h3 class="feedback-author">${a}</h3>
      </article>
    </li>
  `}function ne(){document.querySelectorAll(".feedback-rating").forEach(e=>{new C(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function oe(){y&&y.destroy(!0,!0),y=new M(".feedback-swiper",{modules:[B,_,U],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:o.prevBtn,nextEl:o.nextBtn},pagination:{el:o.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const $=document.querySelector(".faq-accordion");$&&new V($,{duration:400,showMultiple:!1,openOnInit:[]});let d=null;const O=window.matchMedia("(min-width: 768px)");function ie(){const e=document.querySelector(".about-swiper");if(!e)return;d=new M(e,{modules:[B],slidesPerView:2,slidesPerGroup:1,spaceBetween:24,speed:700,loop:!1,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev",disabledClass:"is-disabled"}});const t=document.querySelectorAll(".about-pagination-bullet");function r(a){t.forEach((s,n)=>{s.classList.toggle("about-pagination-bullet-active",n===a)})}t.forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.dataset.index);d.slideTo(s),r(s)})}),d.on("slideChange",()=>{r(d.activeIndex)}),r(d.activeIndex)}function N(){O.matches?d||ie():d&&(d.destroy(!0,!0),d=null)}N();O.addEventListener("change",N);const E=document.querySelector("[data-current-year]");E&&(E.textContent=new Date().getFullYear());const ce="https://deserts-store.b.goit.study/api/orders",R="6852a9fcb459460cb6b47748",l=document.querySelector("[data-order-backdrop]"),h=document.querySelector("[data-order-close]"),u=document.querySelector("[data-order-form]");let F=R;function de(e){f.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function q(e){f.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function le(e=R){l&&(F=e,l.classList.remove("is-hidden"),document.body.classList.add("modal-open"),document.addEventListener("keydown",H))}function g(){l&&(l.classList.add("is-hidden"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",H))}function H(e){e.key==="Escape"&&g()}function ue(e){e.target===e.currentTarget&&g()}async function fe(e){var s,n;e.preventDefault();const t=u.querySelector(".order-form-submit"),r=new FormData(u),a={name:r.get("name").trim(),phone:r.get("phone").trim(),dessertId:F,comment:r.get("comment").trim()};if(!a.name||!a.phone||!a.comment){q("Будь ласка, заповніть усі поля форми.");return}try{t&&(t.disabled=!0);const c=await w.post(ce,a);de(c.data.orderNum),u.reset(),g()}catch(c){const j=((n=(s=c.response)==null?void 0:s.data)==null?void 0:n.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";q(j),console.error(c)}finally{t&&(t.disabled=!1)}}h==null||h.addEventListener("click",g);l==null||l.addEventListener("click",ue);u==null||u.addEventListener("submit",fe);window.openOrderModal=le;
//# sourceMappingURL=index.js.map
