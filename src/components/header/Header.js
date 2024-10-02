import "./style.css"

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
                    <a href="#!" className="btn">Редактор тестов</a>
                    <a href="#!" className="btn">Студенты</a>
                </div>
            </div>
        </header>
    );
}
 
export default Header;