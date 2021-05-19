import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Category from "../models/categoryModel.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    if (!categories) res.status(204).send({ message: "Empty" });
    else res.send(categories);
  })
);

categoryRouter.get(
  "/:id?",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) res.send({ _id: category._id, name: category.name });
    else res.status(404).send({ message: "Category Not Found" });
  })
);

categoryRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = new Category({
      name: req.body.name,
    });
    const createCategory = await category.save();
    res.send({ message: "Category Created", category: createCategory });
  })
);

categoryRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
      category.name = req.body.name;
      await category.save().then((category) => {
        res.send({ message: "Category Updated", category });
      });
    } else res.status(404).send({ message: "Category not found" });
  })
);

categoryRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    await Category.remove({ _id: categoryId }).exec((err, doc) => {
      if (err) res.status(422).send({ error: err });
      if (doc) res.send({ message: "Category Deleted" });
    });
  })
);

export default categoryRouter;
