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

    const toogleTaskButton = () => {
        const toogleButtons = document.querySelectorAll('.js-done');
        toogleButtons.forEach((toogleButton, taskIndex) => {
            toogleButton.addEventListener('click', () => {
                tasksArray[taskIndex].done = !tasksArray[taskIndex].done;
                render();
            });
        });
    };

    const removeTaskButton = () => {
        const removeButtons = document.querySelectorAll('.js-remove');
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener('click', () => {
                tasksArray.splice(taskIndex, 1);
                render();
            });
        });
    };
    
    const addNewTask = () => {
        
        const newTask = document.querySelector('.js-newTask');
        const newTaskContent = newTask.value;

        if(newTaskContent) {
            tasksArray.push({
                content: newTaskContent,
            });  
        } else {
            return null
        };
        render();
    };

    const render = () => {
        let stringElement = "";
        
        for (const task of tasksArray) {
            stringElement += `
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
        document.querySelector('.js-tasks').innerHTML = stringElement;

        removeTaskButton();
        toogleTaskButton();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        addNewTask();

    };

    const init = () => {
        const formElement = document.querySelector('.js-form');
        formElement.addEventListener('submit', onFormSubmit);
        render();
    };

    init();
};