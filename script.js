const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');

let editingTask = null;

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Add task click handler to toggle completion
    li.addEventListener('click', function () {
      li.classList.toggle('completed');
      saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function () {
      taskList.removeChild(li);
      saveTasks();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = function () {
      taskInput.value = taskText;
      editingTask = li;
    };

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
    taskInput.value = '';

    saveTasks();
  }
}

function saveTasks() {
  const tasks = [];
  const taskItems = taskList.getElementsByTagName('li');

  for (let i = 0; i < taskItems.length; i++) {
    const taskText = taskItems[i].textContent.replace('DeleteEdit', '').trim();
    const isCompleted = taskItems[i].classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks) {
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;

      // Apply completed class if the task was marked as completed in localStorage
      if (task.completed) {
        li.classList.add('completed');
      }

      // Add task click handler to toggle completion
      li.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveTasks();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.onclick = function () {
        taskList.removeChild(li);
        saveTasks();
      };

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.classList.add('edit-btn');
      editBtn.onclick = function () {
        taskInput.value = task.text;
        editingTask = li;
      };

      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
      taskList.appendChild(li);
    });
  }
}

function filterTasks(filterType) {
  const tasks = taskList.getElementsByTagName('li');

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (filterType === 'all') {
      task.style.display = '';
    } else if (filterType === 'active' && !task.classList.contains('completed')) {
      task.style.display = '';
    } else if (filterType === 'completed' && task.classList.contains('completed')) {
      task.style.display = '';
    } else {
      task.style.display = 'none';
    }
  }
}

window.onload = loadTasks;

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    if (editingTask) {
      editingTask.firstChild.textContent = taskInput.value;
      taskInput.value = '';
      editingTask = null;
      saveTasks();
    } else {
      addTask();
    }
  }
});

filterAll.addEventListener('click', function () {
  filterTasks('all');
});

filterActive.addEventListener('click', function () {
  filterTasks('active');
});

filterCompleted.addEventListener('click', function () {
  filterTasks('completed');
});
