//gestion de l'affichage des catégories + la catégorie tous

fetch("http://localhost:5678/api/categories")
  .then((data) => data.json())
  .then((cats) => {
    const categorie = document.querySelector(".categorie");
    let tous = document.createElement("span");
    tous.classList.add("spantous");
    tous.textContent = "Tous";
    let parentDiv = tous.parentNode;
    categorie.appendChild(tous);
    for (const cat of cats) {
      let span = document.createElement("span");
      span.textContent = cat.name;
      categorie.appendChild(span);
    }
  });

// gestion de l'affichage des images avec le titre
fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    const gallery = document.querySelector(".gallery");

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
  });
