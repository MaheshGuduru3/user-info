const employee = require('../model/empSchema')



const createEmp = async (req,res)=>{
  
    const {empname , empdesignation , empmail , empphonenumber, empdept}  = req.body;
    
    if(!empmail || !empdesignation || !empphonenumber || !empname || !empdept){
        return res.status(499).json({message : "Required Fields"})
    }
  
    const checking = await employee.findOne({$or :[ { empmail } , { empphonenumber }]})
  
    if(checking){
       return res.status(403).json({message:"Already Exists your email/phonenumber"})
    }
    
    const data = {
         empname,
         empdept,
         empdesignation,
         empmail,
         empphonenumber
    }
       try{
           const result = await employee.create(data)
           if(result){
              return res.status(201).json({message:"Added success"})
           }
       }
       catch(err){
           res.status(500).json({message:err.message})
       }
}


const allEmp = async(req,res)=>{
       try{
           const result = await employee.find()
           if(result){
             return res.status(201).json({message:"success" , data:result})
           }
       }
       catch(err){
           return res.status(500).json({message:err.message})
       }
}


const deleteEmp = async(req,res)=>{
       const  { id }  = req.params
      try{
               const result = await employee.findByIdAndDelete({_id : id})
               if(result){
                   res.status(201).json({message:"Deleted success"})
               }
               else{
                  res.status(404).json({message:"Not Deleted"})
               }
       }
       catch(err){
            res.status(500).json({message:err.message})
       }
}



const updateEmp = async(req,res)=>{
      const{ data , check} = req.body
      
      try{
            const result = await employee.findByIdAndUpdate({_id : check}, data)
            if(result){
                 res.status(201).json({message:"updated success"})
            }

      }
      catch(err){
           res.status(500).json({message:err.message})
      }
}



module.exports = {
       createEmp,
       allEmp,
       deleteEmp,
       updateEmp
}