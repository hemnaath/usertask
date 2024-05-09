const User = require('../model/user-model');
const Org = require('../model/org-model');
const {passcrypt, compass} = require('../helper/password-helper');
const {generateToken} = require('../helper/token-helper');
const faker = require('faker');


const login = async(req, res)=>{
    const {email, password} = req.body;
    const exists = await User.findOne({email});
    if(exists){
        const comparedPassword = await compass(password, exists.password);
        if(comparedPassword){
            const token = generateToken(exists);
            return res.status(200).json({token:token, role:exists.role, id:exists._id});
        }
    }
}

const register = async(req, res)=>{
    const {name, username, email, password, role} = req.body;
    try{
        const org = await Org.findOne().skip(Math.floor(Math.random() * await Org.countDocuments()));
        const existingUser = await User.findOne({$or:[{ email }, {username}]});
        if (existingUser) {
            return res.status(409).json({ error: 'User Already Exists' });
        }
        const encryptedPassword = await passcrypt(password, process.env.SALT_ROUNDS);
        await User.create({
            name,
            username,
            email,
            password:encryptedPassword,
            org_id:org._id,
            role
        });
        return res.status(201).json('User created');
    }catch(error){
        return res.status(500).json('Internal Server Error');
    }
}

const createUser = async(req, res)=>{
    const name = faker.name.findName();
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const role = 'user'; 
    try{
        const org = await Org.findOne().skip(Math.floor(Math.random() * await Org.countDocuments()));
        const existingUser = await User.findOne({$or:[{ email }, {username}]});
        if (existingUser) {
            return res.status(409).json({ error: 'User Already Exists' });
        }
        const encryptedPassword = await passcrypt(password, process.env.SALT_ROUNDS);
        await User.create({
            name,
            username,
            email,
            password:encryptedPassword,
            role,
            org_id:org._id
        });
        return res.status(201).json('User created');
    }catch(error){
        return res.status(500).json('Internal Server Error');
    }
}

const readUser = async(req, res)=>{
    try{
        const exists = await User.find();
        if(exists){
            return res.status(200).json(exists);
        }else{
            return res.status(404).json('No users found');
        }
    }catch(error){
        return res.status(500).json('Internal server error');
    }
}

const readUserById = async(req, res)=>{
    const userId = req.params.id;
    try{
        const exists = await User.findOne({_id:userId});
        if(exists){
            return res.status(200).json(exists);
        }else{
            return res.status(404).json('User not found');
        }
    }catch(error){
        return res.status(500).json('Internal server error');
    }
}

const updateUser = async(req, res)=>{
    const userId = req.params.id;
    const {name, username, email, password, role} = req.body;
    try{
        const exists = await User.findOne({_id:userId});
        if(exists){
            const encryptedPassword = await passcrypt(password, process.env.SALT_ROUNDS);
            await exists.updateOne({$set:{name:name, username:username, email:email, role:role, password:encryptedPassword}});
            return res.status(204).json({message:'User updated'});
        }else{
            return res.status(404).json('User not found');
        }
    }catch(error){
        return res.status(500).json('Internal server error');
    }
}

const deleteUser = async(req, res)=>{
    const userId = req.params.id;
    try{
        const exists = await User.findOne({_id:userId});
        if(exists){
            await exists.deleteOne();
            return res.status(204).json('User deleted')
        }else{
            return res.status(404).json('User does not exists');
        }
    }catch(error){
        return res.status(500).json('Internal server error');
    }
}


module.exports={
    createUser,
    login,register,
    readUser,
    readUserById,
    updateUser,
    deleteUser
}