'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Folder extends Model {
    users () {
        return this.belongsToMany('App/Models/GithubUser').pivotTable('folder_users')
    }

    tags () {
        return this.hasMany('App/Models/Tag')
    }
}

module.exports = Folder
