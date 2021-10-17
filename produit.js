let params = new URL(document.location).searchParams;
let id = params.get("id");

const image = document.querySelector(".img");
const noms = document.querySelector(".titre");
const description = document.querySelector(".description");
const prix = document.querySelector(".prix");
const nombre = document.querySelector("#nombre");
const colorSelect = document.querySelector("#color-select");


main();

function main() {
  getArticles();
  addToCart();
}

function getArticles() {
  
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      let container = document.querySelector(".container");
      container.innerHTML =
        "Nous n'avons pas réussi à afficher la page. <br>Si le problème persiste, contactez-nous.";
      container.style.textAlign = "center";
      container.style.padding = "45vh 0";
    })
    .then(function (resultatAPI) {
     
      article = resultatAPI;
      noms.innerHTML = article.name;
      image.src = article.imageUrl;
      description.innerText = article.description;

 
      article.price = article.price / 100;
      prix.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(article.price);

      let colorSelect = document.getElementById("color-select");
      for (let i = 0; i < article.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.colors[i];
        colorSelect.appendChild(option);
      }
    });
}

function addToCart() {
  const ajout = document.querySelector(".ajout");
  const confirmation = document.querySelector(".confirmation");
  const textConfirmation = document.querySelector(".confirmation-text");
  
  ajout.addEventListener("click", () => {
    if (nombre.value > 0 && nombre.value < 100) {
      let productAdded = {
        name: noms.innerHTML,
        price: parseFloat(prix.innerHTML),
        quantity: parseFloat(document.querySelector("#nombre").value),
        _id: id,
      };

  
      let arrayProductsInCart = [];
    
      if (localStorage.getItem("products") !== null) {
        arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
     
      } 

      /* Si l'élément existe dans le panier, on augmente la quantité*/

      arrayProductsInCart.forEach(element => {
        if(element._id==productAdded._id) {
          element.quantity=element.quantity+productAdded.quantity;

      } 
      });

      /* Si l'élément n'existe pas dans le panier, on le recherche et on le rajoute*/

      const found = arrayProductsInCart.some(el => el._id === productAdded._id);
      if (!found) {
        arrayProductsInCart.push(productAdded);
      }
      
      
        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      
        confirmation.style.visibility = "visible";
        textConfirmation.innerHTML = `Vous avez ajouté ${nombre.value} nounours à votre panier !`;
        setTimeout("location.reload(true);", 4000);
    }
  });
}


