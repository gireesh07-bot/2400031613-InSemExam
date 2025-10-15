import React, { useState } from "react";
import "./App.css";

const App = () => {
  const students = ["John", "Emma", "Aarav", "Sophia", "Liam"];

  const [attendance, setAttendance] = useState(
    students.reduce((acc, name) => {
      acc[name] = false;
      return acc;
    }, {})
  );

  const [submitted, setSubmitted] = useState(false);
  const [presentCount, setPresentCount] = useState(0);
  const [presentStudents, setPresentStudents] = useState([]);

  const handleCheckboxChange = (name) => {
    setAttendance({
      ...attendance,
      [name]: !attendance[name],
    });
  };

  const handleSubmit = () => {
    const selected = Object.entries(attendance)
      .filter(([_, isPresent]) => isPresent)
      .map(([name]) => name);

    setPresentCount(selected.length);
    setPresentStudents(selected);
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1>Attendance Tracker</h1>
      <ul>
        {students.map((name) => (
          <li key={name}>
            <label>
              <input
                type="checkbox"
                checked={attendance[name]}
                onChange={() => handleCheckboxChange(name)}
              />
              {name}
            </label>
          </li>
        ))}
      </ul>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Attendance
      </button>

      {submitted && (
        <div className="result">
          <p>
            ✅ Total Present: <span>{presentCount}</span>
          </p>
          {presentStudents.length > 0 ? (
            <p>
              Present Students:{" "}
              <strong>{presentStudents.join(", ")}</strong>
            </p>
          ) : (
            <p>No students marked present.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
