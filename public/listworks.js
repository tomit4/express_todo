window.onload = renderList();

let listArray = [];
let renderedList = [];

function addToList() {
    let input = document.getElementById("input_bar").value.toUpperCase();
    if (!input) {
        return;
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
    postData(listArray[0]);
    renderList();
    listArray = [];
    renderedList = [];
}

function postData(toDo) {
        fetch('http://localhost:3000/maria_database', {
            method: "POST",
            body: 
            JSON.stringify({
                "listArray": toDo.task
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            referrerPolicy: "no-referrer"
        })
        .then(res => res.json())
        .catch((err) => console.error(err));
        
    }

function renderList() {
    fetch('http://localhost:3000/maria_database')
        .then(res => res.json()
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                renderedList.push(data[i]);
            }
        }).then(() => {
            let doList = document.getElementById("do_list");
            let ulStr = '<ul id="unordered_list">';

            for (let i = 0; i < renderedList.length; i++) {
                ulStr += '<div id="' + i + '">' + '<li className="list_item" id="list_id_' + i + '">' + 
                renderedList[i].task + '</li>' + '<button class="button_set buttons" id="button_id_' + i + 
                '" onclick="finishTask(' + i + ')">DONE</button></div>';
            }

            ulStr += '</ul>';

            doList.innerHTML = ulStr;
        })
        .catch((err) => console.error(err)));

    document.getElementById("input_bar").value = "";

}   

function finishTask(i) {
    let doneItem = document.getElementById("list_id_" + i).innerText;
    fetch('http://localhost:3000/maria_database', {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "deletedItem": doneItem
    })
    })
    .then(res => {
        return res.json()
    })
    .then(data => console.log(data));
    
    reRenderList(i);
}

function reRenderList(i) {
    let deletedListItem = document.getElementById(i);
    deletedListItem.remove();
}
