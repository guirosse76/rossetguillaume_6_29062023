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

fetch("http://localhost:5678/api/works")
  .then((data) => data.json())
  .then((works) => {
    console.log(works);
    const gallery = document.querySelector(".gallery");
    // console.log(works.length);
    // for (let a = 0; a < works.length; a++) {
    //   console.log(a);
    //   const img = document.createElement("img");
    //   img.src = works[a].imageUrl;
    //   gallery.appendChild(img);
    // }
    for (const work of works) {
      console.log(work);
      const img = document.createElement("img");
      img.src = work.imageUrl;
      gallery.appendChild(img);
    }
  });
