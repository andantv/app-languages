import { useState, useContext } from "react";
import React from "react";
import { AppContext } from "../../../Context";
import { useLocation } from "react-router-dom";

const Form = () => {
  const { insertWord } = useContext(AppContext);
  const [newWord, setNewWord] = useState({});
  const { idExercise } = useLocation();

  console.log("en el form: "+idExercise);

  // Storing the Insert User Form Data.
  const addNewWord = (e, field) => {
    setNewWord({
      idExercise: idExercise,
      ...newWord,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitWord = (e) => {
    e.preventDefault();
    insertWord(newWord);
    e.target.reset();
  };
 
  return (
    <form className="insertForm" onSubmit={submitWord}>
      <h3>Insert word  </h3> <br />
      <label htmlFor="mot">Mot</label>

      <input
        type="text"
        id="mot"
        onChange={(e) => addNewWord(e, "mot")}
        placeholder="Enter mot"
        autoComplete="off"
        required
      />
      <label htmlFor="traduction">traduction</label>
      <input
        type="test"
        id="traduction"
        onChange={(e) => addNewWord(e, "traduction")}
        placeholder="Enter traduction"
        autoComplete="off"
        required
      />
      <input type="submit" value="Insert" />
    </form>
  );
};

export default Form;