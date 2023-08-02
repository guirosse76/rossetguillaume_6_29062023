// gestion de l'affichage des images avec le titre
fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    fetch("http://localhost:5678/api/categories")
      .then((data) => data.json())
      .then((cats) => {
        //Créer les works dans le HTML
        createWorks(works);
        //Ajout du bouton Tous en premier
        const allCat = { id: 0, name: "Tous" };
        cats.unshift(allCat);

        // création des catégorie et des projets
        createCategories(cats, works);
        // vérification si la personne est connecté
        checkConnexion();
        // ajout des works dans la modal
        createWorksModal(works);
        // ajout des elements de la modal ajoutPhoto
        ajoutPhoto();
      });
  });

function createWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (const work of works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  }
}

function createWorksModal(works) {
  const worksModal = document.querySelector(".modal-wrapper");
  const div = document.createElement("div");
  div.className = "worksModal";
  for (const work of works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    figcaption.textContent = "éditer";

    worksModal.appendChild(div);
    div.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  }

  const divFooterModal = document.createElement("div");
  divFooterModal.className = "divFooterModal";
  const bar = document.createElement("hr");
  bar.className = "bar-modal1";
  worksModal.appendChild(divFooterModal);
  divFooterModal.appendChild(bar);

  const boutonAjoutPhoto = document.createElement("a");
  boutonAjoutPhoto.className = "boutonAjoutPhoto js-modal js-modal-close";
  boutonAjoutPhoto.innerHTML = "Ajouter une photo";
  boutonAjoutPhoto.setAttribute("href", "#modalAjoutPhoto");
  divFooterModal.appendChild(boutonAjoutPhoto);

  boutonAjoutPhoto.addEventListener("click", closeModal);
  const suppGallery = document.createElement("a");
  suppGallery.innerHTML = "Supprimer une galerie";
  divFooterModal.appendChild(suppGallery);
  eventModal();
}

function ajoutPhoto() {
  const ajoutPhotoModal = document.querySelector(".header-modal-ajout-photo");
  const lienFleche = document.createElement("a");
  lienFleche.className = "lienFleche js-modal js-modal-close";
  lienFleche.setAttribute("href", "#modalGaleriePhoto");
  const fleche = document.createElement("i");
  fleche.className = "fa-solid fa-arrow-left flecheRetour";
  ajoutPhotoModal.appendChild(lienFleche);
  lienFleche.appendChild(fleche);
  lienFleche.addEventListener("click", closeModal);

  const ajoutFiles = document.querySelector(".modal-ajout-photo");
  const divElementFiles = document.createElement("div");
  divElementFiles.className = "divElementFiles";
  ajoutFiles.appendChild(divElementFiles);
  const iconeFiles = document.createElement("i");
  iconeFiles.className = "fa-solid fa-image";
  divElementFiles.appendChild(iconeFiles);
  const boutonFiles = document.createElement("button");
  boutonFiles.className = "boutonAjoutFiles";
  boutonFiles.innerHTML = "+ Ajouter photo";
  divElementFiles.appendChild(boutonFiles);
  const pFiles = document.createElement("p");
  pFiles.className = "pFiles";
  pFiles.innerHTML = "jpg, png : 4mo max";
  divElementFiles.appendChild(pFiles);

  const divLabels = document.createElement("div");
  divLabels.className = "divLabels";
  labelTitre = document.createElement("label");
  labelTitre.innerHTML = "Titre";
  inputTitre = document.createElement("input");
  inputTitre.className = "inputTitre";

  const labelCategorie = document.createElement("label");
  labelCategorie.innerHTML = "Catégorie";
  const inputCategorie = document.createElement("input");
  inputCategorie.className = "inputCategorie";

  const barModalAjoutPhoto = document.createElement("hr");
  barModalAjoutPhoto.className = "bar-modal2";

  const boutonAjoutPhoto = document.createElement("button");
  boutonAjoutPhoto.className = "boutonAjoutPhoto";
  boutonAjoutPhoto.innerHTML = "Valider";
  ajoutFiles.appendChild(divLabels);
  divLabels.appendChild(labelTitre);
  divLabels.appendChild(inputTitre);
  divLabels.appendChild(labelCategorie);
  divLabels.appendChild(inputCategorie);
  divLabels.appendChild(barModalAjoutPhoto);
  divLabels.appendChild(boutonAjoutPhoto);
  eventModal();
}

function createCategories(cats, works) {
  const categorie = document.querySelector(".categorie");

  for (const cat of cats) {
    let span = document.createElement("span");
    span.textContent = cat.name;
    span.className = "span";
    categorie.appendChild(span);

    const target = document.querySelectorAll(".span");
    const spanSelected = document.querySelectorAll(".span_selected");
    span.classList.add("span");
    target[0].classList.add("span_selected");

    span.addEventListener("click", (e) => {
      let filtres = e.target.textContent;
      nombre = target.length;
      span.classList.remove("span_selected");

      if (filtres === "Tous") {
        createWorks(works);
        span.classList.add("span_selected");
      } else {
        target[0].classList.remove("span_selected");

        for (const span of target) {
          span.classList.remove("span_selected");
        }
        span.classList.add("span_selected");

        //Flitrer les works
        const newWorks = works.filter((work) => filtres === work.category.name);
        createWorks(newWorks);
      }
    });
  }
}

function checkConnexion() {
  token = localStorage.getItem("tokenUSER");
  const login = document.getElementById("login");
  if (token) {
    login.innerHTML = "logout";
    login.addEventListener("click", (e) => {
      localStorage.removeItem("tokenUSER");
    });
    //Création des elements du mode édition
    gestionModeEdition();
  }
}

function gestionModeEdition() {
  const bar = document.createElement("div");
  bar.className = "barEdit";

  const headerElement = document.querySelector("header");
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
  eventModal();
}
