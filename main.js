let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nav-home").addEventListener("click", showHome);
  document.getElementById("nav-about").addEventListener("click", showAbout);
  showHome();
});

function showHome() {
  fetch("data/products.json")
    .then(res => {
      if (!res.ok) throw new Error("Fel vid hämtning av produkter");
      return res.json();
    })
    .then(data => renderProducts(data))
    .catch(err => {
      document.getElementById("content").innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}

function renderProducts(products) {
  const content = document.getElementById("content");
  content.innerHTML = '<div class="product-grid"></div>';
  const grid = content.querySelector(".product-grid");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="\${product.image}" alt="\${product.name}" width="100">
      <h3>\${product.name}</h3>
      <p>\${product.price} kr</p>
      <button class="add-to-cart" data-id="\${product.id}" data-name="\${product.name}" data-price="\${product.price}">Lägg i kundvagn</button>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.name, parseInt(button.dataset.price));
    });
  });
}

function showAbout() {
  document.getElementById("content").innerHTML = `
    <h2>Om Webbshopen</h2>
    <p>Vi erbjuder bra produkter till bra pris!</p>
  `;
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `\${item.name} - \${item.price} kr`;
    list.appendChild(li);
    total += item.price;
  });
  document.getElementById("total").textContent = `\${total} kr`;
}
