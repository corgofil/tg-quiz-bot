import React, { useState, useEffect } from "react";
import axios from "axios";
import "./students.css";
import { FaSearch } from "react-icons/fa";

const Students = () => {
    const [input, setInput] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://45.8.96.215:8001/api/v1/users");
                setStudents(response.data); 
            } catch (err) {
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const filteredStudents = students.filter(student =>
        student.lastName.toLowerCase().includes(input.toLowerCase()) // фильтр по фамилии
    );

    return (
        <main className="students_wrapper">
            <div className="content_wrapper">
                <div className="input_wrapper">
                    <FaSearch id="search_icon"/>
                    <input
                        placeholder="Введите фамилию..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                {loading && <p>Загрузка...</p>}
                {error && <p>{error}</p>}

                <ul>
                    {filteredStudents.map((student) => (
                        <li key={student.id}>{student.lastName} {student.firstName}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default Students;
