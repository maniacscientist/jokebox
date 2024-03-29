'use strict';

let cRazYtEXt = text =>
    text && text.length
    ? text.toLowerCase().split('').map(c => Math.random() > 0.5 ? c : c.toUpperCase()).join('')
    : text;

module.exports = {
    cRazYtEXt,
};