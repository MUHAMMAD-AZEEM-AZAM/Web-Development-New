// ----------------------------------Read Stories----------------------------------
var postButtonClick=function() {
    $('#postButton').click(function(event) {
        event.preventDefault(); // Prevent default form submission
        postStory();
    });
}
var toggleGenersClass=function() {
    // Add click event listener to each option
    $('#genres option').click(function() {
        $(this).toggleClass('selected'); // Toggle the 'selected' class
    });
}

// var deleteButtonClick=function(){
//     $('#deleteButton').click(function(){
//         deleteStory();
//     })
// }

$(document).ready(function() {
    // Call the functions to initialize event handlers
    getStories();
    postButtonClick();
    toggleGenersClass();
    
    // Event delegation for delete buttons
    $('#stories-container').on('click', '.delete-button', deleteStory);
    // $('#stories-container').on('click', '.update-button', editStory);
});


function getStories() {
    $.ajax({
        url: 'http://localhost:5000/books',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            displayStory(data);
            console.log(data)
        },
    });
}
function displayStory(stories) {
    var container = $('#stories-container');
    container.empty();
    container.append('<h2>My Stories</h2>');

    $.each(stories, function(index, story) {   
        console.log(story.id)  
        var storyHtml = `
            <div class="story">
                <h3>${story.title}</h3>
                <p>${story.story}</p>
                <button class="delete-button" storyId="${story._id}">Delete</button>
                <button class="update-button" story="${story}">Update</button>
            </div>
            <hr />
        `;
        container.append(storyHtml);
    });
}



    // ----------------------------------post Stories----------------------------------
    // Function to handle posting of stories
    function postStory() {
        var title = $('input[name="title"]').val();
        var story = $('textarea[name="story"]').val();
        var image = 'https://images.pexels.com/photos/20604213/pexels-photo-20604213/free-photo-of-a-tall-building-with-windows-and-a-blue-sky.jpeg'     
        // var image = $('input[name="image"]').val();
        var genres = $('#genres').val(); 
        console.log(genres); // Get selected genres as an array
        var level = $('input[name="level"]').val();
        var color = $('input[name="color"]').val();

        if (!Array.isArray(genres)) {
            genres = [genres];
        }
        // let storyId=$(this).attr("storyId");

        // if(storyId){
        //      $.ajax({
        //     url: "http://localhost:5000/books/" + storyId,
        //     method: "PUT",
      
        //     data: { title, story,image,genres,level,color },
        //     success: function () {
        //       displayStories(); // Refresh the list after creating a new story
        //     },
        //     error: function (error) {
        //       console.error("Error creating story:", error);
        //     },
        //   });

        // }
       
        // AJAX request to post the data
        $.ajax({
            url: 'http://localhost:5000/books',
            method: 'POST',
            contentType: 'application/json', // Specify the content type as JSON
            data: JSON.stringify({ // Convert data to JSON format
                title: title,
                story: story,
                image: image,
                genres: genres,
                level: level,
                color: color
            }),
            success: function(response) { // Success callback function
                console.log('Story posted successfully: ' + title);
                alert('Story posted successfully: ' + title);
                getStories();
                console.log('Response:', response);
            },
            error: function(error) { // Error callback function
                console.error("Error creating story:", error);
                alert("Failed to post story. Please try again.");
            }
        });
    }
    
    // ----------------------------------delete Stories----------------------------------
    function deleteStory(){
        let storyId=$(this).attr("storyId");
        console.log(storyId)
        $.ajax({
            url:'http://localhost:5000/books/'+storyId,
            method:'DELETE',
            success: function () {
                alert("Story delete Sucessfully")
                // getStories(); 
                $(`[storyId="${storyId}"]`).closest('.story').remove();
                // Refresh the list after deleting a story
            },
            error: function (error) {
                console.error("Error deleting story:", error);
                alert("Story delete Failed")
              },
        })
    }


    // ----------------------------------Edit Stories----------------------------------
    // function editStory(){
    //     var title = $('input[name="title"]');
    //     var story = $('textarea[name="story"]');
    //     var image = 'https://images.pexels.com/photos/20604213/pexels-photo-20604213/free-photo-of-a-tall-building-with-windows-and-a-blue-sky.jpeg'     
    //     // var image = $('input[name="image"]');
    //     var genres = $('#genres'); 
    //     console.log(genres); // Get selected genres as an array
    //     var level = $('input[name="level"]');
    //     var color = $('input[name="color"]');



    //     let story=$(this).attr('story');
    //     title.val()=story.title;
    //     story.val()=story.story;
    //     image.val()=story.image;
    //     genres.val()=story.genres;
    //     level.val()=story.level;
    //     color.val()=story.color;
    // }
    // // ----------------------------------update Stories----------------------------------
    // function updateStory(){

       
    // }