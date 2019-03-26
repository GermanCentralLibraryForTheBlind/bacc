var count = 1;
var tempNode = node;

for (var tempNode = tempNode.nextElementSibling;
     tempNode, tempNode.nodeName === 'a';
     tempNode = tempNode.nextElementSibling) {
  if (++count > 3) {
    return false;
  }
}
return true;
