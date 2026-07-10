import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isRegistered, setisRegistered] = useState(true);

  useEffect(() => {
    async function register() {
      try {
        const res = await axios.post(`${process.env.BACKEND_URL}/register`, {
          body: {
            username,
            email,
            password,
          },
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
      } catch (er) {
        console.log("there is some error", er);
      }
    }
  },[]);

  useEffect(() => {
    async function Login() {
      try {
        const res = await axios.post(`${process.env.BACKEND_URL}/login`, {
          body: {
            username,
            email,
            password,
          },
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
      } catch (er) {
        console.log("there is some error", er);
      }
    }
  },[]);
  function Submithandle() {
    setUsername("");
    setemail("");
    setpassword("");
    register();
  }
  return (
    <div className="w-full h-screen flex ">
      <div className="w-[30%] h-full bg-zinc-900 flex justify-center items-center ">
        <h1 className="text-white text-5xl">Welcome to CRM</h1>
      </div>
      <div className="w-[70%] h-full bg-zinc-300 flex flex-col gap-6 justify-center items-center ">
        <h1 className="text-2xl font-bold">
          {isRegistered ? "Register" : "Login"}
        </h1>
        <div className="flex flex-col gap-5 border border-black rounded-2xl px-10 py-10">
          <Label>Username</Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {isRegistered && (
            <>
              <Label>Email</Label>
              <Input
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
                className="pr-10"
              />
            </>
          )}
          <Label>Password</Label>
          <Input
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <Button onClick={Submithandle}>Submit</Button>
          <div className="flex gap-2">
            <p>Already existed?</p>
            <a
              className="text-blue-700"
              href=""
              onClick={() => {
                setisRegistered(false);
              }}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
