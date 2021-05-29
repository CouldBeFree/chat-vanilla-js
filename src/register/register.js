import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { axios } from '../utils/axios'
import { Input } from '../base/form-components'

function RegisterHandler () {
  const nameInput = document.getElementById('name')
  const form = document.getElementById('form')
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')

  this.formData = {}

  const name = new Input(nameInput, {
    fieldName: 'name',
    mediator: this
  })

  const email = new Input(emailInput, {
    fieldName: 'email',
    mediator: this
  })

  const password = new Input(passwordInput, {
    fieldName: 'password',
    mediator: this
  })

  this.notify = function (data, fieldName) {
    this.formData[fieldName] = data
  }

  const validate = () => {
    const isNameValid = name.validate({
      data: this.formData.name,
      required: true,
      minLength: 4,
      errorMessage: 'Name is required'
    })

    const isEmailValid = email.validate({
      data: this.formData.email,
      required: true,
      minLength: 4,
      errorMessage: 'Email is required'
    })

    const isPasswordValid = password.validate({
      data: this.formData.password,
      required: true,
      minLength: 4,
      errorMessage: 'Password is required'
    })

    return isNameValid || isEmailValid || isPasswordValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    // const nameData = name.notify()
    const isValid = validate()
    if (isValid) {
      alert('Valid')
    } else {
      alert('Not valid')
    }
  })
}

const handler = new RegisterHandler()
