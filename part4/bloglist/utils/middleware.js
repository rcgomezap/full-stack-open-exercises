const badRequest = (response, message) => response.status(400).json({error: message}) 

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError')
        return badRequest(response, error.message)

    next(error)
}


module.exports = { errorHandler }