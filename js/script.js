{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex + 1),
        ];

        render();

    };
    const focusOnSubmit = () => {
        const newTask = document.querySelector(".js-newTask")
        newTask.value = "";
        newTask.focus();
        render();
    }
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });


        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };


    const renderButtons = (htmlString) => {
        let subtitleString = "";
        if (htmlString != "") {
            subtitleString +=
                `<h2 class=" main__subtitle--lower js-subtitle">Lista zadań</h2>
                 <button class="main__button">Ukryj zakończone</button><button class="main__button">Ukończ wszystkie</button>` }

        else if (htmlString === "") {
            subtitleString +=
                `<h2 class=" main__subtitle--lower js-subtitle">Lista zadań</h2>`
        };

        document.querySelector(".js-subtitle").innerHTML = subtitleString;
    };

    const renderTask = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__itemContainer">
                <button class="js-done list__button">${task.done ? "&#10004" : ""}</button>
                <span class="list__item${task.done ? " list__item--done" : ""}">${task.content}</span>    
                <button class="js-remove list__button list__button--red">&#128465</button>
                 
            </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;



        renderButtons(htmlString);
    };



    const bindButtonEvents = () => {/**if */ };

    const render = () => {
        renderTask();


        bindEvents();
        bindButtonEvents();

    };



    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        focusOnSubmit();
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}