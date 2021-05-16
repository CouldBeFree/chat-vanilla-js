import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { axios } from '../utils/axios'

function FormHandler () {
  const formData = {
    userType: 'user'
  }

  let nodes = null

  const selectors = function () {
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const checkBox = document.getElementById('check')
    const dangerAlert = document.getElementById('danger')
    const successAlert = document.getElementById('success')
    const requiredFields = document.querySelectorAll('[data-required="required"]')

    return {
      nameInput,
      emailInput,
      passwordInput,
      checkBox,
      dangerAlert,
      successAlert,
      requiredFields
    }
  }

  const validateForm = function () {
    let isValid = true

    nodes.requiredFields.forEach(el => {
      const { length, required } = el.dataset
      el.classList.remove('invalid')

      if (required && length > el.value.length) {
        el.classList.add('invalid')
        isValid = false
      }

      if (el.id === 'email' && !el.value.length) {
        el.classList.add('invalid')
        isValid = false
      }
    })

    return isValid
  }

  const init = function () {
    nodes = selectors()

    const eventTarget = {
      name: 'name',
      email: 'email',
      password: 'password'
    }

    for (const node in nodes) {
      if (eventTarget[nodes[node].id]) {
        nodes[node].addEventListener('input', e => {
          formData[eventTarget[nodes[node].id]] = e.target.value
        })
      }
    }

    nodes.checkBox.addEventListener('change', e => {
      const isChecked = nodes.checkBox.checked

      if (isChecked) {
        formData.userType = 'psychologist'
      } else {
        formData.userType = 'user'
      }
    })
  }

  init()

  this.submitForm = function () {
    if (validateForm()) {
      axios.post('auth/register', formData)
        .then(res => console.log(res))
        .catch((e) => {
          nodes.dangerAlert.innerText = e.response.data.message
          nodes.dangerAlert.classList.remove('hidden')
          console.log(e.message)
          console.dir(e.response.data.message)
        })
    }
  }
}

const form = document.getElementById('form')
const handler = new FormHandler()

form.addEventListener('submit', function (e) {
  e.preventDefault()
  handler.submitForm()
})
