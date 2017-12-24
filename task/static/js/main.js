async function fetchAsync(url) {
    // await response of fetch call
    let response = await fetch(url);
    return await response.json();
}

let insertTask = (title, description) => {

    let newtask = {
        "data": {

            "type": "tasks",
            "attributes": {
                "description": description,
                "title": title,
                "done": false
            }
        }
    }

    fetch('../api/tasks', {

        method: 'POST',
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Accept": "application/vnd.api+json"
        },
        body: JSON.stringify(newtask)
    })
        .then(showAll())
        .catch(reason => console.log(reason.message))

};


let editTask = () => { };
let deleteTask = () => { };
let completeTask = () => { };

let buildList = (data) => {
    document.querySelector("#currentTasks").innerHTML = ""
    data.data.forEach(function (element) {
        document.querySelector("#currentTasks").innerHTML += "<br>" + element.attributes.title
    });

}

let showAll = () => {
    fetchAsync('../api/tasks')
        .then(data => buildList(data))
        .catch(reason => console.log(reason.message))
};


let main = () => {
    showAll();

    document.querySelector("#submitNew").addEventListener("click", function () {
        let title = document.querySelector("#newTask").value;
        let description = document.querySelector("#descNewTask").value;
        insertTask(title, description)

    });

}


document.addEventListener('DOMContentLoaded', main, false);

