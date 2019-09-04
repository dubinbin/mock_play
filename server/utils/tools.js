const jwt = require('jsonwebtoken')
const formidable = require("formidable")

const secret = 'YIKESAITING'

const Util = {
    setToken:(payload)=>{
        return jwt.sign(payload, secret, { expiresIn: '2h' })
    },
    checkToken:(token)=>{
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            reject(err)
            return
          }
          resolve(decoded)
        })
      })
    },
    treamentFormData: async(data) => {
      return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm()
        form.parse(data, async(err, fields, files) => {
            if(err){reject(err)}
            resolve(fields)
        });
      })
    }
}

module.exports ={
    Util
}


