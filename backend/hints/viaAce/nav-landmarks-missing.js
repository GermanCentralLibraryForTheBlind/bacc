const path = require('path');
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;

'use strict';

// check
module.exports = epub => {

  // fallback epub2
  if(Object.keys(epub.navDoc).length === 0)
    return false;

  const navDocFullPath = path.join(epub.basedir, epub.navDoc.src);
  const content = fs.readFileSync(navDocFullPath).toString();
  const doc = new DOMParser().parseFromString(content);
  return doc.getElementsByTagName("nav").length === 0;
};
