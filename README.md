# This is a fork

This project is a fork from https://github.com/bvanderlaan/jsdoc-route-plugin
Currently, bvanderlaan doesn't seems to be available to maintain the project so i'll continue here.

# JsDoc HTTP Plugin

This is a plugin for [JsDoc](http://usejsdoc.org/) which is a tool to generate HTML documentation from comment blocks.
JsDoc will scan your code files looking for comment blocks then generate a nicely formated HTML document.

JsDoc supports a number of tags to help document a number of things such as each parameter in a function or what the function will return.
These tags are picked up by JsDoc and used when generating the HTML documentation; for example function parameters are shown in a table.

This plugin adds custom tags to JsDoc that work with the default document template. The custom tags are meant to help document HTTP endpoints.


## How to install

First you need to install JsDoc
```
npm install jsdoc --save-dev
```

Then you need to install the JsDoc Route Plugin

```
npm install jsdoc-http-plugin --save-dev
```

Next you need to tell [JsDoc](http://usejsdoc.org/) to enable the plugin.

You can do this by adding a `jsdoc.conf` file and telling [JsDoc](http://usejsdoc.org/) to use it when you run it.

**Example jsdoc.conf**
```
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
```
jsdoc --config jsdoc.conf
```

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

```
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
It would look something similar to the following:

--------------------------------------

#### Members
  *(path)* File Upload

##### Route:
|Method |Path      |
|:------|:---------|
| POST  | /v1/file |

Upload a file.

--------------------------------------

Only one `@path` tag is expected per endpoint document.

## @auth

The `@auth` tag allows you to state what authentication a route requires.

```
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
It would look something similar to the following:

--------------------------------------
#### Members
  *(path)* File Upload

##### Route:
|Method |Path      |
|:------|:---------|
| POST  | /v1/file |

Upload a file.

##### Authentication
This route requires HTTP Basic Authentication. If authentication fails it will return a 401 error.

--------------------------------------

Only one `@auth` tag is expected per endpoint document.

## @header

The `@header` allows you to document any parameters which are passed via the header of the HTTP request.

With this tag you need to provide the name and a description. The name is the first word of the text following the tag.
* `@header MyName And this part is the description`

You can also optionally provide a type for the parameter.
* `@header {String} MyName And this part is the description`

```
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
It would look something similar to the following:

--------------------------------------
#### Members
  *(route)* File Upload

##### Route:
|Method |Path      |
|:------|:---------|
| POST  | /v1/file |

Upload a file.

#### Header Parameters:
|Name            |Type    | Description                                       |
|:---------------|:-------|:--------------------------------------------------|
| authorization  |        | is the identification information for the request |
| user-id        | String | is the unique User Id to assign to the file       |

--------------------------------------

You can use the `@header` tag as many times as you have parameters in your request header you whish to document.


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


```
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
It would look something similar to the following:

--------------------------------------
#### Members
  *(route)* File Upload

##### Route:
|Method |Path      |
|:------|:---------|
| POST  | /v1/file |

Upload a file.

##### Body Parameters:
|Name     |Type     | Attributes | Default | Description                                                                  |
|:--------|:--------|:-----------|:--------|:-----------------------------------------------------------------------------|
| userId  | String  |            |         | is the unique identifier for the user we are uploading the file to.          |
| sync    | Boolean | Optional   | false   | when true the route will be synchronous otherwise the route is asynchronous. |

--------------------------------------

You can use the `@bodyparam` tag as many times as you have parameters in your request body you whish to document.

## @params

The `@params` allows you to document any parameters which make up part of the route path.

With this tag you need to provide the name and a description. The name is the first word of the text following the tag.
* `@params MyName And this part is the description`

You can also optionally provide a type for the parameter.
* `@params {String} MyName And this part is the description`

```
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
It would look something similar to the following:

--------------------------------------
## Members
  *(route)* Download File

### Route:
|Method |Path               |
|:------|:------------------|
| GET   | /v1/files/:fileId |

Download a file.

### Route Parameters:
|Name      |Type    | Description                                        |
|:---------|:-------|:---------------------------------------------------|
| :fileId  | String | is the unique identifier for the file to download. |

--------------------------------------

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


```
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
It would look something similar to the following:

--------------------------------------
## Members
  *(route)* Download Files

### Route:
|Method |Path       |
|:------|:----------|
| GET   | /v1/files |

Download files.

### Query Parameters:
|Name      |Type    | Attributes | Description                                       |
|:---------|:-------|:-----------|:--------------------------------------------------|
| fileType | String | Optional   | will limit the download to just these file types. |

--------------------------------------

You can use the `@query` tag as many times as you have parameters in your request url you whish to document.

## Donations

You can help the original developer to come back and maintain the original work : [Gratipay](https://gratipay.com/~bvanderlaan/).

[![Support via Gratipay](https://cdn.rawgit.com/gratipay/gratipay-badge/2.3.0/dist/gratipay.svg)](https://gratipay.com/~bvanderlaan/)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/bvanderlaan/jsdoc-route-plugin. This project is intended to be a safe, welcoming space for
collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).


[npm-image]: http://img.shields.io/npm/v/jsdoc-route-plugin.svg?style=flat
[npm-url]: https://npmjs.org/package/jsdoc-route-plugin
[david-image]: http://img.shields.io/david/bvanderlaan/jsdoc-route-plugin.svg?style=flat
[david-url]: https://david-dm.org/bvanderlaan/jsdoc-route-plugin
[david-dev-image]: http://img.shields.io/david/dev/bvanderlaan/jsdoc-route-plugin.svg?style=flat
[david-dev-url]: https://david-dm.org/bvanderlaan/jsdoc-route-plugin#info=devDependencies