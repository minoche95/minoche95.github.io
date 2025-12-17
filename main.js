const button = document.getElementById('dark')
const body = document.body

button.addEventListener('click', function() {
    body.classList.toggle('dark')
})