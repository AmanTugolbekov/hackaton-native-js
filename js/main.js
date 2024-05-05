let API = " http://localhost:8008/products";
let createModal = document.querySelector(".createModal");
let modal = document.querySelector(".modal");
let btnCreate = document.querySelector(".btnModalCreate");
let inpName = document.querySelector("#inpName");
let inpImg = document.querySelector("#inpImg");
let inpPrice = document.querySelector("#inpPrice");
let ul = document.querySelector(".cardsList");
let editProduct = document.querySelector(".editModalProduct");
let inpEditName = document.querySelector("#inpEditName");
let inpEditImg = document.querySelector("#inpEditImg");
let inpEditPrice = document.querySelector("#inpEditPrice");
let btnSaveEdit = document.querySelector("#saveEdit");
let currentPage = 1;
let countPage = 1;
let prevPage = document.querySelector(".prevPage");
let nextPage = document.querySelector(".nextPage");
let searchProduct = "";
createModal.addEventListener("click", (e) => {
  modal.style.display = "block";
});
btnCreate.addEventListener("click", () => {
  if (!inpName.value.trim() || !inpImg.value.trim() || !inpPrice.value.trim()) {
    alert("Заполните все поля!");
    return;
  }
  let newObj = {
    name: inpName.value,
    img: inpImg.value,
    price: inpPrice.value,
  };
  createProducts(newObj);
  readProducts();
});
readProducts(currentPage);

function createProducts(product) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(product),
  });
  readProducts();
  inpImg.value = "";
  inpName.value = "";
  inpPrice.value = "";
  modal.classList.toggle("show");
}
//! read
function readProducts(test = currentPage) {
  fetch(`${API}?&_page=${test}&_limit=5&q=${searchProduct}`)
    .then((res) => res.json())
    .then((data) => {
      ul.innerHTML = "";
      data.forEach((elem) => {
        ul.innerHTML += `<li class="liCard"><img class="imgCss" src="${elem.img}" alt=""></br><div class="divInfo"><span class="spName">${elem.name}</span></br><span class="spPrice">${elem.price}</span></div><div class="btnCards"><button id=${elem.id} class="btnDelete">delete</button>
        <button id=${elem.id} class="btnEdit">edit</button></div></li>`;
      });
    });
  pageFunc();
}
readProducts();
//! delete
document.addEventListener("click", (e) => {
  let delClass = [...e.target.classList];
  if (delClass.includes("btnDelete")) {
    let delId = e.target.id;
    fetch(`${API}/${delId}`, {
      method: "DELETE",
    }).then(() => readProducts());
  }
});
//! edit
document.addEventListener("click", (e) => {
  let editClass = [...e.target.classList];
  if (editClass.includes("btnEdit")) {
    editProduct.style.display = "block";
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpEditName.value = data.name;
        inpEditImg.value = data.img;
        inpEditPrice.value = data.price;
        btnSaveEdit.setAttribute("id", data.id);
      });
    openModal();
  }
});
btnSaveEdit.addEventListener("click", () => {
  let editProducts = {
    name: inpEditName.value,
    img: inpEditImg.value,
    price: inpEditPrice.value,
  };
  editedProducts(editProducts, btnSaveEdit.id);
  editProduct.style.display = "none";
});
function editedProducts(newProduct, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newProduct),
  }).then(() => readProducts());
}
//! PAGINATION
let test = currentPage;
function pageFunc() {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      countPage = Math.ceil(data.length / 5);
    });
}
prevPage.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  test--;
  readProducts(test);
});

nextPage.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  test++;
  readProducts(test);
});
//! SEarch
let searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("input", (e) => {
  searchProduct = e.target.value.trim();
  readProducts();
});
let navLogIn = document.querySelector(".navBtnLogIn");
navLogIn.addEventListener("click", (e) => {
  let pr1 = prompt("Введите имя");
  let pr2 = +prompt("Введите пароль");
  if (pr1 == "admin" && pr2 == 4444) {
    createModal.style.display = "block";
    let editClass = [...e.target.classList];
    if (editClass.includes("btnEdit")) {
      let id = e.target.id;
      id.style.display = "block";
    }
  }
  readProducts();
});
//! --------------------------------------
var modal1 = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal1.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
};

function openModal() {
  modal1.style.display = "block";
}

btnSaveEdit.addEventListener("click", () => {
  modal1.style.display = "none";
});
//!-----------------------------------------
var modal2 = document.querySelector(".modal");
var openModalBtn = document.querySelector(".createModal");
var closeModalBtn = document.querySelector(".btnModalCreate");
var closeBtn = document.querySelector(".close1");

openModalBtn.addEventListener("click", () => {
  modal2.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  modal2.style.display = "none";
});
closeBtn.onclick = function () {
  modal2.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};
