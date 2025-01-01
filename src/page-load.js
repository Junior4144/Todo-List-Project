
//Contains DOM

//create a factory
const project_tabs = (() => { 
    //an array of projects
    let projects_arr = [];

    const update_project_arr = (project) =>{
        projects_arr.push(project);
        console.log(projects_arr);
    }
    return{
        update_project_arr
    }

})();
//project object
function project(title){
    //array of todos
    let todo_arr = [];

    this.title = title;

    const update_todo_arr = (todo) => {
        todo_arr.push(todo);
        console.log(todo_arr);
    }
    const getTitle = () =>{
        return title;
    }
    const getArr = () =>{
        return todo_arr;
    }
    return{
        update_todo_arr,
        getTitle,
        getArr
    }
};

function todo(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    
    const getTitle = (() =>{
        return title;
    });
    const getDescription = (() =>{
        return description;
    });
    const getDueDate = (() =>{
        return dueDate;
    });
    const getPriority = (() =>{
        return priority;
    });
    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority
    }
};
    

export function header(){
    const header = document.querySelector('.header');

}

export function content_container(project){
    const content_container = document.querySelector('.content-container');
    //header
    const content_header = document.createElement('div');
    content_header.classList.add('content-header');

    const content_task_list = document.createElement('div');
    content_task_list.classList.add('content-task-list');

    const header_title = document.createElement('div');
    header_title.textContent = project.getTitle();

    content_header.appendChild(header_title);

    //content todo
    const allTodo = project.getArr();

    allTodo.forEach(todo => {
        const todo_container = document.createElement('div');
        todo_container.classList.add('todo-container')

        const todo_left = document.createElement('div');
        todo_left.classList.add('todo-right');

        const indicator_btn = document.createElement('button');
        todo_left.appendChild(indicator_btn);

        const todo_right = document.createElement('div');
        todo_right.classList.add('todo-right');

        const todo_title = document.createElement('div');
        todo_title.textContent = todo.getTitle();

        const todo_description = document.createElement('div');
        todo_description.textContent = todo.getDescription();

        const todo_date = document.createElement('div');
        todo_date.textContent = todo.getDueDate();

        const todo_priority = todo.getPriority();
        if (todo_priority == 'high'){
            indicator_btn.style.border = "3px solid red";
        }
        else{
            //todo_priority == low
            indicator_btn.style.border = "3px solid blue"
        }

        todo_right.appendChild(todo_title);
        todo_right.appendChild(todo_description);
        todo_right.appendChild(todo_date);
        

        todo_container.appendChild(todo_left);
        todo_container.appendChild(todo_right);


        content_task_list.appendChild(todo_container);

    });



    content_container.appendChild(content_header);
    content_container.appendChild(content_task_list);
}

export function sidebar(){
    const sidebar = document.querySelector('.sidebar');

    const sidebar_header_container = document.createElement('div');
    sidebar_header_container.classList.add('sidebar-header-container');
    

    const title = document.createElement('div');
    title.classList.add("sidebar-title");
    title.textContent = "My Projects";

    sidebar_header_container.appendChild(title);

    const header_add = document.createElement('div');
    header_add.classList.add("sidebar_add");
    header_add.textContent = "+";

    header_add.addEventListener('click', () =>{
        // activate from 
        add_project_form();
    });

    sidebar_header_container.appendChild(header_add);
    
    const sidebar_list_container= document.createElement('div');
    sidebar_list_container.classList.add('list-container');

    const list_item = document.createElement('div');
    list_item.classList.add("list-item");
    list_item.textContent = "Default Project";

    const projectItem = new project(list_item.textContent);
    project_tabs.update_project_arr(projectItem);

    const todoItem1 = new todo("default todo", "default description", "01/01", "high");
    projectItem.update_todo_arr(todoItem1);

    const todoItem2 = new todo("default todo 2", "default description 2", "02/02", "low");
    projectItem.update_todo_arr(todoItem2);
    

    list_item.addEventListener('click', () =>{
        const content = document.querySelector('.content-container');
        content.innerHTML = '';
        
        content_container(projectItem);

    });

    
    sidebar_list_container.appendChild(list_item);

    sidebar.appendChild(sidebar_header_container);
    sidebar.appendChild(sidebar_list_container);
}

function add_project_form(){
    //bleed background
    //absolute
    //builds form that creates a project
    const body = document.body;
    body.style.position = 'relative';
    const form_container = document.createElement('div');
    form_container.classList.add('form-container');

    const project_form = document.createElement('form');

    // Title 
    const title_container = document.createElement('div');

    const title = document.createElement('div');
    title.textContent = "Add Project:";

    title_container.appendChild(title);
    // Project details
    const project_details_container= document.createElement('div');


    const project_details_label = document.createElement('label');
    project_details_label.textContent = "Name: ";
    project_details_label.htmlFor = 'project-details';

    const project_details_input = document.createElement('input')
    project_details_input.id = "project-details";

    project_details_container.appendChild(project_details_label);
    project_details_container.appendChild(project_details_input);

    
    // Button container
    const project_btn_container = document.createElement('div');
    project_btn_container.classList.add('btn-container')
    //submit btn
    const submit_project_btn = document.createElement('button');
    submit_project_btn.classList.add('submit-btn');
    submit_project_btn.classList.add('project-btn');
    submit_project_btn.textContent = 'submit';
    
    
    submit_project_btn.addEventListener('click', (event) =>{
        event.preventDefault();

        const form_container = document.querySelector('.form-container');
        body.style.position = 'static';
        

        const form_details = document.getElementById('project-details');

        const projectItem = new project(form_details.value);
        

        const list_container = document.querySelector('.list-container');
        
        const item = document.createElement('div');
        item.textContent = projectItem.getTitle();

        item.addEventListener('click', () =>{
            const content = document.querySelector('.content-container');
            content.innerHTML = '';
            content_container(projectItem);
        });

        list_container.appendChild(item);

        project_tabs.update_project_arr(projectItem);

        body.removeChild(form_container);

        
    });

    //cancel button
    const cancel_project_btn = document.createElement('button');
    cancel_project_btn.classList.add('cancel-btn');
    cancel_project_btn.classList.add('project-btn');
    cancel_project_btn.textContent = 'cancel';

    cancel_project_btn.addEventListener('click', (event) =>{
        event.preventDefault();
        const body = document.body;
        const form_container = document.querySelector('.form-container')
        body.removeChild(form_container);
    });


    project_btn_container.appendChild(cancel_project_btn);
    project_btn_container.appendChild(submit_project_btn);
   

    project_form.appendChild(title_container);

    project_form.appendChild(project_details_container);
    
    project_form.appendChild(project_btn_container);
    form_container.appendChild(project_form)
    body.appendChild(form_container);
}

