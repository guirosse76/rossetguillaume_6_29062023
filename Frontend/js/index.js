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

function createCategories(cats, works) {
  const categorie = document.querySelector(".categorie");

  for (const cat of cats) {
    let span = document.createElement("span");
    span.textContent = cat.name;
    categorie.appendChild(span);

    span.addEventListener("click", (e) => {
      let filtres = e.target.textContent;
      console.log(filtres);
      if (filtres === "Tous") {
        createWorks(works);
      } else {
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
  pBar.innerHTML = "Modifier";
  const bouton = document.createElement("span");

  const iconeImage = document.createElement("i");
  iconeImage.className = "fa-regular fa-pen-to-square";
  bar.appendChild(iconeBar);
  bar.appendChild(pBar);
  bar.appendChild(bouton);

  const modifImage = document.getElementById(introduction);
  const pImage = document.createElement("p");

  introduction.appendChild(iconeImage);
  introduction.appendChild(pImage);

  const modifProjet = document.getElementById(titre);
  const iconeProjet = document.createElement("i");
  iconeProjet.className = "fa-regular fa-pen-to-square";
  titre.appendChild(iconeProjet);
}
