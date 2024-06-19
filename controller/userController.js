const nepaModel = require(`../model/userModel`)
const date = new Date()

//create a user
const createUser = async(req,res)=>{
    try {
    const generateMeterNo = function(){
        return Math.floor(Math.random()*100000000)
    }
    const{CustomerName,Address,AmountSubscribed,PhoneNumber}=req.body
    const data={CustomerName,
        Address,
        AmountSubscribed,
        PhoneNumber,
        MeterNo:generateMeterNo(),
        PaymentDate: date.toLocaleDateString()
    }
    const createdUser = await nepaModel.create(data)
    res.status(201).json({message:`New user created`, data:createdUser})
    } catch (e) {
        res.status(500).json(e.message)
    }
}

const getOne = async(req,res)=>{
    let id = req.params.id
    try {
    const getUser = await nepaModel.findById(id)
    res.status(200).json({message:`Kindly find the user with ID: ${id} below`, data:getUser})
    } catch (e) {
        res.status(500).json(e.message)
    }
}

const estimatedUsage = async(req,res)=>{
    try {
    const{MeterNo,MonthlyUsage}=req.body
    const owner = await nepaModel.findOne({MeterNo})
    if(!owner){
        return res.status(400).json({message:`User with MeterNo not found`})
    }
    let RemainingUnits = owner.Conversion-MonthlyUsage
    const monthlyReading = await nepaModel.findOneAndUpdate({MeterNo},{RemainingUnits},{new:true})
    res.status(200).json({message:`Monthly reading successfully updated`, data:monthlyReading})

    } catch (e) {
        res.status(500).json(e.message)
    }
}

const payBill = async(req,res)=>{
    try {
        const{MeterNo,amount}=req.body
        const owner = await nepaModel.findOne({MeterNo})
        if(!owner){
            return res.status(400).json({message:`User with MeterNo not found`})
        }
    // let calculatedRate = (amount/66.7).toFixed(2)
    let calculatedRate = parseFloat((amount / 66.7).toFixed(2));

    let RemainingBalance = owner.Conversion+calculatedRate
        console.log(RemainingBalance);

    const amountPaid = await nepaModel.findOneAndUpdate({MeterNo},{Conversion:RemainingBalance},{new:true})
    res.status(200).json({message:`Kindly fing your remaining balance here`, data:amountPaid}) 
    } catch (e) {
        res.status(500).json(e.message)
    }
}

module.exports = {createUser,getOne,estimatedUsage,payBill}