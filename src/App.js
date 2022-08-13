import React from 'react'
import Die from './components/Die'
function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice(){
    let arrayOfDice = []
    for(let i=0;i<10;i++){
      arrayOfDice.push(Math.floor(Math.random() * 6 + 1))
    }
    return arrayOfDice
  }

  function getNewDice(){
    setDice(allNewDice)
  }

  return (
    <main>
      <div className="die-container">
        {dice.map(item => {
          return(
            <Die value={dice[item]} />
          )
        })}
      </div>
      <button onClick={getNewDice}>Roll</button>
      
    </main>
  );
}

export default App;
