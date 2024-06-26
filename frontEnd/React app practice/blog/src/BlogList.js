const BlogList = ({title,blogs,handleDelete}) => {
    // instead of using below we use destructuring like above for props
    // const blogs=props.blogs
    // const title=props.title
    return ( 
        <div className="blog-list">
            <h1>{title}</h1>
             {blogs.map((blog)=>(
                <div className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>written by {blog.author}</p>
                    <button onClick={()=>handleDelete(blog.id)}>Delete Blog</button>
                </div>
            ))}
        </div>
     );
}
 
export default BlogList;