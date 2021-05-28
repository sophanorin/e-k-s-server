import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModels.js";
import { isAdmin, isAuth, transporter } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "name");
    res.send(orders);
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.user._id);
    const orders = await Order.find({ user: req.user._id });
    if (orders) res.send(orders);
    else res.status(404).send({ message: "Never Order Before" });
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.cartItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.cartItems,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        deliveryPrice: req.body.deliveryPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      await order.save().then((order) => {
        res.status(201).send({ messages: "New Order Created", order: order });

        User.findById(order.user).then((user) => {
          transporter.sendMail({
            from: "eks233023@gmail.com",
            to: "eks233023@gmail.com",
            subject: `Order By <${user.name}>`,
            html: `
            <h4>order id : ${order._id}</h4>
            <h4>from user : ${user.name} <{user.email}> </h4>
            <h4>phone : ${user.phone}</h4>
            <h4>payment : ${order.paymentMethod}</h4>
            <h4>isPaid : ${order.isPaid ? "Yes" : "No"}</h4>
            <table border = "1">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  
                </tr>
              </thead>
               <tbody>
               <tr style={text-align: center;}>
                  ${order.orderItems.map(
                    (product) => `
                    <tr>
                      <td>${product._id}</td>
                      <td>${product.title}</td>
                      <td>${product.qty}</td>
                      <td>$ ${product.price}</td>
                    </tr>
                    `
                  )}
              </tr>
               </tbody>
            </table>
            <h5>tax : $${order.taxPrice}</h5>
            <h5>delivery : $${order.deliveryPrice}</h5>
            <h5>Total SubItems : $${order.itemsPrice}</h5>
            <h4>Total : $${order.totalPrice}</h4>
            `,
          });
        });
      });
    }
  })
);

orderRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) res.send(order);
    else res.status(404).send({ messages: "Order not found" });
  })
);

orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: "Order Deleted", order: deleteOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
