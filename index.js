const express = require("express");

const app = express();
const db = require('./config/dataBase');
const userDB = require("./models/dataTbl");
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/form',(req,res)=>{
    return res.render('form')
});



app.get('/',(req,res)=>{
    userDB.find({}).then((user)=>{
        return res.render('index',{user})
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})
app.post('/insertdata',(req,res)=>{
    const { image, name, price, Genre } = req.body
    userDB.create({
        image: image,
        name: name,
        Genre: Genre,
        price: price
    }).then((user)=>{
        console.log("Data successfully Inserted..!");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err)
        return false;
    })
})

app.get('/deleteData', (req, res) => {
    let id = req.query.id;
    console.log(id);
    userDB.findByIdAndDelete(id).then(() => {
        console.log("Data deleted successfully!");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})
app.get('/editData', (req, res) => {
    let id = req.query.id;
    userDB.findById(id).then((user) => {
        return res.render('edit', { user });
    }).catch((err) => {
        console.log(err);
        return false;
    })
})
app.post('/editData', (req, res) => {
    
    const { id,image, name, price, Genre } = req.body
    
    console.log(id);
    userDB.findByIdAndUpdate(id,{
        image: image,
        name: name,
        Genre: Genre,
        price: price
    }).then((user)=>{
        console.log("Data Updated!");
        return res.redirect('/');

    }).catch((err)=>{
        console.log(err)
        return false;
    })
})

app.listen(8000,(err)=>{
    if(!err){
        console.log("server strat http://localhost:8000")
    }
})