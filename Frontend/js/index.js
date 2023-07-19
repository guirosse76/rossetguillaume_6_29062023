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
        //Création des elements du mode édition
        gestionModeEdition();
      });
  });

function createWorks(works, newworks) {
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

  for (const newworks of works) {
    if (newworks.category.id === "1") {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      // img.src = newworks.imageUrl;
      // figcaption.textContent = newworks.title;
      work.category.id = 1;
      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
    }
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
      } else if (filtres === "Objets") {
        newworks = "Objets";

        createWorks(works, newworks);
        test = "Objets";
      } else {
        test = "fuck";
      }
    });
  }
}

function checkConnexion() {
  token = localStorage.getItem("tokenUSER");
  const login = document.getElementById("login");
  if ((token = !undefined)) {
    login.innerHTML = "logout";
    login.addEventListener("click", (e) => {
      localStorage.removeItem("tokenUSER");
    });
  }
}

function gestionModeEdition() {
  const bar = document.querySelector(".barEdit");
  const iconeImage = document.createElement("i");
  const p = document.createElement("p");
  const bouton = document.createElement("span");
  bar.appendChild(iconeImage);
  bar.appendChild(p);
  bar.appendChild(bouton);

  const modifImage = document.getElementById(introduction);
  introduction.appendChild(iconeImage);
  introduction.appendChild(p);

  const modifProjet = document.getElementById(titre);
  const iconeProjet = document.createElement("i");
  titre.appendChild(iconeProjet);
}
