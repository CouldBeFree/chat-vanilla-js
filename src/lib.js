export const element = () => {
  const el = document.createElement('h1')
  el.innerText = 'Hello from js'

  return el
}

export const btn = () => {
  const button = document.createElement('button')
  button.innerText = 'I am button'

  return button
}
