const link = node.querySelector('a');
return link ? link.hasAttribute('role') && link.getAttribute('role') === 'doc-backlink' : false;
