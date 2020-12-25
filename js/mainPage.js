let slider_interval = '';

export async function create_main_page() {

    let adds = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple_orders/advertising');
    let products = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple/products');
    if (adds.ok && products.ok) {
        adds = await adds.json();
        products = await products.json();
    }
    else {
        console.log("Fetch error");
        return;
    }

    let content = `
        <div class="add-list">`;
    for (let i = 0; i < adds.length; i++) {
        content += `
        <div class="one-add">
        <a href="#adds/${adds[i].url}">
            <img src="${adds[i].image}" alt class="one-add-img" />
        </a>
        <div class="one-add-text">${adds[i].name}</div>
        </div>`
  }

    content += `
        </div>
        <div class="scroller">
        <ul class="scroller-buttons">
        <li><button class="scr-but sel-scr-but">0</button></li>`;

    for (let i = 0; i < adds.length - 1; i++) {
        content += `
            <li><button class="scr-but">${i+1}</button></li>`;
    }
    content += `
        </ul>
        </div>`;


    content += `
    <h2>Hit Products</h2>
        <div class="grid-container">`;

    for (let i = 0; i < products.length; i++) {
        if (products[i].hit) {
            content += `
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
        }
    }

    content += '</div>';
    const wrapper = document.getElementById('wrapper');

    wrapper.addEventListener('click', toggleDone);
    wrapper.innerHTML = content;
    slider_interval = setInterval(timeAnim, 6000);
}


function toggleDone(event) {
    if (!event.target.classList.contains("scr-but")) return;
    changeSelectedScrollerBut(event.target);
}

function changeSelectedScrollerBut(clicked) {
    let selected = document.querySelectorAll('.scr-but');
    for (let elem of selected) {
        elem.classList.remove("sel-scr-but");
    }
    clicked.classList.add("sel-scr-but")
    let list = document.querySelectorAll('.add-list')[0];
    list.style.transform = "translateX(" + (parseInt(clicked.innerText) * -32.5) + "%)"
}

function timeAnim() {
    let selected = document.querySelectorAll('.scr-but');
    for (let elem of selected) {
        if (elem.classList.contains("sel-scr-but")) {
            if (elem.innerText === "2") {
                selected[0].click();
                break;
            } else {
                selected[parseInt(elem.innerText) + 1].click();
                break;
            }
        }
    }
}

window.addEventListener("hashchange", del_slider_interval);

function del_slider_interval() {
    if (slider_interval != '') {
        clearInterval(slider_interval);
    }
}

//create_main_page();