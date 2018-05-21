// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

  // DOM load event + Get tasks from LS
  document.addEventListener('DOMContentLoaded', function(){
    let tasks;
      if(localStorage.getItem('tasks') === null){
        tasks = [];
      }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      tasks.forEach(function(task){
      // Create new element li
      const li = document.createElement('li');
      // Add class to element    
      li.className = 'collection-item';
      // Create text node and append to li - qui va permettre de creer le mm text dans la liste
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement('a');
      // Add class to element        
      link.className = 'delete-item secondary-content';
      // Add Icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // append to link to li
      li.appendChild(link);
      // append li to ul
      taskList.appendChild(li);
      });

// Add Tasks
form.addEventListener('submit', function(e){
  if(taskInput.value === ''){
    alert('Please add a task !');
  }else{
    // Create new element li
    const li = document.createElement('li');
    // Add class to element    
    li.className = 'collection-item';
    // Create text node and append to li - qui va permettre de creer le mm text dans la liste
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class to element        
    link.className = 'delete-item secondary-content';
    // Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append to link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    // Clear the input
    taskInput.value = '';
  }

  //Store task
  function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
});
});

//Clear task button
  clearBtn.addEventListener('click', function(){
    taskList.innerHTML = '';
  clearTasksFromLocalStorage();
});
// function Clear tasks
    function clearTasksFromLocalStorage(taskItem){
      localStorage.clear();
    }


//Remove Task
  taskList.addEventListener('click', function(e){
    if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('are you sure ? ')){
        e.target.parentElement.parentElement.remove();
        //REMOVE FROM LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    };
  });

  // functionRemove from LS
    function removeTaskFromLocalStorage(taskItem){
      let tasks;
        if(localStorage.getItem('tasks') === null){
          tasks = [];
        }else{
          tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task, index){
          if(taskItem.textContent === task){
            tasks.splice(index, 1);
          }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }






//Filter tasks event
filter.addEventListener('keyup', function(e){
  const text = e.target.value.toLowerCase(); // text recup la valeur qui est taper dans le input

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';      
    }

  })
});


