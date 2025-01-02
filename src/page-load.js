import { format } from "date-fns";
import { edit_task_form } from "./forms";
import trashImg from "./assets/trash-can.svg"
import empty_circle from "./assets/circle-outline.svg"
import check_circle from "./assets/check-circle-outline.svg"

//Contains DOM

//create a factory
const project_tabs = (() => { 
    //an array of projects
    let projects_arr = [];


    const update_project_arr = (project) =>{
        projects_arr.push(project);
        project.setIndex(getArrLength() -1);
    }
    const delete_project_arr = (project) =>{
        projects_arr.splice(project.getIndex(), 1);
        resetIndexes();
    };
    const getArr = () => {
        return projects_arr;
    }
    const getArrLength = () => {
        return projects_arr.length;
    }
    const resetIndexes = () =>{
        for (let index = 0; index < projects_arr.length; index++) {
            projects_arr[index].setIndex(index);
        
        }
    }

    const defaultProject = new project("default project");
    update_project_arr(defaultProject);

    const defaultProject2 = new project("default project 2");
    update_project_arr(defaultProject2);

    const todoItem1 = new todo("default todo", "default description", "2025-01-01", "high");
    defaultProject.update_todo_arr(todoItem1);

    const todoItem2 = new todo("default todo 2", "default description 2", "2025-02-02", "low");
    defaultProject.update_todo_arr(todoItem2);
  
    

    return{
        update_project_arr,
        delete_project_arr,
        resetIndexes,
        getArr,
        getArrLength
    }

})();
//project object
function project(title){
    //array of todos
    let todo_arr = [];

    this.title = title;
    this.index = 0;

    const update_todo_arr = (todo) => {
        todo_arr.push(todo);

        todo.setIndex(arr_size()-1);
    }
    const deleteFromArr = (todo) => {
        //add an index of location to each todo, with index splice from arr
        todo_arr.splice(todo.getIndex(), 1);
        resetIndexes();
    }
    const deleteAndReplace = (todo, newTodo) => {
        //add an index of location to each todo, with index splice from arr
        todo_arr.splice(todo.getIndex(), 1, newTodo);
        resetIndexes();
    }
    const resetIndexes = () =>{
        for (let index = 0; index < todo_arr.length; index++) {
            todo_arr[index].setIndex(index);
        
        }
    }
    const arr_size = () =>{

        return todo_arr.length;
    }
    const getTitle = () =>{
        return title;
    }
    const getArr = () =>{
        return todo_arr;
    }
    const setIndex = (index) =>{
        this.index = index;
    }
    const getIndex = () =>{
        return this.index;
    }

    return{
        update_todo_arr,
        getTitle,
        getArr,
        deleteFromArr,
        arr_size,
        resetIndexes,
        setIndex,
        getIndex,
        deleteAndReplace
    }
    
};

export function todo(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.index = 0;
    this.rawDueDate = dueDate;
    const arr1 = dueDate.split("-");

    const date = new Date(arr1[0],arr1[1],arr1[2]); // dueDate MM-dd-yyyy
    console.log(date)
    this.dueDate = format(date, "MM/dd/yyyy");
    
    const getTitle = (() =>{
        return this.title;
    });
    const getDescription = (() =>{
        return this.description;
    });
    const getDueDate = (() =>{
        
        return this.dueDate;
    });
    const getRawDueDate = (() =>{
        
        return this.rawDueDate;
    });
    const getPriority = (() =>{
        return this.priority;
    });
    const setIndex = ((index) =>{
        this.index = index;
    })
    const getIndex = () =>{
        return this.index;
    }

    const setTitle = (title) =>{
        this.title = title;
    }
    const setDescription = (description) =>{
        this.description = description;
    }
    const setPriority = (priority) =>{
        this.priority = priority;
    }
    const setDueDate = (dueDate) =>{
        
        this.dueDate = dueDate;
    }

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        setIndex,
        getIndex,
        setTitle,
        setDescription,
        setPriority,
        setTitle,
        setDueDate,
        getRawDueDate
    }
};
    

export function header(){
    const header = document.querySelector('.header-left');
    
    const header_title = document.createElement('div');
    header_title.classList.add('main_header_title')
    header_title.textContent = "Todo-List"
    header.appendChild(header_title);


}

