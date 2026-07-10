import axios from "axios";
import { useState } from "react";

export const Home = () => {
  const [username, setUsername] = useState('')
  const [post, setPost] = useState([])

  async function GetUser(){
    const res = await axios.get
  }

  async function GetAllPost() {
    const response = await axios.get(`${process.env.BACKEND_URL!}/AllPost`, {
      headers : {
        token : ""
      } 
    })
    if(!response){
      console.log("token not found or backend not hit");
    }
  }

  return (
    <div>
      <div>
        <h1>Profile Page</h1>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>username</div>
          <div>Total Blogs</div>
        </div>
        <div>
            <div> 
              <h1>Blog post</h1>
              <h1>Published / Draft</h1>
            </div>
            <div>
              <div>
              <h1>blog 1</h1>
              <h1>blog 2</h1>
              <h1>blog 3</h1>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
