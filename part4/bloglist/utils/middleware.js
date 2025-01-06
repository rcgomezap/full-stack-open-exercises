const jwt = require('jsonwebtoken')

const badRequest = (response, message) => response.status(400).json({error: message}) 

const authTokenChecker = (request, response, next) => {
    const authorization = request.get('authorization')
    if (request.path === '/api/blogs' && !authorization && (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE'))
        return response.status(401).json({error: 'missing auth token'})
    if (authorization && !authorization.startsWith('Bearer '))
        return response.status(401).json({error: 'malformatted auth token'})
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
            request.token = authorization.replace('Bearer ', '')  
            if (!request.token)
                return response.status(401).json({error: 'missing token content'})
            request.decodedToken = jwt.verify(request.token, process.env.SECRET)
            if(!request.decodedToken.id || !request.decodedToken) {
                console.log('middleware - invalid token')
                return response.status(401).json({error: 'invalid token'})
            }
        }
    next()
}

const userExtractor = (request, response, next) => {
    if (request.decodedToken)
        request.user = {id: request.decodedToken.id, username: request.decodedToken.username}
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError')
        return badRequest(response, error.message)
    if (error.name === 'JsonWebTokenError')
        return response.status(401).json({error: error.message})

    next(error)
}


module.exports = {authTokenChecker, tokenExtractor, userExtractor, errorHandler }