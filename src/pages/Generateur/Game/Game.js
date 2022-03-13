import { useEffect, useState, useRef } from "react";
import VocabulaireDataService from "../../../services/vocabulaire.service";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from "@material-ui/core";
import Card from "./card";
import "./app.scss";



function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}


export default function App() {
  const [vocabulaires, setVocabulaire] = useState([]);
  const { idUnit, idProjet, idLecon, idExercise } = useLocation();

  useEffect(() => {
    retrieveExercises();
  }, []);
  const retrieveExercises = () => {
    VocabulaireDataService.getAll(idExercise)
      .then((response) => {
        setVocabulaire(response.data);        
      })
      .catch((e) => {
        console.log(e);
      });
  };



  var arr1 = [vocabulaires.length];
  for(let i = 0; i < vocabulaires.length; i++){
      arr1[i] = {
          id: vocabulaires[i].id,
          mot: vocabulaires[i].mot,
      }
  }
  
  var arr2 = [vocabulaires.length];
  for(let i = 0; i < vocabulaires.length; i++){
      arr2[i] = {
          id: vocabulaires[i].id,
          mot: vocabulaires[i].traduction,
      }
  }
  
console.log(arr1);
console.log(arr2);
  const [cards, setCards] = useState(
    shuffleCards.bind(null, arr1.concat(arr2))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === vocabulaires.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  };
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].id === cards[second].id) {
      setClearedCards((prev) => ({ ...prev, [cards[first].id]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.id]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(arr1.concat(arr2)));
  };
  if(vocabulaires.length !== 0){
    console.log(vocabulaires.length);

  }
  return (
    <div className="App">
            <div
        className="col-12"
        style={{ display: "flex", justifyContent: "right" }}
      >
        <div className="status-card__icon-plus-add">
          <Link
            to={{   
              pathname: `/vocabulaire-list`,
              idProjet: idProjet,
              idUnit: idUnit,
              idLecon: idLecon,
              idExercise: idExercise,
            }}
          >
            <i className="bx bx-arrow-back"> </i>
          </Link>
        </div>
      </div>
      <header>
        <h3>Bienvenue</h3>
        <div>
        Dans cet exercice, vous devez trouver le mot avec sa traduction correcte. C'est parti!
        </div>
      </header>
      <div className="container">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
          {localStorage.getItem("bestScore") && (
            <div className="high-score">
              <span className="bold">Meilleur score:</span> {bestScore}
            </div>
          )}
        </div>
        <div className="restart">
          <Button onClick={handleRestart} color="primary" variant="contained">
            Restart
          </Button>
        </div>
      </footer>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Hourra !!! Vous avez terminé le défi
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Vous avez terminé le jeu en{moves} mouvements. Votre meilleur score est{" "}
            {bestScore} moves.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
