//ładowanie strony i aktywacja poszczególnych elementów
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.querySelectorAll(".button");
    startButton[1].classList.add("active");
    getFourProduct("onclick");
});

//pobieranie na poszczególny przycick ilość danych z json
const getFourProduct = () => {
    fetch("./example.json")
        .then((response) => {
            if (response.status !== 200) {
                throw Error("This is not a status 200");
            } else {
                return response.json();
            }
        })
        .then((json) => showProducts(json.list.slice(0, 4)))
        .catch((err) => console.log(err));
};

document.querySelector(".fourProduct").addEventListener("click", getFourProduct);

const getTwoProduct = () => {
    fetch("./example.json")
        .then((response) => {
            if (response.status !== 200) {
                throw Error("This is not a status 200");
            } else {
                return response.json();
            }
        })
        .then((json) => showProducts(json.list.slice(0, 2)))
        .catch((err) => console.log(err));
};

document.querySelector(".twoProduct").addEventListener("click", getTwoProduct);

const getEightProduct = () => {
    fetch("./example.json")
        .then((response) => {
            if (response.status !== 200) {
                throw Error("This is not a status 200");
            } else {
                return response.json();
            }
        })
        .then((json) => showProducts(json.list.slice(0, 8)))
        .catch((err) => console.log(err));
};

document.querySelector(".eightProduct").addEventListener("click", getEightProduct);

//pobieranie wybranych danych z json do class product
const showProducts = (products) => {
    const productArea = document.querySelector(".product-list");

    (productArea.textContent = ""),
        products.forEach((product) => {
            console.log(product);
            const item = document.createElement("div");
            item.className = "product";
            item.innerHTML = `
                <div class="product__top">
                <div class="quantity">sztuk: ${product.availability.name}</div>
                <div class="promo-price">oszczędzasz: <span>${product.price.gross.base_float - product.price.gross.promo_float} zł<span></div>
                </div>
                <img class="product__image" src="https://www.mamezi.pl/praca/front/products/upload/${product.main_image}.png">
                <div class="product__price">
                <div class="final-price">${product.price.gross.promo}</div>
                <div class="base-price">${product.price.gross.base}</div>
                </div>
                <div class="product__name-text">${product.name}</div>
                <div class="product__producent">${product.producer.name}</div>
                `;
            productArea.appendChild(item);
        });
};

//dodawanie class active do kilkniętego buttona
const buttons = document.querySelectorAll(".button");

buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        buttons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        this.classList.add("active");
    });
});

// timer
const targetDate = new Date(2023, 4, 28, 12, 0, 0);

function timer() {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference > 0) {
        let seconds = Math.floor((timeDifference / 1000) % 60);
        let minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        days = days.toString().padStart(2, "");
        hours = hours.toString().padStart(2, "");
        minutes = minutes.toString().padStart(2, "");
        seconds = seconds.toString().padStart(2, "");

        const day = document.querySelector(".days-number");
        day.textContent = `${days}`;
        const hour = document.querySelector(".hours-number");
        hour.textContent = `${hours}`;
        const min = document.querySelector(".min-number");
        min.textContent = `${minutes}`;
        const sec = document.querySelector(".sec-number");
        sec.textContent = `${seconds}`;

        const timerText = document.querySelector(".timer-text");
        timerText.textContent = "do końca pozostało:";
    } else {
        const timerBox = document.querySelector(".timer-box");
        timerBox.style.opacity = "0";
        const timerText = document.querySelector(".timer-text");
        timerText.textContent = "czas promocji upłynął";
    }
}

setInterval(timer, 1000);
window.addEventListener("DOMContentLoaded", timer);
