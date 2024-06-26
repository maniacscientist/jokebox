'use strict';

const isNode = (typeof exports === 'object') ? true: false;
const uniWrite = message => isNode ? process.stdout.write(message) : console.log(message);

/**
 * turns YouR tExt iNTO crAZY ONe
 * @param {string} text 
 * @returns {string}
 */
let cRazYtEXt = text =>
    text && text.length
    ? text.toLowerCase().split('').map(c => Math.random() > 0.5 ? c : c.toUpperCase()).join('')
    : text;

/**
 * terminates process if you are not lucky
 */
let russianRoulette = () => {
    setTimeout(() => {
        let bang = Math.floor((Math.random() * 6) + 1);
        if (bang === 4) {
            uniWrite(' ___$$#BANG!!#$$__ ');
            process.exit();
        }
    }, 1500);
};

const badWords = [
    'fito', 'jävla', 'fubbick', 'ålahue',
    'קס', 'בן זונה', 'זין',
    'сука', 'бля', 'пидор', 'хуй',
    'cocksucker', 'moron', 'fuck',
];

/**
 * performs swear diarrhoea within given duration
 * @param {number} duration total duration in milliseconds
 * @param {number} period period in milliseconds
 * @param {Array<string>} vocabulary additional vocabulary
 */
let swearDiarrhoea = (duration = 100 * 1000, period = 2000, vocabulary = badWords) => {
    let iterations = Math.ceil(duration / period);

    for (let i = 0; i < iterations; i++) {
        setTimeout(() => {
            let badWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
            let exclamations = Math.floor(Math.random() * 7);
            let ones = Math.floor(Math.random() * 3);
            let spaces = Math.floor(Math.random() * 12);
            let message = `${cRazYtEXt(badWord)}${'!'.repeat(exclamations)}${'1'.repeat(ones)}${' '.repeat(spaces)} `;
            uniWrite(message);
        }, period * i);
    }
};

const jokeSources = [{ 
        url: 'https://official-joke-api.appspot.com/random_joke', 
        getter: response => `${response.setup} -${response.punchline}` 
    }, {
        url: 'https://icanhazdadjoke.com/',
        getter: response => response.joke
    }, {
        url: 'https://api.chucknorris.io/jokes/random',
        getter: response => response.value
    }
];

/**
 * returns random joke
 * @returns {Promise<string>}
 */
let fetchJoke = async () => {
    let sourceIndex = Math.floor(Math.random() * jokeSources.length);
    let source = jokeSources[sourceIndex];
    let response = await fetch(source.url, { headers: { accept: 'application/json' } });
    let object = await response.json();
    return source.getter(object);
};

module.exports = {
    cRazYtEXt,
    russianRoulette,
    swearDiarrhoea,
    fetchJoke,
};