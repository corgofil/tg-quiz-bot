import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";

const QuestionsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/v1/test_lessons/all_tests', {
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
    <main className="creator">
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data.map((item) => (
              <NavLink key={item.id} to={{
                pathname: "/editor/info_test",
                state: { testData: item } 
              }}>
                <div key={item.id}  className="test">
                  <p className="test_name">{item.title}</p>
                  {item.teacher && (
                    <p className="test_author">Автор: {item.teacher.name}</p>
                  )}
                  {item.teacher && (
                    <p className="test_date">{item.teacher.created_at}</p>
                  )}
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default QuestionsData;
