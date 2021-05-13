import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { axios } from '../utils/axios'

(function () {
  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')
  const checkBox = document.getElementById('check')
  const form = document.getElementById('form')
  const dangerAlert = document.getElementById('danger')
  const successAlert = document.getElementById('success')

  const formData = {
    userType: 'user'
  }

  function validateForm () {
    nameInput.classList.remove('invalid')
    emailInput.classList.remove('invalid')

    if (!formData['name'] || formData['name'].length < 4) {
      nameInput.classList.add('invalid')
      return false
    }

    if (!formData['email']) {
      emailInput.classList.add('invalid')
      return false
    }

    if (!formData['password'] || formData['password'].length < 4) {
      passwordInput.classList.add('invalid')
      return false
    }
    return true
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('auth/register', formData)
        .then(res => console.log(res))
        .catch(() => {
          dangerAlert.innerText = 'Something went wrong'
          dangerAlert.classList.remove('hidden')
        })
    }
  })

  nameInput.addEventListener('input', e => {
    formData['name'] = e.target.value
  })

  emailInput.addEventListener('input', e => {
    formData['email'] = e.target.value
  })

  passwordInput.addEventListener('input', e => {
    formData['password'] = e.target.value
  })

  checkBox.addEventListener('change', e => {
    formData['checked'] = e.target.value
  })
})()
