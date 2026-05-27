import{b as k,i as f,R as Y,S as T,N as P,P as O,A as z,a as G}from"./assets/vendor-DJ86wize.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();async function J(e){return(await k.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function Q(e){const t=Math.floor(e),s=e%1!==0,o=5-t-(s?1:0);return`
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

      ${Array(o).fill().map(()=>`
          <svg class="star empty">
            <use href="#icon-star"></use>
          </svg>
        `).join("")}

    </div>
  `}function W({name:e,description:t,composition:s,price:o,rate:n,image:r}){return`<div class="modal-inner" data-modal-inner><img class="dessert-details-img" src="${r}" alt="${e}"/>
    <div class="modal-text"><h3 class="dessert-details-title">${e}</h3>
    <p class="price">${o} грн</p>
    ${Q(n)}
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${s}</p><button class="order-btn" data-order-btn disabled>Перейти до замовлення</button></div>
    </div>

  `}const R=document.querySelector("[data-loader]");function X(){R.classList.remove("is-hidden")}function Z(){R.classList.add("is-hidden")}const ee="https://deserts-store.b.goit.study/api/orders",x="6852a9fcb459460cb6b47748",d=document.querySelector("[data-order-backdrop]"),h=document.querySelector("[data-order-close]"),l=document.querySelector("[data-order-form]");let I=x;function te(e){f.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function $(e){f.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function N(e=x){d&&(I=e,d.classList.remove("is-hidden"),document.body.classList.add("modal-open"),document.addEventListener("keydown",j))}function b(){d&&(d.classList.add("is-hidden"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",j))}function j(e){e.key==="Escape"&&b()}function se(e){e.target===e.currentTarget&&b()}async function ne(e){var n,r;e.preventDefault();const t=l.querySelector(".order-form-submit"),s=new FormData(l),o={name:s.get("name").trim(),phone:s.get("phone").trim(),dessertId:I,comment:s.get("comment").trim()};if(!o.name||!o.phone||!o.comment){$("Будь ласка, заповніть усі поля форми.");return}try{t&&(t.disabled=!0);const i=await k.post(ee,o);te(i.data.orderNum),l.reset(),b()}catch(i){const K=((r=(n=i.response)==null?void 0:n.data)==null?void 0:r.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";$(K),console.error(i)}finally{t&&(t.disabled=!1)}}h==null||h.addEventListener("click",b);d==null||d.addEventListener("click",se);l==null||l.addEventListener("submit",ne);window.openOrderModal=N;const c={inner:document.querySelector("[data-modal-inner]"),backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]")};async function re(e){c.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",c.content.innerHTML="",X();try{const t=await J(e);c.content.innerHTML=W(t);const s=document.querySelector(".order-btn");s.disabled=!1,s.addEventListener("click",()=>{s.disabled=!0,y(),N(e)})}catch{f.error({title:"Error",message:"Illegal operation"})}finally{Z()}}function y(){c.backdrop.classList.add("is-hidden"),document.body.style.overflow="",c.content.innerHTML=""}c.closeBtn.addEventListener("click",y);c.backdrop.addEventListener("click",e=>{e.target===c.backdrop&&y()});document.addEventListener("keydown",e=>{e.key==="Escape"&&y()});const oe="/team-project-04/assets/icons-BoSAtLQJ.svg",S=document.querySelector(".desserts-list"),L=document.querySelector(".load-more-btn"),q=document.querySelector(".loader"),H=document.querySelector(".categories-list-desktop"),F=document.querySelector(".categories-list-tablet");let m=1,p="";L.addEventListener("click",ce);F.addEventListener("change",async e=>{p=e.target.value,await _()});H.addEventListener("change",async e=>{e.target.name==="dessert"&&(p=e.target.value,await _())});S.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const s=t.dataset.id;await re(s)});async function _(){m=1,S.innerHTML="",await E()}async function C(e){const{data:t}=await k(`https://deserts-store.b.goit.study/api/${e}`);return t}C("categories").then(e=>{ae(e)}).catch(e=>{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function ae(e){H.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:s})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${s}</label>`).join("")}`,F.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:s})=>`
       <option value="${t}">${s}</option>`).join("")}`}E();function ie(e){return e.map(({_id:t,name:s,image:o,description:n,price:r,category:{name:i}})=>`
        <li class="dessert-list-item">
            <img src="${o}"
                alt="${s}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${i}</p>
            <h3 class="desserts-item-title">${s}</h3>
            <p class="desserts-item-descr">${n}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${r} грн</p>
                <button class="desserts-item-btn" data-id="${t}">
                    <svg height="24" width="24">
                        <use href="${oe}#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function ce(){m++,await E()}async function E(){L.classList.add("hidden"),q.classList.remove("hidden");try{let e=`desserts?page=${m}&limit=8`;p&&(e+=`&category=${p}`);const t=await C(e);S.insertAdjacentHTML("beforeend",ie(t.desserts)),t.totalItems>m*t.limit&&L.classList.remove("hidden")}catch{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{q.classList.add("hidden")}}const de="https://deserts-store.b.goit.study/api/feedbacks?limit=10",a={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let v=null;le();async function le(){if(a.list)try{const e=await ue();fe(e),a.list.hidden=!1,a.prevBtn.hidden=!1,a.nextBtn.hidden=!1,a.bottom.hidden=!1,pe(),be()}catch(e){a.list.hidden=!1,a.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{a.loader.hidden=!0}}async function ue(){const e=await fetch(de);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function fe(e){a.list.innerHTML=e.map(me).join("")}function me({_id:e,rate:t,description:s,author:o}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(t)}"
          aria-label="Оцінка ${Number(t)} з 5"
        ></div>
        <p class="feedback-review">"${s}"</p>
        <h3 class="feedback-author">${o}</h3>
      </article>
    </li>
  `}function pe(){document.querySelectorAll(".feedback-rating").forEach(e=>{new Y(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function be(){v&&v.destroy(!0,!0),v=new T(".feedback-swiper",{modules:[P,O,z],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:a.prevBtn,nextEl:a.nextBtn},pagination:{el:a.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const M=document.querySelector(".faq-accordion");M&&new G(M,{duration:400,showMultiple:!1,openOnInit:[]});let u=null;const U=window.matchMedia("(min-width: 768px)");function ye(){const e=document.querySelector(".about-swiper");e&&(u=new T(e,{modules:[P,O],slidesPerView:2,slidesPerGroup:1,spaceBetween:24,speed:700,loop:!1,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".swiper-pagination",clickable:!0,type:"bullets"}}))}function V(){U.matches?u||ye():u&&(u.destroy(!0,!0),u=null)}V();U.addEventListener("change",V);const B=document.querySelector("[data-current-year]");B&&(B.textContent=new Date().getFullYear());const D=document.querySelector(".burger-btn"),A=document.querySelector(".mob-menu-close"),g=document.querySelector(".mob-menu"),ge=document.querySelectorAll(".js-close-menu");D&&A&&g&&(D.addEventListener("click",he),A.addEventListener("click",w),ge.forEach(e=>{e.addEventListener("click",w)}),document.addEventListener("keydown",ve));function he(){g.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}function w(){g.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}function ve(e){e.key==="Escape"&&!g.classList.contains("is-hidden")&&w()}
//# sourceMappingURL=index.js.map
