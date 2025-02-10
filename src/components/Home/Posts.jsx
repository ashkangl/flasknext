"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

const Posts = () => {

    const [posts,setPosts] = useState([])
    const [openPostId, setOpenPostId] = useState(null)

    const fetchPosts = async () => {
        try {
            const res = await fetch('https://flask-crud-9q8h.onrender.com/posts');
            if (!res.ok) throw new Error('Network response was not ok');
            const rawResponse = await res.text();
            console.log('Raw Response:', rawResponse);
            const data = JSON.parse(rawResponse);
            console.log('Parsed Data:', data);
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(()=>{
        fetchPosts()
    },[])

    const handleOpen = (postId) => {
        setOpenPostId(openPostId === postId ? null : postId);
    }

    const handleDelete = async(postId) => {
        const res = await fetch(`https://flask-crud-9q8h.onrender.com/posts/${postId}`,{method:'DELETE'})
        fetchPosts()
    }

    return (
        <div className="mt-4">
        {posts.length == 0 ?<div className="text-center animate-pulse">No Posts Added!</div> : posts.map((item,index)=>(
            <div key={index} className="md:text-md text-sm pb-1">
                <div className="flex border-slate-700 border-2 bg-yellow-50">
                    <div className=" flex-initial w-[92.5%] font-semibold py-2 text-left px-2 hover:text-blue-600 cursor-pointer" onClick={() => handleOpen(item[0])}>{item[1]}</div>
                    <button className="w-[7.5%] px-2 py-2" onClick={() => handleDelete(item[0])}><Image aria-hidden src="/del.png" alt="trash icon" width={18} height={18}/></button>
                </div>
                {openPostId === item[0] &&
                <div className="py-4 px-4 text-justify w-[90%]">{item[2]}</div>
                }
            </div>
        ))}
        </div>
    )
}

export default Posts
