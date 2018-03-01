/**
 * This module defines a custom jsDoc tag.
 * It allows you to document header parameters of a route.
 * @module lib/headerparam
 */

'use strict'

exports.name = 'service'
exports.options = {
  mustHaveValue: false,
  mustNotHaveDescription: true,
  canHaveType: false,
  canHaveName: true,
  onTagged: function (doclet, tag) {
    doclet.service = {
      'name': tag.value.name
    }
  }
}
exports.newDocletHandler = function (e) {
  var service = e.doclet.service
  if (service) {
    e.doclet.scope = 'service'
    e.doclet.description = `${e.doclet.description || ''}
                <h5>Service:</h5>
                <p>Any call to this endpoint need to be done on service : <b>${service.name}</b></p>`
  }
}
