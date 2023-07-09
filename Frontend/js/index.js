// fetch("http://localhost:5678/api/works")
//   .then((works) => works.json())
//   .then((works2) => console.table(works2));

fetch("http://localhost:5678/api/categories")
  .then((categorie) => categorie.json())
  .then((categorie2) => {
    for (let i = 0; i < categorie2.lenght; ++i) {
      document.createElement("div");
      // console.log(categorie2[0]), console.log(categorie2[1]);
    }
  });
// gestion de l'affichage des images avec le titre
fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.log(works);
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
