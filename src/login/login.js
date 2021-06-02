import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { axios } from '../utils/axios'
import notify from '../base/notify'
import { Input } from '../base/form-components'

function LoginHandler () {
  const emailNode = document.getElementById('inputEmail')
  const passwordNode = document.getElementById('inputPassword')
  const formNode = document.getElementById('form')
  const submitButton = document.querySelector('button[type="submit"]')

  this.formData = {}

  const email = new Input(emailNode, {
    fieldName: 'email',
    mediator: this
  })

  const password = new Input(passwordNode, {
    fieldName: 'password',
    mediator: this
  })

  this.notify = function (data, fieldName) {
    this.formData[fieldName] = data
  }

  const validate = () => {

    const isEmailValid = email.validate({
      data: this.formData.email,
      required: true,
      errorMessage: 'Email is required'
    })

    const isPasswordValid = password.validate({
      data: this.formData.password,
      required: true,
      errorMessage: 'Password is required'
    })

    return isEmailValid && isPasswordValid;
  }

  const alert = (type, msg) => {
    const el = notify.createElement(type)
    return el.createAlert(msg)
  }

  formNode.addEventListener('submit', (e) => {
    e.preventDefault()
    const targetNode = document.querySelector('#notify')
    const isValid = validate()
    if (isValid) {
      submitButton.disabled = true
      axios.post('/auth/login', this.formData)
        .then(({ data }) => {
          localStorage.setItem('psyToken', data.token)
          targetNode.appendChild(alert('success', 'You have been successfully logged in'))
          email.clearField()
          password.clearField()
        })
        .catch(err => {
          targetNode.appendChild(alert('danger', err.response.data.message))
        })
        .finally(() => submitButton.disabled = false)
    }
  })
}

new LoginHandler()
