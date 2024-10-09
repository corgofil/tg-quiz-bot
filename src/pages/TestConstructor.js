import React, { useState } from 'react';
import './TestConstructor.css';
import './style.css'

const TestConstructor = () => {
  const [testTitle, setTestTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', answers: ['', ''] }
  ]);

  // Обработчики изменения
  const handleTitleChange = (e) => {
    setTestTitle(e.target.value);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex] = value;
    setQuestions(newQuestions);
  };

  // Добавление вопросов и ответов
  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', answers: ['', ''] }]);
  };

  const addAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push('');
    setQuestions(newQuestions);
  };

  // Сохранение данных (валидация + вывод в консоль)
  const saveTest = () => {
    // Проверяем, что все поля заполнены
    if (!testTitle) {
      alert('Please enter the test title.');
      return;
    }
    
    for (const question of questions) {
      if (!question.questionText) {
        alert('Please fill out all the questions.');
        return;
      }
      for (const answer of question.answers) {
        if (!answer) {
          alert('Please fill out all the answers.');
          return;
        }
      }
    }
    
    // Выводим данные теста в консоль (можно заменить на API-запрос или другое действие)
    console.log({
      testTitle,
      questions
    });
    alert('Test saved successfully!');
  };

  return (
    <div className="constructor">
      <div className="constructor_wrapper">
        <h2 className="editor_title">Создание теста</h2>
        
        {/* Поле для ввода темы теста */}
        <div className="field test_question">
          <label>Название темы:</label>
          <input 
            type="text" 
            value={testTitle} 
            onChange={handleTitleChange} 
            placeholder="Введите название темы" 
          />
        </div>

        {/* Динамическое добавление вопросов */}
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="test_question">
            <label>Вопрос {qIndex + 1}:</label>
            <input 
              type="text" 
              value={question.questionText} 
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)} 
              placeholder="Введите вопрос" 
            />
            
            {/* Динамическое добавление вариантов ответа */}
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className="answer-block">
                <label>Ответ {aIndex + 1}:</label>
                <input 
                  type="text" 
                  value={answer} 
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)} 
                  placeholder="Введите ответ" 
                />
              </div>
            ))}

            {/* Кнопка для добавления варианта ответа */}
            <button className="new_test" onClick={() => addAnswer(qIndex)}>
              Добавить ответ
            </button>
          </div>
        ))}

        {/* Кнопка для добавления нового вопроса */}
        <button className="btn_test_editor btn_state" onClick={addQuestion}>
          Добавить вопрос
        </button>

        {/* Кнопка для сохранения */}
        <button className="save-btn" onClick={saveTest}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default TestConstructor;
