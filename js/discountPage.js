
async function create_add_page(page_url) {

    let adds = await fetch('https://my-json-server.typicode.com/Andrew10x/Laba4_Apple_orders/advertising');
    if (adds.ok) {
        adds = await adds.json();
    }
    else {
        console.log("Fetch error");
        window.location.hash = '';
        return;
    }

    let content = '';

    for (let i = 0; i < adds.length; i++) {
        if (page_url == adds[i].url) {
            content += `
            <div class="adv-container">
            <img class="adv-image" src="${adds[i].image}" alt="image" />
            <div class="adv-name-and-desc">
                <div class="adv-name">${adds[i].name}</div>
                <div class="adv-description">${adds[i].description}</div>
            </div>
        </div>`
            break;
        }
    }

    if (content == '') {
        window.location.hash = '';
        return;
    }

    const wrapper = document.getElementById('wrapper');
    wrapper.innerHTML = content;
}