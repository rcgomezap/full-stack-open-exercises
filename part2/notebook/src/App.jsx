import { useState } from 'react'

const PersonForm = ({ valueName, valueNumber, setName, setNumber, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={valueName} onChange={(event) => setName(event.target.value)}/>
        </div>
        <div>
          number: <input value={valueNumber} onChange={(event) => setNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const ShowNumbers = ({ persons }) => {
  return (
    <>
      {persons.map((person) => <p key={person.id} >{person.name} {person.number}</p>)}
    </>
  )
}

const Filter = ({ value, onFilter }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={(event) => onFilter(event.target.value)}/>
    </div>
  ) 
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFileteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submitted')
    const personObject = {name: newName, number: newNumber, id: persons.length + 1 }
    if (persons.find((person) => person.name === personObject.name) != undefined){
      console.log('Repeated!')
      alert(`${personObject.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setFileteredPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }

  const handleFilter = (value) => {
    setNewFilterName(value)
    setFileteredPersons(persons.filter((person) => person.name.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilterName} onFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm valueName={newName} valueNumber={newNumber} setName={setNewName} setNumber={setNewNumber} handleSubmit={handleSubmit}/>
      <h3>Numbers</h3>
      <ShowNumbers persons={filteredPersons} />
    </div>
  )
}

export default App