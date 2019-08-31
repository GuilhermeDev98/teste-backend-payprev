'use strict'

const { test, trait, afterEach } = use('Test/Suite')('Auth')
const Database = use('Database')

trait('Test/ApiClient')

afterEach(async () => {
  await Database.table('users').delete()
})


test('not register if not pass email', async ({ client, assert }) => {
  const response = await client.post('/api/v1/auth/register').send({
    "password":"secret",
    "cpf":"07368424540",
    "status":"admin"
  }).end()
  
  return response.assertJSONSubset([{"validation": "required"}])
})

test('not register if not pass valid email', async ({ client, assert }) => {
  const response = await client.post('/api/v1/auth/register').send({
    "email": "guilhermedevhotmail.com",
    "password":"secret",
    "cpf":"07368424540",
    "status":"admin"
  }).end()
  
  return response.assertJSONSubset([{"validation": "email"}])

})

test('not register if not pass a password', async ({ client, assert }) => {
  const response = await client.post('/api/v1/auth/register').send({
    "email": "guilhermedev@hotmail.com",
    "cpf":"07368424540",
    "status":"admin"
  }).end()
  
  return response.assertJSONSubset([{"validation": "required"}])

})

test('not register if pass a password under of 6 caracters', async ({ client, assert }) => {
  const response = await client.post('/api/v1/auth/register').send({
    "email": "guilhermedev@hotmail.com",
    "password":"12345",
    "cpf":"07368424540",
    "status":"admin"
  }).end()
  
  return response.assertJSONSubset([{"validation": "min"}])

})

test('not register if pass a invalid cpf', async ({ client, assert }) => {
  const response = await client.post('/api/v1/auth/register').send({
    "email": "guilhermedev@hotmail.com",
    "password":"123456",
    "cpf":"hello",
    "status":"admin"
  }).end()
  
  return response.assertJSONSubset([{"validation": "number"}])

})

test('not register if pass a cpf less than 11 characters', async ({ client, assert }) => {
  const response = await client.post('/api/v1/auth/register').send({
    "email": "guilhermedev@hotmail.com",
    "password":"123456",
    "cpf":"0736842454",
    "status":"admin"
  }).end()
  
  return response.assertJSONSubset([{"validation": "min"}])

})
test('not register if pass a cpf more than 11 characters', async ({ client, assert }) => {
  const response = await client.post('/api/v1/auth/register').send({
    "email": "guilhermedev@hotmail.com",
    "password":"123456",
    "cpf":"073684245411",
    "status":"admin"
  }).end()
  
  return response.assertJSONSubset([{"validation": "max"}])

})

test('not register if not pass user type field', async ({ client, assert }) => {
  const response = await client.post('/api/v1/auth/register').send({
    "email": "guilhermedev@hotmail.com",
    "password":"123456",
    "cpf":"07368424541",
    "type": "admin"
  }).end()
  return response.assertJSONSubset([{"validation": "required"}])

})


test('create user if pass all fields correctly', async ({ client, assert }) => {
  const data = {
    "email": "guilhermedev@hotmail.com",
    "password":"123456",
    "cpf":"07368424541",
    "status": "admin"
  }

  const response = await client.post('/api/v1/auth/register').send(data).end()
  
  return response.assertStatus(200)

})

