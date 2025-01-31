import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const notifTime = 5000

const Notification = ({ message, error, notifTrigger }) => {

  const [mes, setMes] = useState('')
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    setTrigger(notifTrigger)
  }, [notifTrigger])

  useEffect(() => {
    setMes(message)
    setTimeout(() => {
      setMes(null)
    },notifTime)
  }, [message, trigger])

  const style = {
    padding: '10px',
    background: 'lightgrey',
    fontSize: '15px',
    borderStyle: 'solid',
    borderRadius: '5px',
    color: error ? 'red' : 'green'
  }

  if (mes) {
    return <div style={style}>
      <p>{mes}</p>
    </div>
  }
}

Notification.propTypes = {
  notifTrigger: PropTypes.number.isRequired
}

export default Notification