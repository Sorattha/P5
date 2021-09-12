let cart = document.querySelector(".commande");
let copyOfLS = JSON.parse(localStorage.getItem("products"));

main();

function main() {
  affichePanier();
  totalPanier();
  viderPanier();
  validationForm();
}

function affichePanier() {
  let test = document.querySelector(".panier-vide");
  let panier = document.querySelector(".panier");
  let panierVide = document.querySelector(".vide");

/*On affiche le panier s'il contient un produit*/
 
  if (localStorage.getItem("products")) {
    panier.style.display = "flex";
    panier.style.flexDirection = "column";
    panier.style.justifyContent = "space-around";
    panierVide.style.display = "none";
  }

 /*Création de div pour importer les données de chaque produit*/

  for (let produit in copyOfLS) {
    let produits = document.createElement("div");
    cart.insertBefore(produits, test);
    produits.classList.add("recapitulatif");

    let nom = document.createElement("div");
    produits.appendChild(nom);
    nom.classList.add("recap-produit", "nom");
    nom.innerHTML = copyOfLS[produit].name;

    let quantite = document.createElement("div");
    produits.appendChild(quantite);
   quantite.classList.add("recap-produit", "quantite");
    quantite.innerHTML = copyOfLS[produit].quantity;

    let prix = document.createElement("div");
    produits.appendChild(prix);
    prix.classList.add("recap-produit","prix","price");

    /* Affichage du prix avec le formatage €*/
    prix.innerHTML = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(copyOfLS[produit].price * copyOfLS[produit].quantity);
  }
}

function totalPanier() {
  let arrayOfPrice = [];
  let prixTotal = document.querySelector(".total");

  /*On push chaque prix du DOM dans un tableau*/

  let produitPrixQuantite = document.querySelectorAll(".price");
  for (let price in produitPrixQuantite) {
    arrayOfPrice.push(produitPrixQuantite[price].innerHTML);
  }

  
  /*On enlève les undefined du tableau*/

  arrayOfPrice = arrayOfPrice.filter((el) => {
    return el != undefined;
  });

 /*Transformer en nombre chaque valeur du tableau*/

  arrayOfPrice = arrayOfPrice.map((x) => parseFloat(x));

  /*Additionner les valeurs du tableau pour avoir le prix total*/

  const reducer = (acc, currentVal) => acc + currentVal;
  arrayOfPrice = arrayOfPrice.reduce(reducer);

  /*Affichage du prix avec formatage €*/

  prixTotal.innerText = `Total : ${(arrayOfPrice = new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(arrayOfPrice))}`;
}

function viderPanier() {

 /*Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage*/

  const boutonVider = document.querySelector(".vider");
  boutonVider.addEventListener("click", () => {
    localStorage.clear();
  });
}

function validationForm() {

  /*On récupère les inputs depuis le DOM*/

  const commande = document.querySelector("#commander");
  let inputName = document.querySelector("#firstName");
  let inputLastName = document.querySelector("#lastName");
  let inputCity = document.querySelector("#city");
  let inputAdress = document.querySelector("#address");
  let inputMail = document.querySelector("#mail");
  let erreur = document.querySelector(".erreur");

 /*Si l'un des champs n'est pas rempli, on empêche l'envoi du formulaire*/

  commande.addEventListener("click", (e) => {
    if (
      !inputName.value ||
      !inputLastName.value ||
      !inputCity.value ||
      !inputAdress.value ||
      !inputMail.value 
    ) {
      erreur.innerHTML = "Tous les champs sont obligatoires !";
      e.preventDefault();
    } 

    else {
  
     /* Si le formulaire ets valide, on crée un tableau qui contiendra les produits commandés et les infos du client*/

      let commandeProduits = [];
      commandeProduits.push(copyOfLS);

      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          city: inputCity.value,
          address: inputAdress.value,
          email: inputMail.value,
        },
        products: commandeProduits,
      };

      /*Création de l'en-tête*/

      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      };

      /*Formatage du prix*/
      
      let ConfirmationPrix = document.querySelector(".total").innerText;
      ConfirmationPrix = ConfirmationPrix.split(" :");

      /*Envoi sur la page de confirmation*/

      fetch("http://localhost:3000/api/teddies/order", options)
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear();
          console.log(data)
          localStorage.setItem("numero", data.numero);
          localStorage.setItem("total", ConfirmationPrix[1]);

          document.location.href = "confirmation.html";
        })
      
      }
  });
  }