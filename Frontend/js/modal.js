//fonction pour ouvrir la modale avec en paramètre l'evenement
const openModal = function (e) {
  // empeche le navigateur de se comporter convenablement
  e.preventDefault();
  // pour récupérer #modal1
  const modal = document.querySelector(e.target.getAttribute("href"));
  //enleve le display none de la div
  modal.style.display = null;
  // supprimer l'attribut aria-hidden pour rendre visible l'element
  modal.removeAttribute("aria-hidden");
  // passe aria-modal a true
  modal.setAttribute("aria-modal", "true");
  // appel de la fonction closeModal au click
  modal.addEventListener("click", closeModal);
  // appel de la fonction closeModal au click pour les elements qui ont la classe .js-modal-close
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  // appel de la fonction stopPropagation au click pour .js-modal-stop
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

//fonction closeModal pour fermer la modal
const closeModal = function (e) {
  // on récupère la balise aside
  const modal = e.target.closest("aside");
  // empeche le navigateur de se comporter convenablement
  e.preventDefault();
  //ajout du display none de la div
  modal.style.display = "none";
  // passe aria-hidden a true pour le rendre invisible
  modal.setAttribute("aria-hidden", "true");
  // suppresion de l'attribut aria-modal
  modal.removeAttribute("aria-modal");
  // suppresion des eventlisterner au click
  modal.removeEventListener("click", closeModal);
  // suppresion des eventlisterner au click
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  // suppresion des eventlisterner au click
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};

//function pour que la modal se ferme lorsque l'on clique en dehors
const stopPropagation = function (e) {
  e.stopPropagation();
};

// fonction pour ajouter des addeventlisterner sur les liens générés 'modifier'
function eventModal() {
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
}
