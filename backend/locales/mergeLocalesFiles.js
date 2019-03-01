const fs = require('fs');
const path = require('path');

const axeDE = require('./axe_de.json');
const aceDE = require('./ace_de.json');
const axeHintsDE = require('./bacc_hints_axe_de.json');
const aceHintsDE = require('./bacc_hints_ace_de.json');
const constants = require('../constants');

//
// axe
//
for (let item in axeHintsDE.checks)
  axeDE.checks[item] = axeHintsDE.checks[item];

for (let item in axeHintsDE.rules)
  axeDE.rules[item] = axeHintsDE.rules[item];

fs.writeFileSync(constants.AXE_DE_PATH, JSON.stringify(axeDE));

//
// ace
//
for (let item in aceHintsDE.rules)
  aceDE.rules[item] = aceHintsDE.rules[item];

fs.writeFileSync(path.join(__dirname,'ace_de.json'), JSON.stringify(aceDE));
