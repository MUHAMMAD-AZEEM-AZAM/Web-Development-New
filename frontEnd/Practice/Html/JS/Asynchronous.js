console.log('//---------------------CallBack---------------------')
function getUser(id, callback) {
    setTimeout(function () {
        console.log("Reading User");
        callback({ id: id, name: "Usman" });
    }, 2000)
}


console.log("Before");
getUser(1, function (userObj) {
    console.log("Received User");
    console.log(userObj);
});
console.log("After");


console.log('//---------------------Promises and Chaning Promises---------------------')
const postListPromises = new Promise((reslove, reject) => {
    $.get('https://jsonplaceholder.typicode.com/posts', (response) => {
        console.log("PostList Response using promisses",response)
        reslove(response)
    }).fail(err => {
        reject(new Error('Call failed for get post list ' + err))
    })
})
//if not used in then it run first but we write after that is error
const postDetailPromises =(data)=> new Promise((reslove, reject) => {
    $.get(`https://jsonplaceholder.typicode.com/posts/${data[0].id}`, (response) => {
        reslove(response)
    }).fail(err => {
        reject(`Detail call failed and status ${data.status}`)
    })
})


postListPromises
.then(postDetailPromises).then(response=>{
    console.log('Post Detail response: ',response)
}).catch((error) => {
    console.log('Call Failed')
    console.log('Catch error: ',error)
})

// ------------------for display the first response also------------------
// postListPromises
// .then((response) => {
    //     console.log('Post List response: ', response);
    //     return postDetailPromises(response); // Return the promise to chain the next then
    // }).then(response=>{
        //     console.log('Post Detail response: ',response)
        // }).catch((error) => {
            //     console.log('Call Failed')
            //     console.log('Catch error: ',error)
            // })


console.log('//---------------------Async await---------------------')
async function getDisplayData(){
    try{
    await  $.get('https://jsonplaceholder.typicode.com/posts', (response) => {
        console.log(response)
    })
      $.get('https://jsonplaceholder.typicode.com/posts/1', (response) => {
        console.log('Single Response',response)
    })
    }
    catch{

    }
}

getDisplayData()