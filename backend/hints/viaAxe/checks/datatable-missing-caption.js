const isDataTable = !(node.hasAttribute('role') && node.getAttribute('role') === 'presentation');
if (/*no layouttable*/ isDataTable && node.querySelectorAll('th').length > 0) {
  return !!node.querySelector('caption');
}
return true;
