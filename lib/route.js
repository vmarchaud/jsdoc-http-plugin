/**
 * This module defines a custom jsDoc tag.
 * It allows you to document header parameters of a route.
 * @module lib/headerparam
 */

'use strict'

exports.name = 'path'
exports.options = {
  mustHaveValue: true,
  mustNotHaveDescription: true,
  canHaveType: true,
  canHaveName: true,
  onTagged: function (doclet, tag) {
    doclet.route = {
      'name': tag.value.name,
      'type': tag.value.type ? (tag.value.type.names.length === 1 ? tag.value.type.names[0] : tag.value.type.names) : ''
    }
  }
}
exports.newDocletHandler = function (e) {
  var route = e.doclet.route
  if (route) {
    e.doclet.scope = 'route'
    e.doclet.description = `<h5>Route:</h5>
                            <table class="params">
                            <thead><tr><th>Method</th><th class="last">Path</th></tr></thead>
                            <tr>
                            <td class="type">${route.type}</td>
                            <td class="name last">${route.name}</td>
                            </tr>
                            </table>
                            ${e.doclet.description || ''}`
  }
}
