function Input (node, options = { required: true, minLength: 5 }) {
  if (!node) throw new Error('Dom element should be provided')

  this.options = options

  node.addEventListener('input', (e) => {
    options.mediator.notify(e.target.value, this.options.fieldName)
  })

  const errorMessage = (msg) => {
    const existingErrorMessage = node.nextSibling
    if (existingErrorMessage) {
      existingErrorMessage.remove()
    }

    const div = document.createElement('div')
    div.innerHTML = msg
    div.classList.add('error-message')

    node.parentNode.insertBefore(div, node.nextSibling)
  }

  this.clearField = () => {
    node.value = ''
  }

  this.validate = (options) => {
    if (!options.required) return
    node.classList.remove('invalid')

    if (!options.data) {
      node.classList.add('invalid')
      errorMessage(options.errorMessage)
      return false
    }

    if (options.data.length < options.minLength) {
      node.classList.add('invalid')
      errorMessage(`Minimal length should be ${options.minLength} characters`)
      return false
    }

    if (node.nextSibling) node.nextSibling.remove()
    return true
  }
}

function CheckBox (node, options) {
  if (!node) throw new Error('Dom element should be provided')

  this.options = options

  node.addEventListener('change', (e) => {
    options.mediator.notify(e.target.checked, this.options.fieldName)
  })
}

export {
  Input,
  CheckBox
}
