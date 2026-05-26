import{b as k,i as f,R as K,S as T,N as x,P as Y,A as z,a as G}from"./assets/vendor-DJ86wize.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();async function J(e){return(await k.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function Q(e){const t=Math.floor(e),s=e%1!==0,r=5-t-(s?1:0);return`
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

      ${Array(r).fill().map(()=>`
          <svg class="star empty">
            <use href="#icon-star"></use>
          </svg>
        `).join("")}

    </div>
  `}function W({name:e,description:t,composition:s,price:r,rate:n,image:o}){return`<div class="modal-inner" data-modal-inner><img class="dessert-details-img" src="${o}" alt="${e}"/>
    <div class="modal-text"><h3 class="dessert-details-title">${e}</h3>
    <p class="price">${r} грн</p>
    ${Q(n)}
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${s}</p><button class="order-btn" data-order-btn disabled>Перейти до замовлення</button></div>
    </div>

  `}const P=document.querySelector("[data-loader]");function X(){P.classList.remove("is-hidden")}function Z(){P.classList.add("is-hidden")}const ee="https://deserts-store.b.goit.study/api/orders",I="6852a9fcb459460cb6b47748",l=document.querySelector("[data-order-backdrop]"),h=document.querySelector("[data-order-close]"),u=document.querySelector("[data-order-form]");let O=I;function te(e){f.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function $(e){f.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function N(e=I){l&&(O=e,l.classList.remove("is-hidden"),document.body.classList.add("modal-open"),document.addEventListener("keydown",R))}function b(){l&&(l.classList.add("is-hidden"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",R))}function R(e){e.key==="Escape"&&b()}function se(e){e.target===e.currentTarget&&b()}async function ne(e){var n,o;e.preventDefault();const t=u.querySelector(".order-form-submit"),s=new FormData(u),r={name:s.get("name").trim(),phone:s.get("phone").trim(),dessertId:O,comment:s.get("comment").trim()};if(!r.name||!r.phone||!r.comment){$("Будь ласка, заповніть усі поля форми.");return}try{t&&(t.disabled=!0);const i=await k.post(ee,r);te(i.data.orderNum),u.reset(),b()}catch(i){const V=((o=(n=i.response)==null?void 0:n.data)==null?void 0:o.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";$(V),console.error(i)}finally{t&&(t.disabled=!1)}}h==null||h.addEventListener("click",b);l==null||l.addEventListener("click",se);u==null||u.addEventListener("submit",ne);window.openOrderModal=N;const d={inner:document.querySelector("[data-modal-inner]"),backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]")};async function re(e){d.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",d.content.innerHTML="",X();try{const t=await J(e);d.content.innerHTML=W(t);const s=document.querySelector(".order-btn");s.disabled=!1,s.addEventListener("click",()=>{s.disabled=!0,y(),N(e)})}catch{f.error({title:"Error",message:"Illegal operation"})}finally{Z()}}function y(){d.backdrop.classList.add("is-hidden"),document.body.style.overflow="",d.content.innerHTML=""}d.closeBtn.addEventListener("click",y);d.backdrop.addEventListener("click",e=>{e.target===d.backdrop&&y()});document.addEventListener("keydown",e=>{e.key==="Escape"&&y()});const oe="/team-project-04/assets/icons-BoSAtLQJ.svg",S=document.querySelector(".desserts-list"),L=document.querySelector(".load-more-btn"),q=document.querySelector(".loader"),j=document.querySelector(".categories-list-desktop"),H=document.querySelector(".categories-list-tablet");let m=1,p="";L.addEventListener("click",ce);H.addEventListener("change",async e=>{p=e.target.value,await C()});j.addEventListener("change",async e=>{e.target.name==="dessert"&&(p=e.target.value,await C())});S.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const s=t.dataset.id;await re(s)});async function C(){m=1,S.innerHTML="",await E()}async function F(e){const{data:t}=await k(`https://deserts-store.b.goit.study/api/${e}`);return t}F("categories").then(e=>{ae(e)}).catch(e=>{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function ae(e){j.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:s})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${s}</label>`).join("")}`,H.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:s})=>`
       <option value="${t}">${s}</option>`).join("")}`}E();function ie(e){return e.map(({_id:t,name:s,image:r,description:n,price:o,category:{name:i}})=>`
        <li class="dessert-list-item">
            <img src="${r}"
                alt="${s}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${i}</p>
            <h3 class="desserts-item-title">${s}</h3>
            <p class="desserts-item-descr">${n}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${o} грн</p>
                <button class="desserts-item-btn" data-id="${t}">
                    <svg height="24" width="24">
                        <use href="${oe}#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function ce(){m++,await E()}async function E(){L.classList.add("hidden"),q.classList.remove("hidden");try{let e=`desserts?page=${m}&limit=8`;p&&(e+=`&category=${p}`);const t=await F(e);S.insertAdjacentHTML("beforeend",ie(t.desserts)),t.totalItems>m*t.limit&&L.classList.remove("hidden")}catch{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{q.classList.add("hidden")}}const de="https://deserts-store.b.goit.study/api/feedbacks?limit=10",a={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let v=null;le();async function le(){if(a.list)try{const e=await ue();fe(e),a.list.hidden=!1,a.prevBtn.hidden=!1,a.nextBtn.hidden=!1,a.bottom.hidden=!1,pe(),be()}catch(e){a.list.hidden=!1,a.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{a.loader.hidden=!0}}async function ue(){const e=await fetch(de);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function fe(e){a.list.innerHTML=e.map(me).join("")}function me({_id:e,rate:t,description:s,author:r}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(t)}"
          aria-label="Оцінка ${Number(t)} з 5"
        ></div>
        <p class="feedback-review">"${s}"</p>
        <h3 class="feedback-author">${r}</h3>
      </article>
    </li>
  `}function pe(){document.querySelectorAll(".feedback-rating").forEach(e=>{new K(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function be(){v&&v.destroy(!0,!0),v=new T(".feedback-swiper",{modules:[x,Y,z],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:a.prevBtn,nextEl:a.nextBtn},pagination:{el:a.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const M=document.querySelector(".faq-accordion");M&&new G(M,{duration:400,showMultiple:!1,openOnInit:[]});let c=null;const _=window.matchMedia("(min-width: 768px)");function ye(){const e=document.querySelector(".about-swiper");if(!e)return;c=new T(e,{modules:[x],slidesPerView:2,slidesPerGroup:1,spaceBetween:24,speed:700,loop:!1,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev",disabledClass:"is-disabled"}});const t=document.querySelectorAll(".about-pagination-bullet");function s(r){t.forEach((n,o)=>{n.classList.toggle("about-pagination-bullet-active",o===r)})}t.forEach(r=>{r.addEventListener("click",()=>{const n=Number(r.dataset.index);c.slideTo(n),s(n)})}),c.on("slideChange",()=>{s(c.activeIndex)}),s(c.activeIndex)}function U(){_.matches?c||ye():c&&(c.destroy(!0,!0),c=null)}U();_.addEventListener("change",U);const B=document.querySelector("[data-current-year]");B&&(B.textContent=new Date().getFullYear());const D=document.querySelector(".burger-btn"),A=document.querySelector(".mob-menu-close"),g=document.querySelector(".mob-menu"),ge=document.querySelectorAll(".js-close-menu");D&&A&&g&&(D.addEventListener("click",he),A.addEventListener("click",w),ge.forEach(e=>{e.addEventListener("click",w)}),document.addEventListener("keydown",ve));function he(){g.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}function w(){g.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}function ve(e){e.key==="Escape"&&!g.classList.contains("is-hidden")&&w()}
//# sourceMappingURL=index.js.map
