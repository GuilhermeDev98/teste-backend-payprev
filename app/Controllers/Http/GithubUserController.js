'use strict'

const { validate } = use('Validator')
const GithubUser = use('App/Models/GithubUser')
const api = require('../../Utils/Api')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with githubusers
 */
class GithubUserController {
  /**
   * Show a list of all githubusers.
   * GET githubusers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const users = await GithubUser.all();
    response.ok(users)
  }
  /**
   * Create/save a new githubuser.
   * POST githubusers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), {
      user: 'required|unique:github_users,login'
    })

    if(validation.fails()){
      return response.forbidden(validation.messages())
    }

    const { user } = request.only('user')

    return api.get(`users/${user}`)
      .then(async data => {
        const { login, name, bio, location, html_url, avatar_url } = data.data
        const user = await GithubUser.create({login, name, bio, location, html_url, avatar_url})
        return response.ok(user)
      })
      .catch(error => response.notFound({
        message: 'User Not Found !'
      }))

  }
}

module.exports = GithubUserController
