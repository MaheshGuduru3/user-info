const { createEmp, allEmp, deleteEmp, updateEmp } = require('../controller/empController')
const { userLogin, userRegister } = require('../controller/userController')

const route = require('express').Router()

route.get('/' , (req,res)=>{
      res.status(200).json({message:"Normal health"})
})

// user login and register apis

route.post('/register' , userRegister)
route.post('/login' , userLogin)


// emp

route.post('/emp' , createEmp)
route.get('/emp' , allEmp)
route.delete('/emp/:id' , deleteEmp)
route.patch('/emp', updateEmp)




module.exports = route