export function content_container(project){

    const main_content_container = document.querySelector('.content-container');
    //header
    const content_header = document.createElement('div');
    content_header.classList.add('content-header');

    const content_task_list = document.createElement('div');
    content_task_list.classList.add('content-task-list');



    const header_title = document.createElement('div');
    header_title.classList.add('header-title');
    header_title.textContent = project.getTitle();

    content_header.appendChild(header_title);

    //content todo
    const allTodo = project.getArr();

    allTodo.forEach(todo => {
        

        const todo_container = document.createElement('div');
        todo_container.classList.add('todo-container')

        const todo_left_side = document.createElement('div');
        todo_left_side.classList.add('todo-left-side');
        const todo_right_side = document.createElement('div');
        todo_right_side.classList.add('todo-right-side');

        const todo_left = document.createElement('div');
        todo_left.classList.add('todo-left');

        const indicator_btn = document.createElement('img');
        indicator_btn.src = empty_circle;
        todo_left.appendChild(indicator_btn);

        indicator_btn.addEventListener('click', () =>{
            indicator_btn.src = check_circle;
            const content = document.querySelector('.content-container');
            content.innerHTML = '';

            project.deleteFromArr(todo);
            content_container(project);
            
        });

        indicator_btn.addEventListener('mouseover', () =>{
            indicator_btn.src = check_circle;
        });
        indicator_btn.addEventListener('mouseleave', () =>{
            indicator_btn.src = empty_circle;
        });


        const todo_right = document.createElement('div');
        todo_right.classList.add('todo-right');

        todo_right.addEventListener('click', () =>{
            edit_task_form(todo, project);
        });

        const todo_title = document.createElement('div');
        todo_title.textContent = todo.getTitle();

        const todo_description = document.createElement('div');
        todo_description.textContent = todo.getDescription();

        const todo_date = document.createElement('div');
        todo_date.textContent = todo.getDueDate();



        const todo_priority = todo.getPriority();

        if (todo_priority.toLowerCase() == 'high'){
            indicator_btn.style.border = "3px solid red";
        }
        else if(todo_priority.toLowerCase() == 'low'){
            indicator_btn.style.border = "3px solid blue"
        }

        
        
        const todo_delete = document.createElement('img');
        todo_delete.src = trashImg;
        
        todo_delete.addEventListener('click', () =>{
            const content = document.querySelector('.content-container');
            content.innerHTML = '';

            project.deleteFromArr(todo);
            content_container(project);
        });

        todo_right_side.appendChild(todo_delete);

        todo_right.appendChild(todo_title);
        todo_right.appendChild(todo_description);
        todo_right.appendChild(todo_date);
        

        todo_left_side.appendChild(todo_left);
        todo_left_side.appendChild(todo_right);

        todo_container.appendChild(todo_left_side);
        todo_container.appendChild(todo_right_side);
        

        content_task_list.appendChild(todo_container);

    });

    const add_task_container = document.createElement('div');
    add_task_container.classList.add('add-todo-container');
    
    const add_task_title = document.createElement('div');
    add_task_title.textContent = "+ add task";

    add_task_container.addEventListener('click', () =>{
        add_task_form(project);
    });



    add_task_container.appendChild(add_task_title);

    
    content_task_list.appendChild(add_task_container)



    main_content_container.appendChild(content_header);
    main_content_container.appendChild(content_task_list);
}

