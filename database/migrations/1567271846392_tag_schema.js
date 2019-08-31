'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments()
      table.string('name', 25).notNullable()
      table.integer('folder_id').unsigned().notNullable().references('id').inTable('folders')
      table.integer('github_user_id').unsigned().notNullable().references('id').inTable('github_users')
      table.timestamps()
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = TagSchema
