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
  worksModal.innerHTML = "";

  const div = document.createElement("div");
  div.className = "worksModal";
  const poubelle = document.querySelectorAll(".poubelle");

  for (const work of works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    // creation de l'icone poubelle pour la suppresion de photo
    gestionPoubelleDelete();

    //création des éléments html sur les works dans la modal (figcaption)
    figcaptionWorksModal();
  }
  // création des différents éléments html modal galeriePhoto
  htmlWorksModal();
}

function gestionPoubelleDelete() {
  // creation de l'icone poubelle pour la suppresion de photo
  const iconePoubelle = document.createElement("i");
  iconePoubelle.className = "fa-regular fa-trash-can poubelle";
  iconePoubelle.addEventListener("click", (e) => {
    let token = JSON.parse(localStorage.getItem("tokenUSER"));
    fetch(`http://localhost:5678/api/works/${work.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        init();
      });
  });
}

//création des éléments html sur les works dans la modal
function figcaptionWorksModal() {
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  figcaption.textContent = "éditer";

  worksModal.appendChild(div);
  div.appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(iconePoubelle);
  figure.appendChild(figcaption);
}

// création des différents éléments html modal galeriePhoto
function htmlWorksModal() {
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

// fonction pour la modal ajout photo
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
  htmlModalAjoutPhoto(); // fichier modal.js

  // gestion de mon input pour l'img preview
  inputFiles.addEventListener("change", function () {
    imgPreview(); // fichier index.js
  });

  // creation du bouton ajouter photo + le texte en dessous
  creationBoutonAjoutPhoto(); // fichier modal.js

  // création des elements du formulaire d'ajout photo
  gestionFormAjoutPhoto(); // fichier modal.js

  // assemblage de tout les elements du formulaire
  appendChildElementForm(); // fichier modal.js
}

function imgPreview() {
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
}

function verifFormAjoutPhoto(inputFiles, inputTitre, cats) {
  boutonAjoutPhoto = document.querySelector(".boutonAjoutPhoto");

  console.log(document.forms["divElementFiles"]["inputTitre"].value);

  let c1 = document.forms["divElementFiles"]["inputFiles"].files[0];
  let c2 = document.forms["divElementFiles"]["inputTitre"].value;
  let c3 = document.forms["divElementFiles"]["cats"].value;
  if (
    (c1 == !null || c1 == !"",
    c2 == !null || c2 == !"",
    c3 == !null || c3 == !"")
  ) {
    boutonAjoutPhoto.disabled = false;
    boutonAjoutPhoto.style = "color : green";
  }
}

function envoiData() {
  const formData = [];
  // const formData = new formData();
  // formData.append('image', Value)

  fetch(`http://localhost:5678/api/works/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
