// gestion de l'affichage des images avec le titre
function init() {
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
          ajoutPhoto(cats);
        });
    });
}

init();

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
  const poubelle = document.querySelectorAll(".poubelle");

  for (const work of works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    // creation de l'icone poubelle pour la suppresion de photo
    const iconePoubelle = document.createElement("i");
    iconePoubelle.className = "fa-regular fa-trash-can poubelle";
    iconePoubelle.addEventListener("click", (e) => {
      let token = JSON.parse(localStorage.getItem("tokenUSER"));
      console.log(token);
      console.log(work.id);
      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          init();
          console.log("test");
        });
    });

    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    figcaption.textContent = "éditer";

    worksModal.appendChild(div);
    div.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(iconePoubelle);
    figure.appendChild(figcaption);
  }

  const divFooterModal = document.createElement("div");
  divFooterModal.className = "divFooterModal";
  const bar = document.createElement("hr");
  bar.className = "bar-modal1";
  worksModal.appendChild(divFooterModal);
  divFooterModal.appendChild(bar);

  // creation du bouton ajoutPhoto dans la modal GalleryPhoto + le lien supprimer une galerie
  const boutonAjoutPhoto = document.createElement("a");
  boutonAjoutPhoto.className = "boutonAjoutPhoto ";
  boutonAjoutPhoto.innerHTML = "Ajouter une photo";
  boutonAjoutPhoto.setAttribute("href", "#modalAjoutPhoto");
  divFooterModal.appendChild(boutonAjoutPhoto);
  boutonAjoutPhoto.addEventListener("click", (e) => {
    closeModal(e);
    openModal(e);
  });
  const suppGallery = document.createElement("a");
  suppGallery.innerHTML = "Supprimer une galerie";
  divFooterModal.appendChild(suppGallery);
}

// fonction pour la creation et gestion de la modal ajout photo
function ajoutPhoto(cats) {
  const ajoutPhotoModal = document.querySelector(".header-modal-ajout-photo");
  const lienFleche = document.createElement("a");
  lienFleche.className = "lienFleche js-modal js-modal-close";
  lienFleche.setAttribute("href", "#modalGaleriePhoto");
  const fleche = document.createElement("i");
  fleche.className = "fa-solid fa-arrow-left flecheRetour";
  ajoutPhotoModal.appendChild(lienFleche);
  lienFleche.appendChild(fleche);
  lienFleche.addEventListener("click", (e) => {
    closeModal(e);
    openModal(e);
  });

  // creation des différents elements pour ma modal ajout photo
  const ajoutFiles = document.querySelector(".modal-ajout-photo");
  const divElementFiles = document.createElement("form");
  divElementFiles.className = "divElementFiles";
  ajoutFiles.appendChild(divElementFiles);
  const divPreview = document.createElement("div");
  divPreview.className = "divPreview";
  const iconeFiles = document.createElement("i");
  iconeFiles.className = "fa-solid fa-image";
  divElementFiles.appendChild(divPreview);
  divPreview.appendChild(iconeFiles);

  // creation de mon input caché qui permet de charger l'image
  const inputFiles = document.createElement("input");
  inputFiles.className = "inputFiles";
  inputFiles.type = "file";
  inputFiles.accept = ".jpg, .png";
  divElementFiles.appendChild(inputFiles);

  // gestion de mon input pour l'img preview
  inputFiles.addEventListener("change", function () {
    divPreview.style = "padding-top : 0px";
    iconeFiles.style = "display : none";
    inputFiles.style = "display : none";
    spanBoutonFiles.style = "display : none";
    pFiles.style = "display : none";
    const image = this.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = reader.result;
      const img = document.createElement("img");
      img.src = imgUrl;
      divPreview.appendChild(img);
    };
    reader.readAsDataURL(image);
  });

  // creation du bouton ajouter photo + le texte en dessous
  spanBoutonFiles = document.createElement("span");
  spanBoutonFiles.className = "spanBoutonFiles";
  spanBoutonFiles.innerHTML = "+ Ajouter photo";
  divElementFiles.appendChild(spanBoutonFiles);
  const pFiles = document.createElement("p");
  pFiles.className = "pFiles";
  pFiles.innerHTML = "jpg, png : 4mo max";
  divPreview.appendChild(inputFiles);
  divPreview.appendChild(spanBoutonFiles);
  divPreview.appendChild(pFiles);

  // création de la div qui va avoir tout les elements input
  const divLabels = document.createElement("div");
  divLabels.className = "divLabels";

  // création du champ input titre avec son label
  labelTitre = document.createElement("label");
  labelTitre.innerHTML = "Titre :";
  inputTitre = document.createElement("input");
  inputTitre.className = "inputTitre";

  // création de la liste déroulante avec toutes les categories sauf tous
  const select = document.createElement("select");
  select.name = "cats";
  select.id = "cats";
  for (const val of cats) {
    if (val.id !== 0) {
      const option = document.createElement("option");
      option.value = val.id;
      option.text = val.name;
      select.appendChild(option);
    }
  }
  const label = document.createElement("label");
  label.innerHTML = "Catégorie :";
  label.htmlFor = "cats";

  // creation de la barre dans modalAjoutPhoto
  const barModalAjoutPhoto = document.createElement("hr");
  barModalAjoutPhoto.className = "bar-modal2";

  // creation du bouton valider dans modalAjoutPhoto
  const boutonAjoutPhoto = document.createElement("button");
  boutonAjoutPhoto.className = "boutonAjoutPhoto";
  boutonAjoutPhoto.innerHTML = "Valider";
  boutonAjoutPhoto.disabled = true;

  // assemblage de tout les elements a rattacher a divLbales
  divElementFiles.appendChild(divLabels);
  divLabels.appendChild(labelTitre);
  divLabels.appendChild(inputTitre);
  divLabels.appendChild(label);
  divLabels.appendChild(select);
  divLabels.appendChild(barModalAjoutPhoto);
  divLabels.appendChild(boutonAjoutPhoto);

  verifFormAjoutPhoto(inputTitre);
}

