{
    const tasksArray = [
        {
            content: 'Example 1',
            done: false,
        },
        {
            content: 'Example 2',
            done: true,
        },
    ];

    const removeTask = (taskIndex) => {
        tasksArray.splice(taskIndex, 1);
        render();
    }

    const toogleTask = (taskIndex) => {
        tasksArray[taskIndex].done = !tasksArray[taskIndex].done;
        render();
    }

    const addTask = (newTaskContent) => {
        tasksArray.push({content: newTaskContent});
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
    
    const render = () => {
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