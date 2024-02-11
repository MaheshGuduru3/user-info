import * as Yup  from 'yup'

export const formValidation = new Yup.object({
    email:Yup.string().email().required("Required Email"),
    username:Yup.string().min(5).max(30).matches("^[a-z]+$", "Username is only lowercase withoutspace valid").required("Required username"),
    phonenumber:Yup.string().matches("^[6-9]{1}[0-9]{9}", "Indian phone number is valid").max(10).required("Required Phonenumber"),
    password:Yup.string().min(8).required("Required Password").matches("^[A-Z]+[a-z]+[^a-zA-Z0-9]+[0-9]+","Atleast one number,Uppercase,Lowercase,special characters"),
    repassword:Yup.string().required("Required reenterpassword").oneOf([ Yup.ref('password') , null ], "mismatch password") 
})


export const loginUser = new Yup.object({
    email:Yup.string().email().required("Required Email"),
})