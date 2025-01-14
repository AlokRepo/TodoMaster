let todos = [];
const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const filterButtons = document.querySelectorAll('#filter button');

// Load todos from local storage
if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
    renderTodos();
}

// Add event listener to todo form
todoForm.addEventListener('submit', addTodo);

// Add event listener to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', filterTodos);
});

// Function to add todo
function addTodo(event) {
    event.preventDefault();
    const newTodo = {
        text: todoInput.value,
        dueDate: '',
        completed: false
    };
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInput.value = '';
}

// Function to render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo');
        todoElement.innerHTML = `
            <p class="todo-text">${todo.text}</p>
            <p class="todo-date">Due: ${todo.dueDate}</p>
            <div class="todo-actions">
                <button class="complete-btn"><i class="fas fa-check"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        todoList.appendChild(todoElement);
        const completeButton = todoElement.querySelector('.complete-btn');
        const deleteButton = todoElement.querySelector('.delete-btn');
        completeButton.addEventListener('click', () => completeTodo(index));
        deleteButton.addEventListener('click', () => deleteTodo(index));
    });
}

// Function to complete todo
function completeTodo(index) {
    todos[index].completed = true;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Function to delete todo
function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Function to filter todos
function filterTodos(event) {
    const filterValue = event.target.textContent;
    if (filterValue === 'All Tasks') {
        renderTodos();
    } else if (filterValue === 'Today\'s Tasks') {
        const today = new Date();
        const todayTodos = todos.filter(todo => {
            const dueDate = new Date(todo.dueDate);
            return dueDate.getDate() === today.getDate() &&
                   dueDate.getMonth() === today.getMonth() &&
                   dueDate.getFullYear() === today.getFullYear();
        });
        renderFilteredTodos(todayTodos);
    } else if (filterValue === 'Upcoming Tasks') {
        const upcomingTodos = todos.filter(todo => {
            const dueDate = new Date(todo.dueDate);
            return dueDate > new Date();
        });
        renderFilteredTodos(upcomingTodos);
    }
}

// Function to render filtered todos
function renderFilteredTodos(filteredTodos) {
    todoList.innerHTML = '';
    filteredTodos.forEach((todo, index) => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo');
        todoElement.innerHTML = `
            <p class="todo-text">${todo.text}</p>
            <p class="todo-date">Due: ${todo.dueDate}</p>
            <div class="todo-actions">
                <button class="complete-btn"><i class="fas fa-check"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        todoList.appendChild(todoElement);
        const completeButton = todoElement.querySelector('.complete-btn');
        const deleteButton = todoElement.querySelector('.delete-btn');
        completeButton.addEventListener('click', () => completeTodo(index));
        deleteButton.addEventListener('click', () => deleteTodo(index));
    });
}