let addButton = document.querySelector("#add-button");
let input = document.querySelector("#task-input");
let taskbox = document.querySelector(".taskbox");
let delBlock = document.querySelector(".delete-box");

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

let isOverBlock = false;
document.addEventListener("mousemove", (e) => {
    if (isDragging && dragTarget) {
        dragTarget.style.left = (e.clientX - offsetX) + "px";
        dragTarget.style.top = (e.clientY - offsetY) + "px";
    }
    const dragRect = dragTarget.getBoundingClientRect();
    const blockRect = delBlock.getBoundingClientRect();
    isOverBlock = (
        dragRect.left<blockRect.right &&
        dragRect.top<blockRect.bottom &&
        dragRect.bottom>blockRect.top &&
        dragRect.right>blockRect.left
    )

    if (isOverBlock) {
        delBlock.classList.add("hover"); // Add hover class
    } 
    else {
        delBlock.classList.remove("hover"); // Remove hover class
    }
});

document.addEventListener("mouseup", () => {
    if (dragTarget) dragTarget.style.cursor = "grab";
    if(isOverBlock){
        dragTarget.remove();
    }
    isDragging = false;
    dragTarget = null;
    isOverBlock = false;
    delBlock.classList.remove("hover"); // Always remove hover class
});

// Attach drag logic to the original taskbox
taskbox.addEventListener("mousedown", dragStart);
