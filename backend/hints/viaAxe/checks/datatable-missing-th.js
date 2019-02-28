if (/*no layouttable*/ !(node.hasAttribute('role') && node.getAttribute('role') === 'presentation') && !!node.querySelector('caption')) {
  return node.querySelectorAll('th').length > 0;
}
return true;
