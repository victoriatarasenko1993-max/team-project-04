import{b as w,i as f,R as G,S as P,N as O,P as R,A as J,a as Q}from"./assets/vendor-DJ86wize.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();async function W(e){return(await w.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function X(e){const t=Math.floor(e),s=e%1!==0,o=5-t-(s?1:0);return`
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
  `}function Z({name:e,description:t,composition:s,price:o,rate:n,image:r}){return`<div class="modal-inner" data-modal-inner><img class="dessert-details-img" src="${r}" alt="${e}"/>
    <div class="modal-text"><h3 class="dessert-details-title">${e}</h3>
    <p class="price">${o} грн</p>
    ${X(n)}
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${s}</p><button class="order-btn" data-order-btn disabled>Перейти до замовлення</button></div>
    </div>

  `}const x=document.querySelector("[data-loader]");function ee(){x.classList.remove("is-hidden")}function te(){x.classList.add("is-hidden")}const se="https://deserts-store.b.goit.study/api/orders",I="6852a9fcb459460cb6b47748",d=document.querySelector("[data-order-backdrop]"),h=document.querySelector("[data-order-close]"),l=document.querySelector("[data-order-form]");let N=I;function ne(e){f.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function q(e){f.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function j(e=I){d&&(N=e,d.classList.remove("is-hidden"),document.body.classList.add("modal-open"),document.addEventListener("keydown",H))}function y(){d&&(d.classList.add("is-hidden"),document.body.classList.remove("modal-open"),document.removeEventListener("keydown",H))}function H(e){e.key==="Escape"&&y()}function re(e){e.target===e.currentTarget&&y()}async function oe(e){var n,r;e.preventDefault();const t=l.querySelector(".order-form-submit"),s=new FormData(l),o={name:s.get("name").trim(),phone:s.get("phone").trim(),dessertId:N,comment:s.get("comment").trim()};if(!o.name||!o.phone||!o.comment){q("Будь ласка, заповніть усі поля форми.");return}try{t&&(t.disabled=!0);const i=await w.post(se,o);ne(i.data.orderNum),l.reset(),y()}catch(i){const z=((r=(n=i.response)==null?void 0:n.data)==null?void 0:r.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";q(z),console.error(i)}finally{t&&(t.disabled=!1)}}h==null||h.addEventListener("click",y);d==null||d.addEventListener("click",re);l==null||l.addEventListener("submit",oe);window.openOrderModal=j;const c={inner:document.querySelector("[data-modal-inner]"),backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]")};async function ae(e){c.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",ie(),c.content.innerHTML="",ee();try{const t=await W(e);c.content.innerHTML=Z(t);const s=document.querySelector(".order-btn");s.disabled=!1,s.addEventListener("click",()=>{s.disabled=!0,p(),j(e)})}catch{f.error({title:"Error",message:"Illegal operation"})}finally{te()}}function p(){c.backdrop.classList.add("is-hidden"),document.body.style.overflow="",c.content.innerHTML="",ce()}function F(e){e.key==="Escape"&&p()}function C(e){e.target===c.backdrop&&p()}function ie(){c.closeBtn.addEventListener("click",p),c.backdrop.addEventListener("click",C),document.addEventListener("keydown",F)}function ce(){c.closeBtn.removeEventListener("click",p),c.backdrop.removeEventListener("click",C),document.removeEventListener("keydown",F)}const de="/team-project-04/assets/icons-BoSAtLQJ.svg",S=document.querySelector(".desserts-list"),L=document.querySelector(".load-more-btn"),M=document.querySelector(".loader"),_=document.querySelector(".categories-list-desktop"),E=document.querySelector(".categories-list-tablet");let b=1,u="";L.addEventListener("click",me);E.addEventListener("change",async e=>{u=e.target.value;const t=document.querySelector(`input[name="dessert"][value="${u}"]`);t&&(t.checked=!0),await U()});_.addEventListener("change",async e=>{e.target.name==="dessert"&&(u=e.target.value,E.value=u,await U())});S.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const s=t.dataset.id;await ae(s)});async function U(){b=1,S.innerHTML="",await $()}async function V(e){const{data:t}=await w(`https://deserts-store.b.goit.study/api/${e}`);return t}V("categories").then(e=>{le(e)}).catch(e=>{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function le(e){_.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:s})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${s}</label>`).join("")}`,E.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:s})=>`
       <option value="${t}">${s}</option>`).join("")}`}$();function ue(e){return e.map(({_id:t,name:s,image:o,description:n,price:r,category:{name:i}})=>`
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
                        <use href="${de}#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function me(){b++,await $()}async function $(){L.classList.add("hidden"),M.classList.remove("hidden");try{let e=`desserts?page=${b}&limit=8`;u&&(e+=`&category=${u}`);const t=await V(e);S.insertAdjacentHTML("beforeend",ue(t.desserts)),t.totalItems>b*t.limit&&L.classList.remove("hidden")}catch{f.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{M.classList.add("hidden")}}const fe="https://deserts-store.b.goit.study/api/feedbacks?limit=10",a={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let v=null;pe();async function pe(){if(a.list)try{const e=await be();ye(e),a.list.hidden=!1,a.prevBtn.hidden=!1,a.nextBtn.hidden=!1,a.bottom.hidden=!1,he(),ve()}catch(e){a.list.hidden=!1,a.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{a.loader.hidden=!0}}async function be(){const e=await fetch(fe);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function ye(e){a.list.innerHTML=e.map(ge).join("")}function ge({_id:e,rate:t,description:s,author:o}){return`
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
  `}function he(){document.querySelectorAll(".feedback-rating").forEach(e=>{new G(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function ve(){v&&v.destroy(!0,!0),v=new P(".feedback-swiper",{modules:[O,R,J],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:a.prevBtn,nextEl:a.nextBtn},pagination:{el:a.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const B=document.querySelector(".faq-accordion");B&&new Q(B,{duration:400,showMultiple:!1,openOnInit:[]});let m=null;const K=window.matchMedia("(min-width: 768px)");function Le(){const e=document.querySelector(".about-swiper");e&&(m=new P(e,{modules:[O,R],slidesPerView:2,slidesPerGroup:1,spaceBetween:24,speed:700,loop:!1,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".swiper-pagination",clickable:!0,type:"bullets"}}))}function Y(){K.matches?m||Le():m&&(m.destroy(!0,!0),m=null)}Y();K.addEventListener("change",Y);const D=document.querySelector("[data-current-year]");D&&(D.textContent=new Date().getFullYear());const A=document.querySelector(".burger-btn"),T=document.querySelector(".mob-menu-close"),g=document.querySelector(".mob-menu"),ke=document.querySelectorAll(".js-close-menu");A&&T&&g&&(A.addEventListener("click",we),T.addEventListener("click",k),ke.forEach(e=>{e.addEventListener("click",k)}),document.addEventListener("keydown",Se));function we(){g.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}function k(){g.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}function Se(e){e.key==="Escape"&&!g.classList.contains("is-hidden")&&k()}
//# sourceMappingURL=index.js.map
