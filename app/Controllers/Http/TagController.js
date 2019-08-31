'use strict'

const { validate } = use('Validator')
const Tag = use('App/Models/Tag')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tags
 */
class TagController {

  /**
   * Create/save a new tag.
   * POST tags
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const validation = await validate(request.all(), {
      name: 'required|min:3|max:25'
    })

    if(validation.fails()){
      return response.forbidden(validation.messages())
    }

    try {
      const tag = Tag.create({
        "name": request.input('name'),
        'folder_id': params.folder,
        "github_user_id": params.githubuser
      })
      response.created(tag)
    } catch (error) {
      request.badRequest(error)
    }


    
  }

  /**
   * Delete a tag with id.
   * DELETE tags/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TagController
