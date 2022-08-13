import { getQueriesForElement } from '@testing-library/react'
import React from 'react'
import Die from './components/Die'
function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice(){
    let arrayOfDice = []
    for(let i=0;i<10;i++){
      arrayOfDice[i]= {
        id: i,
        value : Math.floor(Math.random() * 6 + 1),
        isFrozen : true
      }
    }
    return arrayOfDice
  }

  function rollDice(){
    setDice(allNewDice)
  }

  

  return (
    <main>
      <div className="info">
        <h1>Tensies!</h1>
        <p>Roll the dice until they all have the same number. You can click a die to freeze it.</p>
      </div>
      <div className="die-container">
        {dice.map(item => {
          return(
            <Die value={item.value} key={item.id} isFrozen={item.isFrozen}/>
          )
        })}
      </div>
      <button onClick={rollDice}>Roll</button>
      
    </main>
  );
}

export default App;
