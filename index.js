import{a as k,i as m,R as M,S as E,N as A,P as D,A as T,b as N}from"./assets/vendor-DcLpQnD-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();async function P(e){return(await k.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function x(e){const t=Math.floor(e),r=e%1!==0,i=5-t-(r?1:0);return`
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

      ${Array(i).fill().map(()=>`
          <svg class="star empty">
            <use href="#icon-star"></use>
          </svg>
        `).join("")}

    </div>
  `}function O({name:e,description:t,composition:r,price:i,rate:s,image:a}){return`<div class="modal-inner">
    <img class="dessert-details-img" src="${a}" alt="${e}" />
    <div class="modal-text">
    <h3 class="dessert-details-title">${e}</h3>
    <p class="price">${i} грн</p>
    ${x(s)}
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${r}</p>
    </div>
    </div>
  `}const w=document.querySelector("[data-loader]");function H(){w.classList.remove("is-hidden")}function I(){w.classList.add("is-hidden")}const j="6852a9fcb459460cb6b47736",o={backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]"),orderBtn:document.querySelector("[data-order-btn]")};async function $(e){o.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",o.content.innerHTML="",o.orderBtn.disabled=!0,H();try{const t=await P(e);o.content.innerHTML=O(t),o.orderBtn.disabled=!1}catch{m.error({title:"Error",message:"Illegal operation"})}finally{I()}}function u(){o.backdrop.classList.add("is-hidden"),document.body.style.overflow="",o.orderBtn.disabled=!0}o.closeBtn.addEventListener("click",u);o.backdrop.addEventListener("click",e=>{e.target===o.backdrop&&u()});document.addEventListener("keydown",e=>{e.key==="Escape"&&u()});o.orderBtn.addEventListener("click",()=>{u()});$(j);const b=document.querySelector(".desserts-list"),p=document.querySelector(".load-more-btn"),y=document.querySelector(".loader"),L=document.querySelector(".categories-list-desktop"),S=document.querySelector(".categories-list-tablet");let d=1,l="";p.addEventListener("click",C);S.addEventListener("change",async e=>{l=e.target.value,await q()});L.addEventListener("change",async e=>{e.target.name==="dessert"&&(l=e.target.value,await q())});b.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const r=t.dataset.id;await $(r)});async function q(){d=1,b.innerHTML="",await g()}async function B(e){const{data:t}=await k(`https://deserts-store.b.goit.study/api/${e}`);return t}B("categories").then(e=>{R(e)}).catch(e=>{m.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function R(e){L.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:r})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${r}</label>`).join("")}`,S.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:r})=>`
       <option value="${t}">${r}</option>`).join("")}`}g();function F(e){return e.map(({_id:t,name:r,image:i,description:s,price:a,category:{name:c}})=>`
        <li class="dessert-list-item">
            <img src="${i}"
                alt="${r}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${c}</p>
            <h3 class="desserts-item-title">${r}</h3>
            <p class="desserts-item-descr">${s}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${a} грн</p>
                <button class="desserts-item-btn" data-id="${t}">
                    <svg height="24" width="24">
                        <use href="/img/icons.svg#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function C(){d++,await g()}async function g(){p.classList.add("hidden"),y.classList.remove("hidden");try{let e=`desserts?page=${d}&limit=8`;l&&(e+=`&category=${l}`);const t=await B(e);b.insertAdjacentHTML("beforeend",F(t.desserts)),t.totalItems>d*t.limit&&p.classList.remove("hidden")}catch{m.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{y.classList.add("hidden")}}const _="https://deserts-store.b.goit.study/api/feedbacks?limit=10",n={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let f=null;U();async function U(){if(n.list)try{const e=await V();Y(e),n.list.hidden=!1,n.prevBtn.hidden=!1,n.nextBtn.hidden=!1,n.bottom.hidden=!1,K(),G()}catch(e){n.list.hidden=!1,n.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{n.loader.hidden=!0}}async function V(){const e=await fetch(_);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function Y(e){n.list.innerHTML=e.map(z).join("")}function z({_id:e,rate:t,description:r,author:i}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(t)}"
          aria-label="Оцінка ${Number(t)} з 5"
        ></div>
        <p class="feedback-review">"${r}"</p>
        <h3 class="feedback-author">${i}</h3>
      </article>
    </li>
  `}function K(){document.querySelectorAll(".feedback-rating").forEach(e=>{new M(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function G(){f&&f.destroy(!0,!0),f=new E(".feedback-swiper",{modules:[A,D,T],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:n.prevBtn,nextEl:n.nextBtn},pagination:{el:n.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const h=document.querySelector(".faq-accordion");h&&new N(h,{duration:400,showMultiple:!1,openOnInit:[]});const v=document.querySelector("[data-current-year]");v&&(v.textContent=new Date().getFullYear());
//# sourceMappingURL=index.js.map
