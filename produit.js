let resultat = new URL(document.location).searchParams;
let id = resultat.get("id");
console.log(id);

const image = document.querySelector(".img");
const noms = document.querySelector(".titre");
const description = document.querySelector(".description");
const prixProduit = document.querySelector(".prix");

getArticles();

function getArticles() {
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      let bloc = document.querySelector(".bloc");
      bloc.innerHTML =
        "Impossible d'afficher la page.";
    })

    /* Récupérer les données de l'API */

    .then(function (données) {
      const article = données;
      noms.innerHTML = article.name;
      image.src = article.imageUrl;
      description.innerText = article.description;

     /* Mettre prix au format € */

      article.price = article.price / 100;
      prixProduit.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      })
      .format(article.price);

      let selectCouleur = document.getElementById("select");
      for (let i = 0; i < article.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.colors[i];
        selectCouleur.appendChild(option);
      }
    });
}

    /*Création du panier*/

    panier();

function panier() {
  const ajoute = document.querySelector(".ajout");
  const confirmation = document.querySelector(".confirmation");
  const textConfirmation = document.querySelector(".confirmation-text");
  
  ajoute.addEventListener("click", () => {
    if (nombre.value > 0 && nombre.value < 500) {
      let ajoutPanier = {
        nom: noms.innerHTML,
        prix: parseFloat(prixProduit.innerHTML),
        nombre: parseFloat(document.querySelector("#nombre").value),
      };
      confirmation.style.visibility = "visible";
      textConfirmation.innerHTML = `Vous avez ajouté ${nombre.value} nounours à votre panier !`;
    } 
  });
}

