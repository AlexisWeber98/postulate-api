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

export const login = async (email: string, password: string) => {
    try { 
        const user = await User.findOne({ where: { email } });
        
        if (!user) throw new Error("User not Found");
        
        if (user.password !== password) throw new Error("Passord not match");
        
        return user;
    } catch (error) {
        throw error;
    };
}