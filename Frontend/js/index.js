//gestion de l'affichage des catégories + la catégorie tous

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

        // console.log(works, cats);
        // console.log(works[2].category.name);
      });
  });

function createWorks(works, newWorks) {
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
      // let newWorks = work.category.filtres;
      // console.log(work.category);
      // // let newWorks = filtres.category.name;
      // createWorks(newWorks);
      // if (newWorks != work.category.name) {
      //   figure.style.display = "none";
      // }
      // newWorks = work.category.name;
      // console.log(newWorks);
    });
  }
}

function createNewCategories(cats, works) {}
