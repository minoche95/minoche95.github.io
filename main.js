// Initialisation Swup
const swup = new Swup();

// Fonction de recherche globale
window.search = function() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card-wrapper'); // Cible le wrapper pour ne pas casser le flexbox/layout
            
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].innerText.toLowerCase().includes(input)) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "block";
        }
    }
}

// Récupérer et afficher les cocktails
async function fetchAndDisplayCocktails() {
    const cardsContainer = document.querySelector('#cocktails-api-container');
    if (!cardsContainer) return; 

    // Évite de re-charger si des cartes sont déjà présentes
    if (cardsContainer.children.length > 0) return;

    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        const data = await response.json();
        const cocktails = data.drinks.slice(0, 4);

        let cardsHTML = '';
        cocktails.forEach((cocktail, index) => {
            const isAlcoholic = cocktail.strAlcoholic; 
            cardsHTML += `
            <div class="card-wrapper">
                <article class="card" style="--card-bg: #29395d;" data-tilt data-tilt-glare data-tilt-max-glare="0.5"> 
                    <div class="inner-border">
                        <h3>${cocktail.strDrink}</h3>
                        <img src="${cocktail.strDrinkThumb}/small" alt="${cocktail.strDrink}" class="cocktail-img">
                        <p class="deg">${isAlcoholic}</p>
                        <input type="checkbox" id="fav${index}" class="fav_checkbox">
                        <label for="fav${index}" class="fav_heart">❤</label>
                    </div>
                </article>
            </div>
            `;
        });

        cardsContainer.innerHTML = cardsHTML;

        // On initialise VanillaTilt sur les cartes
        const tiltElements = cardsContainer.querySelectorAll("[data-tilt]"); 
        if (tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(tiltElements);
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des cocktails :", error);
        cardsContainer.innerHTML = "<p style='color: white;'>Impossible de charger les cocktails.</p>";
    }
}

// Fonction init 
function init() {
    fetchAndDisplayCocktails();

    // Initialisation Vanilla Tilt pour les éléments statiques (s'il y en a hors API)
    const staticTilt = document.querySelectorAll("main:not(#cards-container) [data-tilt]");
    if (staticTilt.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(staticTilt);
    }

    // Gestion du Formulaire d'inscription
    const form = document.querySelector('#inscriptionForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            let pseudo = document.querySelector('#pseudo');
            let email = document.querySelector('#email');
            let password = document.querySelector('#password');
            let passwordRepeat = document.querySelector('#password2');
            
            let errorContainer = document.querySelector('.message-error');
            let errorList = document.querySelector('#errorList');
            let successContainer = document.querySelector('.message-success');

            if (errorList) errorList.innerHTML = '';
            if (errorContainer) errorContainer.classList.remove('visible');
            if (successContainer) successContainer.classList.remove('visible');

            let hasErrors = false;

            if(pseudo.value.length < 5) {
                hasErrors = true;
                pseudo.classList.remove('success');
                appendError("Le champ pseudo doit contenir au moins 5 caractères");
            } else {
                pseudo.classList.add('success');
            }

            if(email.value.length === 0) {
                hasErrors = true;
                email.classList.remove('success');
                appendError("Le champ email ne peut pas être vide");
            } else {
                email.classList.add('success');
            }

            let passCheck = /^(?=.*[A-Z])(?=(?:.*[-+_!@#$%^&*.,?]){2}).{8,}$/;

            if(!passCheck.test(password.value)) {
                hasErrors = true;
                password.classList.remove('success');
                appendError("Le mot de passe doit faire 8 caractères minimum, contenir 1 majuscule et 2 caractères spéciaux");
            } else {
                password.classList.add('success');
            }

            if(passwordRepeat.value.length === 0 || passwordRepeat.value !== password.value) {
                hasErrors = true;
                passwordRepeat.classList.remove('success');
                appendError("Les mots de passe ne correspondent pas");
            } else {
                passwordRepeat.classList.add('success');
            }

            if(hasErrors) {
                event.preventDefault();
                if (errorContainer) errorContainer.classList.add('visible');
            } else {
                if (successContainer) successContainer.classList.add('visible');
            }

            function appendError(message) {
                if (errorList) {
                    let err = document.createElement('li');
                    err.innerText = message;
                    errorList.appendChild(err);
                }
            }
        });
    }
}

// Lancement au premier chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// À chaque transition Swup complète
swup.hooks.on('page:view', init);