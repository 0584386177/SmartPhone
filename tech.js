window.addEventListener("load", function () {});

let bar = document.querySelector("#icon-toggle");
let menu = document.querySelector(".menu");
bar.addEventListener("click", (e) => {
  menu.classList.toggle("show-menu");
  e.target.classList.toggle("fa-x");
  e.target.classList.toggle("fa-bars");
});

let images = [
  "https://didonghd.com/wp-content/uploads/2021/01/MPOS1200x400.jpg",
  "https://didonghd.com/wp-content/uploads/2021/04/Tai-nghe-Airpods.jpg",
  "https://didonghd.com/wp-content/uploads/2020/02/REVODOI.jpg",
  "https://didonghd.com/wp-content/uploads/2020/10/Slide-iphone-12_1-1400x400.jpg",
];
let itemImage = document.querySelectorAll(".image-item");
let image = document.querySelector(".image");
let btnNext = document.getElementById("btn-next");
let btnPrevious = document.getElementById("btn-prev");
let dotItems = document.querySelectorAll(".dot-item");
let index = 0;

//next
function next() {
  index++;
  if (index == images.length) {
    index = 0;
  }
  document.getElementById("image-item").src = images[index];
  dotItems.forEach(function (value) {
    value.classList.remove("active");
  });

  dotItems[index].classList.add("active");
}

// prev
function previous() {
  index--;
  if (index == -1) {
    index = 3;
  }
  dotItems.forEach(function (value) {
    value.classList.remove("active");
  });

  dotItems[index].classList.add("active");
  document.getElementById("image-item").src = images[index];
}

// click dot
dotItems.forEach(function (value, valueIndex) {
  value.addEventListener("click", (e) => {
    e.preventDefault();
    dotItems.forEach(function (value) {
      value.classList.remove("active");
    });
    e.target.classList.add("active");

    index = valueIndex;

    document.getElementById("image-item").src = images[index];
  });
});

let intervalSlide = setInterval(() => {
  index++;
  if (index == images.length) {
    index = 0;
  }
  document.getElementById("image-item").src = images[index];
  dotItems.forEach(function (value, valueIndex) {
    if (valueIndex === index) {
      value.classList.add("active");
    } else {
      value.classList.remove("active");
    }
  });
}, 2000);
intervalSlide;

//FORM LOGIN
const signIn = document.getElementById("sign-in");
const signUp = document.getElementById("sign-up");
const signInClose = document.getElementById("icon-login_close");
const signUpClose = document.getElementById("icon-signup_close");
const formLogin = document.querySelector(".form-login");
const formSignUp = document.querySelector(".form-signup");
const signInUserInput = document.querySelector(".username");
const signInPasswordInput = document.querySelector(".password");
const signUpLink = document.getElementById("sign-up-link");
const signInLink = document.getElementById("sign-in-link");
const faUser = document.querySelector(".fa-user");
const accountSymbol = document.querySelector(".fa-user");
const logOutSymbol = document.querySelector(".fa-right-from-bracket");
const api = "http://localhost:3000/users";
accountSymbol.onclick = () => {
  signIn.style.visibility = "visible";
};
signInClose.onclick = function () {
  signIn.style.visibility = "hidden";
};
logOutSymbol.onclick = () => {
  window.location.reload();
};

async function getData() {
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

const notiSuccess = document.querySelector(".noti-login_success");
const notiWrong = document.querySelector(".noti-login_error");
const vaildateForm = document.querySelector(".vaildate-form");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await getData();
  const username = signInUserInput.value;
  const password = signInPasswordInput.value;
  console.log(username, password);

  let userStorage = null;

  data.forEach((item) => {
    if (item.username == username && item.password == password) {
      userStorage = item;
      notiSuccess.classList.add("show-animation");
    } else if (item.username != username || item.password != password) {
      vaildateForm.style.opacity = "1";
    }
    if (userStorage) {
      localStorage.setItem("userStorage", JSON.stringify(userStorage));

      if (faUser) {
        faUser.classList.add("hidden-account");
        logOutSymbol.classList.remove("hidden-account");
      }
      signIn.style.visibility = "hidden";
    }
  });
});

signUpLink.addEventListener("click", changeFormSignUp);
function changeFormSignUp() {
  signUp.style.visibility = "visible";
  signIn.style.visibility = "hidden";
}
signUpClose.onclick = function () {
  signUp.style.visibility = "hidden";
};

signInLink.addEventListener("click", changeFormSignIn);
function changeFormSignIn() {
  signUp.style.visibility = "hidden";
  signIn.style.visibility = "visible";
}

// checkForm Sign Up
const userSignUpInput = document.getElementById("sign-up-username");
const passwordSignUpInput = document.getElementById("sign-up-password");
const emailInput = document.getElementById("email");
const confirmPassword = document.getElementById("confirm-password");

formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = userSignUpInput.value;
  const email = emailInput.value;
  const password = passwordSignUpInput.value;
  const confirm = confirmPassword.value;
  fetch(api, {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      confirm,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .then((error) => {
      console.log(error);
    });
});

const faCart = document.querySelector(".cart i");

faCart.onclick = () => {
  window.open("cart.html", "_blank");
};

const addCart = document.querySelectorAll(".card-cartBtn");
let numberCart = document.querySelector(".number-cart");
const productData = [];
addCart.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    if (button) {
      numberCart.innerText++;
    }
    const productItem = button.closest(".card");
    const productImage = productItem.querySelector(".card-image img").src;
    const productTitle = productItem.querySelector(".card-title").innerText;
    const productPrice = productItem.querySelector(".card-newPrice ").innerText;
    const product = {
      image: productImage,
      title: productTitle,
      price: productPrice,
    };

    productData.push(product);

    if (productData.length > 0) {
      localStorage.setItem("product", JSON.stringify(productData));
    }
    let cartInfor = JSON.parse(localStorage.getItem("product"));
    console.log(cartInfor);
  });
});


