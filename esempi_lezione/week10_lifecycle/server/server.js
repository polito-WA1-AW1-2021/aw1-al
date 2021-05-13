const express = require('express') ;
const flip = require('flip-text') ;

const app = express() ;

app.get('/number',  (req,res)=>{
    const n = Math.floor(Math.random()*100)+1 ;
    res.json({number:n}) ;
}) ;

app.get('/flip', (req, res) => {
   const text = req.query.text ;
   const flipped = flip(text) ;
   setTimeout(()=>res.json({text: flipped}),1000 )
});

app.listen(3001, ()=>{console.log('running')})
