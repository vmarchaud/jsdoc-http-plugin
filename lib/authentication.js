/**
 * This module defines a custom jsDoc tag.
 * It allows you to document the authentication of a route.
 * @module lib/authentication
 */

'use strict'

exports.name = 'auth'
exports.options = {
  mustHaveValue: false,
  mustNotHaveDescription: false,
  canHaveType: false,
  canHaveName: false,
  onTagged: function (doclet, tag) {
    doclet.authentication = tag.value
    doclet.description = `${doclet.description || ''}
                          <h5>Authentication</h5>
                          <p>${doclet.authentication || 'A authentication is needed to access this endpoint'}</p>`
  }
}
exports.newDocletHandler = function (e) { /* Do Nothing */ }
