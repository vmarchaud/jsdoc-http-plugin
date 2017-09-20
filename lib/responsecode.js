/**
 * This module defines a custom jsDoc tag.
 * It allows you to document responce code of a route.
 * @module lib/responsecode
 */

'use strict'

const tableBuilder = require('./parameterTableBuilder')

exports.name = 'code'
exports.options = {
  mustHaveValue: true,
  mustNotHaveDescription: false,
  canHaveType: true,
  canHaveName: false,
  onTagged: function (doclet, tag) {
    if (!doclet.code) {
      doclet.code = []
    }

    doclet.code.push({
      'type': tag.value.type ? (tag.value.type.names.length === 1 ? tag.value.type.names[0] : tag.value.type.names) : '',
      'description': tag.value.description || ''
    })
  }
}
exports.newDocletHandler = function (e) {
  const parameters = e.doclet.code
  if (parameters) {
    const table = tableBuilder.build('Response Code', parameters, { name: false })

    e.doclet.description = `${e.doclet.description || ''}
                            ${table}`
  }
}
