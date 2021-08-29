main();
getArticles();

function main() {
}

function getArticles() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      let blocproduit = document.querySelector(".bloc-produits");
      blocproduit.innerHTML =
        "Impossible d'afficher la page.";
    })

    /* Récupérer les données de l'API */

    .then(function (données) {
      const articles = données;
      console.log(articles);
      for (let article in articles) {

    let ficheProduit = document.createElement("div");
    document.querySelector(".produits").appendChild(ficheProduit);
    ficheProduit.classList.add("article");
   

    /* Créer un lien  vers la fiche produit */

    let lien = document.createElement("a");
    ficheProduit.appendChild(lien);
    lien.href = `produit.html?id=${données[article]._id}`;
    lien.classList.add("lien-produit");
    
    /* Créer une "div" img et récupérer les images de l'API*/

    let ImgDiv = document.createElement("div");
    lien.appendChild(ImgDiv);
    ImgDiv.classList.add("img");

    let Img = document.createElement("img");
    ImgDiv.appendChild(Img);
    Img.src = données[article].imageUrl;
      
    /* Créer une "div" infos et récupérer les noms et prix de l'API */

    let InfosDiv = document.createElement("div");
    lien.appendChild(InfosDiv);
    InfosDiv.classList.add("infos");

    let Noms = document.createElement("div");
    InfosDiv.appendChild(Noms);
    Noms.classList.add("noms");
    Noms.innerHTML = données[article].name;

    let Prix = document.createElement("div");
    InfosDiv.appendChild(Prix);
    Prix.classList.add("prix");
    Prix.innerHTML = données[article].price;
      
    /* Mettre prix au format € */

    données[article].price = données[article].price / 100;
    Prix.innerHTML = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(données[article].price);

      }
    });
}

