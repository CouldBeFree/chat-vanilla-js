import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

(function () {
  const formData = {}

  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')
  const checkBox = document.getElementById('check')
  const form = document.getElementById('form')

  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(formData)
  })

  nameInput.addEventListener('input', e => {
    console.log(e.target.value);
    formData['name'] = e.target.value
  })

  emailInput.addEventListener('input', e => {
    console.log(e.target.value);
    formData['email'] = e.target.value
  })

  passwordInput.addEventListener('input', e => {
    console.log(e.target.value);
    formData['password'] = e.target.value
  })

  checkBox.addEventListener('change', e => {
    console.log(e.target.checked);
    formData['checked'] = e.target.value
  })
})()
