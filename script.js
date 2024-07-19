document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const allTasksButton = document.getElementById('All-tasks');
    const completedTasksButton = document.getElementById('Completed-tasks');
    const notCompletedTasksButton = document.getElementById('Not-completed-tasks');
    const favoriteTasksButton = document.getElementById('Favorite-tasks');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask(taskInput.value.trim());
        taskInput.value = '';
    });

    taskList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('task-checkbox')) {
            target.parentElement.classList.toggle('completed');
        } else if (target.classList.contains('task-favorite')) {
            target.parentElement.classList.toggle('favorite');
            target.classList.toggle('active');
        } else if (target.classList.contains('task-delete')) {
            target.parentElement.remove();
        }
    });

    allTasksButton.addEventListener('click', () => {
        filterTasks('All');
    });

    completedTasksButton.addEventListener('click', () => {
        filterTasks('Completed');
    });

    notCompletedTasksButton.addEventListener('click', () => {
        filterTasks('Not-completed');
    });

    favoriteTasksButton.addEventListener('click', () => {
        filterTasks('Favorite');
    });

    function addTask(taskText) {
        if (taskText) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox">
                <span>${taskText}</span>
                <span class="task-favorite">&#9733;</span>
                <button class="task-delete">Delete</button>
            `;
            taskList.appendChild(taskItem);
        }
    }

    function filterTasks(filter) {
        const tasks = taskList.querySelectorAll('.task-item');
        tasks.forEach(task => {
            switch (filter) {
                case 'All':
                    task.style.display = 'flex';
                    break;
                case 'Completed':
                    task.style.display = task.classList.contains('Completed') ? 'flex' : 'none';
                    break;
                case 'Not-completed':
                    task.style.display = !task.classList.contains('Completed') ? 'flex' : 'none';
                    break;
                case 'Favorite':
                    task.style.display = task.classList.contains('Favorite') ? 'flex' : 'none';
                    break;
                default:
                    task.style.display = 'flex';
                    break;
            }
        });
    }

    // Adding some initial tasks for demonstration purposes
    addTask('Complete homework');
    addTask('Buy groceries');
    addTask('Read a book');
    addTask('Clean Room')
    taskList.querySelector('.task-item:nth-child(1) .task-checkbox').click();  // Mark the first task as completed
});
