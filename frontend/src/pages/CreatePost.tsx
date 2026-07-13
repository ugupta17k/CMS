
import { Button } from "@/components/ui/button"
import { BACKEND_URL } from "@/Config"
import axios from "axios"
import { useEffect, useState } from "react"



export const CreatePost = ()=> {

    const [content, setContent] = useState('')
    const [isPublished, setisPublished] = useState('published')

    const token = localStorage.getItem("token")

       async function CreateBlog(){
            const res = await axios.post(`${BACKEND_URL}/createPost`,{
               content,
               isPublished
            },{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            window.location.href = "/Profile"
        }

    function submitHandle(){
        CreateBlog()
        setContent('')
        setisPublished('Published')
    }

    return (
        <div className=" w-full h-screen bg-zinc-900 flex justify-center items-center">
            <div className="w-[80%] h-[90%] bg-white rounded-4xl flex flex-col gap-5 items-center justify-center ">
                <h1 className="text-4xl font-bold">Create Blog</h1>
                <div className="w-[80%] flex justify-end">
                    <select
                    value={isPublished}
                    onChange={(e)=> setisPublished(e.target.value)} 
                    className=" border rounded-xl px-5 py-2 border-black   " name="" id="">
                        <option className=" rounded-xl" value="Published">Published</option>
                        <option className=" rounded-xl" value="Draft">Draft</option>
                    </select>
                </div>
                <div className="w-full h-[70%] flex items-center justify-center " >
                    <textarea
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                    className="border px-10 py-5 w-[80%] h-full rounded-2xl border-black border-2"/>
                </div>
                <div className=" flex items-center justify-end w-[80%]">
                    <Button
                    onClick={submitHandle}
                     className=" text-xl px-10 py-6 rounded-2xl cursor-pointer " >Create</Button>
                </div>
            </div>

        </div>
    )
}