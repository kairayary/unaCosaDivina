const iconHamburger = document.querySelector(".bi-list"),
  navContainer = document.querySelector(".nav_container"),
  iconClose = document.querySelector(".bi-x"),
  nav = document.querySelector("nav"),
  link_header = document.querySelectorAll(".link_header"),
  containerCart = document.querySelector(".container_cart"),
  btnCart = document.querySelector(".cart_container"),
  ul = document.querySelector("ul");

navContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav_container")) {
    close();
  }
});

iconHamburger.addEventListener("click", () => {
  navContainer.style.visibility = "visible";
  ul.classList.add("menu_visible");
});

iconClose.addEventListener("click", close);

function close() {
  navContainer.style.visibility = "hidden";
  ul.classList.remove("menu_visible");
}

btnCart.addEventListener("click", () => {
  containerCart.classList.toggle("d-none");
});

window.addEventListener("scroll", () => {
  if (window.scrollY >= 75) {
    nav.style.backgroundColor = "#03989e";
    ul.style.backgroundColor = "#fff";
    ul.style.color = "#000";
    iconClose.style.color = "#000";
    link_header.forEach((link) => (link.style.color = "#000"));
    if (window.innerWidth >= 770 && window.innerWidth <= 1400) {
      containerCart.style.marginTop = "6.5rem";
    }

    if (window.innerWidth >= 400 && window.innerWidth <= 769) {
      containerCart.style.marginTop = "6rem";
    }

    if (window.innerWidth <= 400) {
      containerCart.style.marginTop = "5rem";
    }
  } else {
    nav.style.backgroundColor = "transparent";
    ul.style.backgroundColor = "#ffbd59";
    ul.style.color = "#fff";
    iconClose.style.color = "#fff";
    link_header.forEach((link) => (link.style.color = "#fff"));
    if (window.innerWidth <= 400) {
      containerCart.style.marginTop = "4rem";
    }
    if (window.innerWidth >= 400 && window.innerWidth <= 769) {
      containerCart.style.marginTop = "4rem";
    }
    if (window.innerWidth >= 770 && window.innerWidth <= 1400) {
      containerCart.style.marginTop = "4.5rem";
    }
  }
});

const categories_slider = document.querySelector(".categories_slider"),
  arrowRight = document.querySelector(".bi-chevron-right"),
  arrowLeft = document.querySelector(".bi-chevron-left");

arrowRight.addEventListener("click", () => {
  if (window.innerWidth >= 989) {
    categories_slider.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  } else {
    categories_slider.scrollBy({
      left: 150,
      behavior: "smooth",
    });
  }
});

arrowLeft.addEventListener("click", () => {
  if (window.innerWidth >= 989) {
    categories_slider.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  } else {
    categories_slider.scrollBy({
      left: -150,
      behavior: "smooth",
    });
  }
});

/*const firebaseConfig = {
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

let dataProducts = [];

collProducts.get().then((res) => {
  const data = res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  dataProducts.push(...data);
  init(data);
  filtered(data);
});

const containerProducts = document.querySelector(".slider_container_products"),
  inputSearch = document.querySelector("[data-search]"),
  select = document.querySelector("select");

function init(products) {
  containerProducts.innerHTML = "";

  const div = document.createElement("div"),
    messageEmpty = document.createElement("h2");
  messageEmpty.textContent = "No hay productos disponibles";
  messageEmpty.style.textAlign = "center";
  messageEmpty.style.fontSize = "1.2rem";
  messageEmpty.style.color = "#fff";
  messageEmpty.style.opacity = ".7";
  div.style.width = "100%";
  div.appendChild(messageEmpty);

  if (products.length === 0) {
    if (window.innerWidth >= 767) {
      messageEmpty.style.marginTop = "1.8rem";
    }
    containerProducts.appendChild(div);
  } else {
    products.map((product) => {
      const { id, image, name, price } = product;

      containerProducts.innerHTML += `
        <a href="../pages/detailProduct.html?id=${id}" class="product" id="${id}">
            <div class="product_image">
              <img src="${image}" alt="${name}" />
            </div>
            <h4>${name}</h4>
            <div class="product_price">
              <span class="price">$${price}</span>
              </div>
            <div class="product_overlay"></div>
        </a>
        `;
    });
  }
}

const filters = document.querySelectorAll(".filter");

let productsExlusive = [];
let productsOffers = [];

function filtered(product) {
  productsExlusive = product.filter((product) => +product.price > 4000);
  productsOffers = product.filter((product) => +product.price < 1000);

  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      filters.forEach((filter) => {
        filter.classList.remove("active");
        filter.classList.remove("active");
      });

      if (e.target.style.backgroundColor !== "#03989e") {
        e.target.classList.add("active");
        e.target.classList.add("active");
      } else {
        e.target.classList.remove("active");
        e.target.classList.remove("active");
      }

      if (e.target.textContent === "Todos") {
        init(product);
        select.value = "";
        searchProduct(product);
      } else if (e.target.textContent === "Servicios") {
        init(productsExlusive);
        select.value = "";
        searchProduct(productsExlusive);
      } else if (e.target.textContent === "Bebidas") {
        init(productsOffers);
        select.value = "";
        searchProduct(productsOffers);
      }
    });
  });
}

let productCategory = [];

select.addEventListener("change", (e) => {
  if (e.target.value === "Salados") {
    productCategory = dataProducts.filter(
      (product) => product.category === e.target.value
    );
    init(productCategory);
    searchProduct(productCategory);
  } else if (e.target.value === "Dulces") {
    productCategory = dataProducts.filter(
      (product) => product.category === e.target.value
    );
    init(productCategory);
    searchProduct(productCategory);
  } else if (e.target.value === "Saludables") {
    productCategory = dataProducts.filter(
      (product) => product.category === e.target.value
    );
    init(productCategory);
    searchProduct(productCategory);
  } else {
    init(dataProducts);
    searchProduct(dataProducts);
  }
});

searchProduct(dataProducts);

function searchProduct(product) {
  inputSearch.value = "";

  inputSearch.addEventListener("keyup", (e) => {
    const value = e.target.value;

    if (value === "") {
      init(product);
    }

    if (e.key === "Enter") {
      init(
        product.filter((prod) =>
          prod.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  });
}
const containerContact = document.querySelector(".container-contact");
const containerStats = document.querySelector(".container-stats");

containerContact.style.display = "none";
containerStats.style.display = "none";

function contact() {
  containerContact.style.display = "block";

  indexArrow = 4;

  containerStats.style.display = "none";
  containerEvents.style.display = "none";
  sliderTitle.innerText = "Contáctame";
  navbarLinksPast.classList.remove("active");
  navbarLinksStats.classList.remove("active");
  navbarLinksUpcomming.classList.remove("active");
  navbarLinksHome.classList.remove("active");
  navbarLinksContact.classList.add("active");
}*/

