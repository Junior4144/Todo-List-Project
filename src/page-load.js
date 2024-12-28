
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
    })

    sidebar_header_container.appendChild(header_add);
    
    const sidebar_list_container= document.createElement('div');
    sidebar_list_container.classList.add('list_container');

    const list_item = document.createElement('div');
    list_item.classList.add("list-item");
    list_item.textContent = "project 1";

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
    const body = document.body;

    const project_form = document.createElement('form');

    const project_title_label = document.createElement('label');
    project_title_label.textContent = "Project Name:"
    project_title_label.htmlFor = 'project-title';

    const project_title_input = document.createElement('input')
    project_title_input.id = "project-title";

    
    
    project_form.appendChild(project_title_label);
    project_form.appendChild(project_title_input);
    body.appendChild(project_form);
}