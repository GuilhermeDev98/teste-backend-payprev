'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')


class AuthController {
    async store({request, response, auth}){

        const validation = await validate(request.all(), {
            email: 'required|email',
            password: 'required|min:6',
          })      

          
        if(validation.fails()){
            response.badRequest(validation.messages())
        }
        
        const { email, password } = request.all()
        return await auth.attempt(email, password)
    }
}

module.exports = AuthController
