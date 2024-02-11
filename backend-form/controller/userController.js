const user = require('../model/userSchema')
const bcrypt = require('bcrypt')

const userRegister = async (req,res)=>{

    const {username , password , email , phonenumber}  = req.body;
    
    if(!email || !password || !phonenumber || !username){
        return res.status(499).json({message : "Required Fields"})
    }
  
    const checking = await user.findOne({$or :[ { email } , { phonenumber }]})
  
    if(checking){
       return res.status(403).json({message:"Already Exists your email/phonenumber"})
    }

    const hashPassword = await bcrypt.hash(password , 10)

    const data = {
          username,
          password : hashPassword,
          email,
          phonenumber
    }

    try{
        const result = await user.create(data)
        if(result){
          return res.status(201).json({message:"Successfully created"})
        }
    }
    catch(err){
      return res.status(500).json({message:err.message})
    }
}


const userLogin = async (req,res)=>{

    const { email , password} = req.body


    if(!email  || !password){
        return res.status(499).json({message:"Required Fields"})
    }

    try{
        
        const result = await user.findOne({email})
        if(result){
            
            if(await bcrypt.compare(password , result.password)){
                 return res.status(201).json({message:'success' , data:result})
            }
            else{
              return res.status(401).json({message:"Invalid email/phonenumber or password"})
            }
        }
        else{
          return res.status(404).json({message:'Not Found'})
        }
    }
    catch(err){
      return res.status(500).json({message:err.message})
    }
}


module.exports = {
      userLogin,
      userRegister
}