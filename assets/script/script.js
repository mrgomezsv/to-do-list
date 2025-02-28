// Seleccionar elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks); // Carga las tareas desde localStorage al iniciar


addTaskBtn.addEventListener('click', () => { // Agregar tarea
  addTask();
});


taskInput.addEventListener('keydown', (event) => {// Tecla Enter en el campo de texto
  if (event.key === 'Enter') {
    addTask();
  }
});


function addTask() {// Función para agregar una tarea
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
    saveTasks();
  }
}


function addTask(taskText, isCompleted = false) {// Agrega una tarea a la lista
  const li = document.createElement('li');
  li.textContent = taskText;

  if (isCompleted) {
    li.classList.add('completed');
  }


  const deleteBtn = document.createElement('button');  // Botón para eliminar tarea
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('¿Estás seguro de que quieres eliminar esta tarea?');

    const confirm = confirm('¿Estás seguro de que quieres eliminar esta tarea?');
    if (confirm) {
      taskList.removeChild(li);
      saveTasks();
    }
  });


  li.addEventListener('click', () => { // Marcar tarea como completada o cambiar a pendiente
    if (li.classList.contains('completed')) {
      console.log('Esta tarea ya está COMPLETADA. ¿Deseas cambiarla a pendiente?');

      const confirm = confirm('Esta tarea ya está COMPLETADA. ¿Deseas cambiarla a pendiente?');
      if (confirm) {
        li.classList.remove('completed');
        saveTasks();
      }
    } else {
      li.classList.add('completed');
      saveTasks();
    }
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}


function saveTasks() { // Guardar las tareas en localStorage
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.textContent.replace('Eliminar', '').trim(),
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() { // Cargar las tareas desde localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task.text, task.completed);
  });
}