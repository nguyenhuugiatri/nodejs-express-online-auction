const express=require('express');
const exphbs=require('express-handlebars');

const app=express();

app.use(express.static(__dirname + '/public'));

app.engine('hbs',exphbs({
  defaultLayout:'main.hbs',
  layoutsDir:'views/_layouts'
}))

app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
  res.render('home');
});

const PORT=3000;
app.listen(PORT,()=>{
  console.log(`Listing at port ${PORT}!`);
});