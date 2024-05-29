const express =require('express')
const router=express.Router()
const path = require('path');
router.get('/',(req,res)=>{
res.render('../views/gamesPage.ejs')
})
router.get('/ticTacToe',(req,res)=>{
res.sendFile(path.join(__dirname, '../public/GamesCode/TicTacToe.html'));
})
router.get('/scrambleGame',(req,res)=>{
res.sendFile(path.join(__dirname, '../public/GamesCode/WordScrambleGame.html'));
})
router.get('/typing',(req,res)=>{
res.sendFile(path.join(__dirname, '../public/GamesCode/typingSpeedTest.html'));
})
router.get('/rockPaper',(req,res)=>{
res.sendFile(path.join(__dirname, '../public/GamesCode/rockPaper.html'));
})
router.get('/guessNumber',(req,res)=>{
res.sendFile(path.join(__dirname, '../public/GamesCode/guessNumber.html'));
})
router.get('/memoryGame',(req,res)=>{
res.sendFile(path.join(__dirname, '../public/GamesCode/memoryGame.html'));
})
router.get('/hangman',(req,res)=>{
res.sendFile(path.join(__dirname, '../public/GamesCode/hangman.html'));
})


module.exports=router