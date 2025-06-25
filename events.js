let addButton = document.querySelector("#add-button");
let input = document.querySelector("#task-input");
let taskbox = document.querySelector("#taskbox");

addButton.addEventListener("click",()=>{
    input.style.display = "block";
    input.value = ""
    input.focus();
    
})

document.querySelector("html").addEventListener("keydown", e=>{
    if(e.key=='Enter'){
        input.style.display = "none";
    }
})
let isDragging = false;
let offsetX, offsetY;


taskbox.style.left = taskbox.offsetLeft + "px";
taskbox.style.top = taskbox.offsetTop + "px";

taskbox.addEventListener("mousedown", (e) => {
    isDragging = true;
    // Calculate offset between mouse and top-left corner of taskbox
    offsetX = e.clientX - taskbox.offsetLeft;
    offsetY = e.clientY - taskbox.offsetTop;
    // Prevent text selection while dragging
    e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        // Move taskbox to follow the mouse, minus the offset
        taskbox.style.left = (e.clientX - offsetX) + "px";
        taskbox.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
