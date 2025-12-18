const button = document.getElementById('light')  // Attribution de l'id du bouton pour le light mode 
const light = document.body // Creation de la variable 'light' pour definir le mode light dans le CSS 

button.addEventListener('click', function() { // Définition de la fonction du bouton pour activer/désactiver le mode light au click
    light.classList.toggle('light')
})