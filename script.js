// Add your javascript here
let dragAndDrop = document.getElementById("dragAndDrop");

//Prevent the default events to happen
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dragAndDrop.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

//Using the new events for this page
//When the image is going to be dragged, the box is highlighted
["dragenter", "dragover"].forEach(eventName => {
    dragAndDrop.addEventListener(eventName, highlight, false);
});
//When the drag action is done and the image is dropped,
//the hightlight disappears
["dragleave", "drop"].forEach(eventName => {
    dragAndDrop.addEventListener(eventName, unhighlight, false);
});


dragAndDrop.addEventListener("drop", handleDrop, false);

//Function to prevent the default events to happen
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

//Functions to hightlight the box where the image is dropped
function highlight(e) {
    dragAndDrop.classList.add("highlightBox");
}
function unhighlight(e) {
    dragAndDrop.classList.remove("highlightBox");
}

//Function to get the image file and handle it
function handleDrop(e) {
    var dt = e.dataTransfer; //Get the file thanks to dataTransfer
    var files = dt.files; //Get the files that the user drags and drops
    handleFiles(files); //Call custom function
}

//function to handle files dragged and dropped
function handleFiles(files) {
    [...files].forEach(previewFile);
}

//Function to get the file and display the image
function previewFile(file) {
    //Get the image url
    let reader = new FileReader();
    reader.readAsDataURL(file);
    //Load the image as a new img element
    reader.onloadend = () => {
        addImage(reader.result);       
    };
}

//function used when url is used
function loadImageFromUrl() {
    const url = document.getElementById("imgUrl").value;
    addImage(url);
}

function addImage(src) {
    if (src === "") {
        alert("You should enter an image URL");
        return;
    }

    let img = document.createElement("img");
    img.src = src;
    
    const parentNode = document.getElementById("imgPreview");
    if (parentNode.children[0] != null) { //Clean any previous img added
        parentNode.removeChild(parentNode.children[0]);
    }
    parentNode.appendChild(img); //Show the image
}