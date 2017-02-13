/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/1 10:52
 * @version $ IIFE
 */

/* name module */
const dirVars = require('./dir');

module.exports = {
  app: dirVars.modulesDir + '/app.js',
  common: ['func', 'lang', 'config']
};
