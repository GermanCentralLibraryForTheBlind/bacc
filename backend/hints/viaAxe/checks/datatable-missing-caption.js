if (!node.hasAttribute('role') && node.querySelectorAll('th').length > 0) {
  return !!node.querySelector('caption');
}
return true;
