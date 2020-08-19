const express = require('express');


require('./db/mongoose')
const app = express();

const port = process.env.PORT || 5000
const userRouter = require('./router/user')
const screamRouter = require('./router/scream')
const cookieParser = require('cookie-parser')


//Middleware for maintanance
/* app.use((req,res,next) =>{
    res.status(503).send('The site is under maintainance')
}) */



app.use(cookieParser())
app.use(express.json())
app.use(userRouter)
app.use(screamRouter)


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../public/social-client/build'))
}

app.listen(port, ()=>{
    console.log('Server Started')
})