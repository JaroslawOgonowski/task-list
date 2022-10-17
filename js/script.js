{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
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

    const render = () => {
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

        bindEvents();

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