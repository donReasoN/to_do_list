{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const addTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent},
        ];
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done : true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    }

    const bindToggleEvents = () => {
        const toogleButtons = document.querySelectorAll('.js-done');

        toogleButtons.forEach((toogleButton, taskIndex) => {
            toogleButton.addEventListener('click', () => {
                toggleTask(taskIndex);
            });
        });
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll('.js-remove');

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener('click', () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindButtonsEvents = () => {
        const markAllTasksDoneButton = document.querySelector('.js-markAllTasksDone');

        if(markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener('click', markAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector('.js-toggleHideDoneTasks');

        if(toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener('click', toggleHideDoneTasks);
        }
    }
    
    const renderTasks = () => {
        
            const taskHTML = task => `
            <li class="tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""}">
                <button class="tasks__button tasks__button--done js-done">
                    <span class="tasks__icon ${task.done ? "fas fa-check" : ""}"></span>
                </button>

                <span class="tasks__content ${task.done ? "task-content--done" : ""}">${task.content}</span>

                <button class="tasks__button tasks__button--remove js-remove">
                    <span class="tasks__icon fas fa-trash-alt"></span>
                </button>
            </li>
        `;
        
        const taskElement = document.querySelector('.js-tasks');
        taskElement.innerHTML = tasks.map(taskHTML).join("");
    }

    const renderButtons = () => {

        const buttonsElement = document.querySelector('.js-buttons');

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }
    

        buttonsElement.innerHTML = `
            <button class="section__toggleHideTasks section__btn js-toggleHideDoneTasks"> 
                ${hideDoneTasks ? "Show completed" : "Hide completed"}
            </button>
            <button class="section__toggleDoneTasks section__btn js-markAllTasksDone"
             ${tasks.every(({ done }) => done) ? "disabled" : ""}
            >
                Complete all
            </button>
        `;
    };

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleEvents();
        renderButtons();
        bindButtonsEvents();
      
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector('.js-newTask');
        const newTaskContent = newTask.value.trim();

        if(newTaskContent) {
            addTask(newTaskContent);
            newTask.value = '';
        } 

        newTask.focus();
    };

    const init = () => {
        const formElement = document.querySelector('.js-form');
        formElement.addEventListener('submit', onFormSubmit);
        render();
    };

    init();
};