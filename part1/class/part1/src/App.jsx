import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Component = () => {
  const message = "Hello from my personal component"
  console.log("puyo")
  return (
    <h2>{message}</h2>
  )
}



function App() {
  const [count, setCount] = useState(0)
  console.log("Hello from App component!  ")
  const now = new Date()
  
  // return (
  //   <>
  //     <div>
  //       <p>Hello world!</p>
  //     </div>
  //   </>
  // )

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more!! Today is {now.toString()}
      </p>
      <Component />
      <Component>CODSSSSSSSSSSSSS</Component>
    </>
  )
}

export default App
