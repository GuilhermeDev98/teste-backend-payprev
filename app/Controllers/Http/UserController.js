'use strict'

const { validate } = use('Validator')

const User = use('App/Models/User')

class UserController {
    async store({request, response, auth}){
        
        const validation = await validate(request.all(),  {
            email: 'required|email|unique:users,email',
            password: 'required|min:6',
            cpf: 'required|number|min:11|max:11|unique:users,cpf',
            status: 'required'
          })      

        if(validation.fails()){
            return response.badRequest(validation.messages())
        }

        const user = await User.create(request.all())

        const { email, password } = request.all()

        if(user){
            const { token } = await auth.attempt(email, password)
            return response.ok({ user, token })
        }

    }
}

module.exports = UserController
