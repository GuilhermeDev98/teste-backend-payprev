'use strict'

const Route = use('Route')

Route.group(() => {
    Route.post('auth/login', 'AuthController.login')
    Route.post('auth/register', 'AuthController.register')

    Route.get('githubusers', 'GithubUserController.index').middleware(['auth'])
    Route.post('githubusers', 'GithubUserController.store').middleware(['auth', 'IsAdmin'])

    Route.get('folders', 'FolderController.index').middleware(['auth'])
    Route.post('folders', 'FolderController.store').middleware(['auth'])
    Route.get('folders/:folder', 'FolderController.show').middleware(['auth'])
    Route.post('folders/:folder/githubuser/:githubuser', 'FolderController.githubUser').middleware(['auth'])
    Route.post('folders/:folder/githubuser/:githubuser/tag', 'TagController.store').middleware(['auth'])
    Route.put('folders/:folder', 'FolderController.update').middleware(['auth'])
    Route.delete('folders/:folder', 'FolderController.destroy').middleware(['auth'])

  }).prefix('api/v1')