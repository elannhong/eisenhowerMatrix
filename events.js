let addButton = document.querySelector("#add-button");
let input = document.querySelector("#task-input"); // fixed typo

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