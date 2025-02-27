import "./style.css";
import {NavLink} from "react-router-dom";

const Header = () => {
    return ( 
        <header className="header">
            <div className="header__wrapper">
                <h1 className="header__title">
                    <strong>Привет, я <em><br/>tg-quiz-bot</em></strong>
                </h1>
                <div className="header__text">
                    <p>Этот бот предназначен для разработки тестов по различным дисциплинам с целью проверки знаний студентов</p>
                </div>
                <div className="btn__wrapper">
                    <a href="#!" className="btn">Профиль</a>
                    <NavLink to="/editor" className="btn">Редактор тестов</NavLink>
                    <NavLink to="/students" className="btn">Студенты</NavLink>
                </div>
            </div>
        </header>
    );
}
 
export default Header;