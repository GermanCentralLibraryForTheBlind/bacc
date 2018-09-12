if (!node.hasAttribute('role') && !!node.querySelector('caption')) {
  return node.querySelectorAll('th').length > 0;
}
return true;
