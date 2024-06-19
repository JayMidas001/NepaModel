const mongoose = require(`mongoose`)
const nepaSchema = new mongoose.Schema({
    CustomerName:{type:String,required:[true,"Customer Name is required."]},
    Address:{type:String,required:[true,"Address is required."]},
    MeterNo:{type:Number},
    PaymentDate:{type:Date},
    AmountSubscribed:{type:Number,required:[true,"Amount subscribed is required."]},
    PhoneNumber:{type:String,unique:true,required:[true,"PhoneNumber is required."]},
    Outstanding:{type:Number,default:0},
    Conversion:{type:Number, default: function(){
        return (this.AmountSubscribed/66.7).toFixed(2)
    }}
},{timestamps:true})

const nepaModel = mongoose.model("Electricity model", nepaSchema)

module.exports = nepaModel