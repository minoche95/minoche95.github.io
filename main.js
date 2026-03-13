// Initialisation Swup
const swup = new Swup();

// Fonction de recherche
function search() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card');
            
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].innerText.toLowerCase().includes(input)) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "flex";
        }
    }
}

// Initialisation Vanilla Tilt
function initPlugins() {
    // On cherche tous les éléments qui doivent avoir l'effet Tilt.
    const tiltElements = document.querySelectorAll("[data-tilt]"); 
    
    if (tiltElements.length > 0) {
        VanillaTilt.init(tiltElements);
    }
}

// Envoi formulaire
let form = document.querySelector('#inscriptionForm');

form.addEventListener('submit', function(event) {
    // Blocage du rafraichissement à chaque submit
    event.preventDefault();

    // Définition des variables
    let pseudo = document.querySelector('#pseudo');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let passwordRepeat = document.querySelector('#password2');
    
    let errorContainer = document.querySelector('.message-error');
    let errorList = document.querySelector('#errorList');
    let successContainer = document.querySelector('.message-success');

    // Réinitialisation des messages à chaque soumission
    errorList.innerHTML = '';
    errorContainer.classList.remove('visible');
    successContainer.classList.remove('visible');

    // --- VERIFICATION PSEUDO ---
    if(pseudo.value.length < 5) {
        errorContainer.classList.add('visible');
        pseudo.classList.remove('success');
        
        let err = document.createElement('li');
        err.innerText = "Le champ pseudo doit contenir au moins 5 caractères";
        errorList.appendChild(err);
    } else {
        pseudo.classList.add('success');
    }

    // --- VERIFICATION EMAIL ---
    if(email.value.length === 0) {
        errorContainer.classList.add('visible');
        email.classList.remove('success');
        
        let err = document.createElement('li');
        err.innerText = "Le champ email ne peut pas être vide";
        errorList.appendChild(err);
    } else {
        email.classList.add('success');
    }

    // --- VERIFICATION MOT DE PASSE ---
    // Regex : (?=.*[A-Z]) = 1 Majuscule | (?=(?:.*[-+_!@#$%^&*.,?]){2}) = 2 caractères spéciaux
    let passCheck = new RegExp("^(?=.*[A-Z])(?=(?:.*[-+_!@#$%^&*.,?]){2}).+$");

    if(password.value.length < 8 || passCheck.test(password.value) == false) {
        errorContainer.classList.add('visible');
        password.classList.remove('success');
        
        let err = document.createElement('li');
        err.innerText = "Le mot de passe doit faire 8 caractères minimum, contenir 1 majuscule et 2 caractères spéciaux";
        errorList.appendChild(err);
    } else {
        password.classList.add('success');
    }

    // --- CONFIRMATION MDP ---
    if(passwordRepeat.value.length === 0 || passwordRepeat.value !== password.value) {
        errorContainer.classList.add('visible');
        passwordRepeat.classList.remove('success');
        
        let err = document.createElement('li');
        err.innerText = "Les mots de passe ne correspondent pas";
        errorList.appendChild(err);
    } else {
        passwordRepeat.classList.add('success');
    }

    // --- VALIDATION FINALE ---
    if(
        pseudo.classList.contains('success') &&
        email.classList.contains('success') &&
        password.classList.contains('success') &&
        passwordRepeat.classList.contains('success')
    ) {
        successContainer.classList.add('visible');
    }
});







