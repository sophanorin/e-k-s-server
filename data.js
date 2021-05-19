import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Sophanorin Heou",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Jonh",
      email: "user@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      title: "ProductA1",
      category: "robot",
      image: "/assets/p1.png",
      price: 120,
      countInStock: 3,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      title: "ProductA2",
      category: "robot",
      image: "/assets/p2.png",
      price: 100,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
    {
      title: "ProductA4",
      category: "robot",
      image: "/assets/p3.png",
      price: 220,
      countInStock: 10,
      brand: "Lacoste",
      rating: 4.8,
      numReviews: 17,
      description: "high quality product",
    },
    {
      title: "ProductA8",
      category: "robot",
      image: "/assets/p4.png",
      price: 30,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      title: "ProductA0",
      category: "robot",
      image: "/assets/p5.png",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      title: "ProductA9",
      category: "robot",
      image: "/assets/p6.png",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description: "high quality product",
    },
    {
      title: "ProductA17",
      category: "robot",
      image: "/assets/p6.png",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description: "high quality product",
    },
    {
      title: "ProductA12",
      category: "robot",
      image: "/assets/p6.png",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4,
      numReviews: 15,
      description: "high quality product",
    },
  ],
};
export default data;