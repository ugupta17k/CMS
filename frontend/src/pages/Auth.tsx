import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/Config";

export const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isRegistered, setisRegistered] = useState(true);


    async function register() {
      try {
        const res = await axios.post(`${BACKEND_URL}/register`, {
          username,
          email,
          password,
        });
        setisRegistered(false)
      } catch (er) {
        console.log("there is some error", er);
      }
    }

    async function Login() {
      try {
        const res = await axios.post(`${BACKEND_URL}/login`, {
            username,
            password,
        });

        const token = res.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/Profile"
      } catch (er) {
        console.log("there is some error", er);
      }
    }
    
    async function Submithandle() {
      if (isRegistered) {
        await register();
      } else {
        await Login();
      }
      setUsername("");
      setemail("");
      setpassword("");
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
          value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {isRegistered && (
            <>
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
                className="pr-10"
              />
            </>
          )}
          <Label>Password</Label>
          <Input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <Button className="cursor-pointer" onClick={Submithandle}>{isRegistered ? "Register" : "Login"}</Button>
          <div className="flex gap-2">
            <p>Already existed?</p>
            <button
              className="ml-2 cursor-pointer text-blue-600 hover:underline"
              onClick={() => setisRegistered(!isRegistered)}
            >
              {isRegistered ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
