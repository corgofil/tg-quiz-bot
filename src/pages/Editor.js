import "./style.css"

import {NavLink} from "react-router-dom";

const Editor = () => {
    return ( 
        <main className="editor">
            <div className="header__wrapper">
                <div className="editor_title">Список всех тестов</div>
                <container className="tests_wrapper">
                    <NavLink to="/editor/creator" className="new_test">
                        Создать новый тест
                    </NavLink>
                    <NavLink to="/editor/info_test" className="test">
                        <div className="test_name">Сетевые помехоподавляющие пассивные фильтры низких и высоких частот</div>
                        <div className="test_author">Автор: Макарян А.С.</div>
                        <div className="test_date">30.09.24</div>
                    </NavLink>
                </container>
            </div>
        </main>
    );
}
 
export default Editor;