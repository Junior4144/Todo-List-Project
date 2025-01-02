import { todo as todoObject, content_container} from './page-load';

export function edit_task_form(todo, project) {
    //bleed background
    //absolute
    //builds form that creates a project
    const body = document.body;
    body.style.position = 'relative';
    const form_container = document.createElement('div');
    form_container.classList.add('form-container');

    const task_form = document.createElement('form');

    // Title 
    const title_container = document.createElement('div');

    const title = document.createElement('div');
    title.textContent = "Edit task:";

    title_container.appendChild(title);

    // task details
    const task_details_container = document.createElement('div');
    task_details_container.classList.add('task-details-container');

    // Name
    const tasks_name_label = document.createElement('label');
    tasks_name_label.textContent = "Name: ";
    tasks_name_label.htmlFor = 'task-name';

    const task_name_input = document.createElement('input')
    task_name_input.id = "task-name";
    task_name_input.value = todo.getTitle();

    //Description
    const tasks_description_label = document.createElement('label');
    tasks_description_label.textContent = "Description: ";
    tasks_description_label.htmlFor = 'task-description';

    const task_description_input = document.createElement('input')
    task_description_input.id = "task-description";
    task_description_input.value = todo.getDescription();

    //due date
    const tasks_dueDate_label = document.createElement('label');
    tasks_dueDate_label.textContent = "Due Date: ";
    tasks_dueDate_label.htmlFor = 'task-dueDate';
    

    const task_dueDate_input = document.createElement('input')
    task_dueDate_input.id = "task-dueDate";
    task_dueDate_input.placeholder = "yyyy-MM-dd";
    task_dueDate_input.value = todo.getDueDate();



    //priority
    const tasks_priority_label = document.createElement('label');
    tasks_priority_label.textContent = "Priority: ";
    tasks_priority_label.htmlFor = 'task-priority';

    const task_priority_input = document.createElement('input')
    task_priority_input.id = "task-priority";
    task_priority_input.placeholder = "low | high";
    task_priority_input.value = todo.getPriority();


    

    task_details_container.appendChild(tasks_name_label);
    task_details_container.appendChild(task_name_input);

    task_details_container.appendChild(tasks_description_label);
    task_details_container.appendChild(task_description_input);

    task_details_container.appendChild(tasks_dueDate_label);
    task_details_container.appendChild(task_dueDate_input);
    
    task_details_container.appendChild(tasks_priority_label);
    task_details_container.appendChild(task_priority_input);


    
    // Button container
    const task_btn_container = document.createElement('div');
    task_btn_container.classList.add('btn-container');

    //submit btn
    const submit_task_btn = document.createElement('button');
    submit_task_btn.classList.add('submit-btn');
    submit_task_btn.classList.add('task-btn');
    submit_task_btn.textContent = 'submit';
    
    
    submit_task_btn.addEventListener('click', (event) =>{
        event.preventDefault();

        const form_container = document.querySelector('.form-container');
        body.style.position = 'static';
        

        const form_name = document.getElementById('task-name').value;
        const form_description = document.getElementById('task-description').value;
        const form_dueDate = document.getElementById('task-dueDate').value;
        const form_priority = document.getElementById('task-priority').value;
        

        const newTaskItem = new todoObject(form_name, form_description, form_dueDate, form_priority);
    
        project.deleteAndReplace(todo, newTaskItem);
        console.log(project.getArr());

        const main_content = document.querySelector('.content-container')
        main_content.innerHTML = '';
        content_container(project);

        

        body.removeChild(form_container);

        
    });

    //cancel button
    const cancel_task_btn = document.createElement('button');
    cancel_task_btn.classList.add('cancel-btn');
    cancel_task_btn.classList.add('task-btn');
    cancel_task_btn.textContent = 'cancel';

    cancel_task_btn.addEventListener('click', (event) =>{
        event.preventDefault();
        const body = document.body;
        const form_container = document.querySelector('.form-container')
        body.removeChild(form_container);
    });

    task_btn_container.appendChild(cancel_task_btn);
    task_btn_container.appendChild(submit_task_btn);
   

    task_form.appendChild(title_container);

    task_form.appendChild(task_details_container);
    
    task_form.appendChild(task_btn_container);
    form_container.appendChild(task_form)
    body.appendChild(form_container);
    
}