const containerCart = document.querySelector(".container_cart"),
  btnCart = document.querySelector(".cart_container");

btnCart.addEventListener("click", () => {
  containerCart.classList.toggle("d-none");
});

const firebaseConfig = {
  apiKey: "AIzaSyDeXZ3kdma4ZpOXqsZcPotHAmopFaa46v4",
  authDomain: "vinoteca-43969.firebaseapp.com",
  databaseURL: "https://vinoteca-43969-default-rtdb.firebaseio.com",
  projectId: "vinoteca-43969",
  storageBucket: "vinoteca-43969.appspot.com",
  messagingSenderId: "992505985002",
  appId: "1:992505985002:web:17146c0813e8a4a88ea493",
};

firebase.initializeApp(firebaseConfig);

const collProducts = firebase.firestore().collection("products");

const locationId = parseInt(window.location.href.split("?id=")[1]);

let dataProducts = [];

collProducts.get().then((res) => {
  const data = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  dataProducts.push(...data);
  init(data);
});

const productContainer = document.querySelector(".product_detail");

function init(product) {
  product
    .filter((prod) => prod.id === locationId)
    .map((product) => {
      const { image, name, price, description } = product;
      productContainer.innerHTML = `
        <div class="product_detail-image">
            <img src="${image}" alt="${name}" />
        </div>
        <div class="product_detail-features">
            <div class="product_detail-desc">
                <h3>${name}</h3>
                <p class="description">${description}</p>
                <p class="price">$${price}</p>
            </div>
            <div class="product_detail-cart">
                <span class="update">-</span>
                <p class="quantity">0</p>
                <span class="update">+</span>
            </div>
            <div class="product_detail-button">
                <button id="addCart">Agregar al carrito</button>
            </div>
        </div>
`;
      addCart();
      updateQuantity();
      addProduct(products);
    });
}

let count = 0;

function updateQuantity() {
  let quantity = document.querySelector(".quantity");

  const span = document.querySelectorAll(".update");

  count = +quantity.textContent;

  span.forEach((span) => {
    span.addEventListener("click", (e) => {
      if (e.target.textContent === "-") {
        if (count === 0) {
          count = 0;
        } else {
          count--;
        }
      }

      if (e.target.textContent === "+") {
        count++;
      }
      quantity.innerHTML = `${count}`;
    });
  });
}

function addCart() {
  const btnCart = document.querySelector("#addCart");

  btnCart.addEventListener("click", (e) => {
    let quantity = document.querySelector(".quantity");

    const card = e.target.parentElement.parentElement.parentElement,
      image = card.querySelector(".product_detail-image"),
      cardFeatures = card.querySelector(".product_detail-features"),
      cardQuantity = +card.querySelector(".quantity").textContent;

    const cardFull = {
      image: image.querySelector("img").src,
      name: cardFeatures
        .querySelector(".product_detail-desc")
        .querySelector("h3").textContent,
      price: cardFeatures
        .querySelector(".product_detail-desc")
        .querySelector(".price")
        .textContent.replace("$", ""),
      quantity: cardQuantity,
    };

    const existingProduct = products.find(
      (product) => product.name === cardFull.name
    );

    if (cardFull.quantity !== 0) {
      if (existingProduct) {
        existingProduct.quantity += cardQuantity;
        saveLocal();
      } else {
        products.push(cardFull);
        saveLocal();
      }
      addProduct(products);
    }

    count = 0;
    quantity.innerHTML = `${count}`;
  });
}
