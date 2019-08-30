'use strict'

class UserStore {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      password: 'required|min:6',
      cpf: 'required|number|min:11|max:11',
      status: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'password.min': 'password cannot contain less than 6 characters',
      'cpf.required': 'You must provide a cpf.',
      'cpf.number': 'You must provide a valid cpf.',
      'cpf.min': 'cpf cannot contain more than 11 characters.',
      'cpf.max': 'cpf cannot contain less than 11 characters.',
      'status': "You must provide a user status"
    }
  }
}

module.exports = UserStore
