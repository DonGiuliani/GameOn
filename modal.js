function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//-----------------------------------------//
//---------------MA PARTIE-----------------//
//-----------------------------------------//

//Fermer la page de formulaire en cliquant sur la croix
const modalCloseBtn = document.querySelector(".close");
modalCloseBtn.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.display = "none";
}

//Afficher ou effacer les messages d'erreur
let erreur = "";

function afficherMessageErreur(form) {
  form.setAttribute("data-error", erreur);
}

function effacerMessageErreur(form) {
  form.removeAttribute("data-error", erreur);
}

//Initialiser tous les champs à false
let prenomValide = false;
let nomValide = false;
let emailValide = false;
let dateValide = false;
let tournoiValide = false;
let villeValide = false;

// Vérification des données entrées par l'utilisateur dans le formulaire
function validate(form) {
  //Vérifier que le prénom contient au moins 2 caractères
  if(form.first.value.length < 2) {
    erreur = "Veuillez renseigner un prénom de plus de 2 lettres";
    afficherMessageErreur(form.first.parentNode);
    console.log(form.first.parentNode);
    prenomValide = false;
  } 
    else {
     effacerMessageErreur(form.first.parentNode);
     prenomValide = true;
  }
  //Vérifier que le nom contient au moins 2 caractères
  if(form.last.value.length < 2) {
    erreur = "Veuillez renseigner un nom de plus de 2 lettres"
    afficherMessageErreur(form.last.parentNode);
    console.log(form.last.parentNode);

    nomValide = false;
  } 
    else {
     effacerMessageErreur(form.last.parentNode);
     nomValide = true;
  }
  //Vérifier que l'adresse mail est correcte
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexEmail.test(form.email.value) == false) {
    erreur = "Veuillez entrer une adresse email valide"
    afficherMessageErreur(form.email.parentNode);
    emailValide = false;
  } 
    else {
      effacerMessageErreur(form.email.parentNode);
      emailValide = true;
  }
  //Vérifier que la case de la date de naissance est valide
  let dateActuelle = new Date();
  let dateUtilisateur = new Date(form.birthdate.value);
  let dateTropAncienne = new Date(1921, 00, 01);

  if(dateUtilisateur > dateActuelle) {
    erreur = "Veuillez renseigner une date précédente à aujourd'hui";
    afficherMessageErreur(form.birthdate.parentNode);
  } 
    else if(form.birthdate.value == "") {
      erreur = "Veuillez renseigner votre date de naissance";
      afficherMessageErreur(form.birthdate.parentNode);
      dateValide = false;
  }
    else if(dateUtilisateur < dateTropAncienne) {
      erreur = "Veuillez entrer une date plus récente";
      afficherMessageErreur(form.birthdate.parentNode);
      dateValide = false;
  } 
    else {
      effacerMessageErreur(form.birthdate.parentNode);
      dateValide = true;
  }
  //Vérifier que la case des tournois participés n'est pas vide
  if(form.quantity.value == "") {
    erreur = "Veuillez indiquer le nombre de tournois auquels vous avez participé";
    afficherMessageErreur(form.quantity.parentNode);
    tournoiValide = false;
  } 
    else {
     effacerMessageErreur(form.quantity.parentNode);
    tournoiValide = true;
  }
  //Vérifier les checkbox de villes
  const locations = document.getElementsByName("location");
  let villeCochee = 0;

  locations.forEach((location) => {
    if(location.checked) {
      villeCochee++;
    }
  });
    if(form.quantity.value > 0 && villeCochee == 0) {
      erreur = "Veuillez indiquer dans quelle(s) ville(s) vous avez déjà participé à un tournoi GameOn";
      afficherMessageErreur(form.location1.parentNode);
      villeValide = false;
    }
      else if(form.quantity.value == 0 && villeCochee > 0) {
        erreur = "Votre réponse présente une incohérence";
        afficherMessageErreur(form.location1.parentNode);
        villeValide = false;
      }
      else {
        effacerMessageErreur(form.location1.parentNode);
        villeValide = true;
    }
  //Vérifier que la case des conditions d'utilisation est cochée
  if(form.checkbox1.checked == false) {
    erreur = "Vous devez accepter les conditions d'utilisation"
    afficherMessageErreur(form.checkbox1.parentNode);
  } 
    else {
      effacerMessageErreur(form.checkbox1.parentNode);
  }
  //Vérifier si le formulaire est entièrement rempli avant de l'envoyer
  if(prenomValide == true &&
    nomValide == true &&
    emailValide == true &&
    dateValide == true &&
    tournoiValide == true &&
    villeValide == true &&
    form.checkbox1.checked == true) {
      //Stock la reservation dans le localStorage
      localStorage.setItem("IncriptionGameOn", true);
      afficherMessageValidation();
      return true;
    }
      else {
        return false;
      }
};

function afficherMessageValidation() {
  // Modifie le bouton d'inscription
    modalBtn.forEach((btn) => btn.innerHTML = "Inscription validée");

    // Crée le message de validation
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = "Votre réservation à bien été enregistrée";
    modalBody.style.textAlign = "center";
    modalBody.style.padding = "2em";

    //Crée une div contenant un choix de deux boutons
    const boutonsFormulaireValide = document.createElement("div");
    boutonsFormulaireValide.style.padding = "1em";
    boutonsFormulaireValide.style.display = "flex";
    boutonsFormulaireValide.style.flexDirection = "column";
    modalBody.appendChild(boutonsFormulaireValide);

    //Crée un bouton de fermeture du message de validation
    const boutonFermeture = document.createElement("button");
    boutonFermeture.innerHTML = "Fermer";
    boutonFermeture.classList = "button";
    boutonFermeture.style.border = "none";
    boutonFermeture.addEventListener("click", closeModal);
    boutonsFormulaireValide.appendChild(boutonFermeture);
    
    //Crée un bouton de nouvelle inscription
    const boutonNouvelleInscription = document.createElement("button");
    boutonNouvelleInscription.innerHTML = "Nouvelle inscription";
    boutonNouvelleInscription.classList = "button";
    boutonNouvelleInscription.style.border = "none";
    boutonNouvelleInscription.addEventListener("click", nouvelleInscription);
    boutonsFormulaireValide.appendChild(boutonNouvelleInscription);
};

//Afficher le message de validation si la valeur de localStorage est "true"
let inscriptionValide = localStorage.getItem("IncriptionGameOn");

if(inscriptionValide == "true") {
  afficherMessageValidation()
}

//Vider le localStorage et recharger la page
function nouvelleInscription() {
  localStorage.clear();
  document.location.reload();
}