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
          checkConnexion(cats, works);
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

function createWorksInModal(works) {
  const worksModalContainer = document.getElementById("worksModalContainer");
  worksModalContainer.innerHTML = "";

  for (const work of works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figcaption.textContent = "éditer";

    // creation de l'icone poubelle pour la suppresion de photo
    const iconePoubelle = document.createElement("i");
    iconePoubelle.className = "fa-regular fa-trash-can poubelle";
    iconePoubelle.addEventListener("click", (e) => {
      deleteWorks(work.id);
    });

    worksModalContainer.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(iconePoubelle);
    figure.appendChild(figcaption);
  }
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

// création des différents éléments html modal galeriePhoto
function createWorksModal() {
  const worksModal = document.querySelector(".modal-wrapper");
  // worksModal.innerHTML = "";
  const div = document.createElement("div");
  div.className = "worksModal";
  div.id = "worksModalContainer";
  worksModal.appendChild(div);
  const divFooterModal = document.createElement("div");

  divFooterModal.className = "divFooterModal";
  worksModal.appendChild(divFooterModal);
  const bar = document.createElement("hr");
  bar.className = "bar-modal1";

  divFooterModal.appendChild(bar);

  // creation du bouton ajoutPhoto dans la modal GalleryPhoto + le lien supprimer une galerie
  const boutonAjoutPhoto = document.createElement("a");
  boutonAjoutPhoto.className = "boutonAjoutPhoto ";
  boutonAjoutPhoto.innerHTML = "Ajouter une photo";
  boutonAjoutPhoto.id = "add-picture";
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

function deleteWorks(id, works) {
  let token = JSON.parse(localStorage.getItem("tokenUSER"));
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      init();

      // //Créer les works dans le HTML
      // createWorks(works);
      // //Ajout du bouton Tous en premier
      // const allCat = { id: 0, name: "Tous" };
      // cats.unshift(allCat);
      // // création des catégorie et des projets
      // createCategories(cats, works);
      // // vérification si la personne est connecté
      // checkConnexion(cats, works);
    }
  });
}
