'use strict'
const { validate } = use('Validator')
const Folder = use('App/Models/Folder')
const User = use('App/Models/User')
const GithubUser = use('App/Models/GithubUser')



/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with folders
 */
class FolderController {
  /**
   * Display all folder.
   * GET folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
    const user = await User.find(auth.user.id)
    const folders = await user.folders().fetch()
    return response.ok(folders)
  }

  /**
   * Create/save a new folder.
   * POST folders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const validation = await validate(request.all(), {
      name: 'required|min:3|max:25'
    })

    if(validation.fails()){
      return response.forbidden(validation.messages())
    }

    const folder = await Folder.create({
      "name": request.only('name').name,
      'user_id': auth.user.id
    })

    return response.ok(folder)

  }

  /**
   * Display a single folder.
   * GET folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const folders = await Folder.query().where({id: params.folder}).with('users.tags').fetch()
    response.ok(folders)
  }

  /**
   * Update folder details.
   * PUT or PATCH folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const validation = await validate(request.all(), {
      name: 'required|min:3|max:25'
    })

    if(validation.fails()){
      return response.forbidden(validation.messages())
    }

    try {
      const folder = await Folder.find(params.folder)
      folder.name = request.input('name')
      await folder.save()
      return response.ok(folder)
    } catch (error) {
      return response.badRequest({error: { message: 'unexpected error'}})      
    }

  }

  /**
   * Delete a folder with id.
   * DELETE folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const folder = await Folder.find(params.folder)
      console.log(await folder.delete())
      await folder.delete()
      return response.noContent()
    } catch (error) {
      return response.badRequest({error: { message: 'unexpected error'}})      
    }
  }

  /**
   * Add a githubuser in folder id.
   * DELETE folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async githubUser({params, response}){
    const folder = await Folder.find(params.folder)
    const githubUser = await GithubUser.find(params.githubuser)
    try {
      await folder.users().save(githubUser)
      return response.created(folder, githubUser)
    } catch (error) {
      response.badRequest(error)
    }
  }
}

module.exports = FolderController
