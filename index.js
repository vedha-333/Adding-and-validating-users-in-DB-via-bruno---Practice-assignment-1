const express = require('express');
const { resolve } = require('path');
const bcrypt=require('bcrypt');
const User=require('./user.model.js')

const app = express();
const port = 3010;


const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://amityohan20:PfwrwRdOI7H1BZSx@cluster0.jmbrf.mongodb.net/adding-and-validating-users')
.then(()=>{
  console.log('Connected to database')
})
.catch((er)=>{
  console.error(er.message)
})

app.use(express.json())
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/login-user', async (req,res)=>{
  try{
    const {username, email, password}= req.body;
    if (!username|| !email || !password){
      return res.status(400).send({message:'Please Provide all required details.'})
    }

    const hashedPwd=await bcrypt.hash(password,10)

    const user=new User({username, email, password:hashedPwd})
    await user.save()

    res.status(201).send({message:"User Created successfully"})

  }catch(er){
    return res.status(500).send({message:"Internal Server Error."})
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
