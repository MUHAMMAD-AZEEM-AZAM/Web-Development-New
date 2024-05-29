
// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Display the "Continue Reading" popup
window.onload = showDialogAfterTime()

function showDialogAfterTime() {
    setTimeout(() => {
        showContinueReadingPopup()
    }, 10000);
}

function showContinueReadingPopup() {
    const lastReadBook = getCookie('lastReadBook');
    if (lastReadBook) {
        const book = JSON.parse(lastReadBook);

        const continueReadingDialog = document.createElement('dialog');
        continueReadingDialog.innerHTML = `
      <p>Continue reading "${book.title}"?</p>
      <a href="/stories/detail/${book.id}">Yes</a>
      <button id="no" onClick="this.parentElement.style.display='none'">No</button>
    `;
        continueReadingDialog.classList.add('readingDiloag');
        document.body.appendChild(continueReadingDialog);
        continueReadingDialog.showModal();

        const closeButton = document.getElementById('no')
        closeButton.addEventListener("click", () => {
            continueReadingDialog.close();
        });
    }
}