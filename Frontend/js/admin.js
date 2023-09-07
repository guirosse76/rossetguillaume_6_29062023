function checkConnexion(cats, works) {
  // récupération du token stocké dans le localStorage avec le nom tokenUSER
  token = localStorage.getItem("tokenUSER");
  // récupération de
  const login = document.getElementById("login");
  if (token) {
    login.innerHTML = "logout";
    login.addEventListener("click", (e) => {
      localStorage.removeItem("tokenUSER");
    });
    const addPicture = document.getElementById("add-picture");

    if (!addPicture) {
      //Création des elements du mode édition
      gestionModeEdition();
      // création des différents éléments html modal galeriePhoto
      createWorksModal();
      // ajout des elements de la modal ajoutPhoto
      createAddWorkModal(cats);
    }
    // ajout des works dans la modal
    createWorksInModal(works);
  }
}

function gestionModeEdition() {
  const bar = document.createElement("div");
  bar.className = "barEdit";
  const headerElement = document.querySelector("header");
  // headerElement.innerHTML = "";
  const bodyElement = document.querySelector("body");

  bodyElement.insertBefore(bar, headerElement);

  const iconeBar = document.createElement("i");
  iconeBar.className = "fa-regular fa-pen-to-square iconebar";

  const pBar = document.createElement("p");
  pBar.innerHTML = "Mode Edition";
  const bouton = document.createElement("span");
  bouton.innerHTML = "publier les changements";
  bouton.className = "boutonPublication";
  bar.appendChild(iconeBar);
  bar.appendChild(pBar);
  bar.appendChild(bouton);

  const divImage = document.createElement("div");

  divImage.className = "divImage";
  const iconeImage = document.createElement("i");
  iconeImage.className = "fa-regular fa-pen-to-square";
  const modifImage = document.getElementById(introduction);
  const pImage = document.createElement("a");
  pImage.setAttribute("href", "#modalGaleriePhoto");
  pImage.className = "js-modal";
  pImage.innerHTML = "modifier";
  introduction.appendChild(divImage);
  divImage.appendChild(iconeImage);
  divImage.appendChild(pImage);

  const modifProjet = document.getElementById(titre);
  const iconeProjet = document.createElement("i");
  iconeProjet.className = "fa-regular fa-pen-to-square";
  const aProjet = document.createElement("a");
  aProjet.setAttribute("href", "#modalGaleriePhoto");
  aProjet.className = "js-modal";
  aProjet.innerHTML = "modifier";
  titre.appendChild(iconeProjet);
  titre.appendChild(aProjet);

  let test = document.querySelector(".categorie");
  test.style = "display : none;";
  eventModal();
}
