const Service = require('../models/service');
const User = require('../models/user');

const isVendor = async (_id) => {
    const user = await User.findById(_id);
    if (!user || user.role !=='vendor'){
        return Promise.reject();
    }else{
        return Promise.resolve();
    }
};

exports.addService = async (req, res) => { // only allowed for 'admin'
    try{
        await isVendor(req.body.vendorID);
        const service = await Service.create(req.body);
        res.status(200).json({message: 'Service Added', data: service});

    }catch(e){
        res.status(501).json({
            message: 'Failed to add service'
        });
    }
};

exports.listServices = async (req, res) => { // public API
    try{
        const service = await Service.find({});
        res.status(200).json({data: service});

    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.updateService = async (req, res) =>{
    try{
        const _id = req.params.id;
        if(req.body.vendorID){
            await isVendor(req.body.vendorID);
        }
        const service = await Service.findByIdAndUpdate(_id, req.body, {new:true});
        if (!service){
            throw new Error();
        }
        res.status(200).json({
            message: 'Service Updated',
            data: service
        });
    }catch(e){
        res.status(501).json({
            message: "Failed to update"
        });
    }
};

exports.getService = async (req, res) => {
    try{
        const _id = req.params.id;
        const service = await Service.findById(_id);;
        if (!service){
            throw new Error();
        }
        res.status(200).json({
            message: 'Service data',
            data: service
        });
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.getServiceOfCategory = async (req, res) =>{
    try{
        const categoryID = req.params.id;
        const services = await Service.find({categoryID});
        if (!services){
            throw new Error();
        }
        res.status(200).json({
            message: 'Services data',
            data: services
        });
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const _id = req.params.id;
        const service = await Service.findByIdAndDelete(_id);
        res.status(200).json({message: 'Service Deleted', data: service});
    } catch (e) {
        res.status(501).json({message: e.message});
    }
};
