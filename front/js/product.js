// récupération de l'id depuis le liens

let idItems = window.location.search.split("?id=").join("");
 

// récupération produit
 fetch(`http://localhost:3000/api/products/${idItems}`)
        .then(function(res){
            console.log(res);
            return res.json();
        })

        
        // Message Erreur
        .catch((err) => {
            let itemsContainer = document.querySelector(".items");
            itemsContainer.innerHTML =
            "Les items n'ont pas pu être chargés correctement";
            console.log(err);
        })

        // Ajout produits 

        .then(function (itemAPI) {
            product = itemAPI;
            console.log(product);
            
            // Récupération element HTML 
            let productDivImage = document.querySelector("div.item__img");

            let productName = document.querySelector("#title");
            let productDescription = document.querySelector("#description");
            let productPrice = document.querySelector("#price");
            
            // affichage elements 

            productName.innerHTML = product.name;
            productDescription.innerText = product.description;
            productPrice.innerHTML = product.price;

            // image

            let productImage = document.createElement("img");
            productDivImage.appendChild(productImage);

            productImage.src = product.imageUrl;
            productImage.alt = product.altTxt;

        

            // option 

                     let colorSlide = document.getElementById('colors'); 
                    for (let i = 0; i < product.colors.length; i++) {

                        let colorSelection = document.createElement("option");
                        colorSelection.value =`${product.colors[i]}`;
                        colorSelection.innerText = product.colors[i];
                        colorSlide.append(colorSelection);
                    
                    };
}
)//};




AddToCart();
    function AddToCart () {
     
    // Boutton ajouter au panier 

        let addToCartBtn = document.querySelector("#addToCart"); 

// Listener : action quand le bouton est cliqué 

   addToCartBtn.addEventListener("click", () => {



        // definitions des objets 
        let quantityPick = document.querySelector("#quantity");
        let ColorPick = document.querySelector("#colors");

        let quantity = quantityPick.value;
        let _id = idItems;
        let color = ColorPick.value;
        let name = document.querySelector("#title").textContent;
        let imageUrl = product.scr;
        let altTxt = product.alt;

        // condition : vérifications des champs bien rentrés
        if (quantityPick.value > 0 && quantityPick.value <100 && ColorPick.value !=0) {

            // condition : présence dans le panier 
                if (localStorage.getItem("itemInCart")) {

                    // récupèration du panier 
                    let arrayItems = getCart ();

                    // vérification présence d'item

                const productFinded = arrayItems.find(
                    (el) => el._id === idItems && el.color === color
                    );
                
                    // condition : si l'objet est trouvé 
                    if (productFinded) {
                        // definition de la variable de la nouvelle quantitée
                        let updatedQuantity = parseInt(quantity) + parseInt(productFinded.quantity);
                        
                        // ajout de la nouvelle quantitée au produit
                        productFinded.quantity = updatedQuantity;
                        localStorage.setItem("itemInCart", JSON.stringify(arrayItems));
                    }
                    // condition : si l'objet n'est pas trouvé
                    else {
                        // récupération du localStorage
                        let arrayItems = JSON.parse(localStorage.getItem("itemInCart"));

                            // création de la boite

                            let boxProduct = {
                                name,
                                quantity : parseFloat(quantityPick.value),
                                color,
                                imageUrl : imageUrl,
                                altTxt,
                                // price : price,
                                _id
                            };

                                // intégration de la boite dans le LS

                                arrayItems.push(boxProduct);

                                let storedProduct = JSON.stringify(arrayItems);
                                localStorage.setItem("itemInCart", storedProduct);
                    };

                // condition: non présence dans le panier
                } else {

                    let arrayItems = [];

                     // definitions des objets 
                    let quantityPick = document.querySelector("#quantity");
                    let ColorPick = document.querySelector("#colors");
                    

                    let _id = idItems;
                    let color = ColorPick.value;
                    let name = document.querySelector("#title").textContent;  
                    let imageUrl = product.src;
                    let altTxt = product.alt;
        

                    let boxProduct = {
                        name,
                        quantity : parseFloat(quantityPick.value),
                        color,
                        imageUrl : imageUrl,
                        altTxt,
                        _id
                    };


                    // intégration de la boite dans le LS

                    arrayItems.push(boxProduct);

                    let storedProduct = JSON.stringify(arrayItems);
                    localStorage.setItem("itemInCart", storedProduct);


                    
                }

                // transport vers la page panier
                cartLink();
                function cartLink(){
                    document.location.href="http://127.0.0.1:5500/front/html/cart.html"; 
                }
        }
    })
}
        
function getCart() {
    let cart = [];

    if (localStorage.getItem("itemInCart")) {
        cart = JSON.parse(localStorage.getItem("itemInCart"));
    }

return cart;
}
