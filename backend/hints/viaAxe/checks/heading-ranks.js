var result = true;
var issueHeadings = '';
const mapper = {h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6};
const allHeadings = node.querySelectorAll('h1,h2,h3,h4,h5,h6');
allHeadings.forEach((item, index) => {
  if (index < allHeadings.length - 1) {
    const currTagName = item.tagName;
    const nextTagName = allHeadings[index + 1].tagName;
    const currLevel = mapper[currTagName];
    const nextLevel = mapper[nextTagName];
// console.log("Current: " + currLevel);
// console.log("Next: " + nextLevel);
    if (currLevel + 1 !== nextLevel && currLevel < nextLevel) {
      result = false;
      issueHeadings += currTagName + ':' +
        item.textContent + ' and ' +
        nextTagName + ':' +
        allHeadings[index + 1].textContent + '\n';
    }
  }
});
this.data(issueHeadings);
return result;
