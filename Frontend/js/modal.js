//fonction pour ouvrir la modale avec en paramètre l'evenement
const openModal = function (e) {
  // empeche le navigateur de se comporter convenablement
  e.preventDefault();
  // pour récupérer la balise a contenant la fleche
  let targetElt = e.target.closest("a");
  // pour récupérer #modal1
  const modal = document.querySelector(targetElt.getAttribute("href"));
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
  const modal = e.target.closest("section");
  // empeche le navigateur de se comporter convenablement
  e.preventDefault();

  closeModalElement(modal);
};

const closeModalElement = function (element) {
  //ajout du display none de la div
  element.style.display = "none";
  // passe aria-hidden a true pour le rendre invisible
  element.setAttribute("aria-hidden", "true");
  // suppresion de l'attribut aria-modal
  element.removeAttribute("aria-modal");
  // suppresion des eventlisterner au click
  element.removeEventListener("click", closeModal);
  // suppresion des eventlisterner au click
  element
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  // suppresion des eventlisterner au click
  element
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

// fonction pour la modal ajout photo
function createAddWorkModal(cats) {
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
  divElementFiles.name = "divElementFiles";
  divElementFiles.className = "divElementFiles";
  divElementFiles.innerHTML = "";

  ajoutFiles.appendChild(divElementFiles);
  const divPreview = document.createElement("div");
  divPreview.className = "divPreview";
  divPreview.id = "divPreview";
  const iconeFiles = document.createElement("i");
  iconeFiles.className = "fa-solid fa-image";
  iconeFiles.id = "iconeFiles";
  divElementFiles.appendChild(divPreview);
  divPreview.appendChild(iconeFiles);

  // creation de mon input caché qui permet de charger l'image
  const inputFiles = document.createElement("input");
  inputFiles.className = "inputFiles";
  inputFiles.name = "inputFiles";
  inputFiles.id = "inputFiles";
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
      img.id = "imgPreview";
      img.src = imgUrl;
      divPreview.appendChild(img);
    };
    reader.readAsDataURL(image);
  });

  // creation du bouton ajouter photo + le texte en dessous
  spanBoutonFiles = document.createElement("span");
  spanBoutonFiles.className = "spanBoutonFiles";
  spanBoutonFiles.id = "spanBoutonFiles";
  spanBoutonFiles.innerHTML = "+ Ajouter photo";
  divElementFiles.appendChild(spanBoutonFiles);
  const pFiles = document.createElement("p");
  pFiles.className = "pFiles";
  pFiles.id = "pFiles";
  pFiles.innerHTML = "jpg, png : 4mo max";
  divPreview.appendChild(inputFiles);
  divPreview.appendChild(spanBoutonFiles);
  divPreview.appendChild(pFiles);

  // création des elements du formulaire d'ajout photo
  // création de la div qui va avoir tout les elements input
  const divLabels = document.createElement("div");
  divLabels.className = "divLabels";

  // création du champ input titre avec son label
  labelTitre = document.createElement("label");
  labelTitre.innerHTML = "Titre :";
  inputTitre = document.createElement("input");
  inputTitre.className = "inputTitre";
  inputTitre.name = "inputTitre";

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
  boutonAjoutPhoto.className = "boutonSubmitForm";
  boutonAjoutPhoto.innerHTML = "Valider";
  boutonAjoutPhoto.disabled = true;

  divElementFiles.addEventListener("input", function (event) {
    event.preventDefault();
    verifFormAjoutPhoto(inputFiles, inputTitre, cats);
  });

  divElementFiles.addEventListener("submit", function (event) {
    event.preventDefault();

    if (boutonAjoutPhoto.disabled === false) {
      addNewWork();
    }
  });

  divElementFiles.appendChild(divLabels);
  divLabels.appendChild(labelTitre);
  divLabels.appendChild(inputTitre);
  divLabels.appendChild(label);
  divLabels.appendChild(select);
  divLabels.appendChild(barModalAjoutPhoto);
  divLabels.appendChild(boutonAjoutPhoto);
}

function verifFormAjoutPhoto(inputFiles, inputTitre, cats) {
  const boutonAjoutPhoto = document.querySelector(".boutonSubmitForm");

  let champInputFiles =
    document.forms["divElementFiles"]["inputFiles"].files[0];
  let champInputTitre = document.forms["divElementFiles"]["inputTitre"].value;
  let champCategorie = document.forms["divElementFiles"]["cats"].value;

  if (champInputTitre && champCategorie && champInputFiles) {
    boutonAjoutPhoto.disabled = false;
    boutonAjoutPhoto.style = "background-color : #1D6154";
  }
}

function addNewWork() {
  const formData = new FormData();

  const imgUrl = document.forms["divElementFiles"]["inputFiles"].files[0];
  const title = document.forms["divElementFiles"]["inputTitre"].value;
  const category = document.forms["divElementFiles"]["cats"].value;

  formData.append("image", imgUrl);
  formData.append("title", title);
  formData.append("category", category);

  fetch(`http://localhost:5678/api/works/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((json) => {
      init();
      closeModalElement(document.getElementById("modalAjoutPhoto"));
      resetFrom();
    });
}

function resetFrom() {
  const img = document.getElementById("imgPreview");
  img.remove();

  const form = document.querySelector(".divElementFiles");
  form.reset();
  const iconeFiles = document.getElementById("iconeFiles");
  iconeFiles.style = "display = block;";

  const inputFiles = document.getElementById("inputFiles");
  inputFiles.style = "display : flex; ";

  const spanBoutonFiles = document.getElementById("spanBoutonFiles");
  spanBoutonFiles.style = "display : flex;";

  const pFiles = document.getElementById("pFiles");
  pFiles.style = "display : block";

  const divPreview = document.getElementById("divPreview");
  divPreview.style = "padding-top : 10px;";
}
