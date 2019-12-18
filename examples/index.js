/**
 * This is an example of how to document routes.
 * @module MyRoutes
 */

'use strict'

var express = require('express')
var app = express()

/**
 * Just says hello.
 * @name Hello
 * @path {GET} /
 * @response {String} hello
 * @response {Array} entries
 */
app.get('/', function (request, response) {
  response.send({ hello: 'world', entries: [] })
})

/**
 * Upload a file.
 *
 * @name File Upload
 * @path {POST} /v1/file
 * @auth This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
 * @code {200} Success everyting is cool
 * @version v1
 * @since v1
 */
app.post('/v1/file', function (request, response) {
  response.send(200)
})

/**
 * Upload a file.
 *
 * @name File Upload
 * @path {POST} /v2/file
 * @version v2
 * @since v1
 * @auth This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
 * @header authorization is the identification information for the request
 * @header {String} user-id is the unique User Id to assign to the file
 * @code {200} everyting is cool
 */
app.post('/v2/file', function (request, response) {
  response.send(200)
})

/**
 * Upload a file.
 *
 * @name File Upload
 * @path {POST} /v3/file
 * @version v3
 * @since v1
 * @auth This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
 * @body {String} userId is the unique identifier for the user we are uploading the file to.
 * @body {Boolean} [sync=false] when true the route will be synchronous otherwise the route
 * is asynchronous.
 */
app.post('/v3/file', function (request, response) {
  response.send(200)
})

/**
 * Upload a file.
 *
 * @name File Upload
 * @path {POST} /v4/file
 * @version v4
 * @since v1
 * @auth This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
 * @body {String} userId is the unique identifier for the user we are uploading the file to.
 * @body {Boolean} [sync=false] when true the route will be synchronous otherwise the route
 * is asynchronous.
 * @query {String} folder is the folder to upload the file to.
 */
app.post('/v4/file', function (request, response) {
  response.send(200)
})

/**
 * Download a file.
 *
 * @name Download a File
 * @path {GET} /v1/files/:fileId
 * @version v1
 * @since v1
 * @params {String} :fileId is the unique identifier for the file to download.
 * @response {String} msg Your file
 */
app.get('/v1/files/:fileId', function (request, response) {
  request.send({ msg: 'Your File' })
})

/**
 * Download files.
 *
 * @name Download Files
 * @path {GET} /v1/files
 * @version v1
 * @since v1
 * @query {String} [fileType] will limit the download to just these file types.
 * @response {Object} data
 * @response {String} data.msg
 */
app.get('/v1/files', function (request, response) {
  request.send({ data: { msg: 'Your Files' } })
})


/**
 * Handlers chain - example middleware
 * @name SomeMiddleware
 * @path {POST} /v1/chain
 * @version v1
 * @since v1
 */
app.get('/v1/chain', function (request, response, next) {
  next()
})

/**
 *
 */
function all () {

}

/**
 * Handlers chain - endpoint after the middleware
 *
 * @name SomeEndpoint
 * @path {POST} /v1/chain
 * @version v1
 * @since v1
 * @code 200
 * @chain {@link module:MyRoutes.SomeMiddleware}
 * @chain This handler
 */
app.get('/v1/chain', function (request, response) {
  request.send(200)
})

app.listen(3000, function () {
  console.log('Example app is listening on port 3000, have fun!')
})
