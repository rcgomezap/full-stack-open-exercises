import { useState, useEffect } from "react"

const notifTime = 5000

const Notification = ({ message, error, notifTrigger }) => {

    const [mes, setMes] = useState('')
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
        setTrigger(notifTrigger)
    })

    useEffect(() => {
        setMes(message)
        setTimeout(() => {
            setMes(null)
        },notifTime)
    }, [trigger])

    const style = {
        padding: '10px',
        background: 'lightgrey',
        fontSize: '15px',
        borderStyle: 'solid',
        borderRadius: '5px',
        ...(error ? {color: 'red'} : {color: 'green'})
    }

    if (mes) {
        return <div style={style}>
            <p>{mes}</p>
        </div>
    } 
}

export default Notification