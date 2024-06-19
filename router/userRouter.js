const {createUser,getOne,estimatedUsage, payBill} = require(`../controller/userController`)
const router = require(`express`).Router()

router.post("/createuser",createUser)
router.get(`/getone/:id`,getOne)
router.put(`/updateusage`,estimatedUsage)
router.put(`/updatepayment`,payBill)
module.exports=router