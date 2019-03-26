if (node.hasAttribute('alt') && node.getAttribute('alt') === '') {
  return node.hasAttribute('role') && node.getAttribute('role') === 'presentation';
}
return true;
