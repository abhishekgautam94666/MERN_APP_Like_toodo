import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { json } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, SetDescription] = useState("");

  useEffect(() => {
    getPost();
  }, [posts]);

  const getPost = async () => {
    const response = await fetch("http://localhost:5000/get");
    const data = await response.json();
    setPosts(data.blog);
  };

  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:5000/deleteb/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      toast.success("Blog deleted successfully");
    } else {
      toast.error("something went wrong");
    }
  };

  const updatePost = async (id) => {
    const response = await fetch(`http://localhost:5000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.status === 200) {
      toast.success("Blog update succesfull");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      toast.error("something error");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mt-10 flex flex-col gap-5">
        {posts.map((post) => {
          return (
            <div
              className="w-[40vw]  mx-auto p-3 rounded-md shadow-md"
              key={post._id}
            >
              <div className="flex justify-end text-lg gap-3">
                <AiFillDelete
                  className="text-gray-400 hover:text-red-400 hover:scale-110 transition-all"
                  onClick={() => deletePost(post._id)}
                />
                <MdEdit
                  className={`${
                    selectedPost === post._id && isHidden
                      ? "text-red-400"
                      : "text-gray-400"
                  } text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110 transition-all`}
                  onClick={() => {
                    setIsHidden(!isHidden);
                    setSelectedPost(post._id);
                  }}
                />
              </div>
              <h2
                className="tex-lg font-bold cursor-pointer"
                contentEditable={isHidden}
                onInput={(e) => setTitle(e.target.innerText)}
              >
                {post.title}
              </h2>
              <h3
                className=" text-gray-500 font-semibold cursor-pointer "
                contentEditable={isHidden}
                onInput={(e) => SetDescription(e.target.innerText)}
              >
                {post.description}
              </h3>

              <button
                onClick={() => updatePost(post._id)}
                className={`${
                  selectedPost === post._id && isHidden ? "block" : "hidden"
                }
                
                bg-purple-400 hover:bg-purple-600 px-3 py-1 rounded-md mt-2 font-bold text-white`}
              >
                save
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
