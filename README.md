# This is a fork

This project is a fork of https://github.com/bvanderlaan/jsdoc-route-plugin
Currently, bvanderlaan doesn't seems to be available to maintain the project so i'll continue here.

# JsDoc HTTP Plugin

This is a plugin for [JsDoc](http://usejsdoc.org/) which is a tool to generate HTML documentation from comment blocks.
JsDoc will scan your code files looking for comment blocks then generate a nicely formated HTML document.

JsDoc supports a number of tags to help document a number of things such as each parameter in a function or what the function will return.
These tags are picked up by JsDoc and used when generating the HTML documentation; for example function parameters are shown in a table.

This plugin adds custom tags to JsDoc that work with the default document template. The custom tags are meant to help document HTTP endpoints.


## How to install

First you need to install JsDoc
```console
npm install jsdoc --save-dev
```

Then you need to install the JsDoc Route Plugin

```console
npm install jsdoc-http-plugin --save-dev
```

Next you need to tell [JsDoc](http://usejsdoc.org/) to enable the plugin.

You can do this by adding a `jsdoc.conf` file and telling [JsDoc](http://usejsdoc.org/) to use it when you run it.

**Example jsdoc.conf**
```js
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "source": {
        "include": [ "." ],
        "exclude": [ "node_modules" ],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": ["jsdoc-http-plugin"],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    },
    "opts": {
      "recurse": true
    }
}
```

Now run [JsDoc](http://usejsdoc.org/) with the `--config` flag.
```console
jsdoc --config jsdoc.conf
```

## Caveats

 - when used with markdown plugin, it should be put before `jsdoc-http-plugin`
 
    > "plugins": ["plugins/markdown", "jsdoc-http-plugin"],
 
## Example

If you want to see an example of this plugin in action run the `npm run example1` command.
That will run [JsDoc](http://usejsdoc.org/) against a sample Express app located in `examples` and produce HTML documentation in the `out` folder.
To view the documentation open `out/index.html` in a browser.

## What are the new Tags

The new tags are all about documenting Express routes.
Find a list of them and how they are to be used below.

## @path

Because JsDoc does not know about routes we need to decorate the route documentation with the `@name` tag to make JsDoc think you are documenting a member of the given module.
This will add an entry under the **Members** section in the HTML document; however, if we used only the `@name` tag to describe the route verb and path it might look a bit odd as it would show up like this:
> *(inner)* POST /v1/files

To make documenting a route a bit nicer I suggest using the `@name` tag to define a common name for the route, such as File Upload, and the `@path` tag to define the verb and route path.
Using the `@path` tag will also change the method attribute from *(inner)* to *(path)*.

```js
/**
 * Upload a file.
 *
 * @name File Upload
 * @path {POST} /v1/file
 */
server.post({
  url: '/v1/file',
}, (req, res, next) => {...}
```

The `@path` tag will add a table showing the HTTP verb (i.e. POST, PUT, DEL, GET), and the route path (i.e. /v1/files) for the route you are documenting just under the friendly name of the route above the details section.

Only one `@path` tag is expected per endpoint document.

## @auth

The `@auth` tag allows you to state what authentication a route requires.

```js
/**
 * Upload a file.
 *
 * @name File Upload
 * @path {POST} /v1/file
 * @auth This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.
 */
server.post({
  url: '/v1/file',
}, (req, res, next) => {...}
```

It will result in a new sub-heading called **Authentication** with whatever text you provided to the tag beneath it.

Only one `@auth` tag is expected per endpoint document.

## @header

The `@header` allows you to document any parameters which are passed via the header of the HTTP request.

With this tag you need to provide the name and a description. The name is the first word of the text following the tag.
* `@header MyName And this part is the description`

You can also optionally provide a type for the parameter.
* `@header {String} MyName And this part is the description`

```js
/**
 * Upload a file.
 *
 * @name File Upload
 * @path {POST} /v1/file
 * @header authorization is the identification information for the request
 * @header {String} user-id is the unique User Id to assign to the file
 */
server.post({
  url: '/v1/file',
}, (req, res, next) => {...}
```

The above would add a table under the route description that lists all the header parameters.
You can use the `@header` tag as many times as you have parameters in your request header you wish to document.


## @body

The `@body` allows you to document any parameters which are passed via the body of the HTTP request.

With this tag you need to provide the name and a description. The name is the first word of the text following the tag.
* `@body MyName And this part is the description`

You can also optionally provide a type for the parameter.
* `@body {String} MyName And this part is the description`

You can also specify that the parameter is optional by placing the name within square brackets.
* `@body {String} [MyName] And this part is the description`

Lastly you can define a default value for the parameter. The idea is to document the value which will be used if the parameter is not provided.
* `@body {String} [MyName=Phillip] And this part is the description`


```js
/**
 * Upload a file.
 *
 * @name File Upload
 * @path {POST} /v1/file
 * @body {String} userId is the unique identifier for the user we are uploading the file to.
 * @body {Boolean} [sync=false] when true the route will be synchronous otherwise the route
 * is asynchronous.
 */
server.post({
  url: '/v1/file',
}, (req, res, next) => {...}
```

The above would add a table under the route description that lists all the body parameters.

You can use the `@bodyparam` tag as many times as you have parameters in your request body you wish to document.

## @params

The `@params` allows you to document any parameters which make up part of the route path.

With this tag you need to provide the name and a description. The name is the first word of the text following the tag.
* `@params MyName And this part is the description`

You can also optionally provide a type for the parameter.
* `@params {String} MyName And this part is the description`

```js
/**
 * Download a file.
 *
 * @name Download File
 * @path {GET} /v1/files/:fileId
 * @params {String} :fileId is the unique identifier for the file to download.
 */
server.get({
  url: '/v1/files/:fileId',
}, (req, res, next) => {...}
```

The above would add a table under the route description that lists all the route parameters.

You can use the `@params` tag as many times as you have parameters in your route path.

## @query

The `@query` allows you to document any parameters which are passed via HTTP request url.

With this tag you need to provide the name and a description. The name is the first word of the text following the tag.
* `@query MyName And this part is the description`

You can also optionally provide a type for the parameter.
* `@query {String} MyName And this part is the description`

You can also specify that the parameter is optional by placing the name within square brackets.
* `@query {String} [MyName] And this part is the description`

Lastly you can define a default value for the parameter. The idea is to document the value which will be used if the parameter is not provided.
* `@query {String} [MyName=Phillip] And this part is the description`


```js
/**
 * Download files.
 *
 * @name Download Files
 * @path {GET} /v1/files
 * @query {String} [fileType] will limit the download to just these file types.
 */
server.get({
  url: '/v1/files',
}, (req, res, next) => {...}
```

The above would add a table under the route description that lists all the query parameters.

You can use the `@query` tag as many times as you have parameters in your request url you wish to document.

## @response

The `@response` allows you to document the response that your route will make

With this tag you need to provide the name and a description. The name is the first word of the text following the tag.
* `@response MyName And this part is the description`

You can also optionally provide a type for the parameter.
* `@response {String} MyName And this part is the description`

You can also specify that the response is optional by placing the name within square brackets.
* `@response {String} [MyName] And this part is the description`

Lastly you can define a default value for the parameter.
* `@response {String} [MyName=Phillip] And this part is the description`


```js
/**
 * Download files.
 *
 * @name Download Files
 * @path {GET} /v1/files
 * @response {Object} metadata
 * @response {String} metadata.name
 * @response {String} metadata.link
 */
server.get({
  url: '/v1/files',
}, (req, res, next) => {...}
```

The above would add a table under the route description that lists that the route answer with a json document containing the `name` and `link` key.

You can use the `@response` tag as many times as you have parameters in your response you wish to document.


## @code

The `@code` allows you to document the http response code that your route will make

With this tag you need to provide the number like this
* `@code {200} and then you document why this code is happening`

```js
/**
 * Download files.
 *
 * @name Download Files
 * @path {GET} /v1/files
 * @code {200} if the request is successful
 * @code {500} if the request fail because the database isn't accesible 
 * @response {Object} metadata
 * @response {String} metadata.name
 * @response {String} metadata.link
 */
server.get({
  url: '/v1/files',
}, (req, res, next) => {...}
```

The above would add a table under the route description that lists that the route answer with a json document containing the `name` and `link` key.

You can use the `@response` tag as many times as you have parameters in your response you wish to document.

## @service

The `@service` allows you to document the host used to make a the request, in the time of microservice, you may have to hit a specific host to reach a specific microservice, you may say that they must be behind a load balancer, but in localhost thats not always the case.

With this tag you need to provide the number like this
* `@service API`

```js
/**
 * Download files.
 *
 * @name Download Files
 * @service DOWNLOAD
 * @path {GET} /v1/files
 * @code {200} if the request is successful
 * @code {500} if the request fail because the database isn't accesible 
 * @response {Object} metadata
 * @response {String} metadata.name
 * @response {String} metadata.link
 */
server.get({
  url: '/v1/files',
}, (req, res, next) => {...}
```

## @chain

The `@chain` allows you to document the sequence of handlers which will handle the request before current endpoint or middleware,  for e.g it may be the express.js middlewares. 

With this tag you may provide @link or human-friendly name of chain element. It is important to keep order of @chain declarations same as real request handling order.
* `@chain {@link module:<full-path-to-module-member>} || @chain <human-friendly-endpoint-name>`

```js
/**
 * Handlers chain - example middleware
 *
 * @name SomeMiddleware
 * @path {POST} /v1/chain
 * @version v1
 * @since v1
 */
app.get('/v1/chain', function (request, response, next) {
  ...
  next()
})

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
  ...
})
```

The above would add a table under the route description that lists that the route answer with a json document containing the `name` and `link` key.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/vmarchaud/jsdoc-http-plugin. This project is intended to be a safe, welcoming space for
collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
