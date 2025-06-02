import UserService from '../services/user-service.js';

const userService = new UserService();

export const signUp= async (req , res)=>{
    try{
        const user = await userService.signUp({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: "User created successfully",
            data: user,
            success: true,
            error: {}
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in signup",
            data: {},
            success: false,
            error: error
        });
    }
}

export const login = async (req , res ) => {
    try{
        const token = await userService.login(req.body);
        return res.status(200).json({
            message: "User logged in successfully",
            data: token,
            success: true,
            error: {}
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in login",
            data: {},
            success: false,
            error: error
        })
    }
}