/**
 * This module defines custom JDOC tags for documenting Express routes.
 * @module jsdoc-route-plugin
 */

'use strict'

const authenticationTag = require('./lib/authentication')
const routeTag = require('./lib/route')
const bodyParameterTag = require('./lib/bodyparam')
const headerParameterTag = require('./lib/headerparam')
const queryParameterTag = require('./lib/queryparam')
const routeParameterTag = require('./lib/routeparam')
const responseParameterTag = require('./lib/responseparam')
const responseCodeTag = require('./lib/responsecode')
const serviceTag = require('./lib/serviceparam')
const chainTag = require('./lib/chain')

exports.defineTags = function (dictionary) {
  dictionary.defineTag(serviceTag.name, serviceTag.options)
  dictionary.defineTag(authenticationTag.name, authenticationTag.options)
  dictionary.defineTag(routeTag.name, routeTag.options)
  dictionary.defineTag(bodyParameterTag.name, bodyParameterTag.options)
  dictionary.defineTag(headerParameterTag.name, headerParameterTag.options)
  dictionary.defineTag(queryParameterTag.name, queryParameterTag.options)
  dictionary.defineTag(routeParameterTag.name, routeParameterTag.options)
  dictionary.defineTag(responseParameterTag.name, responseParameterTag.options)
  dictionary.defineTag(responseCodeTag.name, responseCodeTag.options)
  dictionary.defineTag(chainTag.name, chainTag.options)
}

exports.handlers = {
  newDoclet: function (e) {
    serviceTag.newDocletHandler(e)
    authenticationTag.newDocletHandler(e)
    bodyParameterTag.newDocletHandler(e)
    headerParameterTag.newDocletHandler(e)
    queryParameterTag.newDocletHandler(e)
    routeParameterTag.newDocletHandler(e)
    routeTag.newDocletHandler(e)
    responseParameterTag.newDocletHandler(e)
    responseCodeTag.newDocletHandler(e)
    chainTag.newDocletHandler(e)
  }
}
