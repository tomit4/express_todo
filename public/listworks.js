// We'll need to load the window at first so if there's anything in our database, we render it from the /maria_database subdirectory
window.onload = renderList();

// listArray actually just holds one list item at a time, to be used to POST one todo object at a time
let listArray = [];
// renderedList on the other hand will hold all of our todolist items to be referenced in renderList()
let renderedList = [];

// addToList() takes the user input from the <input> tag, posts it to the database, and renders it on the index.html page immediately afterwards
function addToList() {
    let input = document.getElementById("input_bar").value.toUpperCase();
    if (!input) {
        return;
    }
    // a little bit to prevent XSS attacks, pretty sure this isn't fullproof by any means, but it's my first attempt at some security measures...
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === '<' || input.charAt(i) === '>') {
            document.getElementById("input_bar").value = "";
            return alert("ILLEGAL CHARACTER PASSED, TRY AGAIN...");
        }
    }
    // This is actually an artifact from a previous version that used the browser's Local Storage, on second inspection we probably don't need the "id" key/value,
    // but I'm leaving it mainly as a way of referencing the data
    let listJSON = {
        "id": undefined,
        "task": input
    };
    listArray.push(listJSON);
    for (let i = 0; i < listArray.length; i++) {
        listArray[i].id = listArray.indexOf(listArray[i]);
    };
    // Originally, I had attempted to make multiple fetch POST requests in a for loop, this was unsuccessful and demonstrated my ignorance
    // on how these sorts of requests worked, by always posting the first item, I could simply POST whatever was immediately created to the Database, and then render
    // whatever was in the database immediately thereafter 

    // POST the first listArray item
    postData(listArray[0]);
    // And then render the todo list on the html page
    renderList();
    // then reset the arrays to empty so that we always post only new user input and don't repeatedly render the todos over and over again creating endless duplicates with each post
    listArray = [];
    // You probably can tell I had many errors and hiccups understanding how this worked.
    renderedList = [];
}

