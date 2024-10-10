import {NavLink} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import arrow from "./../img/left-arrow.svg"

const Infotest = () => {
    const location = useLocation();
    const testData = location.state?.testData; // Получаем переданные данные
    console.log(testData)
    return ( 
        <main className="info_test_wrapper">
            <div className="container">
                <div className="test_nav">
                    <NavLink to="">
                        <img className="arrow" src={arrow} alt="Вернуться назад"/>
                    </NavLink>
                    <NavLink to="" className="btn_test_editor">Редактировать</NavLink>
                </div>
                <div className="test">
                    <div className="test_title">{testData.title}</div>
                    <div className="info_test">
                        <div className="info_point">Автор: {testData.teacher.name}</div>
                        <div className="info_point">{testData.created_at}</div>
                        <div className="info_point">Группы: {testData.teacher.groups}</div>
                    </div>
                    <NavLink to="" className="btn_test_editor btn_state">Статистика</NavLink>
                    <div className="test_text">
                        <div className="test_question">
                            <div className="test_question_text">1. Здесь мог находиться ваш вопрос?</div>
                            <div className="test_answers">
                                <div className="test_answer">● ответ 1</div>
                                <div className="test_answer">● ответ 2</div>
                                <div className="test_answer">● ответ 3</div>
                            </div>
                        </div>
                        <div className="test_question">
                            <div className="test_question_text">2. Здесь мог находиться ваш второй вопрос?</div>
                            <div className="test_answers">
                                <div className="test_answer">● ответ 1</div>
                                <div className="test_answer">● ответ 2</div>
                                <div className="test_answer">● ответ 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default Infotest;