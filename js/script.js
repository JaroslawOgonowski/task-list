{
    const tasks = [ //task będzie tablicą złożoną z 2 obiektów
        {// pierwszy obiekt
            content: "nagrać lekcję",
            done: false,
        },
        {// drugi obiekt
            content: "zjeść pierogi",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({//obiekt
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

    const render = () => {//funkcja render ma wyrenderować nowe zadanie żeby było widoczne 
        //i tak: najpierw ustalamy htmlString jako pusty łańcuch nazków, potem dla każdego task w tasks
        //dopiszemy coś w htmlString dzięki += można dopisywać do wartości
        //przy czym każdy htmlString będzie elementem listy z treścią
        //z obiektu task i jego wartością content
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__itemContainer">
                <button class="js-done list__button">${task.done ? "&#10004":""}</button>
                <span class="list__item${task.done ? " list__item--done" : ""}">${task.content}</span>    
                <button class="js-remove list__button list__button--red">&#128465</button>
                 
            </li>
        `;/*tłumaczenie przekreślenia: sprawdza czy wartość done od task jest true czy false jeśli true to skreśla jeśli false to nic nie robi */
    }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
        
    };



    const onFormSubmit = (event) => {
        event.preventDefault();//zwykły preventDefault

        const newTaskContent = document.querySelector(".js-newTask").value.trim();//ustanawia jako newTaskContent wartość formularza z htmla i trimuje czyli usuwa białe znaki z prawej i lewej strony
        console.log(newTaskContent);

        if (newTaskContent === "") {
            return; //jeśli okno jest puste to nic nie robimy
        }
        addNewTask(newTaskContent);
        focusOnSubmit();
        //a jeśli nie jest pusty to chcemy dodać nowe zadanie (czyli nowy obiekt do tablicy):
        //znów wywołujemy funkcję render i to jest w funkcji newTasContent
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);//podczas wysłania formularza odpala się funkcja onFormSubmit
    };

    init();
}