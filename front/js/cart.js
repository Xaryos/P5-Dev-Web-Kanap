 // récupération array product
let itemBackup = JSON.parse(localStorage.getItem("itemGet"));

        console.log(itemBackup);

// condition vérification item dans le panier.
if (localStorage.getItem("itemGet") === null) {
    
        //message d'erreur
        let masterSectionError = document.getElementById("cart__items")

        let divErrorMessage = document.createElement("p");
        masterSectionError.appendChild(divErrorMessage);
        divErrorMessage.innerText = "Oups ! le panier est vide.";
        divErrorMessage.style.display ="flex";
        divErrorMessage.style.flexDirection ="center";
        divErrorMessage.style.justifyContent ="center";

}
else {
    // initialisation des items sur la page panier  
   
    for (let article in itemBackup) {

        let masterSection = document.querySelector('#cart__items'); 
    
        let productArticle = document.createElement("article");
        masterSection.appendChild(productArticle);
        productArticle.classList.add("cart__item");
        productArticle.dataset.id = `${itemBackup[article]._id}`;
        productArticle.dataset.color =`${itemBackup[article].color}`;
        
            // image
            let divImage = document.createElement("div");
            productArticle.appendChild(divImage);
            divImage.classList.add("cart__item__img");
    
            let productImage = document.createElement("img");
            divImage.appendChild(productImage);
            productImage.src = itemBackup[article].image;
            productImage.alt = itemBackup[article].altTxt;
    
        //content
        let divContent = document.createElement("div");
        productArticle.appendChild(divContent);
        divContent.classList.add("cart__item__content");
    
            
            let divContentDescription = document.createElement("div");
            divContent.appendChild(divContentDescription);
            divContentDescription.classList.add("cart__item__content__description");
    
            let productTitle = document.createElement("h2");
            divContentDescription.appendChild(productTitle);
            productTitle.innerHTML = itemBackup[article].name;
    
            let productColor = document.createElement("p");
            divContentDescription.appendChild(productColor);
            productColor.innerHTML = itemBackup[article].color;
    
            let productPrice = document.createElement("p");
            divContentDescription.appendChild(productPrice);
            productPrice.innerHTML = `${itemBackup[article].price}€`;
    
        let divSettings = document.createElement("div");
        divContent.appendChild(divSettings);
        divSettings.classList.add("cart__item__content__settings")
    
            //quantity
            let divSettingsQuantity = document.createElement("div");
            divSettings.appendChild(divSettingsQuantity);
            divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    
            let quantityParagraph = document.createElement("p");
            divSettingsQuantity.appendChild(quantityParagraph);
            quantityParagraph.innerHTML = itemBackup[article].quantity;
            quantityParagraph.innerText = "Qté : ";
    
            let quantityInput = document.createElement("input");
            divSettingsQuantity.appendChild(quantityInput);
            quantityInput.classList.add("itemQuantity");
            quantityInput.type = "number";
            quantityInput.name = 'itemQuantity';
            quantityInput.min = 1;
            quantityInput.max = 100;
            quantityInput.value = itemBackup[article].quantity;
    
        //delet button
        let divDeletButton = document.createElement("div");
        divSettings.appendChild(divDeletButton);
        divDeletButton.classList.add("cart__item__content__settings__delete");
    
            let deletButtonParagraph = document.createElement("p");
            divDeletButton.appendChild(deletButtonParagraph);
            deletButtonParagraph.classList.add("deleteItem");
            deletButtonParagraph.innerHTML = "Supprimer";
    
        // modification quantité
        let quantityUpdate = document.querySelector(".itemQuantity");
    
        
        quantityUpdate.addEventListener('change', function() {
            
            // quand quantity update est modifié => récupérer la nouvelle quantité
            // Supprimer la quantité actuelle du LS puis la remplacer avec la nouvelle
            // reload la page.
            
    
        });
    
        // suppression d'Item
        let deleteButton = document.querySelector(".deleteItem");
        deleteButton.addEventListener('click', function() {
    
            // modification DOM 
            let masterSection = document.getElementById("cart__items");
            masterSection.removeChild(productArticle);
    
            // modification localStorage
    
            window.localStorage.clear();
            location.reload();
    
        });
        }
   };

