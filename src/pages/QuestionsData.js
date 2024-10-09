import axios from 'axios';
import React, { useState, useEffect } from 'react';

const QuestionsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8001/api/v1/test_lessons/all_tests');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="creator">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data.map((item) => (
              <div key={item.id}>
                <h2>{item.title}</h2>
                {item.teacher && (
                  <p>Teacher: {item.teacher.name}</p>
                )}
                {item.teacher && (
                  <p>Role: {item.teacher.role}</p>
                )}
                {item.teacher && (
                  <p>Created at: {item.teacher.created_at}</p>
                )}
                <h3>Questions:</h3>
                <ul>
                  {item.questions && (
                    item.questions.map((question, questionIndex) => (
                      <li key={questionIndex}>
                        <p>{question.text}</p>
                      </li>
                    ))
                  )}
                </ul>
                {item.test_results && (
                  <p>Test results: {item.test_results}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default QuestionsData;
