import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Auth = () => {
  return (
    <div className="w-full h-screen flex ">
      <div className="w-[30%] h-full bg-zinc-900 flex justify-center items-center ">
        <h1 className="text-white text-5xl">Welcome to CRM</h1>
      </div>
      <div className="w-[70%] h-full bg-zinc-300 flex justify-center items-center ">
        <div className="flex flex-col gap-5 border border-black rounded-2xl px-10 py-10">
            <Label>Username</Label>
            <Input placeholder="Username" />
            <Label>Email</Label>
            <Input placeholder="Email"  className="pr-10" />
            <Label>Password</Label>
            <Input 
            placeholder="Password" type="password"  />
        <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};
