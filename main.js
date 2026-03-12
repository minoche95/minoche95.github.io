function search() {
    // Mettre en minuscule
    let input = document.getElementById('searchBar').value.toLowerCase();
            
    // Recupérer les cartes
    let cards = document.getElementsByClassName('card');
            
    // Algo de recherche dans une boucle for
    for (let i = 0; i < cards.length; i++) {
                
        // Si pas de texte recherché : on cache. Sinon on affiche
        if (!cards[i].innerText.toLowerCase().includes(input)) {
                    cards[i].style.display = "none";
        } 
        else {
            cards[i].style.display = "flex";
        }
    }
}