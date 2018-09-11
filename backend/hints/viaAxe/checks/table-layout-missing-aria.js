function isLayoutTable(table) {

  if (table.childElementCount === 0) {
    return true;
  }

  const tableChildren = table.querySelectorAll('*');
  // layout tables should only contain TR and TD elements
  for (let i = 0; i < tableChildren.length; i++) {
    if (tableChildren[i].tagName !== 'tr' && tableChildren[i].tagName !== 'td') {
      return false;
    }
  }
  return true;
}

if (!isLayoutTable(node)) {
  return true;
}
return node.hasAttribute('role') && node.getAttribute('role') === 'presentation';

