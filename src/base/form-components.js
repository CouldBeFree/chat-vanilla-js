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

  this.validate = (options) => {
    if (!options.required) return
    node.classList.remove('invalid')

    if (!options.data || options.data.length < options.minLength) {
      node.classList.add('invalid')
      errorMessage(options.errorMessage)
      return false
    }

    node.nextSibling.remove()
    return true
  }
}

export {
  Input
}
