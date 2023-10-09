function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')

// launch modal event
modalBtn.forEach(btn => btn.addEventListener('click', launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
}

//Fonction pour changer la classe d'un lien quand il est cliqué
function active_link() {
  let navbar = document.querySelector('.main-navbar')
  let children = navbar.children
  for (let i = 0; i < 5; i++)
    children[i].addEventListener('click', () => {
      for (let j = 0; j < 5; j++) children[j].classList.remove('active')
      children[i].classList.add('active')
    })
}

//Fonction pour corriger le bug de l'année dans le footer
function footer_year() {
  let footer = document.querySelector('.copyrights')
  let date = new Date().getFullYear()
  footer.innerHTML = `Copyright 2014 - ${date}, GameOn Inc.`
}

//Fonction pour fermer la modal
function closeModal() {
  let close_btn = document.querySelector('.close')
  close_btn.addEventListener('click', () => {
    modalbg.style.animationName = 'modalclose'
    modalbg.style.animationDuration = '2s'
    modalbg.style.animationFillMode = 'forwards'
    modalbg.style.height = '0'
  })
}

active_link()
footer_year()
closeModal()

function validate_names(name) {
  document.getElementById(name + 'Error').textContent = ''
  let element = document.getElementById(name)
  let condition = /^[a-zA-Z]{2,}$/
  if (condition.test(element.value)) {
    element.style.border = '2px solid green'
  } else {
    element.style.border = '2px solid red'
    document.getElementById(name + 'Error').textContent = 'Veuillez entrer 2 caractères ou plus.'
    return false
  }
  return true
}

function validate_email() {
  document.getElementById('emailError').textContent = ''
  let element = document.getElementById('email')
  let condition = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (condition.test(element.value)) {
    element.style.border = '2px solid green'
  } else {
    element.style.border = '2px solid red'
    document.getElementById('emailError').textContent = "L'adresse électronique n'est pas valide."
    return false
  }
  return true
}

function validate_birthdate() {
  document.getElementById('birthdateError').textContent = ''
  let birthdate = document.getElementById('birthdate')
  if (!birthdate.value) {
    document.getElementById('birthdateError').textContent = 'Vous devez entrer votre date de naissance.'
    birthdate.style.border = '2px solid red'
    return false
  }

  let today = new Date()
  let diff = today - new Date(birthdate.value)
  if (diff < 1000 * 60 * 60 * 24 * 365 * 18) {
    document.getElementById('birthdateError').textContent = 'Vous devez avoir 18 ans ou plus.'
    birthdate.style.border = '2px solid red'
    return false
  } else {
    birthdate.style.border = '2px solid green'
    return true
  }
}

function validate_quantity() {
  let quantity = document.getElementById('quantity')
  document.getElementById('quantityError').textContent = ''
  if (!quantity.value) {
    document.getElementById('quantityError').textContent = 'Vous devez entrer un nombre de concours.'
    quantity.style.border = '2px solid red'
    return false
  } else if (quantity.value < 0 || quantity.value > 99) {
    document.getElementById('quantityError').textContent = 'Vous devez entrer une valeur entre 0 et 99.'
    quantity.style.border = '2px solid red'
    return false
  } else {
    quantity.style.border = '2px solid green'
    return true
  }
}

function validate_location() {
  document.getElementById('locationError').textContent = ''
  let location = document.querySelector('input[name="location"]:checked')
  if (!location) {
    document.getElementById('locationError').textContent = 'Vous devez choisir un emplacement.'
    return false
  } else {
    return true
  }
}

function validate_conditions() {
  document.getElementById('conditionsError').textContent = ''
  let conditions = document.getElementById('checkbox1').checked
  if (!conditions) {
    document.getElementById('conditionsError').textContent = 'Vous devez accepter les conditions dutilisation.'
    return false
  } else {
    return true
  }
}

document.getElementById('first').addEventListener('input', () => {
  validate_names('first')
})
document.getElementById('last').addEventListener('input', () => {
  validate_names('last')
})
document.getElementById('email').addEventListener('input', () => {
  validate_email()
})
document.getElementById('birthdate').addEventListener('input', () => {
  validate_birthdate()
})
document.getElementById('quantity').addEventListener('input', () => {
  validate_quantity()
})
document.getElementById('checkbox1').addEventListener('input', () => {
  validate_conditions()
})
document.querySelector('form[name="reserve"]').addEventListener('submit', e => {
  e.preventDefault()
  if (validate()) {
    document.querySelector('form[name="reserve"]').style.display = 'none'
    document.querySelector('form[name="reserve"]').innerHTML = '<h1>Merci !</h1>'
  }
})

function validate() {
  return validate_names('first') && validate_names('last') && validate_email() && validate_birthdate() && validate_quantity() && validate_location() && validate_conditions()
}
