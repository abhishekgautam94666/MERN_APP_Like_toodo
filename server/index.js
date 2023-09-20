const express = require("express");
const cors = require("cors");
const { connectDb } = require("./connection");
const blogPost = require("./models/BlogPost");

const app = express();
const port = 5000;

// database connected --------------------->>>>>>>>>>
connectDb();

// middleware
app.use(express.json());
app.use(cors());

//route ------------------------------->>>>>>>>>>>>>
app.get("/", async (req, res) => {
  res.send("Hello, how are yoy");
});
app.get("/get", async (req, res) => {
  let blog = await blogPost.find();
  if(!blog){
    res.status(404).json({message:"No blogs found"});
  }else{
    res.json({blog});
  }
});

// post ---------------------------->>>>>>>>>>>>>>>>
app.post("/bpost", async (req, res) => {
  let blog = new blogPost({
    title: req.body.title,
    description: req.body.description,
  });
  await blog.save();
  res.json({ message: "data save succesfully", blog });
});

// delete --------------->>>>>>>>>
app.delete("/deleteb/:id", async (req, res) => {
  let blog = await blogPost.findByIdAndDelete(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "No blog foumd" });
  } else {
    res.json({ message: "blog delete sucessfully" });
  }
});

// update ------------------->>>>>>>>>>>>>>>>>>>>
app.put("/update/:id", async (req,res) => {
  let blog = await blogPost.findByIdAndUpdate(req.params.id);
  if (!blog) {
    res.status(404).json({ message: "no blog found" });
  }

  if (!req.body.title && !req.body.description) {
    res.json({ message: "please enter titil or description" });
  } else if (!req.body.title) {
    blog.description = req.body.description;
  } else if (!req.body.description) {
    blog.title = req.body.title;
  } else {
    blog.title = req.body.title;
    blog.description = req.body.description;
  }

  await blog.save();
  res.status(200).json({ message: "blog updated" });
});

//listen server  ---------------------->>>>>>>>>>>>>>
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
