import { BACKEND_URL } from "@/Config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  content: string;
  publishStatus: "Published" | "Draft";
}

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [post, setPost] = useState<BlogPost[]>([]);
  const [totalBlogs, setTotalBlogs] = useState('')

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function GetUser() {
      const user = await axios.get("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(user.data.user.username);
    }
    GetUser();
  }, []);

  useEffect(() => {
    async function getPost() {
      const Getpost = await axios.get(`${BACKEND_URL}/AllPost`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(Getpost.data.post.allPost);
    }
    getPost();
  }, [post]);

  function CreateButtonHandle() {
    window.location.href = "/CreatePost";
  }

  return (
    <div className="w-full h-screen bg-zinc-900 flex flex-col justify-center items-center">
      <h1 className="text-white mb-4 text-xl font-bold">Profile Page</h1>
      <div className="w-[90%] h-[15rem] bg-sky-200 rounded-t-2xl flex items-center px-30 gap-50">
        <div>
          <img
            className=" w-[9rem] h-[9rem] rounded-full bg-white "
            src='../assets/UG-photo.png'
            alt=""
          />
        </div>
        <div>{username}</div>
        <div>{totalBlogs}</div>
      </div>
      <div className=" w-[90%] bg-white rounded-b-2xl ">
        <div className=" w-full flex px-20 py-5 justify-between items-center">
          <div>
            <h1>Blog post</h1>
          </div>
          <div className="flex gap-10 items-center">
            <Button className="cursor-pointer" onClick={CreateButtonHandle}>
              Create Blog
            </Button>
            <div className="border border-4  rounded-xl px-5 py-2">
              <h1>Published / Draft</h1>
            </div>
          </div>
        </div>
        <div className="w-full  bg-purple-400 p-5 pt-10 flex gap-5 flex-wrap ">
          {post.map((post) => (
            <div>
              <h1 className=" w-[25rem] h-[26rem] bg-white rounded-3xl p-4 ">
                {post.content}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
