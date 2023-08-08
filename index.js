const express = require('express')
const path = require('path')



const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.set('PORT', process.env.PORT || 4000)
app.set(express.v)

app.use('/', require('./routes/products'))
app.use('/', require('./routes/users'))
app.listen(app.get('PORT'), ()=> console.log(`El servirdor esta escuchando por el puerto ${app.get('PORT')}`))