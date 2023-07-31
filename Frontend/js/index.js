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
    span.className = "span";
    categorie.appendChild(span);

    const target = document.querySelectorAll(".span");
    target[0].classList.add("span_selected");
    // function changeBackground (index){

    // }
    span.addEventListener("click", (e) => {
      let filtres = e.target.textContent;
      nombre = target.length;
      console.log(nombre);
      // span.querySelector("span_selected").classList.remove("span_selected");
      // const test = document.querySelectorAll(".span_selected");
      // test.classList.remove("span_selected");
      if (filtres === "Tous") {
        createWorks(works);
        span.classList.remove("span_selected");

        target[0].classList.add("span_selected");
      } else {
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

function changeBackgroundCat() {
  console.log(filtres);
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
  pImage.setAttribute("href", "#modal1");
  pImage.className = "js-modal";
  pImage.innerHTML = "modifier";
  introduction.appendChild(divImage);
  divImage.appendChild(iconeImage);
  divImage.appendChild(pImage);

  const modifProjet = document.getElementById(titre);
  const iconeProjet = document.createElement("i");
  iconeProjet.className = "fa-regular fa-pen-to-square";
  const aProjet = document.createElement("a");
  aProjet.setAttribute("href", "#modal1");
  aProjet.className = "js-modal";
  aProjet.innerHTML = "modifier";
  titre.appendChild(iconeProjet);
  titre.appendChild(aProjet);
  eventModal();
}
