
import { Request,Response } from "express"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
// Controllers for User Registration

export const registerUser = async (req:Request,res:Response)=>{
    try{
        const {name,email,password} = req.body
        // find user by email
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({messsage:'User already exists'})
        }
        //Encrypt the password
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await  User.create({name,email,password:hashedPassword})

        // setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;
        return res.json({
            message: 'Account created successfully',
            user:{
                _id: newUser._id,
                name: newUser.name,
                emai:newUser.email
            }
        })
    }catch(error:any){
        console.log(error);
        res.status(500).json({message:error.message || 'Internal server Error'})
        

    }
}

// Controllers for User Login

export const loginUser = async (req:Request,res:Response)=>{
    try {
        const {email,password} = req.body
        // find user by email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({messsage:'Invalid email or password'})
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({messsage:'Invalid email or password'})
        }

        // setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        return res.json({
            message: 'Login Successful',
            user:{
                _id: user._id,
                name: user.name,
                emai:user.email
            }
        })
    } catch (error:any) {
        console.log(error);
        res.status(500).json({message:error.message || 'Internal server Error'})
    }
}

export const logoutUser = async (req:Request,res:Response)=>{
    req.session.destroy((error:any)=>{
        if(error){
            console.log(error)
            return res.status(500).json({messagea:error.message})
        }
    })
    return res.json({message:'Logout successful'})
}

export const verifyUser = async (req:Request,res:Response)=>{
    try{
        const {userId} = req.session;
        const user = await User.findById(userId).select('-password')
        if(!user){
            return res.status(400).json({message:'Invalid User'})
        }
        return res.json({user});
    }catch(error:any){
        console.log(error);
        res.status(500).json({message:error.message || 'Internal server Error'})
}
}