export function sidebar(){


    const main_sidebar = document.querySelector('.sidebar');

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

    
    const project_arr = project_tabs.getArr();

    project_arr.forEach(current_project => {
        const list_item = document.createElement('div');
        list_item.classList.add("list-item");
    
        const list_item_title = document.createElement('div');
        list_item_title.textContent = current_project.getTitle();
    
        const delete_item_btn = document.createElement('img');
        delete_item_btn.src = trashImg;

        delete_item_btn.addEventListener('click', () =>{

            main_sidebar.innerHTML = '';

            project_tabs.delete_project_arr(current_project);

            sidebar();
            
            const project_arr = project_tabs.getArr();
            

            if (project_arr.length < 1){
                const temp_content = document.querySelector('.content-container');
                temp_content.innerHTML = '';
            }
            else{
                
                const content = document.querySelector('.content-container');
                if(!content.innerHTML == ''){
                    content.innerHTML = '';

                    content_container(project_arr[project_arr.length-1]);
                    console.log(project_arr[project_arr.length-1].getTitle());
                    console.log("change");
                }
 
            }
            
            
        });

        list_item_title.addEventListener('click', () =>{
            const content = document.querySelector('.content-container');
            content.innerHTML = '';
            
            content_container(current_project);
    
        });
    
        list_item.appendChild(list_item_title);
        list_item.appendChild(delete_item_btn);
        sidebar_list_container.appendChild(list_item);
    });
    
    main_sidebar.appendChild(sidebar_header_container);
    main_sidebar.appendChild(sidebar_list_container);
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
        project_tabs.update_project_arr(projectItem);

        const list_container = document.querySelector('.list-container');
        
        const list_item = document.createElement('div');
        list_item.classList.add("list-item");

        const list_item_title = document.createElement('div');
        list_item_title.textContent = projectItem.getTitle();
    
        const delete_item_btn = document.createElement('button');
        delete_item_btn.textContent = "delete";

        delete_item_btn.addEventListener('click', () =>{
            const main_sidebar = document.querySelector('.sidebar');
            main_sidebar.innerHTML = '';
            
            project_tabs.delete_project_arr(projectItem);
            sidebar();
        });


        list_item.addEventListener('click', () =>{
            const content = document.querySelector('.content-container');
            content.innerHTML = '';
            
            content_container(projectItem);
    
        });

        list_item.appendChild(list_item_title);
        list_item.appendChild(delete_item_btn);

        list_container.appendChild(list_item);

        

        body.removeChild(form_container);

        
    });

    //cancel button
    const cancel_project_btn = document.createElement('button');
    cancel_project_btn.classList.add('cancel-btn');
    cancel_project_btn.classList.add('project-btn');
    cancel_project_btn.type = 'button';
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






function add_task_form(current_project){
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
    title.textContent = "Add Task:";

    title_container.appendChild(title);

    // task details
    const task_details_container = document.createElement('div');
    task_details_container.classList.add('task-details-container')
    // Name
    const tasks_name_label = document.createElement('label');
    tasks_name_label.textContent = "Name: ";
    tasks_name_label.htmlFor = 'task-name';

    const task_name_input = document.createElement('input')
    task_name_input.id = "task-name";

    //Description
    const tasks_description_label = document.createElement('label');
    tasks_description_label.textContent = "Description: ";
    tasks_description_label.htmlFor = 'task-description';

    const task_description_input = document.createElement('input')
    task_description_input.id = "task-description";

    //due date
    const tasks_dueDate_label = document.createElement('label');
    tasks_dueDate_label.textContent = "Due Date: ";
    tasks_dueDate_label.htmlFor = 'task-dueDate';

    const task_dueDate_input = document.createElement('input')
    task_dueDate_input.id = "task-dueDate";
    task_dueDate_input.placeholder = "yyyy-MM-dd";
    task_dueDate_input.type = 'date';
    task_dueDate_input.required = true;



    //priority
    const tasks_priority_label = document.createElement('label');
    tasks_priority_label.textContent = "Priority: ";
    tasks_priority_label.htmlFor = 'task-priority';

    const task_priority_input = document.createElement('input')
    task_priority_input.id = "task-priority";
    task_priority_input.placeholder = "low | high | none";
    task_priority_input.setAttribute('list', 'task-priority-types');

    const task_priority_input_datalist = document.createElement('DATALIST');
    task_priority_input_datalist.id = 'task-priority-types';

    
    const priority_High = document.createElement('option');
    priority_High.textContent = 'High';

    const priority_Low = document.createElement('option');
    priority_Low.textContent = 'Low';

    const priority_None = document.createElement('option');
    priority_None.textContent = 'None';

    task_priority_input_datalist.appendChild(priority_High);
    task_priority_input_datalist.appendChild(priority_Low);
    task_priority_input_datalist.appendChild(priority_None);

    

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

        
       

        const form_container = document.querySelector('.form-container');
        body.style.position = 'static';
        

        const form_name = document.getElementById('task-name').value;
        const form_description = document.getElementById('task-description').value;
        const form_dueDate = document.getElementById('task-dueDate').value;
        const form_priority = document.getElementById('task-priority').value;
        
        if (form_dueDate ==''){
            event.preventDefault();
        }
        else{
            event.preventDefault();
            const taskItem = new todo(form_name, form_description, form_dueDate, form_priority);
        
            current_project.update_todo_arr(taskItem);
            console.log(current_project.getArr());

            const main_content = document.querySelector('.content-container')
            main_content.innerHTML = '';
            content_container(current_project);

            

            body.removeChild(form_container);
        }
        

        
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