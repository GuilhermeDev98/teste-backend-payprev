'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FolderUserSchema extends Schema {
  up () {
    this.create('folder_users', (table) => {
      table.increments()
      table.integer('folder_id').unsigned().notNullable().references('id').inTable('folders')
      table.integer('github_user_id').unsigned().notNullable().references('id').inTable('github_users')
      table.timestamps()
    })
  }

  down () {
    this.drop('folder_users')
  }
}

module.exports = FolderUserSchema
