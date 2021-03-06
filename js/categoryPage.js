﻿

export async function create_category_page(category_name) {

    const wrapper = document.getElementById('wrapper');
    window.scrollTo(0, 0);

    let content = "";

    let products = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple/products');
    let categories = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple/productsCategories');
    if (products.ok && categories.ok) {
        products = await products.json();
        categories = await categories.json();
    }
    else {
        console.log("Fetch error");
        return;
    }

    let index = -1;
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].url === category_name) {
            index = i;
            content += `
            <a href="#catalog/${categories[i].url}">
                <h2 class="category">${categories[i].name}</h2>
            </a>
                <div class="grid-container">`
            for (let j = 0; j < products.length; j++) {

            if (products[j].CategoryId === categories[i].id) {
                        content += `
            <div class="one-pr11">
                <img src="${products[j].image}" alt="image" />
                <a href='#products/${products[j].url}'>
                <p>${products[j].name}</p>
                </a>
                <div class="price-buy">
                <p class="price pr-price">${products[j].price} грн.</p>
                <button class="add-but-pr" value="${products[j].url}">Buy</button>
                </div>
            </div>`;
            }
        }
        content += '</div>';
        }
    }
    if (index === -1) {
        window.location.hash = '';
        return;
    }

    wrapper.innerHTML = content;
    return true;
}

//let category_name = 'AppleWatch';
//create_category_page(category_name);