// seller routes
const sellercontroller = require("../controllers/sellercontroller")

const express = require("express")
const sellerrouter = express.Router()

sellerrouter.post("/checksellerlogin",sellercontroller.checksellerlogin)
sellerrouter.post("/insertcontact",sellercontroller.insertcontact)
sellerrouter.post("/addfooditem",sellercontroller.addfooditem)
sellerrouter.get("/viewfooditems/:suname",sellercontroller.viewfooditems)
sellerrouter.get("/vieworders/:suname",sellercontroller.vieworders)
sellerrouter.post("/changeorderstatus",sellercontroller.changeorderstatus)

module.exports = sellerrouter