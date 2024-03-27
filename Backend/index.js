const connectTomongo=require('./db');
const express = require('express')
connectTomongo();

const app = express()
const port = 5001

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/',(req, res)=>{
//   res.send('Hello Priyanshu')
// })


// app.get('/api/v1/login',(req, res)=>{
//   res.send('Hello login')
// })

// app.get('/api/v1/signup',(req, res)=>{
//   res.send('Hello signup')
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
