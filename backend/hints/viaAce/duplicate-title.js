'use strict';
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
// check

module.exports = epub => {

  const titles = [];
  epub.contentDocs.forEach((cDoc) => {

    const content = fs.readFileSync(cDoc.filepath).toString();
    const doc = new DOMParser().parseFromString(content);
    const title = doc.getElementsByTagName("title");

    if (title[0] && title[0].childNodes && title[0].childNodes.length > 0)
      titles.push(title[0].childNodes[0].nodeValue);
  });

  // unique titles count vs real titles count
  return [...new Set(titles)].length !== titles.length;
};
