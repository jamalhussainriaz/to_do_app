const inputTask = document.getElementById("inputTask");
const taskList = document.getElementById("taskList");
const addTaskbtn = document.getElementById("addTaskbtn");
const modal = document.getElementById('viewModal');
const viewText = document.getElementById('viewText');
const closeModal = document.querySelector('.close');

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
    const listTasks3 = document.createElement('div');
    listTasks3.classList.add('actions');
    listTasks2.textContent = inputTaskValue;
    listTasks2.classList.add('task');
    listTasks.style.marginBottom = '10px';
    listTasks.appendChild(listTasks2);
    listTasks.appendChild(listTasks3);
    listTasks3.appendChild(createMarkBtn());
    listTasks3.appendChild(createViewBtn());
    listTasks3.appendChild(createEditBtn());
    listTasks3.appendChild(createDeleteBtn());
    taskList.appendChild(listTasks);
    inputTask.value = '';
});

function createMarkBtn() {
    const markBtn = document.createElement("button");
    markBtn.textContent = 'Mark';
    markBtn.classList.add('mark-button');
    markBtn.style.marginLeft = '10px';
    markBtn.style.backgroundColor = 'blue';
    markBtn.style.color = 'white';

    markBtn.addEventListener('click', function() {
        const li = this.closest('li');
        const span = li.querySelector('span');

        if (span) {
            span.classList.toggle('completed');
            this.textContent = span.classList.contains('completed') ? 'Unmark' : 'Mark';
        }
    });

    return markBtn;
}

function createViewBtn() {
    const viewBtn = document.createElement("button");
    viewBtn.textContent = 'View';
    viewBtn.classList.add('view-button');
    viewBtn.style.marginLeft = '10px';
    viewBtn.style.backgroundColor = 'green';
    viewBtn.style.color = 'white';

    viewBtn.addEventListener('click', function() {
        const li = this.closest('li');
        const taskValue = li.querySelector('.task').innerText;
        viewText.textContent = taskValue;
        modal.style.display = 'flex';
    });

    return viewBtn;
}

function createEditBtn() {
    const editBtn = document.createElement("button");
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-button');
    editBtn.style.marginLeft = '10px';
    editBtn.style.backgroundColor = 'coral';
    editBtn.style.color = 'white';

    editBtn.addEventListener('click', function() {
        const li = this.closest('li');
        const taskValue = li.querySelector('.task').innerText;
        inputTask.value = taskValue;

        // Mark edit mode
        addTaskbtn.textContent = 'Update Task';
        addTaskbtn.dataset.mode = 'edit';
        editLi = li;
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
        taskList.removeChild(this.closest('li'));
    });
    return delBtn;
}

closeModal.addEventListener('click', () => (modal.style.display = 'none'));
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});
