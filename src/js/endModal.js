// Get the modal
var modalEnde = document.getElementById('endeModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modalEnde.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalEnde) {
        modalEnde.style.display = "none";
    }
};