import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { axios } from '../utils/axios'
import { Input, CheckBox } from '../base/form-components'
import Notify from '../base/notify'

function RegisterHandler () {
  const nameInput = document.getElementById('name')
  const form = document.getElementById('form')
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')
  const checkBox = document.getElementById('check')

  this.alert = new Notify()

  this.formData = {
    userType: 'user'
  }

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

  new CheckBox(checkBox, {
    fieldName: 'psychologist',
    mediator: this
  })

  this.notify = function (data, fieldName) {
    if (fieldName === 'psychologist') {
      this.formData.userType = data ? 'psychologist' : 'user'
      return
    }
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

    return isNameValid && isEmailValid && isPasswordValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const suc = this.alert.createElement('success')
    const notifier = suc.createAlert('User successfully saved')
    console.log('notifier', notifier)
    const isValid = validate()
    if (isValid) {
      axios.post('/auth/register', this.formData)
        .then(res => {
          // const el = Notify.createElement('success')
          // console.log(el);
        })
        .catch(err => console.error(err))
    } else {
      console.log(1);
    }
  })
}

new RegisterHandler()
