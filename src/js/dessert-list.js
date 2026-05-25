import axios from "axios";
import iziToast from "izitoast"; 

import "izitoast/dist/css/iziToast.min.css";

// import { openModal } from "./details-modal.js"

const dessertsList = document.querySelector(".desserts-list");
const loadMoreBtn = document.querySelector(".load-more-btn");
const loader = document.querySelector(".loader");
const categoriesListDesktop = document.querySelector(".categories-list-desktop");
const categoriesListTablet = document.querySelector(".categories-list-tablet");

let page = 1;
let currentCategory = ""


loadMoreBtn.addEventListener("click", onLoadMore)

categoriesListTablet.addEventListener("change", async (event) => {
    currentCategory = event.target.value;
    await resetAndLoadDesserts();
})

categoriesListDesktop.addEventListener("change", async (event) => {
    if (event.target.name !== "dessert") return;
    currentCategory = event.target.value;
    await resetAndLoadDesserts();
});

dessertsList.addEventListener("click", async (e) => {
    const button = e.target.closest(".desserts-item-btn");
    if (!button) return;
    
    const dessertId = button.dataset.id;

    // await openModal(dessertId);
});


async function resetAndLoadDesserts() {
    page = 1;
    dessertsList.innerHTML = "";
    await loadDesserts();
}



async function fetchDessertsData(endpoint) {
    const { data } = await axios(`https://deserts-store.b.goit.study/api/${endpoint}`)
    return data;
}


fetchDessertsData("categories")
    .then(data => {
        createCategoriesMarkup(data)
    })
    .catch(error => {
        iziToast.error({
            title: "Помилка",
            message: "Щось пішло не так, спробуйте пізніше",
            position: "topRight",
        });;
    });

function createCategoriesMarkup(arr) {
    categoriesListDesktop.innerHTML = 
    `<input type="radio" name="dessert" value="" id="all" checked>
     <label for="all">Всі десерти</label>

    ${arr.map(({ _id, name }) => `
     <input type="radio" name="dessert" value="${_id}" id="${_id}">
     <label for="${_id}">${name}</label>`
     ).join("")}`
    
    categoriesListTablet.innerHTML = `
        <option value="">Всі десерти</option>

     ${arr.map(({ _id, name }) =>`
       <option value="${_id}">${name}</option>`
      ).join("")}`
}

loadDesserts();


function createDessertsMarkup(arr) {
    return arr.map(({ _id, name, image, description, price, category: { name: categoryName } }) =>
        `
        <li class="dessert-list-item">
            <img src="${image}"
                alt="${name}"
                class="desserts-list-img">
            <p class="desserts-item-categorie">${categoryName}</p>
            <h3 class="desserts-item-title">${name}</h3>
            <p class="desserts-item-descr">${description}</p>
            <div class="dessert-card-bottom">
                <p class="desserts-item-price">${price} грн</p>
                <button class="desserts-item-btn" data-id="${_id}">
                    <svg height="24" width="24">
                        <use href="/img/icons.svg#icon-arrow-outward"></use>
                    </svg>
                </button>
            </div>
        </li>
        
        `
    ).join("")
}

async function onLoadMore() {
    page++;
    await loadDesserts();
}

async function loadDesserts() {
    loadMoreBtn.classList.add("hidden");
    loader.classList.remove("hidden");

    try {
        let query = `desserts?page=${page}&limit=8`;

        if (currentCategory) {
            query += `&category=${currentCategory}`;
        }

        const data = await fetchDessertsData(query);

        dessertsList.insertAdjacentHTML(
            "beforeend",
            createDessertsMarkup(data.desserts)
        );

        if (data.totalItems > page * data.limit) {
            loadMoreBtn.classList.remove("hidden");
        }

    } catch (error) {
        iziToast.error({
            title: "Помилка",
            message: "Щось пішло не так, спробуйте пізніше",
            position: "topRight",
        });
    } finally {
        loader.classList.add("hidden");
    }
}


