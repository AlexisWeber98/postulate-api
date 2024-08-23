const { User } = require ("../../db")

export const createUser = async (name: string, lastName: string, userName: string, email:string, password:string) => { 
    
    try {
        const data = await User.create({
            name,
            lastName,
            userName,
            email,
            password
        });
        
    } catch (error){
        throw error;
    };
};