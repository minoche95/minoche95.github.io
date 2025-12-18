const lightbutton = document.getElementById('light')  // Attribution de l'id du bouton pour le light mode 
const scrollbutton = document.getElementById('scrollbutton')
const light = document.body // Creation de la variable 'light' pour definir le mode light dans le CSS
const scrollmenu = document.getElementById('scroll')


lightbutton.addEventListener('click', function() { // Définition de la fonction du bouton pour activer/désactiver le mode light au click
    light.classList.toggle('light')
})

scrollbutton.addEventListener('click', function() { // Définition de la fonction pour affiché le menu déroulant en activant '.show' dans le css 
    scrollmenu.classList.toggle('show')
})