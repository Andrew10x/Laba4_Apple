

export async function create_main_page() {
    let content = `
    <h2>Hit Products</h2>
        <div class="grid-container">`;

    let products = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple/products');
    if (products.ok) {
        products = await products.json();
    }
    else {
        console.log("Fetch error");
        return;
    }

    for (let i = 0; i < products.length; i++) {
        if (products[i].hit) {
            content += `
<<<<<<< HEAD
            <div class="one-pr11">
                <img src="${products[i].image}" alt="image" />
                <a href='#products/${products[i].url}'>
                <p>${products[i].name}</p>
                </a>
                <div class="price-buy">
                <p class="price pr-price">${products[i].price} грн.</p>
                <button class="add-but-pr" value="${products[i].url}">Buy</button>
                </div>
            </div>`;
=======
            <a href='#products/${products[i].url}'>
                <img src="${products[i].image}" alt="image" />
                <p>${products[i].name}</p>
                <div class="price-buy">
                <p class="price pr-price">${products[i].price} грн.</p>
                <button class="add-but-pr" value="products[i].url">Buy</button>
                </div>
            </a>`;
>>>>>>> f0eabd1e92d4f15d1175e8aab7f9bdf132d17c60
        }
    }

    content += '</div>';
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = content;
}

//create_main_page();