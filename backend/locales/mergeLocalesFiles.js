const fs = require('fs');
const axeDE = require('./axe_de.json');
const baccHintsDE = require('./bacc_hints_de.json');
const constants = require('../constants');

for (let item in baccHintsDE.checks)
  axeDE.checks[item] = baccHintsDE.checks[item];

for (let item in baccHintsDE.rules)
  axeDE.rules[item] = baccHintsDE.rules[item];

fs.writeFileSync(constants.AXE_DE_PATH, JSON.stringify(axeDE));


