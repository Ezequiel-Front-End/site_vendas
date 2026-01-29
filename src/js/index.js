// import { products } from "../model/products.js";

// let currentPage = 1;
// const perPage = 6;

// const productList = document.getElementById("product-list");
// const pageInfo = document.getElementById("page-info");
// const prevBtn = document.getElementById("prev");
// const nextBtn = document.getElementById("next");
// const checkboxes = document.querySelectorAll(".filter-checkbox");

// // função para filtrar produtos
// function getFilteredProducts() {
//     let filtered = [...products];

//     const checked = Array.from(checkboxes).filter(ch => ch.checked);
//     checked.forEach(ch => {
//         filtered = filtered.filter(p => p[ch.dataset.filterType] === ch.value);
//     });

//     return filtered;
// }

// // renderizar produtos com paginação
// function renderProducts() {
//     const filtered = getFilteredProducts();
//     const start = (currentPage - 1) * perPage;
//     const end = start + perPage;
//     const pageProducts = filtered.slice(start, end);

//     productList.innerHTML = "";

//     pageProducts.forEach(p => {
//         const div = document.createElement("div");
//         div.className = "col-xl-4 col-lg-6 col-md-6 col-sm-12 product-col";

//         div.innerHTML = `
//             <div class="product-card">
//                 <img src="${p.img[0]}" alt="${p.name}">
//                 <div class="body">
//                     <h5>${p.name}</h5>
//                     <p>${p.description}</p>
//                     <span class="price">${p.price}</span>
//                     <br>
//                     <button class="btn-view btn btn-primary mt-4" data-id="${p.id}">Ver produto</button>
//                 </div>
//             </div>
//         `;
//         productList.appendChild(div);
//     });

//     // adicionar event listener aos botões após renderizar
//     document.querySelectorAll(".btn-view").forEach(btn => {
//         btn.addEventListener("click", () => {
//             const productId = btn.dataset.id;
//             window.location.href = `/src/views/view_produtc.html?id=${productId}`;
//         });
//     });

//     const totalPages = Math.ceil(filtered.length / perPage);
//     pageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;
//     prevBtn.disabled = currentPage === 1;
//     nextBtn.disabled = currentPage === totalPages || totalPages === 0;
// }

// // eventos de paginação
// prevBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//         currentPage--;
//         renderProducts();
//     }
// });

// nextBtn.addEventListener("click", () => {
//     const totalPages = Math.ceil(getFilteredProducts().length / perPage);
//     if (currentPage < totalPages) {
//         currentPage++;
//         renderProducts();
//     }
// });

// // evento de filtro
// checkboxes.forEach(ch => {
//     ch.addEventListener("change", () => {
//         currentPage = 1; // voltar para página 1 ao filtrar
//         renderProducts();
//     });
// });

// // inicializa
// renderProducts();


import { products } from "../model/products.js";

let currentPage = 1;
const perPage = 6;

const productList = document.getElementById("product-list");
const pageInfo = document.getElementById("page-info");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const checkboxes = document.querySelectorAll(".filter-checkbox");

// ===============================
// FILTRO DE PRODUTOS
// ===============================
function getFilteredProducts() {
    let filtered = [...products];

    const checked = Array.from(checkboxes).filter(ch => ch.checked);
    checked.forEach(ch => {
        filtered = filtered.filter(p => p[ch.dataset.filterType] === ch.value);
    });

    return filtered;
}

// ===============================
// RENDERIZAÇÃO DE PRODUTOS COM PAGINAÇÃO
// ===============================
function renderProducts() {
    const filtered = getFilteredProducts();
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageProducts = filtered.slice(start, end);

    productList.innerHTML = "";

    pageProducts.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-xl-4 col-lg-6 col-md-6 col-sm-12 product-col";

        div.innerHTML = `
            <div class="product-card">
                <img src="${p.img[0]}" alt="${p.name}">
                <div class="body">
                    <h5>${p.name}</h5>
                    <p>${p.description}</p>
                    <span class="price">${p.price}</span>
                    <br>
                    <button class="btn-view btn btn-primary mt-4" data-id="${p.id}">Ver produto</button>
                </div>
            </div>
        `;
        productList.appendChild(div);
    });

    // adicionar event listener aos botões após renderizar
    document.querySelectorAll(".btn-view").forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.dataset.id;
            window.location.href = `/src/views/view_produtc.html?id=${productId}`;
        });
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    pageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// ===============================
// PAGINAÇÃO
// ===============================
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(getFilteredProducts().length / perPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
    }
});

// ===============================
// FILTRO
// ===============================
checkboxes.forEach(ch => {
    ch.addEventListener("change", () => {
        currentPage = 1; // voltar para página 1 ao filtrar
        renderProducts();
    });
});

// ===============================
// INICIALIZAÇÃO
// ===============================
renderProducts();

// ===============================
// CARRINHO (NAVBAR)
// ===============================
const cartButton = document.getElementById("cartButton");
const cartDropdown = document.getElementById("cart-dropdown");

cartButton.addEventListener("click", () => {
    cartDropdown.style.display =
        cartDropdown.style.display === "block" ? "none" : "block";
    renderCartDropdown();
});

// renderiza dropdown do carrinho
function renderCartDropdown() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartDropdown.innerHTML = "";

    if (cart.length === 0) {
        cartDropdown.innerHTML =
            `<div class="p-3 text-center">Nenhum item encontrado!</div>`;
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "p-2 border-bottom d-flex gap-2";

        div.innerHTML = `
            <img src="${item.imagem}" style="width:50px;height:50px;border-radius:5px;object-fit:cover;">
            <div style="flex:1">
                <strong>${item.nome}</strong>
                <p class="mb-1" style="font-size:13px;">${item.descricao}</p>
                <small>
                    <b>Cor:</b> ${item.cor} <br>
                    <b>Tamanho:</b> ${item.tamanho} <br>
                    <b>Qtd:</b> ${item.quantidade} <br>
                    <b>Preço:</b> ${item.preco}
                </small>
            </div>
            <button class="btn btn-sm btn-danger">X</button>
        `;

        div.querySelector("button").onclick = () => {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartDropdown();
        };

        cartDropdown.appendChild(div);
    });

    const btn = document.createElement("button");
    btn.className = "btn btn-success w-100 mt-2";
    btn.textContent = "Compra via WhatsApp";
    btn.onclick = finalizarPedidoWhatsapp;

    cartDropdown.appendChild(btn);
}

// ===============================
// FINALIZAR PEDIDO VIA WHATSAPP
// ===============================
function finalizarPedidoWhatsapp() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let msg = "🛒 *Pedido Loja Virtual* %0A%0A";

    cart.forEach((item, i) => {
        msg += `*${i + 1}. ${item.nome}*%0A`;
        msg += `Descrição: ${item.descricao}%0A`;
        msg += `Cor: ${item.cor}%0A`;
        msg += `Tam: ${item.tamanho}%0A`;
        msg += `Qtd: ${item.quantidade}%0A`;
        msg += `Preço: ${item.preco}%0A`;
        msg += `Imagem: ${item.imagem}%0A%0A`;
    });

    window.open(
        `https://api.whatsapp.com/send?phone=11983086176&text=${msg}`,
        "_blank"
    );
}
