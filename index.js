import{R as b,S as m,N as y,P as g,A as h,a as v,b as k,i as w}from"./assets/vendor-DiZHNjqG.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const S="https://deserts-store.b.goit.study/api/feedbacks?limit=10",a={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let l=null;L();async function L(){if(a.list)try{const e=await $();B(e),a.list.hidden=!1,a.prevBtn.hidden=!1,a.nextBtn.hidden=!1,a.bottom.hidden=!1,E(),M()}catch(e){a.list.hidden=!1,a.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{a.loader.hidden=!0}}async function $(){const e=await fetch(S);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function B(e){a.list.innerHTML=e.map(q).join("")}function q({_id:e,rate:r,description:o,author:i}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(r)}"
          aria-label="Оцінка ${Number(r)} з 5"
        ></div>
        <p class="feedback-review">"${o}"</p>
        <h3 class="feedback-author">${i}</h3>
      </article>
    </li>
  `}function E(){document.querySelectorAll(".feedback-rating").forEach(e=>{new b(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function M(){l&&l.destroy(!0,!0),l=new m(".feedback-swiper",{modules:[y,g,h],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:a.prevBtn,nextEl:a.nextBtn},pagination:{el:a.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,r){return`<button class="${r}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const u=document.querySelector(".faq-accordion");u&&new v(u,{duration:400,showMultiple:!1,openOnInit:[]});const f=document.querySelector("[data-current-year]");f&&(f.textContent=new Date().getFullYear());async function A(e){return(await k.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function N(e){const r=Math.floor(e),o=e%1!==0,i=5-r-(o?1:0);return`
    <div class="stars">
      
      ${Array(r).fill().map(()=>`
          <svg class="star filled">
            <use href="#icon-star"></use>
          </svg>
        `).join("")}

      ${o?`
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
  `}function P({name:e,description:r,composition:o,price:i,rate:t,image:s}){return`<div class="modal-inner">
    <img class="dessert-details-img" src="${s}" alt="${e}" />
    <div class="modal-text">
    <h3 class="dessert-details-title">${e}</h3>
    <p class="price">${i} грн</p>
    ${N(t)}
    <p class="description">${r}</p>
    <p class="composition"><strong>Склад:</strong> ${o}</p>
    </div>
    </div>
  `}const p=document.querySelector("[data-loader]");function x(){p.classList.remove("is-hidden")}function O(){p.classList.add("is-hidden")}const T="6852a9fcb459460cb6b47736",n={backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]"),orderBtn:document.querySelector("[data-order-btn]")};async function D(e){n.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",n.content.innerHTML="",n.orderBtn.disabled=!0,x();try{const r=await A(e);n.content.innerHTML=P(r),n.orderBtn.disabled=!1}catch{w.error({title:"Error",message:"Illegal operation"})}finally{O()}}function c(){n.backdrop.classList.add("is-hidden"),document.body.style.overflow="",n.orderBtn.disabled=!0}n.closeBtn.addEventListener("click",c);n.backdrop.addEventListener("click",e=>{e.target===n.backdrop&&c()});document.addEventListener("keydown",e=>{e.key==="Escape"&&c()});n.orderBtn.addEventListener("click",()=>{c()});D(T);
//# sourceMappingURL=index.js.map
