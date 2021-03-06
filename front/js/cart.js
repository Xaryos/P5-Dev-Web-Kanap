// récupération du localStorage et de ces items >
    let itemBackup = JSON.parse(localStorage.getItem("itemInCart"));

console.log(itemBackup);
// Ajout des produits
    // condition de vérification de panier
    if (itemBackup) {  
        itemBackup.map((itemObject) => {
            const articleId = itemObject._id;
            const articleColor = itemObject.color;
            const articleQuantity = itemObject.quantity;  
                addItems();
                function addItems () {

                    fetch(`http://localhost:3000/api/products/${articleId}`)
                        .then(function(res){return res.json()})  
                        .then(function (dataProduct) {
                            product = dataProduct;
                            // récupération de la section pour introduire les elements
                            let mainSection = document.querySelector("#cart__items");
                        
                            // Article du produit
                            let productArticle = document.createElement("article");
                            mainSection.appendChild(productArticle);
                            productArticle.classList.add("cart__item");
                            productArticle.dataset.id = `${articleId}`;
                            productArticle.dataset.color =`${articleColor}`;
                
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
    /*  experimental*/      productPrice.classList.add("price");
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
                                            if ( product._id == getRootChange.dataset.id && product.color == getRootChange.dataset.color) {
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

                            function totalQuantityCart () {
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
        divErrorMessage.style.display ="flex";
        divErrorMessage.style.flexDirection ="center";
        divErrorMessage.style.justifyContent ="center";

    };
    // mise a jour du panier 
    function updateCart(itemBackup) {
        if (itemBackup.length === 0) {
            localStorage.removeItem("itemInCart");
        } else {
            localStorage.setItem("itemInCart", JSON.stringify(itemBackup));
        }
    }    

////////////////////////////////////////////// FORMULAIRE /////////////////////////////////////////
// definition des champs

const firstNamePath = document.getElementById("firstName");
const lastNamePath = document.getElementById("lastName");
const addressPath = document.getElementById("address");
const cityPath = document.getElementById("city");
const emailPath = document.getElementById("email");
const orderButton = document.getElementById("order");


