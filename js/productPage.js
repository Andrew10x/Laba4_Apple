export async function create_product_page(product_url) {

    let products = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple/products');
    if (products.ok) {
        products = await products.json();
    }
    else {
        console.log("Fetch error");
        return false;
    }

    let content = '';
    let index = -1;
    for (let i = 0; i < products.length; i++) {
        if (products[i].url === product_url) {
            index = i;
            content += `
            <div class="product-grid">
            <img class="one-product-img" src="${products[i].image}" alt="image"/>
            <div class="product-details">
                    <p class="one-product-p">${products[i].name}</p>
                    <div>${products[i].description}</div>
                    <div class="price-and-button">
                        <p class="one-product-price" >${products[i].price} грн.</p>
                        <button class="add-but-pr" value="${products[i].url}">Add to bag</button>
                    </div>
                 </div>
            </div>`;
            break;
        }
    }
    if (index === -1) {
        window.location.hash = '';
        return;
    }

    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = content;
}



//create_product_page('WatchSeries6Red');