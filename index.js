import{b as q,i as b,R,S as j,N as O,P as N,A as ne,a as ae}from"./assets/vendor-DRWxMa3B.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();async function oe(e){return(await q.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function ie({name:e,description:t,composition:r,price:s,rate:n,image:i}){return`<div class="modal-inner" data-modal-inner><img class="dessert-details-img" src="${i}" alt="${e}"/>
    <div class="modal-text"><h3 class="dessert-details-title">${e}</h3>
    <p class="price">${s} грн</p>
    <div class="rating" data-rating="${n}"></div>
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${r}</p><button class="order-btn" data-order-btn disabled>Перейти до замовлення</button></div>
    </div>

  `}const H=document.querySelector("[data-loader]");function ce(){H.classList.remove("is-hidden")}function le(){H.classList.add("is-hidden")}const de="https://deserts-store.b.goit.study/api/orders",f=document.querySelector("[data-order-backdrop]"),m=document.querySelector("[data-order-close]"),d=document.querySelector("[data-order-form]");let F=null,L=!1;function ue(e){b.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function U(e){b.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function pe(e){if(f){if(!e){U("Не вдалося визначити десерт для замовлення.");return}F=e,f.classList.remove("is-hidden"),document.body.classList.add("modal-open"),fe()}}function h(){f&&(f.classList.add("is-hidden"),document.body.classList.remove("modal-open"),me())}function fe(){L||(m==null||m.addEventListener("click",h),f==null||f.addEventListener("click",z),d==null||d.addEventListener("submit",G),document.addEventListener("keydown",V),L=!0)}function me(){L&&(m==null||m.removeEventListener("click",h),f==null||f.removeEventListener("click",z),d==null||d.removeEventListener("submit",G),document.removeEventListener("keydown",V),L=!1)}function V(e){e.key==="Escape"&&h()}function z(e){e.target===e.currentTarget&&h()}async function G(e){var n,i;if(e.preventDefault(),!d.checkValidity()){d.reportValidity();return}const t=d.querySelector(".order-form-submit"),r=new FormData(d),s={name:r.get("name").trim(),phone:r.get("phone").trim(),dessertId:F,comment:r.get("comment").trim()};try{t&&(t.disabled=!0);const l=await q.post(de,s);ue(l.data.orderNum),d.reset(),h()}catch(l){const se=((i=(n=l.response)==null?void 0:n.data)==null?void 0:i.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";U(se),console.error(l)}finally{t&&(t.disabled=!1)}}const u={inner:document.querySelector("[data-modal-inner]"),backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]")};function ge(){const e=u.content.querySelector(".rating");if(!e)return;const t=Number(e.dataset.rating);new R(e,{starType:"i",readOnly:!0,score:t,halfShow:!0,space:!0,hints:["1","2","3","4","5"]}).init()}async function K(e){u.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",ye(),u.content.innerHTML="",ce();try{const t=await oe(e);u.content.innerHTML=ie(t),ge();const r=document.querySelector(".order-btn");r.disabled=!1,r.addEventListener("click",()=>{r.disabled=!0,v(),pe(e)})}catch{b.error({title:"Error",message:"Illegal operation"})}finally{le()}}function v(){u.backdrop.classList.add("is-hidden"),document.body.style.overflow="",u.content.innerHTML="",be()}function W(e){e.key==="Escape"&&v()}function Y(e){e.target===u.backdrop&&v()}function ye(){u.closeBtn.addEventListener("click",v),u.backdrop.addEventListener("click",Y),document.addEventListener("keydown",W)}function be(){u.closeBtn.removeEventListener("click",v),u.backdrop.removeEventListener("click",Y),document.removeEventListener("keydown",W)}const he="/team-project-04/assets/icons-BoSAtLQJ.svg",M=document.querySelector(".desserts-list"),S=document.querySelector(".load-more-btn"),_=document.querySelector(".loader"),J=document.querySelector(".categories-list-desktop"),A=document.querySelector(".categories-list-tablet");let w=1,g="";S.addEventListener("click",we);A.addEventListener("change",async e=>{g=e.target.value;const t=document.querySelector(`input[name="dessert"][value="${g}"]`);t&&(t.checked=!0),await Q()});J.addEventListener("change",async e=>{e.target.name==="dessert"&&(g=e.target.value,A.value=g,await Q())});M.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const r=t.dataset.id;await K(r)});async function Q(){w=1,M.innerHTML="",await B()}async function X(e){const{data:t}=await q(`https://deserts-store.b.goit.study/api/${e}`);return t}X("categories").then(e=>{ve(e)}).catch(e=>{b.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function ve(e){J.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:r})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${r}</label>`).join("")}`,A.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:r})=>`
       <option value="${t}">${r}</option>`).join("")}`}B();function Le(e){return e.map(({_id:t,name:r,image:s,description:n,price:i,category:{name:l}})=>`
        <li class="dessert-list-item">
            <img src="${s}"
                alt="${r}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${l}</p>
            <h3 class="desserts-item-title">${r}</h3>
            <p class="desserts-item-descr">${n}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${i} грн</p>
                <button class="desserts-item-btn" data-id="${t}">
                    <svg height="24" width="24">
                        <use href="${he}#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function we(){w++,await B()}async function B(){S.classList.add("hidden"),_.classList.remove("hidden");try{let e=`desserts?page=${w}&limit=8`;g&&(e+=`&category=${g}`);const t=await X(e);M.insertAdjacentHTML("beforeend",Le(t.desserts)),t.totalItems>w*t.limit&&S.classList.remove("hidden")}catch{b.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{_.classList.add("hidden")}}const ke="https://deserts-store.b.goit.study/api/desserts?type=popular",Pe="https://deserts-store.b.goit.study",a={section:document.querySelector("#popular-products"),viewport:document.querySelector("[data-popular-viewport]"),list:document.querySelector("[data-popular-list]"),pagination:document.querySelector("[data-popular-pagination]"),prevBtn:document.querySelector("[data-popular-prev]"),nextBtn:document.querySelector("[data-popular-next]")},o={products:[],currentPage:0,cardsPerPage:1,pagesCount:1};$e();async function $e(){if(!(!a.section||!a.viewport||!a.list||!a.pagination||!a.prevBtn||!a.nextBtn))try{ee(!0);const e=await Se();if(o.products=e,o.products.length<3){C("Популярних товарів поки недостатньо для відображення.");return}Te(o.products),Z(!0),qe()}catch(e){console.error("Popular products error:",e),C("Не вдалося завантажити популярні товари. Спробуйте пізніше.")}}async function Se(){const e=await fetch(ke);if(!e.ok)throw new Error(`Request failed with status ${e.status}`);const t=await e.json(),r=Ee(t);if(!r.length)throw new Error("Products array was not found in API response.");return r}function Ee(e){var r,s,n,i;return Array.isArray(e)?e:!e||typeof e!="object"?[]:[e.desserts,e.data,e.items,e.products,e.results,(r=e.data)==null?void 0:r.desserts,(s=e.data)==null?void 0:s.items,(n=e.data)==null?void 0:n.products,(i=e.data)==null?void 0:i.results].find(Array.isArray)||[]}function qe(){a.prevBtn.addEventListener("click",Me),a.nextBtn.addEventListener("click",Ae),a.pagination.addEventListener("click",Be),a.list.addEventListener("click",_e),window.addEventListener("resize",He(()=>{Z(!1)},150))}function Me(){o.currentPage<=0||(o.currentPage-=1,k())}function Ae(){o.currentPage>=o.pagesCount-1||(o.currentPage+=1,k())}function Be(e){const t=e.target.closest("[data-popular-page]");t&&(o.currentPage=Number(t.dataset.popularPage),k())}function _e(e){const t=e.target.closest("[data-dessert-id]");if(!t)return;const r=t.dataset.dessertId;r&&K(r)}function Z(e=!1){const t=o.cardsPerPage;o.cardsPerPage=Ce(),o.pagesCount=Math.ceil(o.products.length/o.cardsPerPage),t!==o.cardsPerPage&&(o.currentPage=0),o.currentPage>o.pagesCount-1&&(o.currentPage=o.pagesCount-1),je(),k(e)}function Ce(){return window.matchMedia("(min-width: 1440px)").matches?3:window.matchMedia("(min-width: 768px)").matches?2:1}function k(e=!1){const t=a.list.querySelector(".popular-products__item");if(!t)return;const r=getComputedStyle(a.list),s=parseFloat(r.columnGap||r.gap)||0,n=t.getBoundingClientRect().width,i=o.currentPage*o.cardsPerPage*(n+s);a.list.classList.toggle("is-not-animated",e),a.list.style.transform=`translateX(-${i}px)`,xe(),e&&requestAnimationFrame(()=>{a.list.classList.remove("is-not-animated")})}function xe(){const e=o.currentPage===0,t=o.currentPage>=o.pagesCount-1;a.prevBtn.disabled=e,a.nextBtn.disabled=t,a.prevBtn.classList.toggle("is-disabled",e),a.nextBtn.classList.toggle("is-disabled",t),a.pagination.querySelectorAll("[data-popular-page]").forEach((r,s)=>{const n=s===o.currentPage;r.classList.toggle("is-active",n),r.setAttribute("aria-current",n?"true":"false")})}function ee(e){a.prevBtn.disabled=e,a.nextBtn.disabled=e,a.prevBtn.classList.toggle("is-disabled",e),a.nextBtn.classList.toggle("is-disabled",e)}function Te(e){a.list.innerHTML=e.map(Ie).join("")}function Ie(e){const t=De(e),r=Oe(e),s=e.name||e.title||"Десерт",n=Re(e),i=e.description||e.text||"",l=Ne(e.price);return`
    <li class="popular-products__item">
      <article class="popular-products-card">
        <img
          class="popular-products-card__img"
          src="${p(r)}"
          alt="${p(s)}"
          loading="lazy"
        >

        <p class="popular-products-card__category">${p(n)}</p>

        <h3 class="popular-products-card__title">${p(s)}</h3>

        <p class="popular-products-card__descr">${p(i)}</p>

        <div class="popular-products-card__bottom">
          <p class="popular-products-card__price">${l}</p>

          <button
            class="popular-products-card__btn"
            type="button"
            data-dessert-id="${p(t)}"
            aria-label="Відкрити детальну інформацію про ${p(s)}"
            ${t?"":"disabled"}
          >
            <svg
              class="popular-products-card__btn-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </article>
    </li>
  `}function De(e){return e._id||e.id||e.objectId||""}function Re(e){const t=e.category||e.type;return typeof t=="string"?t:t&&typeof t=="object"&&(t.name||t.title||t.value||t.label||t.slug)||"Популярне"}function je(){a.pagination.innerHTML=Array.from({length:o.pagesCount},(e,t)=>`
      <li class="popular-products__pagination-item">
        <button
          class="popular-products__pagination-btn"
          type="button"
          data-popular-page="${t}"
          aria-label="Перейти до слайду ${t+1}"
        ></button>
      </li>
    `).join("")}function C(e){a.list.innerHTML=`
    <li class="popular-products__message">
      ${p(e)}
    </li>
  `,a.pagination.innerHTML="",ee(!0)}function Oe(e){const t=e.image||e.img||e.photo||e.thumb||e.picture||e.images;let r="";if(typeof t=="string"&&(r=t),Array.isArray(t)){const s=t[0];typeof s=="string"?r=s:s&&typeof s=="object"&&(r=s.url||s.src||"")}return t&&typeof t=="object"&&!Array.isArray(t)&&(r=t.desktop||t.tablet||t.mobile||t.url||t.src||Object.values(t).find(s=>typeof s=="string")||""),r.startsWith("/")?`${Pe}${r}`:r}function Ne(e){return typeof e=="number"?`${e} грн`:typeof e=="string"&&e.trim()?e.includes("грн")?p(e):`${p(e)} грн`:"Ціну уточнюйте"}function p(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function He(e,t){let r;return(...s)=>{clearTimeout(r),r=setTimeout(()=>e(...s),t)}}const Fe="https://deserts-store.b.goit.study/api/feedbacks?limit=10",c={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let $=null;Ue();async function Ue(){if(c.list)try{const e=await Ve();if(e.length<3){c.list.hidden=!1,c.list.innerHTML='<li class="feedback-message">Недостатньо відгуків для відображення.</li>';return}ze(e),c.list.hidden=!1,c.prevBtn.hidden=!1,c.nextBtn.hidden=!1,c.bottom.hidden=!1,Ke(),We()}catch(e){c.list.hidden=!1,c.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{c.loader.hidden=!0}}async function Ve(){const e=await fetch(Fe);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function ze(e){c.list.innerHTML=e.map(Ge).join("")}function Ge({_id:e,rate:t,description:r,author:s}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(t)}"
          aria-label="Оцінка ${Number(t)} з 5"
        ></div>
        <p class="feedback-review">"${r}"</p>
        <h3 class="feedback-author">${s}</h3>
      </article>
    </li>
  `}function Ke(){document.querySelectorAll(".feedback-rating").forEach(e=>{new R(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function We(){$&&$.destroy(!0,!0),$=new j(".feedback-swiper",{modules:[O,N,ne],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:c.prevBtn,nextEl:c.nextBtn},pagination:{el:c.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const x=document.querySelector(".faq-accordion");x&&new ae(x,{duration:400,showMultiple:!1,openOnInit:[]});let y=null;const te=window.matchMedia("(min-width: 768px)");function Ye(){const e=document.querySelector(".about-swiper");e&&(y=new j(e,{modules:[O,N],slidesPerView:2,slidesPerGroup:1,spaceBetween:24,speed:700,loop:!1,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".swiper-pagination",clickable:!0,type:"bullets"}}))}function re(){te.matches?y||Ye():y&&(y.destroy(!0,!0),y=null)}re();te.addEventListener("change",re);const T=document.querySelector("[data-current-year]");T&&(T.textContent=new Date().getFullYear());const I=document.querySelector(".burger-btn"),D=document.querySelector(".mob-menu-close"),P=document.querySelector(".mob-menu"),Je=document.querySelectorAll(".js-close-menu");I&&D&&P&&(I.addEventListener("click",Qe),D.addEventListener("click",E),Je.forEach(e=>{e.addEventListener("click",E)}),document.addEventListener("keydown",Xe));function Qe(){P.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}function E(){P.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}function Xe(e){e.key==="Escape"&&!P.classList.contains("is-hidden")&&E()}
//# sourceMappingURL=index.js.map
