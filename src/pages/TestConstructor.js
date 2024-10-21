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
      const creator_id = '87869c3a-9eb1-4985-b7af-65242e90a271'; // Убедитесь, что здесь используется правильный id
      const testResponse = await axios.post(`http://localhost:8001/api/v1/test_lessons/create_test/${creator_id}`, { title: testTitle });
      const test_id = testResponse.data.id; 

      const questionIds = [];
      for (const question of questions) {
        const questionResponse = await axios.post(`http://localhost:8001/api/v1/test_lessons/question/${test_id}`, 
          { text: question.questionText });
        const question_id = questionResponse.data.id;
        questionIds.push(question_id);

        // Сохраняем правильный ответ
        await axios.post(`http://localhost:8001/api/v1/test_lessons/answer/${question_id}`, {
          answerIndex: question.correctAnswer
        });

        // Загрузка изображения
        if (question.image) {
          const formData = new FormData();
          formData.append('image', question.image);
          await axios.post(`http://localhost:8001/api/v1/test_lessons/upload_image/${question_id}`, formData);
        }
      }

      for (const question_id of questionIds) {
        const qIndex = questionIds.indexOf(question_id);
        
        await Promise.all(
          questions[qIndex].answers.map(async (answer, aIndex) => {
            const isCorrect = aIndex === questions[qIndex].correctAnswer; // Проверяем, является ли этот ответ правильным
            await axios.post(`http://localhost:8001/api/v1/test_lessons/answer/${question_id}`, { 
              text: answer, 
              correct: isCorrect  // Отправляем флаг правильности ответа
            });
          })
        );
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
