  
const db = require('../data/dbConfig.js')
const jwt = require('jsonwebtoken')
const secret = require('../auth/secret.js')

module.exports = {
  find,
  addUser,
  deleteUser,
  generateToken,
 
}

function generateToken() {
  const payload = {
    message: 'Onward!'
  }

  const options = {
    expiresIn: '365d'
  }

  return jwt.sign(payload, secret.jwtSecret, options)
}

function find() {
  return db('users')
}


async function addUser(user) {
  console.log('USER', user)
  const [id] = await db('users')
    .returning('id')
    .insert(user)
  return db('users')
    .where({ id })
    .first()
}

async function deleteUser(id) {
  const deleted = db('users')
    .where('id', id)
    .del()
  console.log(deleted, 'hi')

  return deleted
}

