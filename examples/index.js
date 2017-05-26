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
 * @route {GET} /
 */
app.get('/', function (request, response) {
  response.send('Hello World')
})

/**
 * Upload a file.
 *
 * @name File Upload
 * @route {POST} /v1/file
 * @authentication This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
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
 * @route {POST} /v2/file
 * @version v2
 * @since v1
 * @authentication This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
 * @headerparam authorization is the identification information for the request
 * @headerparam {String} user-id is the unique User Id to assign to the file
 */
server.post('/v2/file', function (request, response) {
  response.send(200)
})

/**
 * Upload a file.
 *
 * @name File Upload
 * @route {POST} /v3/file
 * @version v3
 * @since v1
 * @authentication This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
 * @bodyparam {String} userId is the unique identifier for the user we are uploading the file to.
 * @bodyparam {Boolean} [sync=false] when true the route will be synchronous otherwise the route
 * is asynchronous.
 */
server.post('/v3/file', function (request, response) {
  response.send(200)
})

/**
 * Upload a file.
 *
 * @name File Upload
 * @route {POST} /v4/file
 * @version v4
 * @since v1
 * @authentication This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
 * @bodyparam {String} userId is the unique identifier for the user we are uploading the file to.
 * @bodyparam {Boolean} [sync=false] when true the route will be synchronous otherwise the route
 * is asynchronous.
 * @queryparam {String} folder is the folder to upload the file to.
 */
server.post('/v4/file', function (request, response) {
  response.send(200)
})

/**
 * Download a file.
 *
 * @name Download a File
 * @route {GET} /v1/files/:fileId
 * @version v1
 * @since v1
 * @routeparam {String} :fileId is the unique identifier for the file to download.
 */
server.get('/v1/files/:fileId', function (request, response) {
  request.send('Your File')
})

/**
 * Download files.
 *
 * @name Download Files
 * @route {GET} /v1/files
 * @version v1
 * @since v1
 * @queryparam {String} [fileType] will limit the download to just these file types.
 */
server.get('/v1/files', function (request, response) {
  request.send('Your Files')
})

app.listen(3000, function () {
  console.log('Example app is listening on port 3000, have fun!')
})
