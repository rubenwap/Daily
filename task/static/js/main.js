async function fetchAsync(url) {
    // await response of fetch call
    let response = await fetch(url);
    return await response.json();
}

let insertTask = (title) => {

    fetch('../api/tasks', {

        method: 'POST',
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json"
        },
        body: JSON.stringify({
            "data": {
                "type": "tasks",
                "attributes": {
                    "title": title,
                    "done": false
                }
            }
        })
    })
        .then(showAll())
        .catch(reason => console.log(reason.message))

};


let editTask = () => { };

let deleteTask = () => {

    let idToDelete = e.target.parentNode.id;

    fetch(`../api/tasks/${idToDelete}`, {
        method: 'DELETE'
    }
    ).then(showAll())
};


let completeTask = () => { };

let buildList = (data) => {
    document.querySelector("#currentTasks").innerHTML = ""
    data.data.forEach(function (element) {
        document.querySelector("#currentTasks").innerHTML += `<div class='taskItem' id='${element.attributes.key}'><input type='checkbox'>${element.attributes.title}<button class="edit">Edit</button><button class="delete">Delete</button></div>`
    });

}

let showAll = () => {
    fetchAsync('../api/tasks')
        .then(data => buildList(data))
        .catch(reason => console.log(reason.message))
};


let initApp = () => {

    showAll();

    document.querySelector("#submitNew").addEventListener("click", function () {
        let title = document.querySelector("#newTask").value;
        insertTask(title)
    });


    document.querySelector("#currentTasks").addEventListener("click", function (e) {
        // e.target was the clicked element
        if (e.target && e.target.matches(".delete")) {
            deleteTask();
        }
    });


}


document.addEventListener('DOMContentLoaded', initApp, false);

