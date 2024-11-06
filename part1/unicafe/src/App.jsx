import { useState } from 'react'

const StatisticsLine = ({ text, value }) => {

  const perc = () => {
    if (text == "positive"){
      return "%"
    }
    else {
      return ""
    }
  }

  return(
    <tr>
      <td>{text}</td>
      <td>{value} {perc()}</td>
    </tr>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total > 0){
    return (
      <table>
        <tbody>
        <StatisticsLine text={"good"} value={good}/>
        <StatisticsLine text={"neutral"} value={neutral}/>
        <StatisticsLine text={"bad"} value={bad}/>
        <StatisticsLine text={"total"} value={total}/>
        <StatisticsLine text={"average"} value={(good-bad)/total}/>
        <StatisticsLine text={"positive"} value={good*100/total}/>
        </tbody>
      </table>
    )
  }
  else {
    return <p>No feedback given</p>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics> 
    </div>
  )
}

export default App