import{b as q,i as y,R as C,S as H,N as j,P as U,A as le,a as de}from"./assets/vendor-DRWxMa3B.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();async function ue(e){return(await q.get(`https://deserts-store.b.goit.study/api/desserts/${e}`)).data}function pe({name:e,description:t,composition:n,price:i,rate:r,image:o}){return`<div class="modal-inner" data-modal-inner><img class="dessert-details-img" src="${o}" alt="${e}"/>
    <div class="modal-text"><h3 class="dessert-details-title">${e}</h3>
    <p class="price">${i} грн</p>
    <div class="rating" data-rating="${r}"></div>
    <p class="description">${t}</p>
    <p class="composition"><strong>Склад:</strong> ${n}</p><button class="order-btn" data-order-btn disabled>Перейти до замовлення</button></div>
    </div>

  `}const V=document.querySelector("[data-loader]");function fe(){V.classList.remove("is-hidden")}function me(){V.classList.add("is-hidden")}const ge="https://deserts-store.b.goit.study/api/orders",p=document.querySelector("[data-order-backdrop]"),m=document.querySelector("[data-order-close]"),l=document.querySelector("[data-order-form]");let F=null,E=!1;function be(e){y.success({title:"Успіх",message:`Замовлення №${e} успішно створено!`,position:"topRight",timeout:4e3})}function z(e){y.error({title:"Помилка",message:e,position:"topRight",timeout:5e3})}function ye(e){if(p){if(!e){z("Не вдалося визначити десерт для замовлення.");return}F=e,p.classList.remove("is-hidden"),document.body.classList.add("modal-open"),he()}}function v(){p&&(p.classList.add("is-hidden"),document.body.classList.remove("modal-open"),ve())}function he(){E||(m==null||m.addEventListener("click",v),p==null||p.addEventListener("click",G),l==null||l.addEventListener("submit",K),document.addEventListener("keydown",X),E=!0)}function ve(){E&&(m==null||m.removeEventListener("click",v),p==null||p.removeEventListener("click",G),l==null||l.removeEventListener("submit",K),document.removeEventListener("keydown",X),E=!1)}function X(e){e.key==="Escape"&&v()}function G(e){e.target===e.currentTarget&&v()}async function K(e){var r,o;if(e.preventDefault(),!l.checkValidity()){l.reportValidity();return}const t=l.querySelector(".order-form-submit"),n=new FormData(l),i={name:n.get("name").trim(),phone:n.get("phone").trim(),dessertId:F,comment:n.get("comment").trim()};try{t&&(t.disabled=!0);const c=await q.post(ge,i);be(c.data.orderNum),l.reset(),v()}catch(c){const ce=((o=(r=c.response)==null?void 0:r.data)==null?void 0:o.message)||"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.";z(ce),console.error(c)}finally{t&&(t.disabled=!1)}}const d={inner:document.querySelector("[data-modal-inner]"),backdrop:document.querySelector("[data-modal]"),content:document.querySelector("[data-modal-content]"),closeBtn:document.querySelector("[data-modal-close]")};function Le(){const e=d.content.querySelector(".rating");if(!e)return;const t=Number(e.dataset.rating);new C(e,{starType:"i",readOnly:!0,score:t,halfShow:!0,space:!0,hints:["1","2","3","4","5"]}).init()}async function W(e){d.backdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",we(),d.content.innerHTML="",fe();try{const t=await ue(e);d.content.innerHTML=pe(t),Le();const n=document.querySelector(".order-btn");n.disabled=!1,n.addEventListener("click",()=>{n.disabled=!0,L(),ye(e)})}catch{y.error({title:"Error",message:"Illegal operation"})}finally{me()}}function L(){d.backdrop.classList.add("is-hidden"),document.body.style.overflow="",d.content.innerHTML="",ke()}function Y(e){e.key==="Escape"&&L()}function J(e){e.target===d.backdrop&&L()}function we(){d.closeBtn.addEventListener("click",L),d.backdrop.addEventListener("click",J),document.addEventListener("keydown",Y)}function ke(){d.closeBtn.removeEventListener("click",L),d.backdrop.removeEventListener("click",J),document.removeEventListener("keydown",Y)}const Q="/team-project-04/assets/icons-BoSAtLQJ.svg",x=document.querySelector(".desserts-list"),B=document.querySelector(".load-more-btn"),R=document.querySelector(".loader"),Z=document.querySelector(".categories-list-desktop"),T=document.querySelector(".categories-list-tablet");let $=1,b="";B.addEventListener("click",$e);T.addEventListener("change",async e=>{b=e.target.value;const t=document.querySelector(`input[name="dessert"][value="${b}"]`);t&&(t.checked=!0),await ee()});Z.addEventListener("change",async e=>{e.target.name==="dessert"&&(b=e.target.value,T.value=b,await ee())});x.addEventListener("click",async e=>{const t=e.target.closest(".desserts-item-btn");if(!t)return;const n=t.dataset.id;await W(n)});async function ee(){$=1,x.innerHTML="",await D()}async function te(e){const{data:t}=await q(`https://deserts-store.b.goit.study/api/${e}`);return t}te("categories").then(e=>{Se(e)}).catch(e=>{y.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})});function Se(e){Z.innerHTML=`<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${e.map(({_id:t,name:n})=>`
     <input type="radio" name="dessert" value="${t}" id="${t}">
     <label for="${t}">${n}</label>`).join("")}`,T.innerHTML=`
        <option value="">Всі десерти</option>

     ${e.map(({_id:t,name:n})=>`
       <option value="${t}">${n}</option>`).join("")}`}D();function Ee(e){return e.map(({_id:t,name:n,image:i,description:r,price:o,category:{name:c}})=>`
        <li class="dessert-list-item">
            <img src="${i}"
                alt="${n}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${c}</p>
            <h3 class="desserts-item-title">${n}</h3>
            <p class="desserts-item-descr">${r}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${o} грн</p>
                <button class="desserts-item-btn" data-id="${t}">
                    <svg height="24" width="24">
                        <use href="${Q}#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `).join("")}async function $e(){$++,await D()}async function D(){B.classList.add("hidden"),R.classList.remove("hidden");try{let e=`desserts?page=${$}&limit=8`;b&&(e+=`&category=${b}`);const t=await te(e);x.insertAdjacentHTML("beforeend",Ee(t.desserts)),t.totalItems>$*t.limit&&B.classList.remove("hidden")}catch{y.error({title:"Помилка",message:"Щось пішло не так, спробуйте пізніше",position:"topRight"})}finally{R.classList.add("hidden")}}const qe="https://deserts-store.b.goit.study/api",s={list:document.querySelector("[data-popular-list]"),viewport:document.querySelector("[data-popular-viewport]"),prevBtn:document.querySelector("[data-popular-prev]"),nextBtn:document.querySelector("[data-popular-next]"),pagination:document.querySelector("[data-popular-pagination]")};let S=[],u=0,k=1,g=0;Pe();async function Pe(){if(!(!s.list||!s.viewport||!s.prevBtn||!s.nextBtn||!s.pagination))try{if(S=await Me(),!S.length){s.list.innerHTML=`
        <li class="popular-products__empty">
          Популярні товари не знайдено
        </li>
      `,s.prevBtn.disabled=!0,s.nextBtn.disabled=!0,s.pagination.innerHTML="";return}ne(),Ae(S),ie(),w(),s.prevBtn.addEventListener("click",se),s.nextBtn.addEventListener("click",re),s.pagination.addEventListener("click",He),s.list.addEventListener("click",Te),window.addEventListener("resize",Ue),Ve()}catch(e){console.error("POPULAR PRODUCTS ERROR:",e),y.error({title:"Помилка",message:"Не вдалося завантажити популярні товари",position:"topRight"}),s.list.innerHTML=`
      <li class="popular-products__empty">
        Не вдалося завантажити популярні товари
      </li>
    `,s.prevBtn.disabled=!0,s.nextBtn.disabled=!0,s.pagination.innerHTML=""}}async function Me(){const{data:e}=await q(`${qe}/desserts?type=popular`);return Be(e)}function Be(e){return Array.isArray(e)?e:e.desserts||e.data||e.results||e.items||[]}function Ae(e){s.list.innerHTML=e.map(xe).join("")}function xe(e){const t=De(e),n=Re(e),i=_e(e),r=Ie(e),o=Ne(e),c=Oe(e.price);return`
    <li class="popular-products__item">
      <article class="dessert-list-item">
        <img
          src="${f(o)}"
          alt="${f(n)}"
          class="desserts-list-img"
          loading="lazy"
        >

        <p class="desserts-item-categorie">${f(i)}</p>

        <h3 class="desserts-item-title">${f(n)}</h3>

        <p class="desserts-item-descr">${f(r)}</p>

        <div class="dessert-card-bottom">
          <p class="desserts-item-price">${f(c)}</p>

          <button
            class="desserts-item-btn"
            type="button"
            data-id="${f(t)}"
            aria-label="Відкрити деталі товару ${f(n)}"
          >
            <svg height="24" width="24">
              <use href="${Q}#icon-arrow-outward"></use>
            </svg>
          </button>
        </div>
      </article>
    </li>
  `}async function Te(e){const t=e.target.closest(".desserts-item-btn");if(!t)return;const n=t.dataset.id;n&&await W(n)}function De(e){return e._id||e.id||""}function Re(e){return e.name||e.title||"Десерт"}function _e(e){const t=e.category||e.type||e.categoryName;return t?typeof t=="string"?t:typeof t=="object"&&(t.name||t.title||t.value||t.label||t.slug)||"Десерти":"Десерти"}function Ie(e){return e.description||e.shortDescription||e.text||"Соковитий десерт з натуральними інгредієнтами."}function Ne(e){const t=e.image||e.img||e.preview||e.photo||e.imageUrl||e.thumbnail||"";return typeof t=="string"?t:typeof t=="object"&&t!==null&&(t.url||t.src||t.path||t.medium||t.large)||""}function Oe(e){if(e==null||e==="")return"";if(typeof e=="object"){const t=e.value||e.amount||"";return t?`${t} грн`:""}return`${e} грн`}function ne(){const e=window.innerWidth;e>=1440?k=3:e>=768?k=2:k=1,g=Math.max(S.length-k,0),u>g&&(u=g)}function w(){const e=s.list.querySelector(".popular-products__item");if(!e)return;const t=e.getBoundingClientRect().width,n=Ce(s.list),i=u*(t+n);s.list.style.transform=`translateX(-${i}px)`,s.prevBtn.disabled=u===0,s.nextBtn.disabled=u===g,je()}function Ce(e){const t=window.getComputedStyle(e);return parseFloat(t.columnGap||t.gap)||0}function se(){u!==0&&(u-=1,w())}function re(){u!==g&&(u+=1,w())}function ie(){const e=g+1;s.pagination.innerHTML=Array.from({length:e},(t,n)=>`
      <li class="popular-products__pagination-item">
        <button
          class="popular-products__pagination-btn"
          type="button"
          data-popular-page="${n}"
          aria-label="Перейти до слайду ${n+1}"
        ></button>
      </li>
    `).join("")}function He(e){const t=e.target.closest("[data-popular-page]");t&&(u=Number(t.dataset.popularPage),w())}function je(){s.pagination.querySelectorAll("[data-popular-page]").forEach((t,n)=>{t.classList.toggle("popular-products__pagination-btn--active",n===u)})}function Ue(){ne(),ie(),w()}function Ve(){let e=0,t=0,n=!1;s.viewport.addEventListener("touchstart",i=>{e=i.touches[0].clientX,t=e,n=!0}),s.viewport.addEventListener("touchmove",i=>{n&&(t=i.touches[0].clientX)}),s.viewport.addEventListener("touchend",()=>{if(!n)return;const i=e-t;Math.abs(i)>=50&&(i>0?re():se()),e=0,t=0,n=!1})}function f(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Fe="https://deserts-store.b.goit.study/api/feedbacks?limit=10",a={list:document.querySelector(".feedback-list"),loader:document.querySelector(".feedback-loader-wrap"),prevBtn:document.querySelector(".feedback-nav-prev"),nextBtn:document.querySelector(".feedback-nav-next"),bottom:document.querySelector(".feedback-bottom"),pagination:document.querySelector(".feedback-pagination")};let M=null;ze();async function ze(){if(a.list)try{const e=await Xe();if(e.length<3){a.list.hidden=!1,a.list.innerHTML='<li class="feedback-message">Недостатньо відгуків для відображення.</li>';return}Ge(e),a.list.hidden=!1,a.prevBtn.hidden=!1,a.nextBtn.hidden=!1,a.bottom.hidden=!1,We(),Ye()}catch(e){a.list.hidden=!1,a.list.innerHTML='<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>',console.error(e)}finally{a.loader.hidden=!0}}async function Xe(){const e=await fetch(Fe);if(!e.ok)throw new Error(`Feedback request failed: ${e.status}`);return((await e.json()).feedbacks||[]).slice(0,10)}function Ge(e){a.list.innerHTML=e.map(Ke).join("")}function Ke({_id:e,rate:t,description:n,author:i}){return`
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(t)}"
          aria-label="Оцінка ${Number(t)} з 5"
        ></div>
        <p class="feedback-review">"${n}"</p>
        <h3 class="feedback-author">${i}</h3>
      </article>
    </li>
  `}function We(){document.querySelectorAll(".feedback-rating").forEach(e=>{new C(e,{score:Number(e.dataset.rating),readOnly:!0,halfShow:!0,starType:"i",space:!1,hints:["1","2","3","4","5"]}).init()})}function Ye(){M&&M.destroy(!0,!0),M=new H(".feedback-swiper",{modules:[j,U,le],slidesPerView:1,spaceBetween:24,speed:500,grabCursor:!0,navigation:{prevEl:a.prevBtn,nextEl:a.nextBtn},pagination:{el:a.pagination,clickable:!0,bulletClass:"feedback-pagination-bullet",bulletActiveClass:"feedback-pagination-bullet-active",renderBullet(e,t){return`<button class="${t}" type="button" aria-label="Перейти до відгуку ${e+1}"></button>`}},a11y:{prevSlideMessage:"Попередній відгук",nextSlideMessage:"Наступний відгук",paginationBulletMessage:"Перейти до відгуку {{index}}"},breakpoints:{768:{slidesPerView:3,spaceBetween:22},1440:{slidesPerView:3,spaceBetween:24}}})}const _=document.querySelector(".faq-accordion");_&&new de(_,{duration:400,showMultiple:!1,openOnInit:[]});let h=null;const oe=window.matchMedia("(min-width: 768px)");function Je(){const e=document.querySelector(".about-swiper");e&&(h=new H(e,{modules:[j,U],slidesPerView:2,slidesPerGroup:1,spaceBetween:24,speed:700,loop:!1,navigation:{nextEl:".about-btn-next",prevEl:".about-btn-prev"},pagination:{el:".swiper-pagination",clickable:!0,type:"bullets"}}))}function ae(){oe.matches?h||Je():h&&(h.destroy(!0,!0),h=null)}ae();oe.addEventListener("change",ae);const I=document.querySelector("[data-current-year]");I&&(I.textContent=new Date().getFullYear());const N=document.querySelector(".burger-btn"),O=document.querySelector(".mob-menu-close"),P=document.querySelector(".mob-menu"),Qe=document.querySelectorAll(".js-close-menu");N&&O&&P&&(N.addEventListener("click",Ze),O.addEventListener("click",A),Qe.forEach(e=>{e.addEventListener("click",A)}),document.addEventListener("keydown",et));function Ze(){P.classList.remove("is-hidden"),document.body.classList.add("no-scroll")}function A(){P.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}function et(e){e.key==="Escape"&&!P.classList.contains("is-hidden")&&A()}
//# sourceMappingURL=index.js.map
