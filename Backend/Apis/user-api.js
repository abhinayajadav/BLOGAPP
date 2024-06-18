const expressAsyncHandler=require('express-async-handler')
const exp=require('express')
require('dotenv').config()
const TokenVerify=require('../middlewares/TokenVerify')
const userApp=exp.Router();
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
//const commonApp=require('./common-api')
//get usercollcetion app
let blogusersCollection
let articles
userApp.use((req,res,next)=>{
blogusersCollection=req.app.get('blogusersCollection')
articles=req.app.get('articles')
next()
})
/// User register
userApp.post('/user', expressAsyncHandler(async(req,res)=>{
    const newUser = req.body;
    // Checking whether username is unique or not
    const dbuser = await blogusersCollection.findOne({ username: newUser.username });
    
    if(dbuser !== null) {
        res.send({ message: "User already exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        newUser.password = hashedPassword;
        await blogusersCollection.insertOne(newUser);
        res.send({ message: "User created" });
    }
}));

// User login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const userCred=req.body;
    const dbuser=await blogusersCollection.findOne({username:userCred.username, userType: 'user'});
    if(dbuser==null){
        res.send({message:"Invalid username or userType"});
    }else{
        const status=await bcryptjs.compare(userCred.password,dbuser.password);
        if(status==false){
            res.send({message:"Invalid password"});
        }else{
            const signedToken=jwt.sign(
                {username:dbuser.username},process.env.SECRET_KEY,{expiresIn:40})
            res.send({message:"login done!",
            token:signedToken,
            user:dbuser})
        }
    }
}));

//get articles of all users
userApp.get('/articles',TokenVerify,expressAsyncHandler(async(req,res)=>{
//get artciles collection
const articles=req.app.get('articles')
//get all artciles
let articlesList=await articles.find({status:true}).toArray()
res.send({message:"articles",payload:articlesList})
}))

//post cmmts by user
userApp.post('/comments/:articleId',TokenVerify,expressAsyncHandler(async(req,res)=>{
const userComment=req.body
const articleIdUrl=(+req.params.articleId)
//add it to cmmt to commemts obj array
let r=await articles.updateOne({articleId:articleIdUrl},
    {$addToSet:{comments:userComment}})
res.send({message:"comments posted"})
}))



module.exports=userApp