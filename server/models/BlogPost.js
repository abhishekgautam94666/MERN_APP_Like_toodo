const {mongoose} = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

const blogPost = mongoose.model("blogposts", blogPostSchema);

module.exports = blogPost;
