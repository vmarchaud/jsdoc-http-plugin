/**
 * This module defines a custom jsDoc tag.
 * It allows you to document middlewares / endpoints chain for route
 * @module lib/chain
 */

'use strict'

exports.name = 'chain'
exports.options = {
    mustHaveValue: true,
    mustNotHaveDescription: false,
    canHaveType: false,
    canHaveName: true,
    onTagged: function (doclet, tag) {
        if (!doclet.chain) {
            doclet.chain = []
        }

        doclet.chain.push({
            'name': tag.text,
        })
    }
}


const links = {}

exports.newDocletHandler = function (e) {


    links[e.doclet.name] =  {
        longname: e.doclet.longname,
        link: e.doclet.memberof ? `${e.doclet.memberof.replace(':', '-')}.html#${e.doclet.name}`.replace(/ /g, '') : ''
    }


    const chain = e.doclet.chain


        if (chain && chain.length) {


                e.doclet.description = `<h5>Handlers Chain:</h5>
                            <table class="params">
                            <thead><tr><th>Name</th><th class="last">Link</th></tr></thead>
                            ${chain.reduce((html, handler) => {
                                
                                html += `<tr>
                            <td class="type">${handler.name}</td>
                            ${links[handler.name] ? `<td class="name last"><a href=${links[handler.name].link}>${links[handler.name].longname}</a></td>` : '' }
                            </tr>`
                                
                                return html            
                }, '')}
                            </table>
                            ${e.doclet.description || ''}`
            }
}
