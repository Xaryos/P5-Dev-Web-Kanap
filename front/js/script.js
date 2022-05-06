// Mise en place
main();

function main() {
    getProducts();
}

// Récupération API

function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function(res){
            console.log(res)
            return res.json();
        })
// Message Erreur
        .catch((err) => {
            let itemsContainer = document.querySelector("#items");
            itemsContainer.innerHTML =
            "Les items n'ont pas pu être chargés correctement" + err;
        })


// Récupération données API

        .then(function(donnéesApi) {
            const articles = donnéesApi;
            console.log(articles);

// Mise en page des données            
            for (let article in articles) {
                let masterContainer = document.querySelector('.items');

                let productLink = document.createElement("a");
                masterContainer.appendChild(productLink);
                productLink.href=`./product.html?id=${donnéesApi[article]._id}`;

                let productArticle = document.createElement("article");
                masterContainer.appendChild(productArticle);

                let productImage = document.createElement("img");
                productArticle.appendChild(productImage);
                productImage.src = donnéesApi[article].imageUrl;
                productImage.alt = donnéesApi[article].altTxt;

                let productTitle = document.createElement('h3');
                productArticle.appendChild(productTitle);
                productTitle.classList.add("productName")
                productTitle.innerHTML = donnéesApi[article].name;

                let productDescription = document.createElement('p');
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productDescription")
                productDescription.innerHTML = donnéesApi[article].description;
            }
        })
}
