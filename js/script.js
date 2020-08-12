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

    const render = () => {
        let stringElement = "";
        
        for (const task of tasksArray) {
            stringElement += `
            <li class="tasks__item">
                <button class="tasks__button tasks__button--done">
                    <span class="tasks__icon fas fa-check"></span>
                </button>

                <span class="tasks__content">${task.content}</span>

                <button class="tasks__button tasks__button--remove">
                    <span class="tasks__icon fas fa-trash-alt"></span>
                </button>
            </li>
        `;
        }
        document.querySelector('.js-tasks').innerHTML = stringElement;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
    };

    const init = () => {
        const formElement = document.querySelector('.js-form');
        formElement.addEventListener('submit', onFormSubmit);
        render();
    };

    init();
};