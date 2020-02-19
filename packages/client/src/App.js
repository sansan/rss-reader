import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HttpClient from "./utils/HttpClient";

const useCalendars = () => {
  const [calendars, setCalendar] = useState([]);

  useEffect(() => {
    HttpClient.get("/rest/calendars").then(calendars => {
      setCalendar(calendars);
    });
  }, []);

  return [calendars, setCalendar];
};

const App = () => {
  const [calendars] = useCalendars();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <h3>Speakers agenda</h3>

        <table>
          <tbody>
            {calendars.map(calendar => {
              const { id, name } = calendar;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default App;
