function doBinding() {
    let submitButton = document.getElementById("submit");
    submitButton.onclick = event_handler;
}
// $(doBinding)
window.onload=doBinding;

function displayError(input,errorElement){
    let error=$(errorElement)

    if(!input.val()){
        error.css('display','block')
    }
    else{
        error.css('display','none')
    }
}

function event_handler() {

    let name = $('#name')
    let email = $('#email')
    let message = $('#message')

    displayError(name,'#name-error')
    displayError(email,'#email-error')
    displayError(message,'#message-error')

    if (name.val() && email.val() && message.val()) {
        console.log('form is valid with values: ','\nName: '+name.val(),'\nEmail: '+email.val(),'\nMessage: '+message.val())
    } else {
        event.preventDefault()
        console.log('form is invalid')
    }
}