const badRequest = (response, message) => response.status(400).json({error: message}) 

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')  
    if (authorization && authorization.startsWith('Bearer ')) {
            request.token = authorization.replace('Bearer ', '')  
        }
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError')
        return badRequest(response, error.message)
    if (error.name === 'JsonWebTokenError')
        return response.status(401).json({error: error.message})

    next(error)
}


module.exports = {tokenExtractor, errorHandler }