const userModel = require("../model/userModel")
const { EARNINGS_BY_PARENT_LEVEL, TYPE_OF_PARENT } = require("../util/constants")

exports.createUser = async(bodyData) =>{
    const {name, parentId=''} = bodyData || {}
    let parentDetails
    let ancestors = []
    if(parentId) {
        parentDetails = await userModel.findOne({
            isDeleted : false,
            _id : parentId
        }).lean()
        if(!parentDetails){
            console.log('Parent not found',{parentId})
            return {status:false,code:404,message:'Parent not found, Invalid Parent Id'}
        }
        ancestors = [parentId]
    }

    const {ancestors:parentAncestors=[]} = parentDetails || {}

    if(ancestors?.length && parentAncestors.length){
        for (let index in parentAncestors){
            if(Number(index)+1<8){
                ancestors[Number(index)+1] = parentAncestors[index]
            }
        }
    }
    
    const userData = {
        name,
        ...(parentDetails && {parent: parentId}),
        ...(ancestors.length && {ancestors})
    }

    const user = await userModel.create(userData)
    return {status : true, code:201, data : user}
}

exports.getUsers = async()=>{
    const users = await userModel.find({
        isDeleted : false
    }).populate('ancestors').sort({createdAt:-1})

    if(!users?.length){
        return {status : true , code: 200 , message:'No Users are present'}
    }

    return {status : true, code:200, data:users}
}


exports.getDistributeEarnings = async(userId,earnings)=>{
    const userDetails = await userModel.findById(userId).populate("ancestors").lean()
    if(!userDetails || userDetails.isDeleted){
        return {status : false, code : 404, message : 'User not found'}
    }
    
    const {ancestors} = userDetails || {}
    const ancestorsEarnings = []

    for(let i=0; i<ancestors.length; i++){
        const {name} = ancestors[i] || {}
        ancestorsEarnings.push({
            name,
            earning : Number(earnings) * EARNINGS_BY_PARENT_LEVEL?.[i],
            typeOfParent : TYPE_OF_PARENT?.[i]
        })
    }
    userDetails.ancestors = ancestorsEarnings
    return {status : true, code : 200, data : userDetails}
}

exports.distributeEarnings = async(userId,earnings)=>{
    const userDetails = await userModel.findById(userId).populate("ancestors").lean()
    if(!userDetails || userDetails.isDeleted){
        return {status : false, code : 404, message : 'User not found'}
    }
    
    const {ancestors=[],earnings:userEarning=0} = userDetails || {}
    const ancestorsEarnings = []

    const ancestorUpdatingData = [{
        updateOne: {
            filter: { _id:userId,isDeleted : false },
            update: { $set: { earnings : Number(userEarning) + Number(earnings)} }
         }
    }]

    for(let i=0; i<ancestors.length; i++){
        const {_id='',earning=0} = ancestors[i] || {}
        ancestorUpdatingData.push({
            updateOne: {
                filter: { _id,isDeleted : false },
                update: { $inc: { earnings: earning + (Number(earnings) * EARNINGS_BY_PARENT_LEVEL?.[i]) } }
             }
        })
    }

    const result = await userModel.bulkWrite(ancestorUpdatingData)
    console.log({result})
    return {status : true, code : 200, message : 'Earnings updated successfully'}
}