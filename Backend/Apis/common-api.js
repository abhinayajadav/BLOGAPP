const exp=require('express')
const commonApp=exp.Router()





commonApp.get('/common',(req,res)=>{
    res.send({message:'common-api'})
})


















module.exports=commonApp;