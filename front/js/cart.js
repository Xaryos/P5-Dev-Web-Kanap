// récupération du localStorage et de ces items >
let itemBackup = JSON.parse(localStorage.getItem("itemInCart"));

// Ajout des produits
// condition de vérification de panier
if (itemBackup) {
    itemBackup.map((itemObject) => {
        const articleId = itemObject._id;
        const articleColor = itemObject.color;
        const articleQuantity = itemObject.quantity;
        addItems();
        function addItems() {

            fetch(`http://localhost:3000/api/products/${articleId}`)
                .then(function (res) { return res.json() })
                .then(function (dataProduct) {
                    product = dataProduct;
                    // récupération de la section pour introduire les elements
                    let mainSection = document.querySelector("#cart__items");

                    // Article du produit
                    let productArticle = document.createElement("article");
                    mainSection.appendChild(productArticle);
                    productArticle.classList.add("cart__item");
                    productArticle.dataset.id = `${articleId}`;
                    productArticle.dataset.color = `${articleColor}`;

                    // Image du produit
                    let divImage = document.createElement("div");
                    productArticle.appendChild(divImage);
                    divImage.classList.add("cart__item__img");

                    let productImage = document.createElement("img");
                    divImage.appendChild(productImage);
                    productImage.src = product.imageUrl;
                    productImage.alt = product.altTxt;

                    // Contenu du produit
                    let divContent = document.createElement("div");
                    productArticle.appendChild(divContent);
                    divContent.classList.add("cart__item__content");

                    let divContentDescription = document.createElement("div");
                    divContent.appendChild(divContentDescription);
                    divContentDescription.classList.add("cart__item__content__description");

                    let productTitle = document.createElement("h2");
                    divContentDescription.appendChild(productTitle);
                    productTitle.innerHTML = product.name;

                    let productColor = document.createElement("p");
                    divContentDescription.appendChild(productColor);
                    productColor.innerHTML = articleColor;

                    let productPrice = document.createElement("p");
                    divContentDescription.appendChild(productPrice);
                    productPrice.classList.add("price");
                    productPrice.innerHTML = `${product.price}€`;

                    let divSettings = document.createElement("div");
                    divContent.appendChild(divSettings);
                    divSettings.classList.add("cart__item__content__settings");

                    // Quantité du produit
                    let divSettingsQuantity = document.createElement("div");
                    divSettings.appendChild(divSettingsQuantity);
                    divSettingsQuantity.classList.add("cart__item__content__settings__quantity");

                    let quantityParagraph = document.createElement("p");
                    divSettingsQuantity.appendChild(quantityParagraph);
                    quantityParagraph.innerHTML = articleQuantity;
                    quantityParagraph.innerText = "Qté : ";

                    let quantityInput = document.createElement("input");
                    divSettingsQuantity.appendChild(quantityInput);
                    quantityInput.classList.add("itemQuantity");
                    quantityInput.type = "number";
                    quantityInput.name = 'itemQuantity';
                    quantityInput.min = 1;
                    quantityInput.max = 100;
                    quantityInput.value = articleQuantity;

                    // Bouton Supprimer du produit
                    let divDeletButton = document.createElement("div");
                    divSettings.appendChild(divDeletButton);
                    divDeletButton.classList.add("cart__item__content__settings__delete");

                    let deletButtonParagraph = document.createElement("p");
                    divDeletButton.appendChild(deletButtonParagraph);
                    deletButtonParagraph.classList.add("deleteItem");
                    deletButtonParagraph.innerHTML = "Supprimer";

                    /////////////////////////////////////////////////// FONCTIONS AUTRES ///////////////////////////////////////////////////////////////

                    // modification quantitée 
                    const changeQuantity = document.querySelectorAll(".itemQuantity");
                    changeQuantity.forEach(chngBar => {

                        chngBar.addEventListener("change", (e) => {
                            const getRootChange = e.target.closest("article");
                            for (const product of itemBackup) {
                                if (product._id == getRootChange.dataset.id && product.color == getRootChange.dataset.color) {
                                    product.quantity = e.target.value;
                                    localStorage.setItem("itemInCart", JSON.stringify(itemBackup));
                                    totalQuantityCart();
                                    totalPrice();
                                }
                            }
                        })
                    })
                    // suppression d'Item
                    const suppressButtons = document.querySelectorAll(".deleteItem");
                    suppressButtons.forEach(btn => {

                        btn.addEventListener("click", (e) => {
                            const getRoot = e.target.closest("article");
                            itemBackup = itemBackup.filter((e) => e._id !== getRoot.dataset.id && e.color !== getRoot.dataset.color);
                            updateCart(itemBackup);
                            getRoot.remove();
                            totalQuantityCart();
                            totalPrice();
                        });
                    });
                    // affichage quantité dans le panier 
                    totalQuantityCart();

                    function totalQuantityCart() {
                        let result = 0;
                        for (const itemObject of itemBackup) {
                            result += +itemObject.quantity;
                        }
                        let totalQuantity = document.querySelector("#totalQuantity")
                        totalQuantity.innerText = result;
                    }
                    // affichage prix dans le panier
                    totalPrice();

                    function totalPrice() {
                        let result = 0;
                        let shownPrice = document.querySelector("#totalPrice");
                        for (const itemObject of itemBackup) {
                            result += itemObject.quantity * product.price;
                        }
                        shownPrice.textContent = result;
                    }
                });
        }
        return itemObject;
    })
} else {

    let masterSectionError = document.getElementById("cart__items")

    let divErrorMessage = document.createElement("p");
    masterSectionError.appendChild(divErrorMessage);
    divErrorMessage.innerText = "Oups ! le panier est vide.";
    divErrorMessage.style.display = "flex";
    divErrorMessage.style.flexDirection = "center";
    divErrorMessage.style.justifyContent = "center";

}
// mise a jour du panier 
function updateCart(itemBackup) {
    if (itemBackup.length === 0) {
        localStorage.removeItem("itemInCart");
    } else {
        localStorage.setItem("itemInCart", JSON.stringify(itemBackup));
    }
}

