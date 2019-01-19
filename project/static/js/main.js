async function fetchAsync(url) {
	let response = await fetch(url);
	return await response.json();
}

let insertTask = (title) => {

	fetch('../api/tasks', {

		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({

			"title": title,
			"done": false

		})
	})
		.then(showAll())
		.catch(reason => console.log(reason.message))

};

let editTask = (task) => {
	currentTask = task.getElementsByClassName("taskTitle")[0];
	titleValue = currentTask.innerText;
	currentTask.innerHTML = `<input type="text" class="editableTask" value="${titleValue}"></input>`;
	task.getElementsByClassName("edit")[0].style.display = "none";
	task.getElementsByClassName("save")[0].style.display = "inline";
};

let saveEditedTask = (task) => {

	fetch(`../api/tasks/${task.id}`, {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({

			"title": task.getElementsByClassName("editableTask")[0].value

		})

	}).then(showAll());
}

let deleteTask = (idToDelete) => {

	fetch(`../api/tasks/${idToDelete}`, {
		method: 'DELETE'
	}
	).then(showAll())
};

let completeTask = (id, status) => {

	console.log(id);
	console.log(status);

	fetch(`../api/tasks/${id}`, {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({

			"done": status

		})

	}).then(showAll());


};


let buildList = (data) => {
	document.querySelector("#currentTasks").innerHTML = ""
	data.objects.forEach(function (element) {
		console.log(element);
		if (element.done == true) {
			status = "checked";
		} else {
			status = "";
		}
		document.querySelector("#currentTasks").innerHTML += `<div class='taskItem' id='${element.key}'><input type='checkbox' class='status' ${status}><span class="taskTitle">${element.title}</span><button class="save" style="display:none;">Save</button><button class="edit">Edit</button><button class="delete">Delete</button></div>`;

	});

}

let showAll = () => {
	fetchAsync('../api/tasks')
		.then(data => buildList(data))
		.catch(reason => console.log(reason.message))
};


let initApp = () => {

	showAll();

	document.querySelector("#submitNew").addEventListener("click", function (event) {
		let title = document.querySelector("#newTask").value;
		insertTask(title)
	});

	document.querySelector("#newTask").addEventListener("keyup", function (event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			let title = document.querySelector("#newTask").value;
			insertTask(title)
		}
	});

	document.querySelector("#currentTasks").addEventListener("click", function (e) {

		if (e.target && e.target.matches(".delete")) {
			deleteTask(e.target.parentNode.id);
		}

		if (e.target && e.target.matches(".edit")) {
			editTask(e.target.parentNode);
		}

		if (e.target && e.target.matches(".save")) {
			saveEditedTask(e.target.parentNode);
		}

		if (e.target && e.target.matches(".status")) {
			completeTask(e.target.parentNode.id, e.target.checked);
		}

	});
}

document.addEventListener('DOMContentLoaded', initApp, false);

