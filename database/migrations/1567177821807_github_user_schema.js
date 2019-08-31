'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GithubUserSchema extends Schema {
  up () {
    this.create('github_users', (table) => {
      table.increments()
      table.string('login').notNullable()
      table.string('name').notNullable()
      table.string('bio').nullable()
      table.string('location').notNullable()
      table.string('html_url').notNullable()
      table.string('avatar_url').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('github_users')
  }
}

module.exports = GithubUserSchema
