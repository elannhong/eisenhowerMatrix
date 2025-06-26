let addButton = document.querySelector("#add-button");
let input = document.querySelector("#task-input");
let taskbox = document.querySelector(".taskbox");

addButton.addEventListener("click",()=>{
    input.style.display = "block";
    input.value = ""
    input.focus();
    
})

document.querySelector("html").addEventListener("keydown", e => {
    if (e.key === 'Enter') {
        input.style.display = "none";
        taskbox.style.display = "flex";
        // Clone the first .taskbox
        const tasktemplate = document.querySelector('.taskbox');
        const newtask = tasktemplate.cloneNode(true);
        newtask.classList.add('taskbox'); // ensure class is present
        newtask.textContent = input.value; // set text
        newtask.style.left = ''; //reset next task position to default
        newtask.style.top = '';
        // Attach drag logic to new taskbox
        newtask.addEventListener("mousedown", dragStart);
        tasktemplate.parentNode.insertBefore(newtask, tasktemplate.nextSibling);
        tasktemplate.style.display = "none";
    }
});

let isDragging = false;
let dragTarget = null;
let offsetX, offsetY;

function dragStart(e) {
    isDragging = true;
    dragTarget = e.target;
    offsetX = e.clientX - dragTarget.offsetLeft;
    offsetY = e.clientY - dragTarget.offsetTop;
    dragTarget.style.cursor = "grabbing";
    e.preventDefault();
}

document.addEventListener("mousemove", (e) => {
    if (isDragging && dragTarget) {
        dragTarget.style.left = (e.clientX - offsetX) + "px";
        dragTarget.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    if (dragTarget) dragTarget.style.cursor = "grab";
    isDragging = false;
    dragTarget = null;
});

// Attach drag logic to the original taskbox
taskbox.addEventListener("mousedown", dragStart);
