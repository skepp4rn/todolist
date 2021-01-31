let ToDo = [];

let form = document.getElementById('form');
let addToDos = document.getElementById('addToDo');

let check = false;

let subbtn = document.getElementById('subbtn');
let list = document.querySelector('#list');

const fetchTodos = () => {
    fetch('https://jsonplaceholder.typicode.com/todos?_start20=&_limit=10')
    .then(res => res.json())
    .then(data => {
      ToDo = data;
      listelement(ToDo);
    })
}
fetchTodos();

const listelement = (ToDo) => {
    list.innerHTML = '';
    ToDo.forEach(todo => {
        list.innerHTML += newTodo(todo);
    })
    console.log(ToDo);
}

const newTodo = todo => {

    let template = todo.completed ? `
    <div id="${todo.id}" class="todoinput completed">
        <div class="todobox">
          <h3 class="title">${todo.title}</h3>
            <div class="knappar">
                <button class="fas fa-undo"></button>
                <button class="fas fa-trash"></button> 
            </div>        
        </div>
    </div>
    `
    : `
    <div id="${todo.id}" class="todoinput">
        <div class="todobox">
            <h3 class="title">${todo.title}</h3>
            <button class="done">Done</button>     
        </div>
    </div>
    `
    return template
  }

//   function toggle() {
//       completed = completed ? false : true;
//   }

  const createTodo = (title) => {

    fetch('https://jsonplaceholder.typicode.com/todos',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        title,
        completed: false
      })
    })
    .then(res => res.json())
    .then(data => {
        let _todo = {
            title: data.title,
            completed: data.completed,
            id: uuidv4()
        }
      console.log(data)
      ToDo.unshift(_todo);
      listelement(ToDo);
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();

    if(check == true) {
        removeinput(addToDos);

        createTodo(addToDos.value)
        listelement(ToDo);

        addToDos.value = '';
    }
});

function checkInputs() {
    let addToDosValue = addToDos.value.trim();

    if(addToDosValue === ``) {
    setErrorFor(addToDos, `To Do cannot be blank`);

    } else {
        setSuccessFor(addToDos);
    }
}

function setErrorFor(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
    check = false;
}

function setSuccessFor(input) {
    let formControl = input.parentElement;
    formControl.className = 'form-control success';
    check = true;
}

function removeinput(input) {
    let formControl = input.parentElement;
    formControl.className = 'form-control';
}

list.addEventListener('click', (e) => {
    if(e.target.classList.contains('done')) {
        complete(e.target.parentNode.parentNode.id)
    }
    else if(e.target.classList.contains('fa-undo')) {
        complete(e.target.parentNode.parentNode.parentNode.id)
    }
})

function complete(id) {
    ToDo.map(todo => {
        if(todo.id == id){
            todo.completed = !todo.completed
        }
        return todo
    })
    listelement(ToDo)
}

// function onClick (todo) {
//     if(todo.completed = true) {
//         todo.completed = false;
//     }
//     else{
//         todo.completed = true;
//     }
// }


// function setComplete (todo) {
//     todo.completed=true;
// }


// list.addEventListener('click', (e) => {
//     if(e.target.classList.contains('done')) {
//         ToDo = ToDo.map(todo => todo.completed = !todo.completed)
//     }
//     listelement(ToDo);
// });


//FUNKAR MEN SÄTTER ALLA TILL TRUE 
// list.addEventListener('click', (e) => {
//     if(e.target.classList.contains('done')) {
//         ToDo = ToDo.filter(todo => todo.completed = true)
//     }
//     listelement(ToDo)
// });


// function toggle(){
//     let completed = false;
//     completed = !completed;
// }

// list.addEventListener('click', (e) => {
//     if(e.target.classList.contains('done')) {
//         toggle();
//         listelement(ToDo)
//     }
// });

   // onClick();



    // if(ToDo.some(todo => todo.completed === true)) {
    //     listelement(ToDo);
    //     return false;
    // }
    // else{
    //     listelement(ToDo);
    //     return true;
    // }
    
    // if(e.target.classList.contains('done')) {
        

    //     if(todo.completed === true){
    //         todo.completed = false;
    //     }
    //     else{
    //         todo.completed = true;
    //     }   
    // }




list.addEventListener('click', (e) => {

    if(e.target.classList.contains('fa-trash')) {
        ToDo = ToDo.filter(removetodo => removetodo.id != e.target.parentNode.parentNode.parentNode.id)
        listelement(ToDo)
    }
});