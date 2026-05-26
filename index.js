import{b as v,i as u,R as N,S as x,N as F,P as H,A as j,a as _}from"./assets/vendor-DJ86wize.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();async function C(e){return(await v.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function U(e){const t=Math.floor(e),r=e%1!==0,n=5-t-(r?1:0);return`
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

      ${Array(n).fill().map(()=>`
          <svg class="star empty">
            <use href="#icon-star"></use>
          </svg>
        `).join("")}

    </div>
  `}function V({name:e,description:t,composition:r,price:n,rate:s,image:a}){return`<div class="modal-inner">
    <img class="dessert-details-img" src="${a}" alt="${e}" />
    <div class="modal-text">
    <h3 class="dessert-details-title">${e}</h3>
    <p class="price">${n} грн</p>
    ${U(s)}
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${r}</p>
    </div>
    </div>
  `}const q=document.querySelector("[data-loader]");function K(){q.classList.remove("is-hidden")}function Y(){q.classList.add("is-hidden")}const z="6852a9fcb459460cb6b47736",i={backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]"),orderBtn:document.querySelector("[data-order-btn]")};async function M(e){i.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",i.content.innerHTML="",i.orderBtn.disabled=!0,K();try{const t=await C(e);i.content.innerHTML=V(t),i.orderBtn.disabled=!1}catch{u.error({title:"Error",message:"Illegal operation"})}finally{Y()}}function m(){i.backdrop.classList.add("is-hidden"),document.body.style.overflow="",i.orderBtn.disabled=!0}i.closeBtn.addEventListener("click",m);i.backdrop.addEventListener("click",e=>{e.target===i.backdrop&&m()});document.addEventListener("keydown",e=>{e.key==="Escape"&&m()});i.orderBtn.addEventListener("click",()=>{m()});M(z);const L=document.querySelector(".desserts-list"),h=document.querySelector(".load-more-btn"),k=document.querySelector(".loader"),B=document.querySelector(".categories-list-desktop"),D=document.querySelector(".categories-list-tablet");let f=1,p="";h.addEventListener("click",Q);D.addEventListener("change",async e=>{p=e.target.value,await T()});B.addEventListener("change",async e=>{e.target.name==="dessert"&&(p=e.target.value,await T())});L.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const r=t.dataset.id;await M(r)});async function T(){f=1,L.innerHTML="",await w()}async function A(e){const{data:t}=await v(`https://deserts-store.b.goit.study/api/${e}`);return t}A("categories").then(e=>{G(e)}).catch(e=>{u.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function G(e){B.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:r})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${r}</label>`).join("")}`,D.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:r})=>`
       <option value="${t}">${r}</option>`).join("")}`}w();function J(e){return e.map(({_id:t,name:r,image:n,description:s,price:a,category:{name:c}})=>`
        <li class="dessert-list-item">
            <img src="${n}"
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
        
        `).join("")}async function Q(){f++,await w()}async function w(){h.classList.add("hidden"),k.classList.remove("hidden");try{let e=`desserts?page=${f}&limit=8`;p&&(e+=`&category=${p}`);const t=await A(e);L.insertAdjacentHTML("beforeend",J(t.desserts)),t.totalItems>f*t.limit&&h.classList.remove("hidden")}catch{u.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{k.classList.add("hidden")}}const W="https://deserts-store.b.goit.study/api/feedbacks?limit=10",o={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let y=null;X();async function X(){if(o.list)try{const e=await Z();ee(e),o.list.hidden=!1,o.prevBtn.hidden=!1,o.nextBtn.hidden=!1,o.bottom.hidden=!1,se(),re()}catch(e){o.list.hidden=!1,o.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{o.loader.hidden=!0}}async function Z(){const e=await fetch(W);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function ee(e){o.list.innerHTML=e.map(te).join("")}function te({_id:e,rate:t,description:r,author:n}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(t)}"
          aria-label="Оцінка ${Number(t)} з 5"
        ></div>
        <p class="feedback-review">"${r}"</p>
        <h3 class="feedback-author">${n}</h3>
      </article>
    </li>
  `}function se(){document.querySelectorAll(".feedback-rating").forEach(e=>{new N(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function re(){y&&y.destroy(!0,!0),y=new x(".feedback-swiper",{modules:[F,H,j],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:o.prevBtn,nextEl:o.nextBtn},pagination:{el:o.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const $=document.querySelector(".faq-accordion");$&&new _($,{duration:400,showMultiple:!1,openOnInit:[]});const S=document.querySelector("[data-current-year]");S&&(S.textContent=new Date().getFullYear());const ae="https://deserts-store.b.goit.study/api/orders",O="6852a9fcb459460cb6b47748",d=document.querySelector("[data-order-backdrop]"),g=document.querySelector("[data-order-close]"),l=document.querySelector("[data-order-form]");let P=O;function ne(e){u.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function E(e){u.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function oe(e=O){d&&(P=e,d.classList.remove("is-hidden"),document.body.classList.add("modal-open"),document.addEventListener("keydown",R))}function b(){d&&(d.classList.add("is-hidden"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",R))}function R(e){e.key==="Escape"&&b()}function ie(e){e.target===e.currentTarget&&b()}async function ce(e){var s,a;e.preventDefault();const t=l.querySelector(".order-form-submit"),r=new FormData(l),n={name:r.get("name").trim(),phone:r.get("phone").trim(),dessertId:P,comment:r.get("comment").trim()};if(!n.name||!n.phone||!n.comment){E("Будь ласка, заповніть усі поля форми.");return}try{t&&(t.disabled=!0);const c=await v.post(ae,n);ne(c.data.orderNum),l.reset(),b()}catch(c){const I=((a=(s=c.response)==null?void 0:s.data)==null?void 0:a.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";E(I),console.error(c)}finally{t&&(t.disabled=!1)}}g==null||g.addEventListener("click",b);d==null||d.addEventListener("click",ie);l==null||l.addEventListener("submit",ce);window.openOrderModal=oe;
//# sourceMappingURL=index.js.map
