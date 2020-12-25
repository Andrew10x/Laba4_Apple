import { create_catalog_page } from "./catalogPage.js";
import { create_bag_page } from "./bagPage.js";
import { send_order } from "./bagPage.js";
import { create_main_page } from "./mainPage.js";
import { create_category_page } from "./categoryPage.js";
import { create_product_page } from "./productPage.js";
import { create_add_page } from "./discountPage.js";



function router() {
    let hash = window.location.hash;
    let href_without_hash = window.location.href;
    href_without_hash = href_without_hash.replace(window.location.hash, '');
    let splittedHash = hash.split("/");

    if (splittedHash.length == 1) {
        if (splittedHash[0] == '#catalog') {
            set_loader();
            create_catalog_page();
        }
        else if (splittedHash[0] == '#bag') {
            set_loader();
            create_bag_page();
        }
        else if (splittedHash[0] == '') {
            set_loader();
            create_main_page();
        }
        else {
            window.location.href = href_without_hash;
            set_loader();
            create_main_page();
        }
    }
    else {
        if (splittedHash[0] == '#products') {
            set_loader();
            create_product_page(splittedHash[1]);
        }
        else if (splittedHash[0] == '#catalog') {
            set_loader();
            create_category_page(splittedHash[1]);
        }
        else if (splittedHash[0] == '#adds') {
            set_loader();
            create_add_page(splittedHash[1]);
        }
        else if (splittedHash[0] != '#order') {
            set_loader();
            window.location.hash = '';
        }
    }
}

function set_loader() {
    window.scrollTo(0, 0);
    let content = `<div class="loader">
    <img src="img/logo/apple_logo_PNG19673.png" class="img-loader" alt="image" />                
    </div>`
    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = content;
}

async function click_action(ev) {
    if (ev.target.classList.contains("cartBut")) {
        window.location.hash = '#bag'
    }
    else if (ev.target.classList.contains("add-but-pr")) {
        add_to_bag(ev.target.value);
    }
    else if (ev.target.classList.contains("p-m-but")) {
        change_quantity();
        create_bag_page();
    }
    else if (ev.target.classList.contains("buy-but")) {
       send_order();
    }

}

function add_to_bag(pr_url) {
    let bag = [];
    if (localStorage.getItem('bag') == null) {
        bag.push(
            {
                url: pr_url,
                count: 1
            });

        localStorage.setItem("bag", JSON.stringify(bag));
       update_bag();
    } else {
        bag = JSON.parse(localStorage.getItem("bag"));
        let exist = false;
        let index;
        for (let i = 0; i < bag.length; i++) {
            if (bag[i].url === pr_url) {
                exist = true;
                index = i;
            }
        }
        if (exist) {
            bag[index].count++;
        } else {
            bag.push({
                url: pr_url,
                count: 1
            })
        }
        localStorage.setItem("bag", JSON.stringify(bag));
        update_bag();
    }
}

function change_quantity() {
    let bag = JSON.parse(localStorage.getItem("bag"));
    if (event.target.innerText == "+" || event.target.innerText == "-") {
        let index = -1;
        for (let i = 0; i < bag.length; i++) {
            if (bag[i].url == event.target.value) {
                index = i;
            }
        }

        if (index == -1)
            return;

        if (event.target.innerText == "+")
            bag[index].count++;
        else {
            if (bag[index].count > 0)
            bag[index].count--;
            if (bag[index].count == 0) {
                bag.splice(index, 1);
            }
        }
    }
    localStorage.setItem("bag", JSON.stringify(bag));
    update_bag();
}


export function update_bag() {

    let count = document.getElementById("count");
    let bagCount = 0;

    if (localStorage.getItem("bag") === null) {
        count.innerText = "00";
        let totalPrice = document.getElementById("totalPrice");
        totalPrice.innerText = '';
        totalPrice.style.padding = "0";
        return;
    }
    let bag = JSON.parse(localStorage.getItem("bag"));
    for (let i = 0; i < bag.length; i++) {
        bagCount += bag[i].count;
    }
    if (bagCount > 9) {
        count.innerText = bagCount.toString();
    } else {
        count.innerText = "0" + bagCount;
    }
    show_price();
}

async function show_price() {
    let bag = JSON.parse(localStorage.getItem("bag"));
    let totalPrice = document.getElementById("totalPrice");
    if (bag.length === 0) {
        totalPrice.innerText = "";
        totalPrice.style.padding = "0";
        return;
    }
    let products = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple/products')
        .then(products => products.json());
    let price = 0;
    for (let i = 0; i < bag.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (products[j].url === bag[i].url) {
                price += products[j].price * bag[i].count;
            }
        }
    }
    totalPrice.innerText = `${price} грн`;
    totalPrice.style.paddingLeft = "10px";
    totalPrice.style.paddingRight = "10px";
}

function check_wrong_order() {
    let hash = window.location.hash;
    let splittedHash = hash.split("/");

    if (splittedHash[0] == '#order') {
        window.location.hash = '';
    }
}


window.addEventListener("load", router);
window.addEventListener("hashchange", router);
window.addEventListener("load", update_bag);
window.addEventListener("load", check_wrong_order);
window.addEventListener("click", click_action);