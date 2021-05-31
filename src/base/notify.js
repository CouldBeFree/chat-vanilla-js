function Notify() {
  this.qwe = 'asd'
}

Notify.prototype.createElement = function (opts) {
  switch (opts) {
    case 'success':
      this.alert = new SuccessAlert()
      break;
    case 'danger':
      this.alert = new DangerAlert()
      break;
  }
  return this.alert
}

function SuccessAlert() {}

function DangerAlert() {}

SuccessAlert.prototype.createAlert = function (msg) {
  const div = document.createElement('div')
  div.classList.add('alert', 'alert-success')
  div.innerText = msg
  return div
}

DangerAlert.prototype.createAlert = function (msg) {
  const div = document.createElement('div')
  div.classList.add('alert', 'alert-danger')
  div.innerText = msg
  return div
}

export default new Notify()
