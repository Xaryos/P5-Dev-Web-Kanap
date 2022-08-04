// Récupération données API
fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(articles => {
        createArticles(articles)
    })
    // Message Erreur
    .catch((err) => {
        console.log(err);
        document.querySelector("#items").innerHTML = "Les items n'ont pas pu être chargés correctement";
    })

// Mise en page des données
function createArticles(articles) {
    for (let article of articles) {
        let masterContainer = document.querySelector('.items');

        let productLink = document.createElement("a");
        masterContainer.appendChild(productLink);
        productLink.href = `./product.html?id=${article._id}`;

        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        let productImage = document.createElement("img");
        productArticle.appendChild(productImage);
        productImage.src = article.imageUrl;
        productImage.alt = article.altTxt;

        let productTitle = document.createElement('h3');
        productArticle.appendChild(productTitle);
        productTitle.innerHTML = article.name;

        let productDescription = document.createElement('p');
        productArticle.appendChild(productDescription);
        productDescription.innerHTML = article.description;
    }
};
