const Seller = require("../models/Seller")
const Contact = require("../models/Contact")
const Food = require("../models/Food")
const FoodOrder = require("../models/FoodOrder")

const checksellerlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const seller = await Seller.findOne(input)
     response.json(seller)
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

const addfooditem = async (request, response) => {
  try 
  {
    const input = request.body;
    const fooditem = new Food(input);
    await fooditem.save();
    response.status(200).send('Food Item Added Successfully');
  } 
  catch(e) 
  {
    console.log(e.message)
    response.status(500).send(e.message);
  }
};

const viewfooditems = async (request, response) => 
 {
    try 
    {
      const suname = request.params.suname
      const fooditems = await Food.find({"seller.username":suname});
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

  const vieworders = async (request, response) => 
  {
    try 
    {
        const suname = request.params.suname;
        const fooditems = await Food.find({ "seller.username": suname });

        if (fooditems.length === 0) 
        {
            return response.status(200).send("No food items found for this seller");
        }
        else
        {
          const foodIds = fooditems.map(food => food.foodid);

          const foodOrders = await FoodOrder.find({ foodid: { $in: foodIds } });
  
          if (foodOrders.length === 0) 
          {
              return response.status(200).send("No orders found for this job");
          }
          else
          {
            response.json(foodOrders);
          }
        }
    } 
    catch (error) 
    {
        response.status(500).send(error.message);
    }
};

const changeorderstatus = async (request, response) => 
{
  try 
  {
    const { orderId, status } = request.body;

    if (!orderId || !status) 
    {
      return response.status(400).send('Order ID and status are required');
    }

    await FoodOrder.findOneAndUpdate(
      { orderId },
      { $set: { orderStatus: status } },
      { new: true } // it will return updated document
    );

    response.status(200).send('Order Status Updated Successfully');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

 module.exports = {checksellerlogin,insertcontact,addfooditem,viewfooditems,vieworders,changeorderstatus}