function verifFormAjoutPhoto(inputTitre) {
  boutonAjoutPhoto = document.querySelector(".boutonAjoutPhoto");
  if (inputTitre == !undefined) {
    boutonAjoutPhoto.disabled = false;
    boutonAjoutPhoto.style = "color : black";
  }
}

function envoiData() {
  fetch(`http://localhost:5678/api/works/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const form = document.querySelector("divElementFiles");
      console.log(form);
    });
}

function createCategories(cats, works) {
  // on selectionne l'element avec la classe .Categorie
  const categorie = document.querySelector(".categorie");

  // boucle pour générer les catégories
  for (const cat of cats) {
    // création d'un element span
    let span = document.createElement("span");
    // ajout du contenu de la span avec le cat.name
    span.textContent = cat.name;
    // ajout de la classe span
    span.className = "span";
    // rattachement à l'element categorie
    categorie.appendChild(span);

    // si le nom de la catégorie est tous alors ajouter la classe span_selected
    if (cat.name === "Tous") {
      span.classList.add("span_selected");
    }
    // ajout d'un addEventListener sur chaque span
    span.addEventListener("click", (e) => {
      // on récupère le texte de la span cliqué
      let filtres = e.target.textContent;
      // on supprime la classe .span_selected
      document
        .querySelector(".span_selected")
        .classList.remove("span_selected");
      // on ajoute la classe span_selected
      span.classList.add("span_selected");

      // si on a cliqué sur tous alors appel de la fonction createWorks
      if (filtres === "Tous") {
        createWorks(works);
      } else {
        //Flitrer les works par le nom de la catégorie
        const newWorks = works.filter((work) => filtres === work.category.name);
        // appel de la fonction createWorks avec en paramètre les works filtres
        createWorks(newWorks);
      }
    });
  }
}

function checkConnexion() {
  // récupération du token stocké dans le localStorage avec le nom tokenUSER
  token = localStorage.getItem("tokenUSER");
  // récupération de
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

  let test = document.querySelector(".categorie");
  test.style = "display : none;";
  eventModal();
}
