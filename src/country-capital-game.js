import "./App.css";
import React, { useState, useRef } from "react";

const CountryCapitalGame = () => {
  // UseRef hooks to update data without causing re-renders
  const selectedCountries = useRef([]);
  const counter = useRef(0);

  // data passed to the component in this case I mimic it with an object
  const data = {
    Germany: "Berlin",
    Azerbaijan: "Baku",
    Rome: "Italy",
    Amsterdam: "Netherlands",
    Lisbon: "Portugal",
    Viena: "Austria",
    Madrid: "Spain",
  };

  // UseState hook that generates the shuffle functionality and updates the buttons array
  const [finalData, setFinalData] = useState(
    Object.entries(data)
      .flat()
      .sort((a, b) => 0.5 - Math.random())
  );

  // resets the counter and the country selections when called
  const resetCounter = () => {
    selectedCountries.current = [];
    counter.current = 0;
  };

  // Function that includes and removes classes when the selections are not correct
  const incorrectSelections = () => {
    selectedCountries.current.forEach((el) => {
      document
        .querySelector(`[data-country=${el}]`)
        .classList.remove("first-click");
      document.querySelector(`[data-country=${el}]`).classList.add("error");
    });

    setTimeout(() => {
      [...document.querySelectorAll(".error")].forEach((el) =>
        el.classList.remove("error")
      );
    }, 1000);
  };

  // Function that includes the class to change the color from the button on first selection
  const firstSelection = (param) => {
    [...selectedCountries.current].forEach((el) => {
      document
        .querySelector(`[data-country=${el}]`)
        .classList[param === "remove" ? "remove" : "add"]("first-click");
    });
  };

  // Logic to filter and match the selections with the initial data
  const filterCountries = (event) => {
    // eslint-disable-next-line
    const filterEntries = Object.entries(data).filter(([key, value]) => {
      if (
        selectedCountries.current.includes(key) &&
        selectedCountries.current.includes(value)
      ) {
        return [key, value];
      }
    });

    if (filterEntries.length) {
      const removeEntries = [...finalData].reduce((acc, value, index) => {
        const [entry1, entry2] = selectedCountries.current;
        if (value !== entry1 && value !== entry2) {
          acc.push(value);
        }
        return acc;
      }, []);

      setFinalData([...removeEntries]);
      firstSelection("remove");
      resetCounter();
    } else {
      incorrectSelections();
      resetCounter();
    }
  };

  // Function that handles the event and the selections
  const getCountry = (event) => {
    const { country } = event.target.dataset;
    if (counter.current < 2) {
      selectedCountries.current = [...selectedCountries.current, country];
      if (selectedCountries.current.length === 1) {
        firstSelection("add");
      }
      counter.current = counter.current + 1;
      if (counter.current === 2) filterCountries();
    }
  };

  // Render the button or congratulations text
  return finalData.length ? (
    <div className="button-container">
      {finalData.map((el, index) => {
        return (
          <button
            className="primary-button"
            key={el}
            data-country={el}
            onClick={(event) => getCountry(event)}
          >
            {el}
          </button>
        );
      })}
    </div>
  ) : (
    <p className="success-message">Congratulations!!</p>
  );
};

export default CountryCapitalGame;
