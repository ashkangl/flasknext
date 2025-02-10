"use client"

import { useState } from "react"

const Form = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [hint,setHint] = useState(false)
    const [hint2,setHint2] = useState(false)
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(title){
        const data = {
            title:title,
            content:content
        }
        const response = await fetch('http://127.0.0.1:5000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            setHint(true)
            setTimeout(() => window.location.reload(false), 2000)
        }else{
            setHint2(true)
            setTimeout(() => setHint2(false),2000)
        }
    }

    return (
        <div className="block">
        <form onSubmit={handleSubmit}>
        <input onChange={(e) => setTitle(e.target.value)} name="title" placeholder="TITLE" className="md:w-[80%] md:ml-[10%] w-[90%] ml-[5%] mt-4 py-2 px-1 bg-yellow-50 rounded-t-md border-2 border-slate-700" />
        <textarea onChange={(e) => setContent(e.target.value)} name="content" rows="5" placeholder="CONTENT" className="resize-none md:w-[80%] md:ml-[10%] w-[90%] ml-[5%] mt-2 py-2 px-1 bg-yellow-50 border-2 border-slate-700" />
        <button className=" bg-green-600 text-white md:w-[80%] md:ml-[10%] w-[90%] ml-[5%] mt-2 py-2 px-1 rounded-b-md border-2 border-slate-700">Submit</button>
        {hint == true && <div className="text-center text-red-500 py-2 font-semibold animate-pulse italic">Post Added Succesfully!</div>}
        {hint2 == true && <div className="text-center text-red-500 py-2 font-semibold animate-pulse italic">Title Required!</div>}
        </form>
        </div>
    )
}

export default Form
