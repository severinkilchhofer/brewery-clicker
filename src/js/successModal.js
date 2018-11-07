// Get the modal
var successEnde = document.getElementById('successModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    successEnde.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalEnde) {
        successEnde.style.display = "none";
    }
};