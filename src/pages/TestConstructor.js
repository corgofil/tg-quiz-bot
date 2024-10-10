import React, { useState } from 'react';
import axios from 'axios';
import './TestConstructor.css';
import './style.css';

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

  // Сохранение данных
  const saveTest = async () => {
    // Проверяем, что все поля заполнены
    if (!testTitle) {
      alert('Пожалуйста, введите название теста.');
      return;
    }
    
    for (const question of questions) {
      if (!question.questionText) {
        alert('Пожалуйста, заполните все вопросы.');
        return;
      }
      for (const answer of question.answers) {
        if (!answer) {
          alert('Пожалуйста, заполните все ответы.');
          return;
        }
      }
    }

    try {
      const creator_id = '87869c3a-9eb1-4985-b7af-65242e90a271'; // Убедитесь, что здесь используется правильный id
      // 1. Сначала сохраняем название темы и получаем test_id
      const testResponse = await axios.post(`http://localhost:8001/api/v1/test_lessons/create_test/${creator_id}`, { title: testTitle });
      const test_id = testResponse.data.id; // Предположим, в ответе есть поле id с идентификатором теста

      // 2. Затем сохраняем вопросы
      const questionIds = [];

      for (const question of questions) {
        const questionResponse = await axios.post(`http://localhost:8001/api/v1/test_lessons/question/${test_id}`, { text: question.questionText });
        const question_id = questionResponse.data.id;
        console.log(questionResponse.data)
        questionIds.push(question_id);
      }

      console.log("Созданные question_ids: ", questionIds); // Для отладки

        // 3. И наконец, сохраняем ответы
      for (const question_id of questionIds) {
        const qIndex = questionIds.indexOf(question_id); // Находим индекс текущего question_id

        await Promise.all(questions[qIndex].answers.map(async (answer) => {
        await axios.post(`http://localhost:8001/api/v1/test_lessons/answer/${question_id}`, { text: answer });
        }));
      }

      alert('Тест успешно сохранен!');
    } catch (error) {
      console.error('Ошибка при сохранении теста:', error);
      alert('Произошла ошибка при сохранении теста.');
    }
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
