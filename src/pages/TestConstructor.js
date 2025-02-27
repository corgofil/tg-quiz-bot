import React, { useState } from 'react';
import axios from 'axios';
import './TestConstructor.css';
import './style.css';

const TestConstructor = () => {
  const [testTitle, setTestTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', answers: ['', ''], correctAnswer: 0, image: null }
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

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleImageUpload = (qIndex, file) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].image = file;
    setQuestions(newQuestions);
  };

  // Добавление вопросов и ответов
  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', answers: ['', ''], correctAnswer: 0, image: null }]);
  };

  const addAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push('');
    setQuestions(newQuestions);
  };

  // Удаление вопроса
  const deleteQuestion = (qIndex) => {
    const newQuestions = questions.filter((_, index) => index !== qIndex);
    setQuestions(newQuestions);
  };

  // Удаление ответа
  const deleteAnswer = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers = newQuestions[qIndex].answers.filter((_, index) => index !== aIndex);
    setQuestions(newQuestions);
  };

  // Сохранение данных
  const saveTest = async () => {
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
        const creator_id = '86beac1a-d9e9-4e65-9d6a-bb4c1e22ca35';
        
        // Создание теста
        const testResponse = await axios.post(
            `http://45.8.96.215:8001/api/v1/test_lessons/create_test/${creator_id}`, 
            { title: testTitle }
        );
        const test_id = testResponse.data.id;

        if (!test_id) {
            console.error("Ошибка: test_id не получен!");
            return;
        }

        const questionIds = [];

        // Создание вопросов
        for (const question of questions) {
            try {
                console.log(`Отправка вопроса: ${question.questionText} для test_id ${test_id}`);

                const questionResponse = await axios.post(
                    `http://45.8.96.215:8001/api/v1/question/${test_id}`,
                    { text: question.questionText },
                    { headers: { "Content-Type": "application/json" } }
                );

                const question_id = questionResponse.data.id;
                console.log(`Вопрос создан с ID: ${question_id}`);
                questionIds.push(question_id);

            } catch (error) {
                console.error("Ошибка при создании вопроса:", error.response ? error.response.data : error.message);
            }
        }

        // Создание ответов для каждого вопроса
        for (const [qIndex, question_id] of questionIds.entries()) {
          for (const [aIndex, answer] of questions[qIndex].answers.entries()) {
              const answerPayload = {
                  id: crypto.randomUUID(),  // Генерация UUID, если API требует
                  text: answer,
                  correct: aIndex === questions[qIndex].correctAnswer,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  active: true
              };
      
              console.log("Отправка ответа:", answerPayload); // Лог для проверки
      
              try {
                  await axios.post(
                      `http://45.8.96.215:8001/api/v1/answers/answer/${question_id}`,
                      answerPayload,
                      { headers: { "Content-Type": "application/json" } }
                  );
              } catch (error) {
                  console.error("Ошибка при создании ответа:", error.response ? error.response.data : error.message);
              }
          }
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
        
        <div className="field test_question">
          <label>Название темы:</label>
          <input 
            type="text" 
            value={testTitle} 
            onChange={handleTitleChange} 
            placeholder="Введите название темы" 
          />
        </div>

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
                  className="answer-input"
                />
                <button 
                  onClick={() => deleteAnswer(qIndex, aIndex)}
                  className="delete-button btn_answer">
                  ✖
                  </button>
              </div>
            ))}
            <button className="btn_custom" onClick={() => addAnswer(qIndex)}>
              Добавить ответ
            </button>

            {/* Выбор правильного ответа через селектор */}
            <div>
              <label>Выберите правильный ответ:</label>
              <select 
                value={question.correctAnswer} 
                onChange={(e) => handleCorrectAnswerChange(qIndex, Number(e.target.value))}
              >
                {question.answers.map((_, aIndex) => (
                  <option key={aIndex} value={aIndex}>Ответ {aIndex + 1}</option>
                ))}
              </select>
            </div>

            {/* Загрузка изображения */}
            <div>
              <label>Загрузить изображение:</label>
              
              <label class="btn_custom">
                Выберите файл
                <input 
                  type="file" 
                  accept="image/*"
                  className="image-upload-btn"
                  onChange={(e) => handleImageUpload(qIndex, e.target.files[0])}
                />
              </label>
              
              {question.image && <p>Изображение загружено: {question.image.name}</p>}
            </div>


            <button 
              className="delete-button btn_question" 
              onClick={() => deleteQuestion(qIndex)}>
              ✖</button>
          </div>
        ))}

        <div className="btns_ender">
          <button className="btn_custom btn_state" onClick={addQuestion}>
            Добавить вопрос
          </button>

          <button className="btn_custom btn_state" onClick={saveTest}>
            Сохранить
          </button>
        </div>

      </div>
    </div>
  );
};

export default TestConstructor;
