/**
 * This module converts an array of parameter objects into an HTML table.
 * @module parameterTableBuilder
 */

'use strict'

function extraColumnInfo (params) {
  const result = {
    showAttributes: false,
    showDefaultValue: false
  }

  params.forEach((param) => {
    result.showAttributes = result.showAttributes || param.optional
    result.showDefaultValue = result.showDefaultValue || param.defaultvalue !== undefined
  })

  return result
}

function buildTableEntry (param, columnInfo, opts) {
  const attributeCell = columnInfo.showAttributes ? `<td class="attributes">${param.optional}</td>` : ''
  const defaultCell = columnInfo.showDefaultValue ? `<td class="default">${param.defaultvalue === undefined ? '' : param.defaultvalue}</td>` : ''

  return `<tr>
            ${opts.name === false ? '' : `<td class="name">${param.name}</td>`}
            ${opts.type === false ? '' : `<td class="type">${escapeHtml(param.type)}</td>`}
            ${attributeCell}
            ${defaultCell}
            <td class="description last">${param.description}</td>
          </tr>`
}

function buildTableHeader (columnInfo, opts) {
  const attributeHeader = columnInfo.showAttributes ? '<th>Attributes</th>' : ''
  const defaultHeader = columnInfo.showDefaultValue ? '<th>Default</th>' : ''
  return `<thead>
              <tr>
                ${opts.name === false ? '' : '<th>Name</th>'}
                ${opts.type === false ? '' : '<th>Type</th>'}
                ${attributeHeader}
                ${defaultHeader}
                <th class="last">Description</th>
              </tr>
            </thead>`
}

function escapeHtml(unsafe) {
  if (unsafe && typeof unsafe === 'string') {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  } else {
    return unsafe;
  }
}

exports.build = function (title, params, opts) {
  opts = Object.assign({
    name: true,
    type: true,
    description: true
  }, opts)
  const columnInfo = extraColumnInfo(params)
  const paramTableEntries = []

  params.forEach((param) => {
    paramTableEntries.push(buildTableEntry(param, columnInfo, opts))
  })

  return `<h5>${title}:</h5>
          <table class="params">
            ${buildTableHeader(columnInfo, opts)}
            ${paramTableEntries.join('')}
          </table>`
}
