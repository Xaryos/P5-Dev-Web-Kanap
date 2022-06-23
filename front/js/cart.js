 // récupération array product

    let itemBackup = JSON.parse(localStorage.getItem("itemInCart"));

    console.log(itemBackup);



// condition vérification item dans le panier.
if (itemBackup === null) {
    
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
    for (article of itemBackup) {
        for(let w = 0; w < itemBackup.length; w++) {
        function Test() {
            fetch(`http://localhost:3000/api/products/${article.idProduct}`)
           .then(function(res){return res.json()})
           
    
           .then(function (dataProduct) {
               product = dataProduct;
               console.log(product);
    
               

    
        let masterSection = document.querySelector('#cart__items'); 
    
        let productArticle = document.createElement("article");
        masterSection.appendChild(productArticle);
        productArticle.classList.add("cart__item");
        productArticle.dataset.id = `${article.idProduct}`;
        productArticle.dataset.color =`${article.colorProduct}`;
        
            // image
            let divImage = document.createElement("div");
            productArticle.appendChild(divImage);
            divImage.classList.add("cart__item__img");
    
            let productImage = document.createElement("img");
            divImage.appendChild(productImage);
            productImage.src = product.imageUrl;
            productImage.alt = product.altTxt;
    
        //content
        let divContent = document.createElement("div");
        productArticle.appendChild(divContent);
        divContent.classList.add("cart__item__content");
    
            
            let divContentDescription = document.createElement("div");
            divContent.appendChild(divContentDescription);
            divContentDescription.classList.add("cart__item__content__description");
    
            let productTitle = document.createElement("h2");
            divContentDescription.appendChild(productTitle);
            productTitle.innerHTML = article.nameProduct;
    
            let productColor = document.createElement("p");
            divContentDescription.appendChild(productColor);
            productColor.innerHTML = article.colorProduct;
    
            let productPrice = document.createElement("p");
            divContentDescription.appendChild(productPrice);
            productPrice.innerHTML = `${product.price}€`;
    
        let divSettings = document.createElement("div");
        divContent.appendChild(divSettings);
        divSettings.classList.add("cart__item__content__settings")
    
            //quantity
            let divSettingsQuantity = document.createElement("div");
            divSettings.appendChild(divSettingsQuantity);
            divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    
            let quantityParagraph = document.createElement("p");
            divSettingsQuantity.appendChild(quantityParagraph);
            quantityParagraph.innerHTML = article.quantityProduct;
            quantityParagraph.innerText = "Qté : ";
    
            let quantityInput = document.createElement("input");
            divSettingsQuantity.appendChild(quantityInput);
            quantityInput.classList.add("itemQuantity");
            quantityInput.type = "number";
            quantityInput.name = 'itemQuantity';
            quantityInput.min = 1;
            quantityInput.max = 100;
            quantityInput.value = article.quantityProduct;
    
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
        let deleteButton = document.querySelector('p.deleteItem');
    
        
        deleteButton.addEventListener('click', function() {
        
            
            // modification DOM 
            let masterSection = document.getElementById("cart__items");
            masterSection.removeChild(productArticle);
    
            // modification localStorage
    
            window.localStorage.clear();
            location.reload();
    
        
      })
    }
    )};
   };
   
    }
Test();
  };
  


