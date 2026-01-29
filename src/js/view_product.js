// // Importa os produtos
// import { products } from "../model/products.js";

// /* ===============================
//    PRODUTO
// ================================= */
// function getProductIdFromURL() {
//     const params = new URLSearchParams(window.location.search);
//     return parseInt(params.get("id"));
// }

// const productId = getProductIdFromURL();
// const product = products.find(p => p.id === productId);

// if (!product) {
//     alert("Produto não encontrado!");
// } else {
//     const imgs = document.querySelectorAll(".col-lg-8 img");
//     const nameEl = document.querySelector(".col-lg-4 h2");
//     const priceEl = document.querySelector(".col-lg-4 h4");
//     const descEl = document.querySelector(".col-lg-4 p");
//     const rightCol = document.querySelector(".col-lg-4");
//     const addBtn = document.querySelector(".col-lg-4 .btn-success");

//     const colorsContainer = document.createElement("div");
//     const sizesContainer = document.createElement("div");

//     let quantity = 1;
//     let selectedColor = null;
//     let selectedSize = null;

//     /* Quantidade */
//     const quantityContainer = document.createElement("div");
//     quantityContainer.className = "mb-3";
//     quantityContainer.innerHTML = `
//         <h5 class="mt-3">Quantidade</h5>
//         <div class="d-flex align-items-center gap-2">
//             <button id="decreaseQty" class="btn btn-outline-secondary">-</button>
//             <span id="quantityValue">1</span>
//             <button id="increaseQty" class="btn btn-outline-secondary">+</button>
//         </div>
//     `;
//     rightCol.insertBefore(quantityContainer, addBtn);

//     const quantityValueEl = document.getElementById("quantityValue");

//     /* Imagens */
//     imgs.forEach((img, i) => {
//         img.src = product.img[i] || "https://via.placeholder.com/300";
//         img.alt = product.name;
//     });

//     nameEl.textContent = product.name;
//     priceEl.textContent = product.price;
//     descEl.textContent = product.description;

//     /* Cores */
//     rightCol.insertBefore(colorsContainer, quantityContainer);
//     colorsContainer.className = "d-flex gap-2 mt-3";

//     product.cor.forEach(c => {
//     const btn = document.createElement("button");

//     btn.dataset.color = c.nome; // 🔥 ISSO É O QUE FALTAVA
//     btn.style.width = "40px";
//     btn.style.height = "40px";
//     btn.style.borderRadius = "50%";
//     btn.style.backgroundColor = c.rgb;
//     btn.style.border = "2px solid #ccc";
//     btn.style.cursor = "pointer";

//     btn.addEventListener("click", () => {
//         selectedColor = c.nome;
//         updateSelection();
//     });

//     colorsContainer.appendChild(btn);
// });


//     /* Tamanhos */
//     rightCol.insertBefore(sizesContainer, quantityContainer);
//     sizesContainer.className = "d-flex gap-2 mt-3";

//     product.tamanho.forEach(t => {
//         const btn = document.createElement("button");
//         btn.textContent = t;
//         btn.style.cssText = `
//             width:40px;height:40px;border-radius:50%;
//             border:2px solid #ccc;background:#fff;
//         `;
//         btn.onclick = () => {
//             selectedSize = t;
//             updateSelection();
//         };
//         sizesContainer.appendChild(btn);
//     });

//    function updateSelection() {
//     // === CORES ===
//     [...colorsContainer.children].forEach(btn => {
//         if (btn.dataset.color === selectedColor) {
//             btn.style.border = "3px solid #000";
//             btn.style.boxShadow = "0 0 0 2px rgba(0,0,0,0.2)";
//         } else {
//             btn.style.border = "2px solid #ccc";
//             btn.style.boxShadow = "none";
//         }
//     });

//     // === TAMANHOS ===
//     [...sizesContainer.children].forEach(btn => {
//         if (btn.textContent === selectedSize) {
//             btn.style.border = "3px solid #000";
//             btn.style.backgroundColor = "#f8f9fa";
//             btn.style.fontWeight = "bold";
//         } else {
//             btn.style.border = "2px solid #ccc";
//             btn.style.backgroundColor = "#fff";
//             btn.style.fontWeight = "normal";
//         }
//     });

//     // === BOTÃO ===
//     addBtn.disabled = !(selectedColor && selectedSize && quantity > 0);
// }


//     document.getElementById("increaseQty").onclick = () => {
//         quantity++;
//         quantityValueEl.textContent = quantity;
//         updateSelection();
//     };

