const Org = require('../model/org-model');
const faker = require('faker');


const createOrg = async(req, res)=>{
    const name = faker.company.companyName();
    try{
        const existingOrg = await Org.findOne({name});
        if (existingOrg) {
            return res.status(409).json({ error: 'Org Already Exists' });
        }
        await Org.create({
            name,
        });
        return res.status(200).json('Org created');
    }catch(error){
        return res.status(500).json('Internal Server Error');
    }
}

const readOrg = async(req, res)=>{
    try{
        const exists = await Org.find();
        if(exists){
            return res.status(200).json(exists);
        }else{
            return res.status(404).json('No orgs found');
        }
    }catch(error){
        return res.status(500).json('Internal server error');
    }
}

const readOrgById = async(req, res)=>{
    const orgId = req.params.id;
    try{
        const exists = await Org.findOne({_id:orgId});
        if(exists){
            return res.status(200).json(exists);
        }else{
            return res.status(404).json('Org not found');
        }
    }catch(error){
        return res.status(500).json('Internal server error');
    }
}

const updateOrg = async(req, res)=>{
    const orgId = req.params.id;
    const {name} = req.body;
    try{
        const exists = await Org.findOne({_id:orgId});
        if(exists){
            await exists.updateOne({$set:{name:name}});
            return res.status(204).json('Org updated');
        }else{
            return res.status(404).json('Org not found');
        }
    }catch(error){
        return res.status(500).json('Internal server error');
    }
}

const deleteOrg = async(req, res)=>{
    const orgId = req.params.id;
    try{
        const exists = await Org.findOne({_id:orgId});
        if(exists){
            await exists.deleteOne();
            return res.status(204).json('Org deleted')
        }else{
            return res.status(404).json('Org does not exists');
        } 
    }catch(error){
        return res.status(500).json('Internal server error');
    }
}


module.exports={
    createOrg,
    readOrg,
    readOrgById,
    updateOrg,
    deleteOrg
}