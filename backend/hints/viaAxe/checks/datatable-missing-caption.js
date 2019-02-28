if (/*no layouttable*/ !(node.hasAttribute('role') && node.getAttribute('role') === 'presentation') && node.querySelectorAll('th').length > 0) {
  return !!node.querySelector('caption');
}
return true;
