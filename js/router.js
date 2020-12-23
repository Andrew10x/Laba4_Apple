import { create_catalog_page } from "./catalogPage.js";
import {create_bag_page} from "./bagPage.js";
import { create_main_page } from "./mainPage.js";
import { update_bag_content } from "./bagPage.js";
import { create_category_page } from "./categoryPage.js";
import { create_product_page} from "./productPage.js"



function router() {
    let hash = window.location.hash;
    let href_without_hash = window.location.href;
    href_without_hash = href_without_hash.replace(window.location.hash, '');
    let splittedHash = hash.split("/");

    if (splittedHash.length == 1) {
        if (splittedHash[0] == '#catalog') {
            create_catalog_page();
        }
        else if (splittedHash[0] == '#bag') {
            let res = create_bag_page();
            if (res == -1) {
                create_main_page();
                window.location.href = href_without_hash;
            }
        }
        else if (splittedHash[0] == '') {
            create_main_page();
        }
        else {
            window.location.href = href_without_hash;
            create_main_page();
        }
    }
<<<<<<< HEAD
    else {
        if (splittedHash[0] == '#products') {
            create_product_page(splittedHash[1]);
        }
    }
=======
>>>>>>> f0eabd1e92d4f15d1175e8aab7f9bdf132d17c60
}

async function click_action(ev) {
    if (ev.target.classList.contains("cartBut")) {
        window.location.hash = '#bag'
    }
<<<<<<< HEAD
    else if (ev.target.classList.contains("add-but-pr")) {
        add_to_bag(ev.target.value);
    }
=======
>>>>>>> f0eabd1e92d4f15d1175e8aab7f9bdf132d17c60
    else if (ev.target.classList.contains("p-m-but")) {
        change_quantity();
    }

}

<<<<<<< HEAD
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

=======
>>>>>>> f0eabd1e92d4f15d1175e8aab7f9bdf132d17c60
function change_quantity() {
    let bag = JSON.parse(localStorage.getItem("bag"));
    if (event.target.innerText == "+" || event.target.innerText == "-") {
        let index;
        for (let i = 0; i < bag.length; i++) {
            if (bag[i].url == event.target.value) {
                index = i;
            }
        }
        if (event.target.innerText == "+")
            bag[index].count++;
        else {
<<<<<<< HEAD
            if (bag[index].count > 0)
=======
>>>>>>> f0eabd1e92d4f15d1175e8aab7f9bdf132d17c60
            bag[index].count--;
            if (bag[index].count === 0) {
                bag.splice(index, 1);
            }
        }
    }
    localStorage.setItem("bag", JSON.stringify(bag));
    update_bag();
<<<<<<< HEAD
    if (update_bag_content() == -1)
        window.location.href = '';
}

function update_bag() {
    if (localStorage.getItem("bag") === null)
        return;
=======
    update_bag_content();
}

function update_bag() {
    if (localStorage.getItem("bag") === null) return;
>>>>>>> f0eabd1e92d4f15d1175e8aab7f9bdf132d17c60
    let bag = JSON.parse(localStorage.getItem("bag"));
    let count = document.getElementById("count");
    let bagCount = 0;
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




window.addEventListener("load", router);
window.addEventListener("hashchange", router);
window.addEventListener("load", update_bag);
window.addEventListener("click", click_action);