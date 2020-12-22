
export async function create_bag_page() {
    if (localStorage.getItem('bag') == null)
        return -1;
    //let bag0 = [{
    //    url: 'iPhoneXsMax64SpaceGray',
    //    count: 3
    //},
    //    {
    //        url: 'WatchSeries3Grey',
    //        count: 1
    //    },
    //    {
    //        url: 'iPadmini564SpaceGray',
    //        count: 10
    //    }
    //];
    //localStorage.setItem("bag", JSON.stringify(bag0));

    let content = `
        <div class="bag-grid">
            <div class="byer-inf">
                    <div class="client-contact-info">
                        <div class="contact-name">
                            <div class="placeholder">Ім'я</div>
                            <input id="name-input" placeholder="Ім'я">
                        </div>
                        <div class="contact-phone">
                            <div class="placeholder">Телефон</div>
                            <input id="phone-input" value="+380" type="tel" pattern="[+]380[0-9]{9}" placeholder="Телефон">
                        </div>
                        <div class="contact-email">
                            <div class="placeholder">Email</div>
                            <input id="email-input" type="email" placeholder="Email">
                        </div>
                    </div>
                    <div class="client-address">
                        <div class="client-house">
                            <div class="placeholder">Вулиця, дім</div>
                            <input id="house-input" placeholder="Вулиця, дім">
                        </div>
                        <div class="client-flatN">
                            <div class="placeholder">Квартира</div>
                            <input id="flatN-input" type="number" placeholder="Квартира">
                        </div>
                    </div>
                    <div class="buy">
                        <button class="buy-but">Buy</button>
                    </div>
            </div>
            <div>`;

    let bag = JSON.parse(localStorage.getItem('bag'));
    if (bag.length == 0)
        return -1;
    let sum_price = 0;
    let products = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple/products');
    if (products.ok) {
        products = await products.json();
    }
    else {
        console.log("Fetch error");
        return;
    }

    for (let i = 0; i < bag.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (bag[i].url === products[j].url) {
                content += `
                <div class="bag-product">
                    <img class="bag-img" src="${products[j].image}" />
                    <div class="bag-product-details">
                        <div class="bag-pr-name">${products[j].name}</div>
                        <div class="bag-pr-desc">${products[j].description}</div>
                        <div class="price1">${products[j].price} грн.</div>
                        <div class="plus-minus-cont">
                            <div class="plus-minus-button">
                                <button class="p-m-but" value="${products[j].url}">-</button>
                                <div class="count-product">${bag[i].count}</div>
                                <button class="p-m-but" value="${products[j].url}">+</button>
                            </div>
                        </div>
                    </div>
                </div>`;

                sum_price += products[j].price * bag[i].count;
            }
        }
    }

    content += `
        <div class="sum-price">Разом ${sum_price} грн.</div>
            </div>
        </div>`;

    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = content;
    return 1;
}

export async function update_bag_content() {
    create_bag_page();
}