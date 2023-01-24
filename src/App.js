import React from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  if (localStorage.getItem("lowScore") === null) {
    localStorage.setItem("lowScore", JSON.stringify(0));
  }
  const [dice, setDice] = React.useState(allNewDice());
  const [tensies, setTensies] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [lowScore, setLowScore] = React.useState(
    JSON.parse(localStorage.getItem("lowScore"))
  );

  React.useEffect(() => {
    const allFrozen = dice.every((die) => die.isFrozen);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allFrozen && allSameValue) {
      setTensies(true);
    }
  }, [dice]);

  console.log(lowScore);
  function allNewDice() {
    let arrayOfDice = [];
    for (let i = 0; i < 10; i++) {
      arrayOfDice[i] = {
        id: i,
        value: Math.floor(Math.random() * 6 + 1),
        isFrozen: false,
      };
    }
    return arrayOfDice;
  }
  //go through each die and if it is frozen, ignore it and change the rest
  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isFrozen
          ? die
          : { ...die, value: Math.floor(Math.random() * 6 + 1) };
      })
    );
    setCount((oldCount) => {
      return oldCount + 1;
    });
  }

  function freeze(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isFrozen: !die.isFrozen } : die;
      })
    );
  }

  function reset() {
    if (lowScore === 0 || lowScore > count) {
      localStorage.setItem("lowScore", JSON.stringify(count));
    }
    setDice(allNewDice);
    setTensies(false);
    setCount(0);
    setLowScore(JSON.parse(localStorage.getItem("lowScore")));
  }

  return (
    <main>
      {tensies && <Confetti />}
      <div className="info">
        <h1>Tensies!</h1>
        <p>
          Roll the dice until they all have the same number. You can click a die
          to freeze it.
        </p>
      </div>
      <div className="die-container">
        {dice.map((item) => {
          return (
            <Die
              value={item.value}
              key={item.id}
              id={item.id}
              isFrozen={item.isFrozen}
              freeze={() => freeze(item.id)}
            />
          );
        })}
      </div>
      <button onClick={tensies ? reset : rollDice}>
        {tensies ? "New Game" : "Roll"}
      </button>
      <p>Current Score: {count}</p>
      <p>Lowest Score: {lowScore}</p>
      <button onClick={reset} className="refresh">
        Refresh
      </button>
    </main>
  );
}

export default App;
