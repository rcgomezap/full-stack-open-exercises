import { useState } from 'react'
import { useEffect } from 'react'
import services from "./services/services"


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

const ShowNumbers = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person)}>delete</button>
      </div>
      ))}
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
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFileteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
  services.getAll().then((contacts) => {
    console.log('Get all from server')
    setPersons(contacts)
    setFileteredPersons(contacts)
  })
  },[trigger])


  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submitted')
    const personObject = { name: newName, number: newNumber }
    const foundPerson = persons.find((person) => person.name === personObject.name)
    if (foundPerson != undefined){
      console.log('Repeated!')
      if (window.confirm(`${personObject.name} already added in the phonebook, replace the old number with a new one?`))
        services.update(foundPerson.id,personObject).then(() => setTrigger(trigger+1))
      return
    }
    services.create(personObject).then(() => {setTrigger(trigger+1)})
    setNewName("")
    setNewNumber("")
  }

  const handleFilter = (value) => {
    setNewFilterName(value)
    setFileteredPersons(persons.filter((person) => person.name.toLowerCase().includes(value.toLowerCase())))
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`))
      services.del(person.id).then(() => setTrigger(trigger+1))
    // console.log('deleted')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilterName} onFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm valueName={newName} valueNumber={newNumber} setName={setNewName} setNumber={setNewNumber} handleSubmit={handleSubmit}/>
      <h3>Numbers</h3>
      <ShowNumbers persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App