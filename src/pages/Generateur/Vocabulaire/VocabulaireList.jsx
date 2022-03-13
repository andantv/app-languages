import { useContext, useState } from "react";
import { AppContext } from "../../../Context";

const VocabulaireList = () => {
  const {
    words,
    wordLength,
    editMode,
    cancelEdit,
    updateWord,
    deleteWord,
  } = useContext(AppContext);

  console.log(words);

  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateWord(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      idExercise: 32,
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (id, mot, traduction) => {
    setNewData({ id, mot, traduction });
    editMode(id);
  };

  const deleteConfirm = (id) => { 
    if (window.confirm("Êtes-vous sûr?")) {
      deleteWord(id);
    }
  };

  return !wordLength ? (
    <p>{wordLength === null ? "Chargement..." : "Veuillez insérer quelques vocabulaires."}</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>word</th>
          <th>traduction</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { words.map(({ id, mot, traduction, isEditing }) => {
          return isEditing === true ? (
            <tr key={id}>
              <td>
                <input
                  type="text"
                  defaultValue={mot}
                  onChange={(e) => updateNewData(e, "mot")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={traduction}
                  onChange={(e) => updateNewData(e, "traduction")}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={id}>
              <td>{mot}</td>
              <td>{traduction}</td>
              <td>
                {/*                 <button
                  className="btn default-btn"
                  onClick={() => enableEdit(id, mot, traduction)}
                >
                  Edit
                </button> */}

                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default VocabulaireList;