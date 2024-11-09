import { useState } from 'react'

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
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <ShowNumbers persons={filteredPersons} />
    </div>
  )
}

export default App