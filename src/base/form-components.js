function Input (node, options = { required: true, minLength: 5 }) {
  if (!node) throw new Error('Dom element should be provided')

  this.options = options
  this.data = ''

  node.addEventListener('input', (e) => {
    this.data = e.target.value
  })

  const errorMessage = () => {
    const existingErrorMessage = node.nextSibling
    if (existingErrorMessage) {
      existingErrorMessage.remove()
    }

    const div = document.createElement('div')
    div.innerHTML = this.options.errorMessage
    div.classList.add('error-message')

    node.parentNode.insertBefore(div, node.nextSibling)
  }

  const validate = () => {
    if (!this.options.required) return
    node.classList.remove('invalid')

    if (this.data.length < this.options.minLength) {
      node.classList.add('invalid')
      errorMessage()
      return false
    }

    node.nextSibling.remove()
    return true
  }

  this.notify = function () {
    const isValid = validate()
    if (isValid) return this.data
  }
}

export {
  Input
}
