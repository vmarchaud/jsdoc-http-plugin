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

exports.newDocletHandler = function (e) {



    const chain = e.doclet.chain


        if (chain && chain.length) {


                e.doclet.description = `<h5>Handlers Chain:</h5>
                            <table class="params">
                            <thead><tr class="last"><th>Order</th></tr></thead>
                            ${chain.reduce((html, handler) => {
                                
                                html += `<tr><td class="type">${handler.name}</td></tr>`
                                
                                return html            
                }, '')}
                            </table>
                            ${e.doclet.description || ''}`
            }
}
