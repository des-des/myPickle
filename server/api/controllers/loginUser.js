const express = require("express")
const router = express.Router()

// load query
const loginUser = require("../../database/queries/loginUser")

router.post("/", (req, res) => {
  const { email, password } = req.body
  let errors = {}

  loginUser(email, password, errors)
    .then(token => {
      res.status(200).json(token)
    })

    .catch(err => res.status(400).json(err))
})

module.exports = router
