import { useEffect, useState } from "react";

export const Actions = (idExercise) => {
  let [words, setWords] = useState([]);
console.log("el valor de id exercise es: "+idExercise); 
    //userLength is for showing the Data Loading message.
  let [wordLength, setWordLength] = useState(null);

  useEffect(() => {
    fetch("http://localhost/api/responses/VocabulaireResponse.php?value="+idExercise)
      .then((res) => {
          console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data.success);

        if (!data.success) {
            console.log("entra al data success");
            setWords(data);
            setWordLength(true);
        } else {
          setWordLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new user into the database. responses/VocabulaireResponse.php?id=&mot=${data["mot"]}&traduction=${data["traduction"]}&audio=${data["audio"]}&image=${data["image"]}&activiteId=${data["activiteId"]}`
  const insertWord = (newWord) => {
    console.log(newWord["idExercise"]);
      console.log(newWord);
    fetch(`http://localhost/api/responses/VocabulaireResponse.php?id=&mot=${newWord["mot"]}&traduction=${newWord["traduction"]}&audio=1&image=1&activiteId=${newWord["idExercise"]}`, { 
      method: "POST"})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
          console.log(data);
        if (data) {
          setWords([
            {
              id: data,
              ...newWord,
            },
            ...words,
          ]);
          console.log("entra al true");
          setWordLength(true);
        } else {
            console.log(data);
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteWord = (theID) => {
    console.log(theID);
    // filter outing the user.
  let wordDeleted = words.filter((word) => {
    return word.id !== theID;
  });
  fetch(`http://localhost/api/responses/VocabulaireResponse.php?value=${theID}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({ id: theID }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setWords(wordDeleted);
        if (words.length === 1) {
          setWordLength(0);
        }
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

  // Enabling the edit mode for a listed user.
  const editMode = (id) => {
    words = words.map((word) => {
      if (word.id === id) {
        word.isEditing = true;
        return word;
      }
      word.isEditing = false;
      return word;
    });
    setWords(words);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    words = words.map((word) => {
      if (word.id === id) {
        word.isEditing = false;
        return word;
      }
      return word;
    });
    setWords(words);
  };

  // Updating a user.
  const updateWord = (wordData) => {
      console.log(wordData);
    fetch(`http://localhost/api/responses/VocabulaireResponse.php?value=${wordData["id"]}&mot=${wordData["mot"]}&traduction=${wordData["traduction"]}&audio=1&image=1&activiteId=26`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({wordData}),
    })
      .then((res) => {
        return res.json();
      })     
      .then((data) => {
          console.log(data.success);
        if (data.success) {
          words = words.map((word) => {
            if (word.id === wordData.id) {
                word.isEditing = false;
                word.mot = wordData.mot;
                word.traduction = wordData.traduction;
              return word;
            }
            return word;
          });
          setWords(words);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const valor = 18;
  

  return {
    words,
    editMode,
    cancelEdit,
    updateWord,
    insertWord,
    deleteWord,
    wordLength,
    valor,
  };
};


/*
const [vocabulaire, setVocabulaire] = useState(initialVocabulaireState);
  const [submitted, setSubmitted] = useState(false);
  const { idProjet, idUnit, idLecon, idExercise } = useLocation();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVocabulaire({ ...vocabulaire, [name]: value });
  };

  const saveVocabulaire = () => {
    var data = {
      id: 1,
      mot: vocabulaire.mot,
      traduction: vocabulaire.traduction,
      audio: vocabulaire.audio,
      image: vocabulaire.image,
      activiteId: idExercise
    };
    VocabulaireDataService.create(data)
      .then((response) => {
        setVocabulaire({
          id: response.data.id,
          mot: response.data.mot,
          traduction: response.data.traduction,
          audio: response.data.audio,
          image: response.data.image,
          activiteId: response.data.activiteId,
        });
        setSubmitted(true);
        
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };*/