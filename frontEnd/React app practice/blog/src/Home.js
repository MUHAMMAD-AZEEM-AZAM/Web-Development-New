import { useState ,useEffect } from "react"
import BlogList from "./BlogList";

const Home = () => {
    const [name,setName]=useState('mario')
    const [blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ])

    const handleDelete = (id) => {
        const newBlog = blogs.filter((blog) => blog.id !== id)
        setBlogs(newBlog)
    }

    // useEffect(()=>{
    //     console.log('use effect run')
    //     console.log(name)
    // },[name]) //use empty bracket run useEffect once at reload not on every render but add dependency like name run the useEffect when the name state change


    useEffect(()=>{
        fetch('http://localhost:8000/blogs').then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
        })
    })


    // let name='AZEEM'
    // const[name,setName]=useState('AZEEM')

    //     const handleClick=(event)=>{
    //         // console.log('Hello Ninja',event);
    //         // name='ATEEQ'
    //         setName('ATEEQ')
    //     }
    // const handleClickAgain=(name,event)=>{
    //     console.log('Hello'+name,event.target);
    // }

    return (
        <div className="home">
            {/* <h1>Home Page</h1> */}
            <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />
            <button onClick={()=>setName('Ateeq')}>Change Name</button>
            <p>{name}</p>
            {/* <BlogList blogs={blogs.filter((blog)=>blog.author==='mario')} title="Mario's Blog"/> */}
            {/* <p>{name}</p>
            <button onClick={handleClick}>Click me</button> */}
            {/* as we need to pass the value to function it invoke auto so we need to add anonymous function*/}
            {/* <button onClick={(event)=>handleClickAgain('mario',event)}>Click me again</button> */}
        </div>
    );
}

export default Home;