$(document).ready(function() {
    postButtonClick();
    updateButtonClick();
    getStories();
    handleImagePaste();
    handleGenreSelection();
        // Event delegation for dynamically created button
        $('#stories-container').on('click', '.delete-button', deleteStory);
        $('#stories-container').on('click', '.update-button', editStory);
});

var selectedGenres = [];

var postButtonClick = function() {
    $('#postButton').click(function(event) {
        event.preventDefault(); // Prevent default form submission
        postStory();
    });
};

var updateButtonClick = function() {
    $('#updateButton').click(function(event) {
        event.preventDefault(); // Prevent default form submission
        var storyId = $(this).attr("storyId");
        postStory(storyId);
    });
};

function handleGenreSelection() {
    $('#genres').change(function() {
        selectedGenres = $(this).val();
        displaySelectedGenres();
    });
    $('#genres').keypress(function(event) {
        if (event.which === 13) { // Enter key pressed
            event.preventDefault();
            $('#genres').blur();
            displaySelectedGenres();
        }
    });
}

function displaySelectedGenres() {
    $('#selectedGenres').empty();
    selectedGenres.forEach(function(genre) {
        $('#selectedGenres').append(`<div class="genre-box">${genre}</div>`);
    });
}

function handleImagePaste() {
    document.addEventListener('paste', function(event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function(event) {
                    $('#pastedImage').remove();
                    var img = document.createElement('img');
                    img.id = 'pastedImage';
                    img.src = event.target.result;
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                    $('#pastedImageContainer').append(img);
                    // Set the file to the input field for upload
                    var fileInput = document.getElementById('imageInput');
                    var dataTransfer = new DataTransfer();
                    dataTransfer.items.add(blob);
                    fileInput.files = dataTransfer.files;
                };
                reader.readAsDataURL(blob);
            }
        }
    });
}

function getStories() {
    $.ajax({
        url: 'http://localhost:5000/books',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            displayStory(data);
        },
    });
}

function displayStory(stories) {
    var container = $('#stories-container');
    container.empty();
    container.append('<h2>My Stories</h2>');

    $.each(stories, function(index, story) {
        var storyHtml = `
            <div class="story">
                <h3>${story.title}</h3>
                <p>${story.story}</p>
                <img src="${story.image}" alt="Story Image" style="max-width: 100%; height: auto;">
                <p>Genres: ${story.genres.join(', ')}</p>
                <p>Level: ${story.level}</p>
                <p>Color: ${story.color}</p>
                <button class="delete-button" storyId="${story._id}">Delete</button>
                <button class="update-button" story='${JSON.stringify(story)}'>Update</button>
            </div>
            <hr />
        `;
        container.append(storyHtml);
    });
}

function postStory(storyId) {
    var formData = new FormData();
    formData.append('title', $('#title').val());
    formData.append('story', $('#story').val());
    formData.append('image', $('#imageInput')[0].files[0]);
    formData.append('genres', selectedGenres);
    formData.append('level', $('#level').val());
    formData.append('color', $('#color').val());

    var url = storyId ? `http://localhost:5000/books/${storyId}` : 'http://localhost:5000/books';
    var method = storyId ? 'PUT' : 'POST';

    $.ajax({
        url: url,
        method: method,
        contentType: false,
        processData: false,
        data: formData,
        success: function(response) {
            console.log('Story posted successfully: ' + response);
            alert('Story posted successfully');
            getStories();
        },
        error: function(error) {
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
    function editStory(){
        let titleFeild= $('input[name="title"]');
        let storyFeild= $('textarea[id="story"]');
        let genresFeild = $('#genres'); 
        let levelFeild= $('input[name="level"]');
        let colorFeild= $('input[name="color"]');
    
        let story=$(this).attr('story');
        story=JSON.parse(story);
        console.log(story);
    
        titleFeild.val(story.title);
        storyFeild.val(story.story);
        levelFeild.val(story.level);
        colorFeild.val(story.color);
    
        // Split genres string into an array of values
        let genresArray = story.genres.split(',');
        console.log("Genres array:", genresArray);
        updateSelectedOptions(genresArray);
    
        // Set the storyId attribute of the updateButton
        $('#updateButton').attr("storyId", story._id);
        console.log("Update button id: " + $('#updateButton').attr("storyId"));
    }
    
    // ----------------------------------update Stories----------------------------------


    var updateSelectedOptions = function(selectedValues) {
        // Deselect all options
        $('#genres option:selected').prop('selected', false);

        // selectedValues=[selectedValues];
        // Select options based on the provided array of values
        selectedValues.forEach(function(value) {
            $('#genres option[value="' + value + '"]').prop('selected', true);
        });
    }


