main();

function main() {
  commandeValide();
}

function commandeValide() {
  const totalCommande = document.querySelector(".total span");
  const numeroCommande = document.querySelector(".numero span");
  
  totalCommande.innerText = localStorage.getItem("total");
  numeroCommande.innerText = localStorage.getItem("numero");

}

