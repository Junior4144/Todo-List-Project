import "./styles.css"
import {header, sidebar, content_container, project_tabs, retrieveData} from "../src/page-load.js"



sidebar();
header();
retrieveData('project');