import "./style.css"

import {NavLink} from "react-router-dom";
import QuestionsData from "./QuestionsData";

const Editor = () => {

    return ( 
        
        <main className="editor">
            <div className="content_wrapper">
                <div className="editor_title">Список всех тестов</div>

                <div className="editor_btns_nav">
                    <NavLink to="/editor/constructor" className="new_test">
                            Создать новый тест
                    </NavLink>
                </div>
                
                <QuestionsData/>
            </div>
        </main>
    );
}
 
export default Editor;