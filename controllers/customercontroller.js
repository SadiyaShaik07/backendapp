const Customer = require("../models/Customer")
const Contact = require("../models/Contact")
const Food = require("../models/Food")
const FoodOrder = require("../models/FoodOrder")

const insertcustomer = async (request, response) => {
    try 
    {
      const input = request.body;
      const customer = new Customer(input);
      await customer.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const checkcustomerlogin = async (request, response) => 
 {
    try 
    {
      const input = request.body
      const customer = await Customer.findOne(input)
      response.json(customer)
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const insertcontact = async (request, response) => {
    try 
    {
      const input = request.body;
      const contact = new Contact(input);
      await contact.save();
      response.send('Message sent Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const customerprofile = async (request, response) => 
  {
     try 
     {
       const email = request.params.email
       const customer = await Customer.findOne({email})
       if(customer)
       {
         response.json(customer)
       }
       else
       {
         return response.status(200).send('Customer Profile not found with the provided email id');
       }
       
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const updatecustomerprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const customer = await Customer.findOne({ email });
      if (!customer) 
      {
        response.status(200).send('Customer not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          customer[key] = input[key];
        }
      }
      await customer.save();
      response.status(200).send('Customer Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };

  const viewfooditems = async (request, response) => 
 {
    try 
    {
      const fooditems = await Food.find();
      if(fooditems.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(fooditems);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };


  const foodorders = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const foodorders = await FoodOrder.find({"customeremail":email});
      if(foodorders.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(foodorders);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const orderfood = async (request, response) => {
    try 
    {
      const { foodid, customeremail, customerlocation, quantity } = request.body; // food id and customer mail id
      const alreadyordered = await FoodOrder.findOne({ foodid, customeremail })
      if(!alreadyordered)
      {
        const foodorder = new FoodOrder({ foodid, customeremail, customerlocation, quantity });
        await foodorder.save();
        response.status(200).send('Order placed successfully');
      }
      else
      {
        response.status(200).send('You have already ordered this item.');
      }
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const cancelorder = async (request, response) => 
  {
     try 
     {
       const orderId = request.params.orderId
       const Order = await FoodOrder.findOne({"orderId":orderId})
       if(Order!=null && Order.orderStatus=="ORDERED")
       {
         await Order.deleteOne({"orderId":orderId})
         response.send("Cancelled Successfully")
       }
       else
       {
         response.send("Your food is being prepared. You can not cancel now")
       }
 
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };


  module.exports = {insertcustomer,updatecustomerprofile,checkcustomerlogin,insertcontact,customerprofile,updatecustomerprofile,viewfooditems,foodorders,orderfood,cancelorder}