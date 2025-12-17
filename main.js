const button = document.getElementById('light')
const body = document.body

button.addEventListener('click', function() {
    body.classList.toggle('light')
})