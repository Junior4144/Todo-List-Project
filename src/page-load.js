
//Contains DOM

export function sidebar(){
    const sidebar = document.querySelector('.sidebar');

    const sidebar_project_title = document.createElement('div');
    sidebar_project_title.classList.add('sidebar-project-list');
    sidebar_project_title.textContent = "My Projects";


    sidebar.appendChild(sidebar_project_title);
}

export function header(){

}

export function content_container(){

}

