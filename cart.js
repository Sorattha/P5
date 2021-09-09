let cart = document.querySelector(".commande");
let copyOfLS = JSON.parse(localStorage.getItem("products"));

main();

function main() {
  displayCart();
  countTotalInCart();
  toEmptyCart();

}

function displayCart() {
  let test = document.querySelector(".panier-vide");
  let cartCard = document.querySelector(".panier");
  let emptyCart = document.querySelector(".vide");

 
  if (localStorage.getItem("products")) {
    cartCard.style.display = "flex";
    cartCard.style.flexDirection = "column";
    cartCard.style.justifyContent = "space-around";
    emptyCart.style.display = "none";
  }

  for (let produit in copyOfLS) {
    let productRow = document.createElement("div");
    cart.insertBefore(productRow, test);
    productRow.classList.add("recapitulatif", "product-row");

    let nom = document.createElement("div");
    productRow.appendChild(nom);
    nom.classList.add("recap-produit");
    nom.innerHTML = copyOfLS[produit].name;

    let quantite = document.createElement("div");
    productRow.appendChild(quantite);
   quantite.classList.add("recap-produit", "quantité");
    quantite.innerHTML = copyOfLS[produit].quantity;

    let prix = document.createElement("div");
    productRow.appendChild(prix);
    prix.classList.add(
      "recap-produit",
      "prix",
      "price"
    );

    /* Affichage du prix avec le formatage €*/
    prix.innerHTML = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(copyOfLS[produit].price * copyOfLS[produit].quantity);
  }
}

function countTotalInCart() {
  let arrayOfPrice = [];
  let totalPrice = document.querySelector(".total");

  /*On push chaque prix du DOM dans un tableau*/
  let productPrixQuantité = document.querySelectorAll(".price");
  for (let price in productPrixQuantité) {
    arrayOfPrice.push(productPrixQuantité[price].innerHTML);
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
  totalPrice.innerText = `Total : ${(arrayOfPrice = new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency: "EUR",
    }
  ).format(arrayOfPrice))}`;
}

function toEmptyCart() {

 /*Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage*/
  const buttonToEmptyCart = document.querySelector(".vider");
  buttonToEmptyCart.addEventListener("click", () => {
    localStorage.clear();
  });
}



