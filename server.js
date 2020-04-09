if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const app = express()
 

const indexRouter  = require ('./routes/index')
const adminRouter  = require ('./routes/admin')





app.set('view engine' ,'ejs')
app.set('views', __dirname +  '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('static'))
app.use(bodyParser.urlencoded({extended: false}))


const moongoose = require('mongoose')
moongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = moongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.error('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/admin', adminRouter)

app.listen(process.env.PORT || 3000)