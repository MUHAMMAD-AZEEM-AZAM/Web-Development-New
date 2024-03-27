const express=require("express")
const router = express.Router()


// use at top give access to all the routes 
// if we define under any route it can't display or access this route
router.use(logger)


router.get("/",(req,res)=>{
    // for handle query in the url like /users?name=azeem
    console.log(req.query.name) 
    res.send("user List")
})

router.post("/",(req,res)=>{
    const isValid=true
    if(isValid){
        users.push({firstName:req.body.firstName})
        res.redirect(`/users/${users.length-1}`)
    } else {
        console.log("Error")
        res.render("users/new",{firstName: req.body.firstName})
    }
})

router.get("/new",(req,res)=>{
    res.render("users/new")
})

// always use the route with id at 
// bottom so that the server checks the
//  routes from top to bottom not take 
//  /new in this case as value of id as 'new'

// also you see the put,get,delete have same route as /:id
// so chaining them all as below

router.route("/:id").get((req,res)=>{
    console.log(req.user)
    res.send(`Get user with id ${req.params.id}`)
}).put((req,res)=>{
    res.send(`put user with id ${req.params.id}`)
}).delete((req,res)=>{
    res.send(`delete user with id ${req.params.id}`)
})


const users=[{name : "Kyle"},{name : "Sally"}]
//middleware
router.param("id",(req,res,next,id)=>{
    req.user=users[id]
    next() //use next stop the loading and move next
})


//middleware(the middle software between the req and res lifecycle)
function logger(req,res,next){
    console.log(req.originalUrl)
    next()
    }
    

module.exports = router