import axios from "axios"

const address = "http://localhost:3001/"

const getAll = () => {
    const request = axios.get(address + "persons")
    return request.then((response) => response.data)
}

const create = (newPerson) => {
    const request = axios.post(address + "persons",newPerson)
    return request.then((response) => response.data)
}

const del = (id) => {
    const request = axios.delete(address + "persons/" + id)
    return request.then((response) => response.data)
}

const update = (id,data) => {
    const request = axios.put(address + "persons/" + id,data)
    return request.then((response) => response.data)
}

export default {getAll, create, del, update}