////////////////////////////////////////////// FORMULAIRE /////////////////////////////////////////


// listener form 
let formOrderListener = () => {
    document.querySelector("#order").addEventListener("click", e => {
        e.preventDefault()

        // Récupération formulaire 
        let form = e.target.closest('form').elements

        // regex List 
        let regEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
        let regName = /^[a-zA-ZZÀ-ÿ' -]+$/i;
        let regAddress = /^[A-Za-z0-9\é\è\ê\ë\ä\à\ï\ç\ \,\'\-]+$/;
        let regCity = /^[a-zA-ZÀ-ÿ' -]+$/;

        // validation flag
        let validate = true;

        // Champ Name 
        if (!regName.test(form['firstName'].value)) {
            form['firstName'].nextElementSibling.textContent = `Prénom Invalide !`
            validate = false
        }
        // Champ Last name
        if (!regName.test(form['lastName'].value)) {
            form['lastName'].nextElementSibling.textContent = `Nom Invalide !`
            validate = false
        }
        // Champ Address
        if (!regAddress.test(form['address'].value)) {
            form['address'].nextElementSibling.textContent = `Adresse Invalide !`
            validate = false
        }
        // Champ City
        if (!regCity.test(form['city'].value)) {
            form['city'].nextElementSibling.textContent = `Ville Invalide !`
            validate = false
        }
        // Champ Email
        if (!regEmail.test(form['email'].value)) {
            form['email'].nextElementSibling.textContent = `Email Invalide !`
            validate = false
        }

        // form Error 

        if (!validate) {
            return false;
        }

        // Envoie de commande 
        let orderFinal;
        let productId = [];

        if (regName && regAddress && regCity && regEmail) {

            for (const product of itemBackup) {
                productId.push(product._id)
            }

            orderFinal = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products: productId
            };

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderFinal)
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.removeItem('itemInCart');
                    window.location.href = "confirmation.html?orderId=" + data.orderId;
                })
                .catch(err => console.log(err))

        }
        else {
            document.querySelector("#order").value = "Veuillez remplir tout les champs"
        };
    });
};


window.addEventListener('load', () => {
    formOrderListener();
})