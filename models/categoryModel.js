import mongoose from "mongoose";

const cetegorySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", cetegorySchema);

export default Category;
