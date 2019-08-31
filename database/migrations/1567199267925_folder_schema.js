'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FolderSchema extends Schema {
  up () {
    this.create('folders', (table) => {
      table.increments()
      table.string('name', 25).notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('folders')
  }
}

module.exports = FolderSchema
