'use strict';
const fs = require('fs');
const util = require('@daisy/epub-utils/lib/epub-parse');
const DOMParser = require('xmldom').DOMParser;
// check

module.exports = epub => {
  const packageDocPath = new util.EpubParser().calculatePackageDocPath(epub.basedir);
  const content = fs.readFileSync(packageDocPath).toString();
  const doc = new DOMParser().parseFromString(content);

  return doc.getElementsByTagName('package')[0].getAttribute('version') !== "3.0";
};
