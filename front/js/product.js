// récupération de l'id depuis le liens

let idItems = window.location.search.split("?id=").join("");

// initialisation 

main();

function main() {
    getProducts();
}    

// récupération produit
function getProducts() {
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
                        colorSelection.value=`${product.colors[i]}`;
                        colorSelection.innerText = product.colors[i];
                        colorSlide.append(colorSelection);
                    
                    };

        // bouton panier

        let addToCartBtn = document.getElementById("addToCart"); 
        let numberPick = document.querySelector("#quantity");   
        
        let itemName = document.querySelector("#title");
        let itemPrice = document.querySelector("#price");
        let colorItem = document.querySelector("#colors");
        
                    
        addToCartBtn.addEventListener("click", function() {
            // récupération des infos liées au produit
            let addItem = {

                name: itemName.innerHTML,
                price: parseFloat(itemPrice.innerHTML),
                _id: idItems,
                quantity: parseFloat(numberPick.value),
                color: colorItem.value,
                image: product.imageUrl,
            };

            if (numberPick.value > 0 && numberPick.value <100) {

            // init produit en tableau

            let arrayItems = [];

            // ajout de l'objet au tableau 
            arrayItems.push(addItem);
            localStorage.setItem("itemGet", JSON.stringify(arrayItems));

            // // information de mise au panier          
            // alert("l'objet a bien été mis au panier");

            console.log(arrayItems);

            cartLink();
            
            function cartLink(){
                document.location.href="http://127.0.0.1:5500/front/html/cart.html"; 
              }

        }
        else {

            alert("Veuillez choisir un chiffre entre 1 et 100 puis reessayez.");

        }

        return (arrayItems = JSON.parse(localStorage.getItem("itemGet")));
        
            

        });
    });
}


