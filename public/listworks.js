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
            body: JSON.stringify({
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
                    ulStr +=
                        '<div id="' + i + '"><div class="popup">' +
                        '<span class="popuptext" id="myPopup_' + i + '" onclick="editForm(' + i + ')">EDIT</span></div>' +
                        '<li className="list_item" id="list_id_' + i + '" onmouseover="showEditButton(' + i + ')">' + renderedList[i].task + '</li>' +
                        '<button class="button_set buttons" id="button_id_' + i + '" onclick="finishTask(' + i + ')">DONE</button></div>';
                }

                ulStr += '</ul>';

                doList.innerHTML = ulStr;
            })
            .catch((err) => console.error(err)));

    document.getElementById("input_bar").value = "";
}

function showEditButton(i) {
    let popup = document.getElementById("myPopup_" + i);
    popup.classList.toggle("show"); // toggle only works with getElementById()
}

function editForm(i) {
    let listDiv = document.getElementById(i);

    listDiv.innerHTML = '<form id="task_form" onsubmit="updateTask(' + i + ')" return false>' +
        '<input type="text" maxlength="28" id="edit_bar" placeholder="' + renderedList[i].task + '"></input>' +
        '<button class="button_set buttons" id="button_id_' + i + '" onclick = "updateTask(' + i + ')">EDIT</button></div>' +
        '</form>'

}

function updateTask(i) { 
    let previousTodo = renderedList[i];
    let updatedTodo = document.getElementById("edit_bar").value.toUpperCase();
    let unorderedList = document.getElementById("unordered_list");

    if (updatedTodo) {
        fetch('http://localhost:3000/maria_database', {
                method: "PUT",
                body: JSON.stringify({
                    "previous_to_do": previousTodo.task,
                    "updated_to_do": updatedTodo
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch((err) => console.error(err));

        renderedList = [];
        unorderedList.remove();
        renderList();

    } else {
        renderedList = [];
        unorderedList.remove();
        renderList();
    }
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