const express = require('express')
const router = express.Router()

const {obtenerUsers} = require('../resources/users');



//login
router.post('/sesion', async(req, res) => {
  console.log('loguearse');
  const {user}= req.body
  const {password}= req.body

  const usuarios = await obtenerUsers()
  let userFound = false;
  usuarios.data.forEach(element =>  {
    
    if (user == element.user && password==element.password) {
        // console.log('ok');
        userFound = true;
    }
  });
    if (userFound) {
        console.log('ok');
        res.redirect('/admin');
    } else {
        res.redirect('/login');
    }
});

module.exports = router