//     document.getElementById("decreaseQty").onclick = () => {
//         if (quantity > 1) quantity--;
//         quantityValueEl.textContent = quantity;
//         updateSelection();
//     };

//     addBtn.disabled = true;

//     /* Adicionar ao carrinho */
//     addBtn.onclick = () => {
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];

//         cart.push({
//             id: product.id,
//             nome: product.name,
//             cor: selectedColor,
//             tamanho: selectedSize,
//             quantidade: quantity,
//             preco: product.price,
//             imagem: product.img[0]
//         });

//         localStorage.setItem("cart", JSON.stringify(cart));
//         renderCartDropdown();
//         alert("Produto adicionado ao carrinho!");
//     };
// }

// /* ===============================
//    CARRINHO (NAVBAR)
// ================================= */
// const cartButton = document.getElementById("cartButton");
// const cartDropdown = document.getElementById("cart-dropdown");

// cartButton.addEventListener("click", () => {
//     cartDropdown.style.display =
//         cartDropdown.style.display === "block" ? "none" : "block";
//     renderCartDropdown();
// });



// function renderCartDropdown() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cartDropdown.innerHTML = "";

//     if (cart.length === 0) {
//         cartDropdown.innerHTML =
//             `<div class="p-3 text-center">Nenhum item encontrado!</div>`;
//         return;
//     }

//     cart.forEach((item, index) => {
//         const div = document.createElement("div");
//         div.className = "d-flex gap-2 p-2 border-bottom";

//         div.innerHTML = `
//             <img src="${item.imagem}" style="width:45px;height:45px;border-radius:5px;">
//             <div style="flex:1">
//                 <strong>${item.nome}</strong><br>
//                 <small>Qtd: ${item.quantidade}</small>
//             </div>
//             <button class="btn btn-sm btn-danger">X</button>
//         `;

//         div.querySelector("button").onclick = () => {
//             cart.splice(index, 1);
//             localStorage.setItem("cart", JSON.stringify(cart));
//             renderCartDropdown();
//         };

//         cartDropdown.appendChild(div);
//     });

//     const btn = document.createElement("button");
//     btn.className = "btn btn-success w-100 mt-2";
//     btn.textContent = "Compra via WhatsApp";
//     btn.onclick = finalizarPedidoWhatsapp;

//     cartDropdown.appendChild(btn);
// }

// /* ===============================
//    WHATSAPP
// ================================= */
// function finalizarPedidoWhatsapp() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     if (cart.length === 0) return;

//     let msg = "🛒 *Pedido Loja Virtual* %0A%0A";
//     cart.forEach((item, i) => {
//         msg += `*${i + 1}. ${item.nome}*%0A`;
//         msg += `Cor: ${item.cor}%0A`;
//         msg += `Tam: ${item.tamanho}%0A`;
//         msg += `Qtd: ${item.quantidade}%0A`;
//         msg += `Preço: ${item.preco}%0A`;
//         msg += `Imagem: ${item.imagem}%0A%0A`;
//     });

//     window.open(
//         `https://api.whatsapp.com/send?phone=11958528278&text=${msg}`,
//         "_blank"
//     );
// }

// Importa os produtos
import { products } from "../model/products.js"

/* ===============================
   PRODUTO
================================= */
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

const productId = getProductIdFromURL();
const product = products.find(p => p.id === productId);

