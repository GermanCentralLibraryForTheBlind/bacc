const children = Array.from(node.children);
const header = 'h1 h2 h3 h4 h5 h6';

return children.filter(node => header.indexOf(node.nodeName) !== -1).length !== 0 ||
  children.filter(node => node.getAttribute('role') === 'heading').length !== 0 ||
  node.hasAttribute('aria-label') ||
  node.hasAttribute('aria-labelledby');
