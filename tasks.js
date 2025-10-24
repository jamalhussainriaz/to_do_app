const inputTask = document.getElementById("inputTask");
const taskList = document.getElementById("taskList");
const addTaskbtn = document.getElementById("addTaskbtn");
let editLi = null; // Track which LI is being edited

addTaskbtn.addEventListener('click', function() {
    const inputTaskValue = inputTask.value.trim();

    if (inputTaskValue === '') {
        alert("Please enter an item");
        return;
    }

    if (this.dataset.mode === 'edit') {
        // Update mode
        editLi.querySelector('.task').innerText = inputTaskValue;
        this.textContent = 'Add Task';
        this.dataset.mode = 'add';
        inputTask.value = '';
        editLi = null;
        return;
    }

    // Add mode
    const listTasks = document.createElement('li');
    const listTasks2 = document.createElement('span');
    listTasks2.textContent = inputTaskValue;
    listTasks2.classList.add('task');
    listTasks.style.marginBottom = '10px';
    listTasks.appendChild(listTasks2);
    listTasks.appendChild(createEditBtn());
    listTasks.appendChild(createDeleteBtn());
    taskList.appendChild(listTasks);
    inputTask.value = '';
});

function createEditBtn() {
    const editBtn = document.createElement("button");
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-button');
    editBtn.style.marginLeft = '10px';
    editBtn.style.backgroundColor = 'coral';
    editBtn.style.color = 'white';

    editBtn.addEventListener('click', function() {
        const li = this.parentElement;
        const taskValue = li.querySelector('.task').innerText;
        inputTask.value = taskValue;

        // Mark edit mode
        addTaskbtn.textContent = 'Update Task';
        addTaskbtn.dataset.mode = 'edit';
        editLi = li; // Remember which <li> is being edited
    });

    return editBtn;
}

function createDeleteBtn() {
    const delBtn = document.createElement("button");
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delete-button');
    delBtn.style.marginLeft = '10px';
    delBtn.style.backgroundColor = '#fff';
    delBtn.style.color = '#000';
    delBtn.style.cursor = 'pointer';

    delBtn.addEventListener("click", function() {
        taskList.removeChild(this.parentElement);
    });
    return delBtn;
}
