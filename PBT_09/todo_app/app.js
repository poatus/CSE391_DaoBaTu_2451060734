// ============================================
// Todo App - DOM Manipulation
// Vanilla JavaScript - No libraries
// Features: CRUD, Filter, LocalStorage, Edit, Event Delegation
// ============================================

// State
let todos = [];
let currentFilter = 'all';

// DOM References
const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const list = document.querySelector('#todoList');
const itemsCount = document.querySelector('#itemsCount');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('#clearCompleted');

// ============================================
// LOAD FROM LOCALSTORAGE
// ============================================
function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        try {
            todos = JSON.parse(saved);
        } catch (e) {
            todos = [];
        }
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ============================================
// RENDER
// ============================================
function renderTodos() {
    // Clear current list - but keep it performant
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        showEmptyState();
    } else {
        const fragment = document.createDocumentFragment();
        filteredTodos.forEach(todo => {
            const li = createTodoElement(todo);
            fragment.appendChild(li);
        });
        list.appendChild(fragment);
    }

    updateItemsCount();
    updateFilterButtons();
}

function showEmptyState() {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-state';
    emptyDiv.innerHTML = `
        <div class="empty-icon">📝</div>
        <p>No ${currentFilter !== 'all' ? currentFilter : ''} todos yet!</p>
    `;
    list.appendChild(emptyDiv);
}

// ============================================
// CREATE TODO ELEMENT (createElement - NOT innerHTML)
// ============================================
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    // Checkbox circle
    const checkbox = document.createElement('span');
    checkbox.className = 'todo-checkbox';
    checkbox.setAttribute('aria-hidden', 'true');

    // Text span
    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '❌';
    deleteBtn.setAttribute('aria-label', 'Delete todo: ' + todo.text);

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    return li;
}

// ============================================
// FILTER
// ============================================
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return [...todos];
    }
}

function updateItemsCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    itemsCount.textContent = activeCount;
}

function updateFilterButtons() {
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    });
}

// ============================================
// CRUD OPERATIONS
// ============================================

// ADD
function addTodo(text) {
    const todo = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
}

// TOGGLE
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// DELETE
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

// EDIT
function editTodo(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.text = newText.trim();
        saveTodos();
        renderTodos();
    }
}

// CLEAR COMPLETED
function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
}

// ============================================
// EVENT DELEGATION - Bind on #todoList, NOT on individual <li>
// ============================================
list.addEventListener('click', function(e) {
    const target = e.target;
    const li = target.closest('.todo-item');
    if (!li) return;

    const id = li.dataset.id;

    // Delete button clicked
    if (target.classList.contains('delete-btn')) {
        e.stopPropagation();
        deleteTodo(id);
        return;
    }

    // Toggle completed on click (checkbox or text area)
    toggleTodo(id);
});

// Edit: Double-click to edit
list.addEventListener('dblclick', function(e) {
    const li = e.target.closest('.todo-item');
    if (!li) return;

    // Don't edit if clicked delete button
    if (e.target.classList.contains('delete-btn')) return;

    const id = li.dataset.id;
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const textSpan = li.querySelector('.todo-text');
    const currentText = todo.text;

    // Create edit input
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'todo-edit-input';
    editInput.value = currentText;

    // Replace text span with input
    textSpan.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    // Save on Enter
    editInput.addEventListener('keydown', function handler(ev) {
        if (ev.key === 'Enter') {
            const newText = editInput.value.trim();
            if (newText && newText !== currentText) {
                editTodo(id, newText);
            } else {
                // Revert if empty or unchanged
                renderTodos();
            }
        } else if (ev.key === 'Escape') {
            // Cancel edit
            renderTodos();
        }
    });

    // Save on blur (click outside)
    editInput.addEventListener('blur', function() {
        const newText = editInput.value.trim();
        if (newText && newText !== currentText) {
            editTodo(id, newText);
        } else {
            renderTodos();
        }
    });
});

// ============================================
// FORM SUBMIT
// ============================================
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addTodo(text);
    input.value = '';
    input.focus();
});

// ============================================
// FILTER BUTTONS
// ============================================
filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        currentFilter = this.dataset.filter;
        renderTodos();
    });
});

// ============================================
// CLEAR COMPLETED
// ============================================
clearCompletedBtn.addEventListener('click', function() {
    const hasCompleted = todos.some(t => t.completed);
    if (!hasCompleted) return;

    if (confirm('Delete all completed todos?')) {
        clearCompleted();
    }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', function(e) {
    // Ctrl+Z to clear completed
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        clearCompleted();
    }
});

// ============================================
// INIT
// ============================================
loadTodos();
renderTodos();