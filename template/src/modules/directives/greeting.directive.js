/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/11 21:03
 * @version $ IIFE
 */

/* name module */

function greeting() {
    return {
        restric: 'E',
        scope: {
            name: '='
        },
        template: '<h1>Hello, {{name}}</div>'
    }
}

module.exports = greeting;
