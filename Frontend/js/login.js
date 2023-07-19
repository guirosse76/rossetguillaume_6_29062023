// // Savoir quansd on soumé le formulaire (similaire addenventlister click)
const form = document.querySelector("form");
form.addEventListener("submit", () => {
  // Récupère les valuer de l'input
  let email = document.getElementById("email").value;
  let mdp = document.getElementById("mdp").value;
  event.preventDefault();

  // Déclaration de l'objet qui contient les données de l'input
  const user = {
    email: email,
    password: mdp,
  };

  // // //Fetch
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((data) => data.json())
    .then((response) => {
      verificationToken(response);
    })

    .catch((error) => {
      if (error.status === "401") {
        console.log("dieuenisse");
      }
    });
});

function verificationToken(response) {
  // variable pour chaque élément de l'objet
  userId = response.userId;
  token = response.token;

  // si mes deux variables sont différentes 'undefined' c'est que le serveur a envoyé le token
  if (userId && token != undefined) {
    //stockage du token dans le localStorage
    tokenJSON = localStorage.setItem("tokenUSER", JSON.stringify(response));
    // redirection vers la page principale
    document.location.href = "./index.html";
  } else {
    // affichage de le fenêtre d'alert
    alert("Erreur dans l’identifiant ou le mot de passe");
    // redirection vers la même page pour réintialiser les inputs
    document.location.href = "./login.html";
  }
}

// identifiant et mot de passe pour se connecter sur le site
// "sophie.bluel@test.tld"
// "S0phie"
