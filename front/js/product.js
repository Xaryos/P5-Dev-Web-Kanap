// récupération de l'id depuis le liens

let idItems = window.location.search.split("?id=").join("");

// initialisation 

main();

function main() {
    getProducts();
}    

// récupération produit
async function getProducts() {
   await fetch(`http://localhost:3000/api/products/${idItems}`)
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
                        colorSelection.value=`${product.colors[i]}`;
                        colorSelection.innerText = product.colors[i];
                        colorSlide.append(colorSelection);
                    
                    };
}
)};




AddToCart();
    function AddToCart () {
     
    // Boutton ajouter au panier 

        let addToCartBtn = document.querySelector("#addToCart"); 

// Listener : action quand le bouton est cliqué 

   addToCartBtn.addEventListener("click", () => {



        // definitions des objets 
        let quantityPick = document.querySelector("#quantity");
        let ColorPick = document.querySelector("#colors");

        let idProduct = idItems;
        let colorProduct = ColorPick.value;
        let quantityProduct = quantityPick.value;
        let nameProduct = document.querySelector("#title").textContent;
        let imgProduct = product.scr;
        let altProduct = product.alt;
        let priceProduct = document.querySelector("#price");

        // condition : vérifications des champs bien rentrés
        if (quantityPick.value > 0 && quantityPick.value <100 && ColorPick.value !=0) {

            // condition : présence dans le panier 
                if (localStorage.getItem("itemInCart")) {

                    // récupèration du panier 
                    let arrayItems = getCart ();

                    // vérification présence d'item

                const productFinded = arrayItems.find(
                    (el) => el.idProduct === idItems && el.colorProduct === colorProduct
                    );
                
                    // condition : si l'objet est trouvé 
                    if (productFinded) {
                        // definition de la variable de la nouvelle quantitée
                        let updatedQuantity = parseInt(quantityProduct) + parseInt(productFinded.quantityProduct);
                        
                        // ajout de la nouvelle quantitée au produit
                        productFinded.quantityProduct = updatedQuantity;
                        localStorage.setItem("itemInCart", JSON.stringify(arrayItems));
                    }
                    // condition : si l'objet n'est pas trouvé
                    else {
                        // récupération du localStorage
                        let arrayItems = JSON.parse(localStorage.getItem("itemInCart"));

                            // création de la boite

                            let boxProduct = {
                                nameProduct,
                                quantityProduct,
                                colorProduct,
                                imgProduct : imgProduct,
                                altProduct,
                                // priceProduct : priceProduct,
                                idProduct
                            };

                                // intégration de la boite dans le LS

                                arrayItems.push(boxProduct);

                                let storedProduct = JSON.stringify(arrayItems);
                                localStorage.setItem("itemInCart", storedProduct);
                    };
console.log("test2");
                // condition: non présence dans le panier
                } else {

                    let arrayItems = [];

                     // definitions des objets 
                    let quantityPick = document.querySelector("#quantity");
                    let ColorPick = document.querySelector("#colors");
                    

                    let idProduct = idItems;
                    let colorProduct = ColorPick.value;
                    let quantityProduct = quantityPick.value;
                    let nameProduct = document.querySelector("#title").textContent;  
                    let imgProduct = product.src;
                    let altProduct = product.alt;
                    let priceProduct = document.querySelector("#price");

                    let boxProduct = {
                        nameProduct,
                        quantityProduct,
                        colorProduct,
                        imgProduct : imgProduct,
                        altProduct,
                        // priceProduct : priceProduct,
                        idProduct
                    };


                    // intégration de la boite dans le LS

                    arrayItems.push(boxProduct);

                    let storedProduct = JSON.stringify(arrayItems);
                    localStorage.setItem("itemInCart", storedProduct);


                    
                }
console.log("test3");
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
