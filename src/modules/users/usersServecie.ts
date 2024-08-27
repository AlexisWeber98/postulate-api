import db from "../../db";
import { Model } from "sequelize";
import { UserModelInterface } from "../../models/modelTypes";
const { User } = db.models;


export const createUser = async (name: string, lastName: string, userName: string, email:string, password:string) => { 
    
    try {
        const data = await User.create({
            name,
            lastName,
            userName,
            email,
            password
        });
        
        
        return data;
        
    } catch (error){
        return {
        message: "error al crear usuario en create user",
       error
    }
    };
};

export const login = async (email: string, password: string) => {
    try { 
        const user = await User.findOne({ where: { email } }) as Model<UserModelInterface, any>;

        if (!user) throw new Error("User not Found");
        
        if (user.get('password') !== password) throw new Error("Password not match");
        
        return user;
    } catch (error) {
        throw error;
    };
}