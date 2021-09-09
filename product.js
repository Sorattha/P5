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
  checkIf404();
  getArticles();
  addToCart();
}

function checkIf404() {
  window.addEventListener("error", (e) => {
      let container = document.querySelector(".container");
      container.innerHTML = `<p>Cette page n'existe pas.</p>`;
    },
    true
  );
}

function getArticles() {
  
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      let container = document.querySelector(".container");
      container.innerHTML =
        "Nous n'avons pas réussi à afficher nos nounours. Avez-vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
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

        arrayProductsInCart.push(productAdded);
        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      
      confirmation.style.visibility = "visible";
      textConfirmation.innerHTML = `Vous avez ajouté ${nombre.value} nounours à votre panier !`;
      setTimeout("location.reload(true);", 4000);
    }
  });
}


