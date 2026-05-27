import{b as S,i as p,R as J,S as T,N as O,P as R,A as Q,a as W}from"./assets/vendor-DJ86wize.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();async function X(e){return(await S.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function Z(e){const t=Math.floor(e),s=e%1!==0,o=5-t-(s?1:0);return`
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
  `}function ee({name:e,description:t,composition:s,price:o,rate:n,image:r}){return`<div class="modal-inner" data-modal-inner><img class="dessert-details-img" src="${r}" alt="${e}"/>
    <div class="modal-text"><h3 class="dessert-details-title">${e}</h3>
    <p class="price">${o} грн</p>
    ${Z(n)}
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${s}</p><button class="order-btn" data-order-btn disabled>Перейти до замовлення</button></div>
    </div>

  `}const x=document.querySelector("[data-loader]");function te(){x.classList.remove("is-hidden")}function se(){x.classList.add("is-hidden")}const ne="https://deserts-store.b.goit.study/api/orders",d=document.querySelector("[data-order-backdrop]"),u=document.querySelector("[data-order-close]"),i=document.querySelector("[data-order-form]");let N=null,g=!1;function re(e){p.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function I(e){p.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function oe(e){if(d){if(!e){I("Не вдалося визначити десерт для замовлення.");return}N=e,d.classList.remove("is-hidden"),document.body.classList.add("modal-open"),ae()}}function b(){d&&(d.classList.add("is-hidden"),document.body.classList.remove("modal-open"),ie())}function ae(){g||(u==null||u.addEventListener("click",b),d==null||d.addEventListener("click",H),i==null||i.addEventListener("submit",C),document.addEventListener("keydown",j),g=!0)}function ie(){g&&(u==null||u.removeEventListener("click",b),d==null||d.removeEventListener("click",H),i==null||i.removeEventListener("submit",C),document.removeEventListener("keydown",j),g=!1)}function j(e){e.key==="Escape"&&b()}function H(e){e.target===e.currentTarget&&b()}async function C(e){var n,r;if(e.preventDefault(),!i.checkValidity()){i.reportValidity();return}const t=i.querySelector(".order-form-submit"),s=new FormData(i),o={name:s.get("name").trim(),phone:s.get("phone").trim(),dessertId:N,comment:s.get("comment").trim()};try{t&&(t.disabled=!0);const c=await S.post(ne,o);re(c.data.orderNum),i.reset(),b()}catch(c){const G=((r=(n=c.response)==null?void 0:n.data)==null?void 0:r.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";I(G),console.error(c)}finally{t&&(t.disabled=!1)}}const l={inner:document.querySelector("[data-modal-inner]"),backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]")};async function ce(e){l.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",de(),l.content.innerHTML="",te();try{const t=await X(e);l.content.innerHTML=ee(t);const s=document.querySelector(".order-btn");s.disabled=!1,s.addEventListener("click",()=>{s.disabled=!0,y(),oe(e)})}catch{p.error({title:"Error",message:"Illegal operation"})}finally{se()}}function y(){l.backdrop.classList.add("is-hidden"),document.body.style.overflow="",l.content.innerHTML="",le()}function F(e){e.key==="Escape"&&y()}function V(e){e.target===l.backdrop&&y()}function de(){l.closeBtn.addEventListener("click",y),l.backdrop.addEventListener("click",V),document.addEventListener("keydown",F)}function le(){l.closeBtn.removeEventListener("click",y),l.backdrop.removeEventListener("click",V),document.removeEventListener("keydown",F)}const ue="/team-project-04/assets/icons-BoSAtLQJ.svg",E=document.querySelector(".desserts-list"),k=document.querySelector(".load-more-btn"),M=document.querySelector(".loader"),_=document.querySelector(".categories-list-desktop"),$=document.querySelector(".categories-list-tablet");let v=1,f="";k.addEventListener("click",pe);$.addEventListener("change",async e=>{f=e.target.value;const t=document.querySelector(`input[name="dessert"][value="${f}"]`);t&&(t.checked=!0),await U()});_.addEventListener("change",async e=>{e.target.name==="dessert"&&(f=e.target.value,$.value=f,await U())});E.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const s=t.dataset.id;await ce(s)});async function U(){v=1,E.innerHTML="",await q()}async function K(e){const{data:t}=await S(`https://deserts-store.b.goit.study/api/${e}`);return t}K("categories").then(e=>{fe(e)}).catch(e=>{p.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function fe(e){_.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:s})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${s}</label>`).join("")}`,$.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:s})=>`
       <option value="${t}">${s}</option>`).join("")}`}q();function me(e){return e.map(({_id:t,name:s,image:o,description:n,price:r,category:{name:c}})=>`
        <li class="dessert-list-item">
            <img src="${o}"
                alt="${s}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${c}</p>
            <h3 class="desserts-item-title">${s}</h3>
            <p class="desserts-item-descr">${n}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${r} грн</p>
                <button class="desserts-item-btn" data-id="${t}">
                    <svg height="24" width="24">
                        <use href="${ue}#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function pe(){v++,await q()}async function q(){k.classList.add("hidden"),M.classList.remove("hidden");try{let e=`desserts?page=${v}&limit=8`;f&&(e+=`&category=${f}`);const t=await K(e);E.insertAdjacentHTML("beforeend",me(t.desserts)),t.totalItems>v*t.limit&&k.classList.remove("hidden")}catch{p.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{M.classList.add("hidden")}}const be="https://deserts-store.b.goit.study/api/feedbacks?limit=10",a={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let L=null;ye();async function ye(){if(a.list)try{const e=await ge();ve(e),a.list.hidden=!1,a.prevBtn.hidden=!1,a.nextBtn.hidden=!1,a.bottom.hidden=!1,Le(),ke()}catch(e){a.list.hidden=!1,a.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{a.loader.hidden=!0}}async function ge(){const e=await fetch(be);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function ve(e){a.list.innerHTML=e.map(he).join("")}function he({_id:e,rate:t,description:s,author:o}){return`
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
  `}function Le(){document.querySelectorAll(".feedback-rating").forEach(e=>{new J(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function ke(){L&&L.destroy(!0,!0),L=new T(".feedback-swiper",{modules:[O,R,Q],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:a.prevBtn,nextEl:a.nextBtn},pagination:{el:a.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const B=document.querySelector(".faq-accordion");B&&new W(B,{duration:400,showMultiple:!1,openOnInit:[]});let m=null;const Y=window.matchMedia("(min-width: 768px)");function we(){const e=document.querySelector(".about-swiper");e&&(m=new T(e,{modules:[O,R],slidesPerView:2,slidesPerGroup:1,spaceBetween:24,speed:700,loop:!1,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".swiper-pagination",clickable:!0,type:"bullets"}}))}function z(){Y.matches?m||we():m&&(m.destroy(!0,!0),m=null)}z();Y.addEventListener("change",z);const A=document.querySelector("[data-current-year]");A&&(A.textContent=new Date().getFullYear());const D=document.querySelector(".burger-btn"),P=document.querySelector(".mob-menu-close"),h=document.querySelector(".mob-menu"),Se=document.querySelectorAll(".js-close-menu");D&&P&&h&&(D.addEventListener("click",Ee),P.addEventListener("click",w),Se.forEach(e=>{e.addEventListener("click",w)}),document.addEventListener("keydown",$e));function Ee(){h.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}function w(){h.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}function $e(e){e.key==="Escape"&&!h.classList.contains("is-hidden")&&w()}
//# sourceMappingURL=index.js.map