// References our router.post() method in our routes/index.js file
function postData(toDo) {
    fetch('http://localhost:3000/maria_database', {
            // the method references what kind of request we're making to the server, in this case we wish to POST some new user input
            method: "POST",
            // the main feature of fetch() requests is the body, which is what any backend server is looking for, usually this is sent in JSON
            body: JSON.stringify({
                // Note that above in addToList() we passed it listArray[0], this is referenced here as toDO, we ask for its task property and store it
                // in a key as "listArray", which is then rerefenced and destructured in routes/index.js file's router.post() request
                "listArray": toDo.task
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            referrerPolicy: "no-referrer"
        })
        .then(res => res.json())
        .catch((err) => console.error(err)); //super handy error handling, helped so much in the process

}

// The meat and potatoes of the application, renderList() is utilized to actually take our MariaDB data and render it on our index.html page
function renderList() {
    // Note the difference between this fetch() request and all the others, fetch() by itself without any method: definition is interpreted as a GET() request by default
    fetch('http://localhost:3000/maria_database')
        .then(res => res.json() // and here we do a decent amount more with the data, not the Promise structure of the whole thing
            .then((data) => { // we resolve the response to JSON, then take the returned data...
                for (let i = 0; i < data.length; i++) { // and loop through it...
                    renderedList.push(data[i]); // and push it to our global array, renderedList, to be used in rendering our page from the returned data
                }
            }).then(() => {
                let doList = document.getElementById("do_list"); // we reference our currently empty <div> with an id of "do_list"
                let ulStr = '<ul id="unordered_list">'; // and create a string to be injected into it later which establishes an unordered list with an id of "unordered_list"

                for (let i = 0; i < renderedList.length; i++) { // we then loop through our returned data
                    // and append to our unordered list the following, note the use of the iterator to create a series of ids in our list and buttons just in case
                    // we actually don't reference alot of these ids, but it's still good to have on hand.
                    // keep in mind that many on reddit thought that creating HTML in this way was probably not the best way, as using other methods was considered cleaner, consider
                    // using other methods in the future.
                    ulStr +=    
                        '<div id="' + i + '"><div class="popup">' +
                        '<span class="popuptext" id="myPopup_' + i + '" onclick="editForm(' + i + ')">EDIT</span></div>' +
                        '<li className="list_item" id="list_id_' + i + '" onmouseover="showEditButton(' + i + ')">' + renderedList[i].task + '</li>' +
                        '<button class="button_set buttons" id="button_id_' + i + '" onclick="finishTask(' + i + ')">DONE</button></div>';
                }

                ulStr += '</ul>'; // finish off the html string (note that some of this is divided more for human readability than necessity)

                doList.innerHTML = ulStr; // and the empty div is now filled with our rendered to do list
            })
            .catch((err) => console.error(err)));

    document.getElementById("input_bar").value = ""; // afterwards which the input bar is emptied for further user input.
}

//The showeEditButton() function referenced in our <span> tag above uses the toggle method which is referenced in our styles.css
function showEditButton(i) {
    let popup = document.getElementById("myPopup_" + i);
    popup.classList.toggle("show"); // note that toggle only works with getElementById()
}

// editForm() function changes the list item into a form for user input, it also creates an edit button to utilize the updateTask() function
// for our fetch() PUT request
function editForm(i) {
    let listDiv = document.getElementById(i);

    listDiv.innerHTML = '<form id="task_form" onsubmit="updateTask(' + i + ')" return false>' +
        '<input type="text" maxlength="28" id="edit_bar" placeholder="' + renderedList[i].task + '"></input>' +
        '<button class="button_set buttons" id="button_id_' + i + '" onclick = "updateTask(' + i + ')">EDIT</button></div>' +
        '</form>'

}

// This took a little while to get right, the updateTask() function MUST in this case, have at least two parameters passed to the fetch() body()
// In this case we pass a previousTodo that we need in order to reference the task column in our database, and the updatedTodo
// To have the data we pass to rewrite it.
function updateTask(i) { 
    let previousTodo = renderedList[i];
    let updatedTodo = document.getElementById("edit_bar").value.toUpperCase();
    // We also need to reference the unordered_list in order to remove it before re-rendering the list on the index.html page.
    let unorderedList = document.getElementById("unordered_list");

    if (updatedTodo) { // as long as the user put something into the edit_bar...
        // we go ahead with the fetch() PUT request
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
        // afterwards we empty the rendered page so that it can then renderList() again by reading whatever is in the database
        // if we didn't we would duplicate the display of the current list on the page
        renderedList = []; // this took me a bit to realize I needed to empty the renderedList again, at first I thought it had to be done in the renderList() function, but that
        // just gave me a blank page every load, this empties it before calling renderList at all, givin the index.html a clean slate to read the MariaDB database from again.
        unorderedList.remove();
        renderList();

    } else { // if the user left the input empty, we still have to re render the list...
        renderedList = [];
        unorderedList.remove();
        renderList();
    }
}

// finishTask() is our DELETE function, it gets rid of the item in the database, and also re renders the page...
function finishTask(i) {
    // I had not planned on using the list_id_ reference, but here I'm glad I established it, as it allows me to reference the text to be matched...
    let doneItem = document.getElementById("list_id_" + i).innerText; // we need the innerText to reference which item to delete in the MariaDB database.

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
    
    // Note here how we don't simply re render the page here with renderList(), we don't need to, we simply need to remove the same element removed from the database,
    // This is unlike in the update/put fetch() request above, which requires us to re render the page because we are in that function BOTH POSTing and DELETing
    reRenderList(i);
}

// Here we simply reference the div where the Delete button was hit, and remove() that element.
function reRenderList(i) {
    let deletedListItem = document.getElementById(i);
    deletedListItem.remove();
}