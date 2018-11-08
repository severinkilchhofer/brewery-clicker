// Get the modal
var failedEnde = document.getElementById('failedModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    failedEnde.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == failedEnde) {
        failedEnde.style.display = "none";
    }
};

const retry = () => {
    location.reload();
};