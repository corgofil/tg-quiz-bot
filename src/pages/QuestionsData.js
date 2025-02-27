import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const QuestionsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://45.8.96.215:8001/api/v1/test_lessons/all_tests', {
          headers: {
            'ngrok-skip-browser-warning': '69420'
          }
        });
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="tests_wrapper">
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="questions_block">
            {data.map((item) => (
              <Link key={item.id} to={`/editor/info_test/${item.id}`}>
                <div key={item.id}  className="test">
                  <p className="test_name">{item.title}</p>
                  {item.teacher && (
                    <p className="test_author">Автор: {item.teacher.name}</p>
                  )}
                  {item.teacher && (
                    <p className="test_date">{item.teacher.created_at}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default QuestionsData;