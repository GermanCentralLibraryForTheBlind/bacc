const path = require('path');
const temp = path.join(process.cwd(), 'uploads');

module.exports = Object.freeze({
  ACE: path.join(__dirname, './node_modules/ace-core/packages/ace/bin/ace.js'),
  CHECK_PROGRESS_STATE_FILE : 'progress_state.json',
  STATISTICS : path.join(process.cwd(), 'statistics.json'),
  UPLOAD_DIR : temp,
  PATH_TO_TEMPLATE_REPORT :  path.join(__dirname, 'report/report.mustache'),
  ACE_REPORT : '/report.json',
  BACC_REPORT : '/bacc_report.html',
  ACE_CHECKER_CHROMIUM_DEFAULT : path.join(__dirname,'ace_patch/checker-chromium.js'),
  ACE_CHECKER_CHROMIUM_DE : path.join(__dirname,'ace_patch/checker-chromium-de.js'),
  ACE_CHECKER_CHROMIUM_DEFAULT_PATH : path.join(__dirname,'node_modules/ace-core/packages/ace-core/lib/checker/checker-chromium.js'),
  AXE_DE_PATH : path.join(__dirname,'node_modules/ace-core/node_modules/axe-core/locales/de.json')
});
