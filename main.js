const swup = new Swup();

// Fonction de recherche globale
window.search = function() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('card-wrapper');
            
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].innerText.toLowerCase().includes(input)) {
            cards[i].style.display = "none";
        } else {
            cards[i].style.display = "block";
        }
    }
}

// Fonction de filtrage
window.filterCategory = function(type) {
    let cards = document.getElementsByClassName('card-wrapper');
    
    for (let i = 0; i < cards.length; i++) {
        if (type === 'all' || cards[i].getAttribute('data-type') === type) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Récupérer et afficher les cocktails
async function fetchAndDisplayCocktails() {
    const cardsContainer = document.querySelector('#cocktails-api-container');
    if (!cardsContainer) return; 

    if (cardsContainer.children.length > 0) return;

    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        const data = await response.json();
        const cocktails = data.drinks;

        const savedFavorites = JSON.parse(localStorage.getItem('mixit_favorites')) || [];

        let cardsHTML = '';
        cocktails.forEach((cocktail) => {
            const isAlcoholic = cocktail.strAlcoholic; 
            const isFavorite = savedFavorites.includes(cocktail.strDrink);
            const checkedAttribute = isFavorite ? 'checked' : '';

            cardsHTML += `
            <div class="card-wrapper" data-type="${isAlcoholic}">
                <article class="card" style="--card-bg: #29395d;" data-tilt data-tilt-glare data-tilt-max-glare="0.5"> 
                    <div class="inner-border">
                        <a href="detail.php?id=${cocktail.idDrink}" style="text-decoration: none; color: inherit;">
                            <h3>${cocktail.strDrink}</h3>
                            <img src="${cocktail.strDrinkThumb}/small" alt="${cocktail.strDrink}" class="cocktail-img">
                        </a>
                        <p class="deg">${isAlcoholic}</p>
                        <input type="checkbox" id="fav-${cocktail.strDrink}" class="fav_checkbox" ${checkedAttribute}>
                        <label for="fav-${cocktail.strDrink}" class="fav_heart">❤</label>
                    </div>
                </article>
            </div>
            `;
        });

        cardsContainer.innerHTML = cardsHTML;

        const checkboxes = cardsContainer.querySelectorAll('.fav_checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                let currentFavorites = JSON.parse(localStorage.getItem('mixit_favorites')) || [];
                const cocktailName = this.id.replace('fav-', '');

                if (this.checked) {
                    currentFavorites.push(cocktailName);
                } else {
                    currentFavorites = currentFavorites.filter(name => name !== cocktailName);
                }

                localStorage.setItem('mixit_favorites', JSON.stringify(currentFavorites));
            });
        });

        const tiltElements = cardsContainer.querySelectorAll("[data-tilt]"); 
        if (tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(tiltElements);
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des cocktails :", error);
        cardsContainer.innerHTML = "<p style='color: white;'>Impossible de charger les cocktails.</p>";
    }
}

// Récupérer et afficher les détails d'un cocktail
async function fetchCocktailDetail() {
    const detailContainer = document.querySelector('#cocktail-detail-container');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const cocktailId = urlParams.get('id');

    if (!cocktailId) {
        detailContainer.innerHTML = "<p style='color: white;'>Aucun cocktail sélectionné.</p>";
        return;
    }

    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
        const data = await response.json();
        const cocktail = data.drinks[0];

        const instructions = cocktail.strInstructionsFR || cocktail.strInstructions || "Aucune description disponible.";

        detailContainer.innerHTML = `
            <div class="detail-card">
                <h2>${cocktail.strDrink}</h2>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" class="detail-img">
                <div class="detail-info">
                    <p class="detail-type"><strong>Type :</strong> ${cocktail.strAlcoholic}</p>
                    <p class="detail-text"><strong>Instructions :</strong> ${instructions}</p>
                </div>
                <a href="cards.php" class="back-button">Retour aux cocktails</a>
            </div>
        `;
    } catch (error) {
        console.error("Erreur chargement détails :", error);
        detailContainer.innerHTML = "<p style='color: white;'>Erreur lors du chargement des détails.</p>";
    }
}

// Fonction globale d'initialisation
function init() {
    fetchAndDisplayCocktails();
    fetchCocktailDetail();

    const staticTilt = document.querySelectorAll("main:not(#cards-container) [data-tilt]");
    if (staticTilt.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(staticTilt);
    }

    // Formulaire d'inscription
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

    // Menu Burger
    const burgerToggle = document.querySelector('#burgerToggle');
    const navMenu = document.querySelector('#navMenu');

    if (burgerToggle && navMenu) {
        burgerToggle.classList.remove('active');
        navMenu.classList.remove('active');

        burgerToggle.addEventListener('click', function() {
            burgerToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Pop-up Booster
    const boosterBtn = document.querySelector('#boosterBtn');
    const boosterPopup = document.querySelector('#boosterPopup');
    const closePopupBtn = document.querySelector('#closePopupBtn');

    if (boosterBtn && boosterPopup) {
        boosterBtn.addEventListener('click', function() {
            boosterPopup.style.display = 'flex';
        });

        boosterPopup.addEventListener('click', function(event) {
            if (event.target === boosterPopup || event.target === closePopupBtn) {
                boosterPopup.style.display = 'none';
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

swup.hooks.on('page:view', init);