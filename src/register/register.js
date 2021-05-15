import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { axios } from '../utils/axios'

function FormHandler () {
  const formData = {
    userType: 'user'
  }

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
    const items = selectors()
    items.requiredFields.forEach(el => {
      const { length, required } = el.dataset
      if (required && length > el.value.length) {
        el.classList.add('invalid')
        console.log('el', el)
      }
    })
  }

  const init = function () {
    selectors().nameInput.addEventListener('input', e => {
      formData['name'] = e.target.value
    })

    selectors().emailInput.addEventListener('input', e => {
      formData['email'] = e.target.value
    })

    selectors().passwordInput.addEventListener('input', e => {
      formData['password'] = e.target.value
    })

    selectors().checkBox.addEventListener('change', e => {
      formData['checked'] = e.target.value
    })
  }

  init()

  this.submitForm = function () {
    if (validateForm()) {
      axios.post('auth/register', formData)
        .then(res => console.log(res))
        .catch(() => {
          selectors().dangerAlert.innerText = 'Something went wrong'
          selectors().dangerAlert.classList.remove('hidden')
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
