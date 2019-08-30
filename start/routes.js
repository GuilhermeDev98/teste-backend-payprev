'use strict'

const Route = use('Route')

Route.group(() => {
    Route.post('auth/login', 'AuthController.login')
    Route.post('auth/register', 'AuthController.register')

    Route.get('users', 'UserController.index')
    Route.post('users/tags', 'TagsController.tags')
    Route.post('users/tags', 'TagsController.tags')
    Route.post('users/folders', 'FolderController.foldes')
  }).prefix('api/v1')