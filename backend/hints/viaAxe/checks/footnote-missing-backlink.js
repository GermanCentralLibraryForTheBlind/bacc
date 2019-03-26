const epubType = node.hasAttribute('epub:type') &&
  (node.getAttribute('epub:type') === 'footnote' || node.getAttribute('epub:type') === 'endnote');

const role = node.hasAttribute('role') &&
  (node.getAttribute('role') === 'doc-footnote' || node.getAttribute('role') === 'doc-endnote');

let res = false;

if (epubType || role) {
  const a = node.querySelectorAll('a');
  a.forEach((link) => {
    if (link.hasAttribute('role') && link.getAttribute('role') === 'doc-backlink') {
      res = true;
    }
  });
}

return res;
