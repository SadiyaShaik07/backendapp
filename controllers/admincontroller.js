const Customer = require("../models/Customer")
const Admin = require("../models/Admin")
const Seller = require("../models/Seller")
const Contact = require("../models/Contact")


 const viewcustomers = async (request, response) => 
 {
    try 
    {
      const customers = await Customer.find();
      if(customers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(customers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deletecustomer = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const customer = await Customer.findOne({"email":email})
      if(customer!=null)
      {
        await Customer.deleteOne({"email":email})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       console.log(input)
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const addseller = async (request, response) => {
    try 
    {
      const input = request.body;
      const seller = new Seller(input);
      await seller.save();
      response.send('Added Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const viewsellers = async (request, response) => 
 {
    try 
    {
      const sellers = await Seller.find();
      if(sellers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(sellers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deleteseller = async (request, response) => 
 {
    try 
    {
      const uname = request.params.username
      const seller = await Seller.findOne({"username":uname})
      if(seller!=null)
      {
        await Seller.deleteOne({"username":uname})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Username Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const viewcontacts = async (request, response) => 
 {
    try 
    {
      const contacts = await Contact.find();
      if(contacts.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(contacts);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  module.exports = {viewcustomers,deletecustomer,checkadminlogin,addseller,viewsellers,deleteseller,viewcontacts}