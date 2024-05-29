$(document).ready(function () {
    postButtonClick();
    updateButtonClick();
    getStories();
    handleImagePaste();
    handleGenreSelection();
    $('#selectedGenres').on('click', '.remove-genre', removeGenre);
    $('#stories-container').on('click', '.delete-button', deleteStory);
    $('#stories-container').on('click', '.update-button', editStory);
});

var selectedGenres = [];
const storiesApi = 'http://localhost:5000/api/stories'

var postButtonClick = function () {
    $('#postButton').click(function (event) {
        event.preventDefault(); // Prevent default form submission
        postStory();
    });
};

var updateButtonClick = function () {
    $('#updateButton').click(function (event) {
        event.preventDefault(); // Prevent default form submission
        var storyId = $(this).attr("storyId");
        postStory(storyId);
    });
};

function handleGenreSelection() {
    $('#genres').change(function () {
        var selectedOptions = $(this).val();
        selectedOptions.forEach(option => {
            if (!selectedGenres.includes(option)) {
                selectedGenres.push(option);
            }
        });
        displaySelectedGenres();
    });
}

function displaySelectedGenres() {
    $('#selectedGenres').empty();
    selectedGenres.forEach(function (genre) {
        $('#selectedGenres').append(`
            <div class="genre-box">
                ${genre}
                <span class="remove-genre" data-genre="${genre}">x</span>
            </div>
        `);
    });
}

function removeGenre() {
    var genreToRemove = $(this).data('genre');
    selectedGenres = selectedGenres.filter(genre => genre !== genreToRemove);
    displaySelectedGenres();
    $('#genres').val(selectedGenres); // Update the select element
}

function handleImagePaste() {
    document.addEventListener('paste', function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    $('#pastedImage').remove();
                    var img = document.createElement('img');
                    img.id = 'pastedImage';
                    img.src = event.target.result;
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                    $('#pastedImageContainer').append(img);
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
        url: storiesApi,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            displayStory(data);
        },
    });
}

function displayStory(stories) {
    var container = $('#stories-container');
    container.empty();
    container.append('<h2>My Stories</h2>');

    $.each(stories, function (index, story) {
        // Ensure the story object is properly escaped to be included in the attribute
        var storyJson = JSON.stringify(story).replace(/'/g, "&#39;").replace(/"/g, "&quot;");

        var storyHtml = `
            <div class="story">
                <h3>${story.title}</h3>
                <p style="max-width:300px">${story.story.substring(0,200)}....</p>
                <img src="${story.image}" alt="Story Image" style="max-width: 100%; height: auto;">
                <p>Genres: ${story.genres.join(', ')}</p>
                <p>Level: ${story.level}</p>
                <p>Color: ${story.color}</p>
                <button class="delete-button" storyId="${story._id}">Delete</button>
                <button class="update-button" story='${storyJson}'>Update</button>
            </div>
            <hr />
        `;
        console.log('Generated story HTML:', storyHtml);
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

    var url = storyId ? `${storiesApi}/${storyId}` : storiesApi;
    var method = storyId ? 'PUT' : 'POST';

    $.ajax({
        url: url,
        method: method,
        contentType: false,
        processData: false,
        data: formData,
        success: function (response) {
            console.log('Story posted successfully: ' + response);
            storyId ? alert('Story Update successfully') : alert('Story posted successfully');
            getStories();
        },
        error: function (error) {
            console.error("Error creating story:", error);
            alert("Failed to post story. Please try again.");
        }
    });
}

function deleteStory() {
    let storyId = $(this).attr("storyId");
    console.log(storyId);
    $.ajax({
        url: storiesApi + '/' + storyId,
        method: 'DELETE',
        success: function () {
            alert("Story deleted successfully");
            $(`[storyId="${storyId}"]`).closest('.story').remove();
        },
        error: function (error) {
            console.error("Error deleting story:", error);
            alert("Story delete failed");
        },
    });
}

function editStory() {
    let titleField = $('input[name="title"]');
    let storyField = $('textarea[id="story"]');
    let genresField = $('#genres');
    let levelField = $('input[name="level"]');
    let colorField = $('input[name="color"]');

    let story = $(this).attr('story');
    story = JSON.parse(story);
    console.log(story);

    titleField.val(story.title);
    storyField.val(story.story);
    levelField.val(story.level);
    colorField.val(story.color);

    // Assume that story.genres is already an array
    selectedGenres = story.genres; // Update the global selectedGenres array
    $('#genres').val(selectedGenres); // Update the select element
    displaySelectedGenres(); // Ensure the selected genres are displayed

    // Set the storyId attribute of the updateButton
    $('#updateButton').attr("storyId", story._id);
    console.log("Update button id: " + $('#updateButton').attr("storyId"));
}
