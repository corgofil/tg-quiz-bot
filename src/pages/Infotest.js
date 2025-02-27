import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import arrow from "./../img/left-arrow.svg";

const Infotest = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://45.8.96.215:8001/api/v1/test_lessons/test/${id}`);
                setTest(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Ошибка загрузки теста:", error);
            }
        };

        fetchTest();
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (!test) return <p>Ошибка загрузки теста.</p>;

    return (
        <main className="info_test_wrapper">
            <div className="container">
                <div className="test_nav">
                    <Link to="/editor">
                        <img className="arrow" src={arrow} alt="Вернуться назад"/>
                    </Link>
                    <Link to={`/editor/edit_test/${id}`} className="btn_test_editor">Редактировать</Link>
                </div>
                <div className="test">
                    <div className="test_title">{test.title}</div>
                    <div className="info_test">
                        <div className="info_point">Автор: {test.teacher?.name} {test.teacher?.last_name}</div>
                        <div className="info_point">{new Date(test.created_at).toLocaleDateString()}</div>
                        <div className="info_point">ID: {test.id}</div>
                    </div>
                    <Link to={`/editor/stats/${id}`} className="btn_test_editor btn_state">Статистика</Link>
                    <div className="test_text">
                        {test.questions.map((question, index) => (
                            <div className="test_question" key={index}>
                                <div className="test_question_text">{index + 1}. {question.text}</div>
                                <div className="test_answers">
                                    {question.answers.map((answer) => (
                                        <div key={answer.id} className="test_answer">
                                            ● {answer.text} {answer.correct ? "(✔)" : ""}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Infotest;
