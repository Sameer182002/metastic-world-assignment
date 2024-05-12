const { isValidObjectId } = require("mongoose")
const {isValidName } = require("../util/validator")
const userService = require("../service/userService")

exports.createUser = async(req,res)=>{
    try{
        const {name, parentId=''} = req?.body || {}
        if(!name || !isValidName(name)){
            return res.status(400).send({
                status : false,
                message : 'Pls enter a valid name'
            })
        }
        if(parentId && !isValidObjectId(parentId)){
            return res.status(400).send({
                status : false,
                message : "Please enter a valid parent id"
            })
        }
        const {status, code, message, data} = await userService.createUser(req?.body)
        return res.status (code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while creating user :`,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while creating user : ${error?.message}`
        })
    }
}


exports.getUsers = async(req,res) =>{
    try{
        const {status, code, message, data} = await userService.getUsers()
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while getting all users :`,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while getting all users : ${error?.message}`
        })
    }
}

exports.getDistributeEarnings = async(req,res)=>{
    try{
        const {userId='',earnings=''} = req?.query || {}
        if(!userId || !isValidObjectId(userId)){
            return res.status(400).send({
                status : false,
                message : "Please enter a valid user id"
            })
        }
        if(isNaN(earnings) || !Number(earnings)){
            return res.status(400).send({
                status : false,
                message : "Please enter valid amount of earnings"
            })
        }
        const {status,code,data,message} = await userService.getDistributeEarnings(userId,earnings)
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while fetching the distributing earnings`,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while fetching the distributing earnings : ${error?.message}`
        })
    }
}

exports.distributeEarnings = async(req,res) =>{
    const {userId='',earnings=''} = req?.body || {}
    try{
        if(!userId || !isValidObjectId(userId)){
            return res.status(400).send({
                status : false,
                message : "Please enter a valid user id"
            })
        }
        if(isNaN(earnings) || !Number(earnings)){
            return res.status(400).send({
                status : false,
                message : "Please enter valid amount of earnings"
            })
        }
        const {status,code,data,message} = await userService.distributeEarnings(userId,earnings)
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`Error while distributing the earning`,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while distributing the earning : ${error?.message}`
        })
    }
}