"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const PostsForm = () => {
    const [posts, setPosts] = useState([]);
    const [openPostId, setOpenPostId] = useState(null);
    const [updatePostId, setUpdatePostId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hint, setHint] = useState(false);
    const [hint2, setHint2] = useState(false);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/posts');
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

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleOpen = (postId) => {
        setOpenPostId(openPostId === postId ? null : postId);
    };

    const clear = () => {
        setTitle('')
        setContent('')
    }

    const handleDelete = async (postId) => {
        await fetch(`http://127.0.0.1:5000/posts/${postId}`, { method: 'DELETE' });
        fetchPosts();
        clear()
    };

    const handleUpdate = (postId, title, content) => {
        setUpdatePostId(postId);
        setTitle(title);
        setContent(content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title) {
            const data = {
                title: title,
                content: content
            };
            await fetch(updatePostId ? `http://127.0.0.1:5000/posts/${updatePostId}` : 'http://127.0.0.1:5000/posts', {
                method: updatePostId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setHint(true);
            setUpdatePostId(null);
            clear()
            setTimeout(() => {setHint(false)}, 2000);
            fetchPosts()
        } else {
            setHint2(true);
        }
    };

    return (
        <div className="md:flex">
            <div className="md:flex-initial md:w-1/2 h-auto">
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setTitle(e.target.value)} name="title" value={title} placeholder="TITLE" className="md:w-[80%] md:ml-[10%] w-[90%] ml-[5%] mt-4 py-2 px-1 bg-yellow-50 rounded-t-md border-2 border-slate-700" />
                <textarea onChange={(e) => setContent(e.target.value)} name="content" value={content} rows="5" placeholder="CONTENT" className="resize-none md:w-[80%] md:ml-[10%] w-[90%] ml-[5%] mt-2 py-2 px-1 bg-yellow-50 border-2 border-slate-700" />
                <button className="bg-green-600 text-white md:w-[80%] md:ml-[10%] w-[90%] ml-[5%] mt-2 py-2 px-1 rounded-b-md border-2 border-slate-700">Submit</button>
                {hint && <div className="text-center text-red-500 py-2 font-semibold animate-pulse italic">Post {updatePostId ? 'Updated' : 'Added'} Successfully!</div>}
                {hint2 && <div className="text-center text-red-500 py-2 font-semibold animate-pulse italic">Title Required!</div>}
            </form>
            </div>
            <div className="md:flex-initial md:w-1/2 h-auto mt-4">
                {posts.length === 0 ? <div className="text-center animate-pulse">No Posts Added!</div> : posts.map((item, index) => (
                    <div key={index} className="md:text-md w-[90%] ml-[5%] text-sm pb-1">
                        <div className="flex border-slate-700 border-2 bg-yellow-50">
                            <div className="flex-initial w-[85%] font-semibold py-2 text-left px-2 hover:text-blue-600 cursor-pointer" onClick={() => handleOpen(item[0])}>{item[1]}</div>
                            <button className="w-[7.5%] px-2 py-2" onClick={() => handleDelete(item[0])}><Image aria-hidden src="/del.png" alt="trash icon" width={18} height={18} /></button>
                            <button className="w-[7.5%] px-2 py-2" onClick={() => handleUpdate(item[0], item[1], item[2])}><Image aria-hidden src="/edit.png" alt="edit icon" width={18} height={18}  /></button>
                        </div>
                        {openPostId === item[0] && <div className="py-4 px-4 text-justify w-[90%]">{item[2]}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsForm;
