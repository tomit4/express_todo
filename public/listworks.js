let listArray = [];

function addToList() {
    let input = document.getElementById("input_bar").value.toUpperCase();
    if (input === "") {
        return alert("PLEASE ENTER A TASK TO DO...");
    }
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === '<' || input.charAt(i) === '>') {
        document.getElementById("input_bar").value = "";
        return alert("ILLEGAL CHARACTER PASSED, TRY AGAIN...");
        }
    } 
    let listJSON = {
        "id": undefined,
        "task": input
    };
    listArray.push(listJSON);
    for (let i = 0; i < listArray.length; i++) {
        listArray[i].id = listArray.indexOf(listArray[i]);
    };
    console.log(listArray);
    renderList();
}


async function postData() {
    for (let i = 0; i < listArray.length; i++) {    
        await fetch('http://localhost:3000/maria_database', {
            method: "POST",
            mode: 'same-origin',
            body: JSON.stringify({
                "id": null,
                "task": listArray[i].task
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            referrerPolicy: "no-referrer"
        })
      .then(res => res.json())
      .catch((err) => console.error(err));
    }
}

postData()
    .then(res => {
        console.log(res)
    });

function renderList() {
    let doList = document.getElementById("do_list");
    let ulStr = '<ul id="unordered_list">';

    for (let i = 0; i < listArray.length; i++) {
        ulStr += '<div id="' + listArray[i].id + '">' + '<li className="list_item" id="' + `listID_${listArray[i].id}` + '">' + 
        listArray[i].task + '</li>' + 
        // Below doesn't quite work with the CSS yet, as I'm not familiar enough to style this correctly yet.
        // '<button class="button_set buttons" id="' + `edit_button_${listArray[i].id}` + ' onclick="editItem(' + `${listArray[i].id}` + ')">EDIT</button>'+ 
        '<button class="button_set buttons" id="' + `delete_button_${listArray[i].id}` + 
        '" onclick="deleteItem(' + `${listArray[i].id}` + '), reset()">DELETE</button></div>';
    }

    ulStr += '</ul>';

    doList.innerHTML = ulStr;

    document.getElementById("input_bar").value = "";
}   

function deleteItem(id_number) {
    let listDiv = document.getElementById(id_number);
    for (let i = 0; i < listArray.length; i++) {
        if (listArray[i].id === id_number) {
            listArray.splice(id_number, 1);
            listDiv.remove();
        }
    }
    for (let i = 0; i < listArray.length; i++) {
        listArray[i].id = i;
    }
    
    reRenderList();
    console.log(listArray);
}

function reRenderList() {
    let ul = document.getElementById("unordered_list");
    ul.remove();
    renderList();
}

function reset() {
    let ul = document.getElementById("unordered_list");
    if (listArray.length === 0) {
        ul.remove();
    }
}

function saveToLocalStorage() {
    localStorage.clear();
    for (let i = 0; i < listArray.length; i++) {
        localStorage.setItem(i, listArray[i].task);
    }
}

