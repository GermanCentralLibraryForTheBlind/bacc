const isDataTable = !(node.hasAttribute('role') && node.getAttribute('role') === 'presentation');
if (/*no layouttable*/ isDataTable && !!node.querySelector('caption')) {
  return node.querySelectorAll('th').length > 0;
}
return true;
