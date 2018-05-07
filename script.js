const todoList = {
  todos: [],
  addTodo(todoText) {
    this.todos.push({
      todoText,
      completed: false
    });
  },
  changeTodo(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted(position) {
    const todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll() {
    const totalTodos = this.todos.length;
    let completedTodos = 0;
    
    // Get number of completed todos.
    this.todos.forEach(todo => {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    
    this.todos.forEach(todo => {
      // Case 1: If everything’s true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
      // Case 2: Otherwise, make everything true.
        todo.completed = true;
      }
    });
  }
};

const handlers = {
  addTodo() {
    const addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo() {
    const changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    const changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted() {
    const toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

const view = {
  displayTodos() {
    const todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position) {
        let todoTextWithCompletion = '';
        const todoLi = document.createElement('li');
        if (todo.completed === true) {
          todoTextWithCompletion = `(x) ${todo.todoText}`;
        } else {
          todoTextWithCompletion = `( ) ${todo.todoText}`;
        }
      
        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners() {
    const todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', event => {

      // Get the element that was clicked on
      const elementClicked = event.target;

      // Check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();









