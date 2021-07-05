let renderedList = [];

function renderListFromLocalStorage() {
    let renderedListArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        renderedList.push(localStorage.getItem(i));
    }
    for (let i = 0; i < renderedList.length; i++) {
        let renderedTaskObject = {
            "id": undefined,
            "task": undefined
        };
        renderedTaskObject.id = i;
        renderedTaskObject.task = renderedList[i];
        renderedListArray.push(renderedTaskObject)
    }
    renderedList = renderedListArray;
    console.log(renderedList);
    renderList();
}

function renderList() {
    let myList = document.getElementById("my_list");
    let ulStr = '<ul id="unordered_list">';

    for (let i = 0; i < renderedList.length; i++) {
        ulStr += '<div id="' + i + '">' + '<li className="list_item" id="list_id_' + i + '">' + 
        renderedList[i].task + '</li>' + '<button class="button_set buttons" id="button_id_' + i + 
        '" onclick="finishTask(' + i + '), reset()">DONE</button></div>';
    }

    ulStr += '</ul>';

    myList.innerHTML = ulStr;
}

function finishTask(id_number) {
    let listDiv = document.getElementById(id_number);
    for (let i = 0; i < renderedList.length; i++) {
        if (renderedList[i].id === id_number) {
            renderedList.splice(id_number, 1);
            localStorage.removeItem(i);
            listDiv.remove();
        }
    }
    for (let i = 0; i < renderedList.length; i++) {
        renderedList[i].id = i;
    }

    // for (let i = 0; i < localStorage.length; i++) {
    //     localStorage[i].key(i) = i;
    // }
    
    reRenderList();
}

function reRenderList() {
    let ul = document.getElementById("unordered_list");
    ul.remove();
    renderList();
}

function reset() {
    let ul = document.getElementById("unordered_list");
    if (renderedList.length === 0) {
        ul.remove();
        localStorage.clear();
        alert("YOU DONE DID IT!");
    }
}

window.onload = renderListFromLocalStorage();

// console.log(renderedList);