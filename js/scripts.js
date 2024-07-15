//Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
let oldInputValue;

//Funções
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  const checkButton = lucide.createElement(lucide.CheckCheck);
  checkButton.classList.add("eventNone");
  doneBtn.innerHTML = checkButton.outerHTML;
  todo.appendChild(doneBtn);


  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  const penButton = lucide.createElement(lucide.Pen);
  penButton.classList.add("eventNone");
  editBtn.innerHTML = penButton.outerHTML;
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  const deleteButton = lucide.createElement(lucide.X);
  deleteButton.classList.add("eventNone");
  deleteBtn.innerHTML = deleteButton.outerHTML;
  todo.appendChild(deleteBtn);
  

  todoList.appendChild(todo);
  todoInput.value = "";
  todoInput.focus();
};

const toggleForms = () => {
  console.log(editForm, todoForm, todoList);
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}
const updateTodo = (text) => {    
  const todos = document.querySelectorAll(".todo")
  todos.forEach((todo) =>{
    let todoTitle = todo.querySelector("h3")
    if(todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  })
}

//Eventos

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = todoInput.value;
  if (inputValue) {
    saveTodo(inputValue);
  } else {
    console.log("Digite algo");
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if(targetEl.classList.contains("remove-todo")){
    parentEl.remove();
  }

  if(targetEl.classList.contains("edit-todo")){
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;    
  }
  
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editInputValue = editInput.value;
  if(editInputValue){
    updateTodo(editInputValue);
  }
  toggleForms();
});