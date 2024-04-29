const customercontroller = require("../controllers/customercontroller")

const express = require("express")
const customerrouter = express.Router()

customerrouter.post("/insertcustomer",customercontroller.insertcustomer)
customerrouter.post("/checkcustomerlogin",customercontroller.checkcustomerlogin)
customerrouter.put("/updatecustomerprofile",customercontroller.updatecustomerprofile)
customerrouter.get("/customerprofile/:email",customercontroller.customerprofile )
customerrouter.post("/insertcontact",customercontroller.insertcontact)

customerrouter.get("/viewfooditems",customercontroller.viewfooditems)
customerrouter.post("/orderfood",customercontroller.orderfood)
customerrouter.get("/foodorders/:email",customercontroller.foodorders)
customerrouter.delete("/cancelorder/:orderId",customercontroller.cancelorder)

module.exports = customerrouter