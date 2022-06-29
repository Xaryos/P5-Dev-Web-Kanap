 // récupération array product

 let itemBackup = JSON.parse(localStorage.getItem("itemInCart"));

 // console.log(itemBackup);



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
 for (const article of itemBackup) {
     
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
         productTitle.innerHTML = product.name;
 
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

   // prix total : 
   calculProduct();
 
         // création du tableau de prix
         // let prixTotal = [];

         // boucle de récupération des prix
         // for (let p = 0; p < itemBackup.length; p++){
         //     let priceArticles = product.price;

         //     // prix inside prix total
         //     prixTotal.push(priceArticles);
         //     console.log(prixTotal);
         // }
 }
  
 )};
 
};

const calculProduct = async (itemBackup, minQuantity, maxQuantity, removeProduct) => {
 await itemBackup
 await minQuantity
 await maxQuantity
 await removeProduct

 console.log("testing")

 let productPrice = [];
 let quantityTotalProduct = [];
 
 let newArray = JSON.parse(localStorage.getItem("itemInCart"));
 console.log(newArray);

 let affichageQuantity = document.querySelectorAll(".itemQuantity")
 console.log(affichageQuantity);

 newArray.forEach((product) => {
     productPrice.push(`${product.price}`.toString().replace(/00/,"") * product.quantityProduct);
     quantityTotalProduct.push(product.quantityProduct);
 })

 console.log(productPrice);
 console.log(quantityTotalProduct);

}


