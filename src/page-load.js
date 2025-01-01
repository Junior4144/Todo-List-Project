
//Contains DOM

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

    list_item.addEventListener('click', () =>{
        
    });

    
    sidebar_list_container.appendChild(list_item);

    sidebar.appendChild(sidebar_header_container);
    sidebar.appendChild(sidebar_list_container);
}

export function header(){
    const header = document.querySelector('.header');

}

export function content_container(){

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
        const project_name = form_details.value;
        
        const list_container = document.querySelector('.list-container');
        
        const item = document.createElement('div');
        item.textContent = project_name;

        list_container.appendChild(item);

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

