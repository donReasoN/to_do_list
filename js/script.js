{
    let tasksArray = [
      
    ];

    const removeTask = (taskIndex) => {
        tasksArray = [
            ...tasksArray.slice(0, taskIndex),
            ...tasksArray.slice(taskIndex + 1),
        ];
        render();
    };

    const toogleTask = (taskIndex) => {
        tasksArray = [
            ...tasksArray.slice(0, taskIndex),
            {...tasksArray[taskIndex],
                done: !tasksArray[taskIndex].done,
            },
            ...tasksArray.slice(taskIndex + 1),
        ];
        render();
    }

    const addTask = (newTaskContent) => {
        tasksArray = [
            ...tasksArray,
            { content: newTaskContent},
        ];
        render();
    }

    const bindToogleEvents = () => {
        const toogleButtons = document.querySelectorAll('.js-done');

        toogleButtons.forEach((toogleButton, taskIndex) => {
            toogleButton.addEventListener('click', () => {
                toogleTask(taskIndex);
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
    
    const renderTasks = () => {
        let taskStringElement = "";
        
        for (const task of tasksArray) {
            taskStringElement += `
            <li class="tasks__item">
                <button class="tasks__button tasks__button--done js-done">
                    <span class="tasks__icon ${task.done ? "fas fa-check" : ""}"></span>
                </button>

                <span class="tasks__content ${task.done ? "task-content--done" : ""}">${task.content}</span>

                <button class="tasks__button tasks__button--remove js-remove">
                    <span class="tasks__icon fas fa-trash-alt"></span>
                </button>
            </li>
        `;
        };
        document.querySelector('.js-tasks').innerHTML = taskStringElement;
    }

    const renderButtons = () => {
        let buttonsStringElement = "";

        buttonsStringElement += `
            <button class="section__toogleHideTasks">Show completed</button>
            <button class="section__toogleDoneTasks">Complete all</button>
        `;
        document.querySelector('.js-buttons').innerHTML = buttonsStringElement;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToogleEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector('.js-newTask');
        const newTaskContent = newTask.value.trim();

        if(newTaskContent) {
            addTask(newTaskContent);
            newTask.value = '';
        } 
        newTaskContent.focus();
    };

    const init = () => {
        const formElement = document.querySelector('.js-form');
        formElement.addEventListener('submit', onFormSubmit);
        render();
    };

    init();
};