if (!product) {
    alert("Produto não encontrado!");
} else {
    const imgs = document.querySelectorAll(".col-lg-8 img");
    const nameEl = document.querySelector(".col-lg-4 h2");
    const priceEl = document.querySelector(".col-lg-4 h4");
    const descEl = document.querySelector(".col-lg-4 p");
    const rightCol = document.querySelector(".col-lg-4");
    const addBtn = document.querySelector(".col-lg-4 .btn-success");

    const colorsContainer = document.createElement("div");
    const sizesContainer = document.createElement("div");

    let quantity = 1;
    let selectedColor = null;
    let selectedSize = null;

    /* Quantidade */
    const quantityContainer = document.createElement("div");
    quantityContainer.className = "mb-3";
    quantityContainer.innerHTML = `
        <h5 class="mt-3">Quantidade</h5>
        <div class="d-flex align-items-center gap-2">
            <button id="decreaseQty" class="btn btn-outline-secondary">-</button>
            <span id="quantityValue">1</span>
            <button id="increaseQty" class="btn btn-outline-secondary">+</button>
        </div>
    `;
    rightCol.insertBefore(quantityContainer, addBtn);

    const quantityValueEl = document.getElementById("quantityValue");

    /* Imagens */
    imgs.forEach((img, i) => {
        img.src = product.img[i] || "https://via.placeholder.com/300";
        img.alt = product.name;
    });

    nameEl.textContent = product.name;
    priceEl.textContent = product.price;
    descEl.textContent = product.description;

    /* Cores */
    rightCol.insertBefore(colorsContainer, quantityContainer);
    colorsContainer.className = "d-flex gap-2 mt-3";

    product.cor.forEach(c => {
        const btn = document.createElement("button");

        btn.dataset.color = c.nome; // 🔥 ESSENCIAL PARA IDENTIFICAR A COR
        btn.style.width = "40px";
        btn.style.height = "40px";
        btn.style.borderRadius = "50%";
        btn.style.backgroundColor = c.rgb;
        btn.style.border = "2px solid #ccc";
        btn.style.cursor = "pointer";

        btn.addEventListener("click", () => {
            selectedColor = c.nome;
            updateSelection();
        });

        colorsContainer.appendChild(btn);
    });

    /* Tamanhos */
    rightCol.insertBefore(sizesContainer, quantityContainer);
    sizesContainer.className = "d-flex gap-2 mt-3";

    product.tamanho.forEach(t => {
        const btn = document.createElement("button");
        btn.textContent = t;
        btn.style.cssText = `
            width:40px;height:40px;border-radius:50%;
            border:2px solid #ccc;background:#fff;
        `;
        btn.onclick = () => {
            selectedSize = t;
            updateSelection();
        };
        sizesContainer.appendChild(btn);
    });

    function updateSelection() {
        // === CORES ===
        [...colorsContainer.children].forEach(btn => {
            if (btn.dataset.color === selectedColor) {
                btn.style.border = "3px solid #000";
                btn.style.boxShadow = "0 0 0 2px rgba(0,0,0,0.2)";
            } else {
                btn.style.border = "2px solid #ccc";
                btn.style.boxShadow = "none";
            }
        });

        // === TAMANHOS ===
        [...sizesContainer.children].forEach(btn => {
            if (btn.textContent === selectedSize) {
                btn.style.border = "3px solid #000";
                btn.style.backgroundColor = "#f8f9fa";
                btn.style.fontWeight = "bold";
            } else {
                btn.style.border = "2px solid #ccc";
                btn.style.backgroundColor = "#fff";
                btn.style.fontWeight = "normal";
            }
        });

        // === BOTÃO ===
        addBtn.disabled = !(selectedColor && selectedSize && quantity > 0);
    }

    document.getElementById("increaseQty").onclick = () => {
        quantity++;
        quantityValueEl.textContent = quantity;
        updateSelection();
    };

    document.getElementById("decreaseQty").onclick = () => {
        if (quantity > 1) quantity--;
        quantityValueEl.textContent = quantity;
        updateSelection();
    };

    addBtn.disabled = true;

    /* Adicionar ao carrinho */
    addBtn.onclick = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // 🔥 SALVA TODAS AS INFORMAÇÕES NO CARRINHO
        cart.push({
            id: product.id,
            nome: product.name,
            descricao: product.description,
            cor: selectedColor,
            tamanho: selectedSize,
            quantidade: quantity,
            preco: product.price,
            imagem: product.img[0] || "https://via.placeholder.com/300"
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartDropdown();
        alert("Produto adicionado ao carrinho!");
    };
}

/* ===============================
   CARRINHO (NAVBAR)
================================= */
const cartButton = document.getElementById("cartButton");
const cartDropdown = document.getElementById("cart-dropdown");

cartButton.addEventListener("click", () => {
    cartDropdown.style.display =
        cartDropdown.style.display === "block" ? "none" : "block";
    renderCartDropdown();
});

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

        // 🔥 MOSTRA TODAS AS INFORMAÇÕES NO CARRINHO
        div.innerHTML = `
            <img src="${item.imagem}" style="width:50px;height:50px;border-radius:5px;object-fit:cover;">
            <div style="flex:1">
                <strong>${item.nome}</strong>
               
                <small>
                    <b>Cor:</b> ${item.cor} <br>
                    <b>Tamanho:</b> ${item.tamanho} <br>
                    <b>Qtd:</b> ${item.quantidade} <br>
                    <b>Preço:</b> ${item.preco}
                </small>
            </div>
            <button class="btn btn-sm btn-danger">
                <i class="bx bx-trash-alt"/>
            </button>
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

/* ===============================
   WHATSAPP
================================= */
function finalizarPedidoWhatsapp() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return;

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

