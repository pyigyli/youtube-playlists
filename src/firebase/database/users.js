import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '../init'

export const createUser = async (username, password) => {
  try {
    const findDuplicateUser = await db.ref('users').orderByChild('username').equalTo(username).once('value')
    if (findDuplicateUser.toJSON()) {
      console.log('Username already taken.')
      return null
    }
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const ref = db.ref(`users`).push({
      username,
      passwordHash
    })
    return await loginUser(username, password)
  } catch (err) {
    console.log('Unable to reach database.')
    console.error(err)
  }
}

export const deleteUser = async (id) => {
  try {
    await db.ref(`users/${id}`).remove()
    return null
  } catch (err) {
    console.log('Unable to reach database.')
    console.error(err)
  }
}

export const loginUser = async (username, password) => {
  try {
    const userSnapshot = await db.ref('users').orderByChild('username').equalTo(username).once('value')
    let user = userSnapshot.toJSON()
    if (user && await bcrypt.compare(password, Object.values(user)[0].passwordHash)) {
      const id = Object.keys(user)[0]
      const token = jwt.sign(id, 'Super Secret')
      await db.ref(`users/${id}/token`).set(token)
      return {
        username: Object.values(user)[0].username,
        token,
        id
      }
    }
    return null
  } catch (err) {
    console.log('Unable to reach database.')
    console.error(err)
  }
}

export const logoutUser = async (id) => {
  try {
    await db.ref(`users/${id}/token`).remove()
    return null
  } catch (err) {
    console.log('Unable to reach database.')
    console.error(err)
  }
}
