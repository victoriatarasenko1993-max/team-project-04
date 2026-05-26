import{b as w,i as f,R as C,S as M,N as D,P as _,A as U,a as V}from"./assets/vendor-DJ86wize.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();async function K(e){return(await w.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function Y(e){const t=Math.floor(e),s=e%1!==0,a=5-t-(s?1:0);return`
    <div class="stars">
      
      ${Array(t).fill().map(()=>`
          <svg class="star filled">
            <use href="#icon-star"></use>
          </svg>
        `).join("")}

      ${s?`
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
  `}function z({name:e,description:t,composition:s,price:a,rate:r,image:n}){return`<div class="modal-inner" data-modal-inner><img class="dessert-details-img" src="${n}" alt="${e}"/>
    <div class="modal-text"><h3 class="dessert-details-title">${e}</h3>
    <p class="price">${a} грн</p>
    ${Y(r)}
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${s}</p><button class="order-btn" data-order-btn disabled>Перейти до замовлення</button></div>
    </div>

  `}const B=document.querySelector("[data-loader]");function G(){B.classList.remove("is-hidden")}function J(){B.classList.add("is-hidden")}const Q="https://deserts-store.b.goit.study/api/orders",A="6852a9fcb459460cb6b47748",l=document.querySelector("[data-order-backdrop]"),g=document.querySelector("[data-order-close]"),u=document.querySelector("[data-order-form]");let T=A;function W(e){f.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function S(e){f.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function x(e=A){l&&(T=e,l.classList.remove("is-hidden"),document.body.classList.add("modal-open"),document.addEventListener("keydown",P))}function b(){l&&(l.classList.add("is-hidden"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",P))}function P(e){e.key==="Escape"&&b()}function X(e){e.target===e.currentTarget&&b()}async function Z(e){var r,n;e.preventDefault();const t=u.querySelector(".order-form-submit"),s=new FormData(u),a={name:s.get("name").trim(),phone:s.get("phone").trim(),dessertId:T,comment:s.get("comment").trim()};if(!a.name||!a.phone||!a.comment){S("Будь ласка, заповніть усі поля форми.");return}try{t&&(t.disabled=!0);const i=await w.post(Q,a);W(i.data.orderNum),u.reset(),b()}catch(i){const j=((n=(r=i.response)==null?void 0:r.data)==null?void 0:n.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";S(j),console.error(i)}finally{t&&(t.disabled=!1)}}g==null||g.addEventListener("click",b);l==null||l.addEventListener("click",X);u==null||u.addEventListener("submit",Z);window.openOrderModal=x;const d={inner:document.querySelector("[data-modal-inner]"),backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]")};async function ee(e){d.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",d.content.innerHTML="",G();try{const t=await K(e);d.content.innerHTML=z(t);const s=document.querySelector(".order-btn");s.disabled=!1,s.addEventListener("click",()=>{s.disabled=!0,y(),x(e)})}catch{f.error({title:"Error",message:"Illegal operation"})}finally{J()}}function y(){d.backdrop.classList.add("is-hidden"),document.body.style.overflow="",d.orderBtn.disabled=!0}d.closeBtn.addEventListener("click",y);d.backdrop.addEventListener("click",e=>{e.target===d.backdrop&&y()});document.addEventListener("keydown",e=>{e.key==="Escape"&&y()});const L=document.querySelector(".desserts-list"),v=document.querySelector(".load-more-btn"),$=document.querySelector(".loader"),I=document.querySelector(".categories-list-desktop"),O=document.querySelector(".categories-list-tablet");let p=1,m="";v.addEventListener("click",re);O.addEventListener("change",async e=>{m=e.target.value,await N()});I.addEventListener("change",async e=>{e.target.name==="dessert"&&(m=e.target.value,await N())});L.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const s=t.dataset.id;await ee(s)});async function N(){p=1,L.innerHTML="",await k()}async function R(e){const{data:t}=await w(`https://deserts-store.b.goit.study/api/${e}`);return t}R("categories").then(e=>{te(e)}).catch(e=>{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function te(e){I.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:s})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${s}</label>`).join("")}`,O.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:s})=>`
       <option value="${t}">${s}</option>`).join("")}`}k();function se(e){return e.map(({_id:t,name:s,image:a,description:r,price:n,category:{name:i}})=>`
        <li class="dessert-list-item">
            <img src="${a}"
                alt="${s}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${i}</p>
            <h3 class="desserts-item-title">${s}</h3>
            <p class="desserts-item-descr">${r}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${n} грн</p>
                <button class="desserts-item-btn" data-id="${t}">
                    <svg height="24" width="24">
                        <use href="${icon}#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function re(){p++,await k()}async function k(){v.classList.add("hidden"),$.classList.remove("hidden");try{let e=`desserts?page=${p}&limit=8`;m&&(e+=`&category=${m}`);const t=await R(e);L.insertAdjacentHTML("beforeend",se(t.desserts)),t.totalItems>p*t.limit&&v.classList.remove("hidden")}catch{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{$.classList.add("hidden")}}const ae="https://deserts-store.b.goit.study/api/feedbacks?limit=10",o={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let h=null;ne();async function ne(){if(o.list)try{const e=await oe();ie(e),o.list.hidden=!1,o.prevBtn.hidden=!1,o.nextBtn.hidden=!1,o.bottom.hidden=!1,de(),le()}catch(e){o.list.hidden=!1,o.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{o.loader.hidden=!0}}async function oe(){const e=await fetch(ae);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function ie(e){o.list.innerHTML=e.map(ce).join("")}function ce({_id:e,rate:t,description:s,author:a}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(t)}"
          aria-label="Оцінка ${Number(t)} з 5"
        ></div>
        <p class="feedback-review">"${s}"</p>
        <h3 class="feedback-author">${a}</h3>
      </article>
    </li>
  `}function de(){document.querySelectorAll(".feedback-rating").forEach(e=>{new C(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function le(){h&&h.destroy(!0,!0),h=new M(".feedback-swiper",{modules:[D,_,U],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:o.prevBtn,nextEl:o.nextBtn},pagination:{el:o.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const E=document.querySelector(".faq-accordion");E&&new V(E,{duration:400,showMultiple:!1,openOnInit:[]});let c=null;const F=window.matchMedia("(min-width: 768px)");function ue(){const e=document.querySelector(".about-swiper");if(!e)return;c=new M(e,{modules:[D],slidesPerView:2,slidesPerGroup:1,spaceBetween:24,speed:700,loop:!1,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev",disabledClass:"is-disabled"}});const t=document.querySelectorAll(".about-pagination-bullet");function s(a){t.forEach((r,n)=>{r.classList.toggle("about-pagination-bullet-active",n===a)})}t.forEach(a=>{a.addEventListener("click",()=>{const r=Number(a.dataset.index);c.slideTo(r),s(r)})}),c.on("slideChange",()=>{s(c.activeIndex)}),s(c.activeIndex)}function H(){F.matches?c||ue():c&&(c.destroy(!0,!0),c=null)}H();F.addEventListener("change",H);const q=document.querySelector("[data-current-year]");q&&(q.textContent=new Date().getFullYear());
//# sourceMappingURL=index.js.map
