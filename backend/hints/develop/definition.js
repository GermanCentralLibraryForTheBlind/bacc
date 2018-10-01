// this hints will be inject as post install into ace (see npm task post:hints) and on runtime process via axe

const definition = {};

const checks = [
  {
    "id": "hint-poor-semantic",
    "evaluate": function evaluate(node, options) {
      const div = node.querySelectorAll('div').length;
      const span = node.querySelectorAll('span').length;
      const all = node.querySelectorAll('*').length;
      return (div + span) < all * 0.5 /* 50% */;
    },
    "metadata": {
      "impact": "serious",
      "messages": {
        "pass": () => {
          return "Rich semantic";
        }, "fail": () => {
          return "Where applicable, semantic HTML 5 elements should be used instead of non-semantic elements like <div> and <span>." +
            "Examples for semantic elements are <h1> … <h6>, <ol>, <ul>, <dl>, <caption>, <blockquote>, <code>, <em>, etc.";
        }
      }
    }
  },
  {
    "id": "hint-epub-specific-attributes",
    "evaluate": function evaluate(node, options) {
      return /*curNode*/node.hasAttribute('epub:type') || /*children*/ !!node.querySelector('[*|type]:not([type])'/*hack!*/);
      // return !!node.querySelector('*[epub\\:type]'); // null why?????????????????????????? arrr :-(
    },
    "metadata": {
      "impact": "serious",
      "messages": {
        "pass": () => {
          return "pass";
        }, "fail": () => {
          return "When applicable, epub:type attributes should be used to specify the semantic of an element." +
            "Examples for common epub:type values are footnote, endnote, toc, cover, glossary, etc.";
        }
      }
    }
  },
  {
    "id": "hint-aria-required-alt-is-empty",
    "evaluate": function evaluate(node, options) {

      if (node.hasAttribute('alt') && node.getAttribute('alt') === '') {
        return node.hasAttribute('role') && node.getAttribute('role') === 'presentation';
      }
      return true;
    },
    "metadata": {
      "impact": "serious",
      "messages": {
        "pass": () => {
          return "pass";
        }, "fail": () => {
          return "The alt attribute of an image should only be empty, if it is a non-informative, decorative image." +
            "Decorative images should be marked using the aria attribute role=”presentation”.";
        }
      }
    }
  },
  {
    "id": "hint-figure-missing-figcaption",
    "evaluate": function evaluate(node, options) {
      return !!node.querySelector('figcaption') &&
        node.querySelector('figcaption').textContent !== "";
    },
    "metadata": {
      "impact": "serious",
      "messages": {
        "pass": () => {
          return "pass";
        }, "fail": () => {
          return "Including a figure caption makes it easier to understand the purpose or content of a figure." +
            "A figure caption should be marked with the <figcaption> element.";
        }
      }
    }
  },
  {
    "id": "missing-role",
    "evaluate": function evaluate(node, options) {
      return node.hasAttribute('role');
    },
    "metadata": {
      "impact": "serious",
      "messages": {
        "pass": () => {
          return "pass";
        }, "fail": () => {
          return "When applicable, the role of this element should be specified by using the aria role attribute.";
        }
      }
    }
  },
  {
    "id": "hint-section-missing",
    "evaluate": function evaluate(node, options) {
      return !!node.querySelector('section');
    },
    "metadata": {
      "impact": "serious",
      "messages": {
        "pass": () => {
          return "pass";
        }, "fail": () => {
          return "The structural hierarchy of the publication should be identified by grouping primary sections of content using (nested) <section> elements or other sectioning elements.";
        }
      }
    }
  },
  {
    "id": "hint-heading-missing",
    "evaluate": function evaluate(node, options) {

      const children = Array.from(node.children);
      const header = 'h1 h2 h3 h4 h5 h6';

      return children.filter(node => header.indexOf(node.nodeName) !== -1).length !== 0 ||
        children.filter(node => node.getAttribute('role') === 'heading').length !== 0 ||
        node.hasAttribute('aria-label') ||
        node.hasAttribute('aria-labelledby');
    },
    "metadata": {
      "impact": "serious",
      "messages": {
        "pass": () => {
          return "pass";
        }, "fail": () => {
          return "Every <section> element should include a heading (<h1> … <h6>).";
        }
      }
    }
  },
  {
    "id": "hint-section-multiple-headings",
    "evaluate": function evaluate(node, options) {

      const children = Array.from(node.children);
      const header = 'h1 h2 h3 h4 h5 h6';
      return children.filter(node => header.indexOf(node.nodeName) !== -1).length <= 1
    },
    "metadata": {
      "impact": "serious",
      "messages": {
        "pass": () => {
          return "pass";
        }, "fail": () => {
          return "Every <section> element should include only one heading." +
            "Subsections with a new heading should be contained in a new <section> element or by other sectioning elements." +
            "Subtitles should not be marked with a separate heading tag.";
        }
      }
    }
  },
  {
    "id": "hint-table-layout-missing-aria",
    "evaluate": function evaluate(node, options) {

      if (!isLayoutTable(node))
        return true;

      return node.hasAttribute('role') && node.getAttribute('role') === 'presentation';


      function isLayoutTable(table) {

        if (table.childElementCount === 0)
          return true;

        const tableChildren = table.querySelectorAll('*');
        // layout tables should only contain TR and TD elements
        for (let i = 0; i < tableChildren.length; i++) {
          if (tableChildren[i].tagName !== 'tr' && tableChildren[i].tagName !== 'td')
            return false;
        }
        return true;
      }
    },
    "metadata":
      {
        "impact": "serious",
        "messages":
          {
            "pass": () => {
              return "pass";
            }, "fail":
              () => {
                return "Layout tables should be identified using the aria attribute role=”presentation”." +
                  "Data tables should contain semantic table markup like <th> elements and a <caption> element.";
              }
          }
      }
  },
  {
    "id": "hint-heading-ranks",
    "evaluate": function evaluate(node, options) {

      var result = true;
      var issueHeadings = '';
      const mapper = {h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6};
      const allHeadings = node.querySelectorAll("h1,h2,h3,h4,h5,h6");
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
            issueHeadings += currTagName + ':' + item.textContent + ' and ' + nextTagName + ':' + allHeadings[index + 1].textContent + '\n';
          }
        }
      });
      this.data(issueHeadings);
      return result;
    },
    "metadata":
      {
        "impact": "serious",
        "messages":
          {
            "pass": () => {
              return "pass";
            },
            "fail": (it) => {
              return it.data;
            }
          }
      }
  },
  {
    "id": "hint-datatable-missing-caption",
    "evaluate": function evaluate(node, options) {

      if (!node.hasAttribute('role') && node.querySelectorAll('th').length > 0)
        return !!node.querySelector('caption');
      return true;
    },
    "metadata":
      {
        "impact": "serious",
        "messages":
          {
            "pass": () => {
              return "pass";
            },
            "fail": () => {
              return "Including a table caption makes it easier to understand the purpose or content of a table." +
                "A table caption should be marked with the <caption> element.";
            }
          }
      }
  },
  {
    "id": "hint-datatable-missing-th",
    "evaluate": function evaluate(node, options) {

      if (!node.hasAttribute('role') && !!node.querySelector('caption'))
        return node.querySelectorAll('th').length > 0;
      return true;
    },
    "metadata":
      {
        "impact": "serious",
        "messages":
          {
            "pass": () => {
              return "pass";
            },
            "fail": () => {
              return "Data tables should contain one or more table header cells, working as a heading for a group of data cells in the table." +
                "Table header cells should be marked with a <th> element.";
            }
          }
      }
  },
  {
    "id": "hint-links-not-grouped",
    "evaluate": function evaluate(node, options) {
      var count = 1;
      var tempNode = node;

      for (var tempNode = tempNode.nextElementSibling; tempNode, tempNode.nodeName === 'a'; tempNode = tempNode.nextElementSibling)
        if (++count > 3)
          return false;

      return true;
    },
    "metadata":
      {
        "impact": "serious",
        "messages":
          {
            "pass": () => {
              return "pass";
            },
            "fail": () => {
              return "Groups of links should be marked as a list, using the <ul>, <ol> or <dl> element.";
            }
          }
      }
  },
  {
    "id": "hint-footnote-missing-backlink",
    "evaluate": function evaluate(node, options) {
      const link = node.querySelector('a');
      return link ? link.hasAttribute('role') && link.getAttribute('role') === 'doc-backlink' : false;
    },
    "metadata":
      {
        "impact": "serious",
        "messages":
          {
            "pass": () => {
              return "pass";
            },
            "fail": () => {
              return "Footnotes and endnotes should have a backlink, marked as role=“doc-backlink.";
            }
          }
      }
  }
];

/* ----------------------------------------------------------------------------------------
-               rules
-------------------------------------------------------------------------------------------*/

const rules = [
  {
    "id": "poor-semantic",
    "selector": "body",
    "any": ["hint-poor-semantic"],
    "metadata": {
      "description": "Ensures HTML5 elements are used to mark up the content",
      "help": "Are semantic HTML5 elements utilized to markup the content?"
    },
    "tags": ["hints"]
  },
  {
    "id": "epub-specific-attributes",
    "selector": "body",
    "any": ["hint-epub-specific-attributes"],
    "metadata": {
      "description": "Ensures epub:type attributes are used to provide additional semantic information",
      "help": "Are epub:type attributes utilized to provide additional semantic information?"
    },
    "tags": ["hints"]
  },
  {
    "id": "aria-required-alt-is-empty",
    "selector": "img",
    "any": ["hint-aria-required-alt-is-empty"],
    "metadata": {
      "description": "Ensures all informative images have a non-empty alt-Attribute resp. all decorative images are marked with role=”presentation”",
      "help": "Are all informative images described by a text alternative?"
    },
    "tags": ["hints"]
  },
  {
    "id": "figure-missing-figcaption",
    "selector": "figure",
    "any": ["hint-figure-missing-figcaption"],
    "metadata": {
      "description": "Ensures all <figure> elements include a non-empty <figcaption> element",
      "help": "Could a figure caption be useful to describe the content or purpose of a figure?"
    },
    "tags": ["hints"]
  },
  {
    "id": "section-missing-role",
    "selector": "section",
    "any": ["missing-role"],
    "metadata": {
      "description": "Ensures all <section> elements are specified by an aria role attribute",
      "help": "Is it possible to specify the semantic of a <section> element by an aria role attribute?"
    },
    "tags": ["hints"]
  },
  {
    "id": "aside-missing-role",
    "selector": "aside",
    "any": ["missing-role"],
    "metadata": {
      "description": "Ensures all <aside> elements are specified by an aria role attribute",
      "help": "Is it possible to specify the semantic of an <aside> element by an aria role attribute?"
    },
    "tags": ["hints"]
  },
  {
    "id": "section-missing",
    "selector": "body",
    "any": ["hint-section-missing"],
    "metadata": {
      "description": "Ensures the document contains <section> elements",
      "help": "Are <section> elements used to identify the publications structural hierarchy?"
    },
    "tags": ["hints"]
  },
  {
    "id": "heading-missing",
    "selector": "section",
    "any": [
      "hint-heading-missing"
    ],
    "metadata": {
      "description": "Ensures every <section> element contains a heading (marked with <h1>...<h6> or role=”heading”) as its direct child or has an aria-label or aria-labelledby attribute",
      "help": "Is every section titled by a heading (<h1> … <h6>)?"
    },
    "tags": ["hints"]
  },
  {
    "id": "section-multiple-headings",
    "selector": "section",
    "any": ["hint-section-multiple-headings"],
    "metadata": {
      "description": "Ensures every <section> element contains not more than one heading (<h1>...<h6>) as its direct child",
      "help": "Does every section have only one single heading?"
    },
    "tags": ["hints"]
  },
  {
    "id": "table-layout-missing-aria",
    "selector": "table",
    "any": ["hint-table-layout-missing-aria"],
    "metadata": {
      "description": "Ensures layout tables (<table> elements with neither <thead> nor <th> nor <caption> nor one of the attributes summary, headers or scope) have the aria attribute role=”presentation”",
      "help": "Are layout tables identified?"
    },
    "tags": ["hints"]
  },
  {
    "id": "heading-ranks",
    "selector": "body",
    "any": ["hint-heading-ranks"],
    "metadata": {
      "description": "Ensures skipping heading ranks only appears, when semantically neccessary.",
      "help": "Do the headings reflect the publications structural hierarchy?"
    },
    "tags": ["hints"]
  },
  {
    "id": "datatable-missing-caption",
    "selector": "table",
    "any": ["hint-datatable-missing-caption"],
    "metadata": {
      "description": "Ensures all <table> elements that have no aria attribute role=”presentation” but contain a <th> element also include a table caption.",
      "help": "Could a table caption be useful to describe the content or purpose of a table?"
    },
    "tags": ["hints"]
  },
  {
    "id": "datatable-missing-th",
    "selector": "table",
    "any": ["hint-datatable-missing-th"],
    "metadata": {
      "description": "Ensures all <table> elements that have no aria attribute role=”presentation” but contain a <caption> element also include at least one th header cell <th>.",
      "help": "Are there table cells, that should be identified as table headers?"
    },
    "tags": ["hints"]
  },
  {
    "id": "links-not-grouped",
    "selector": "a",
    "any": ["hint-links-not-grouped"],
    "metadata": {
      "description": "Ensures groups of more than three <a> elements are marked as a list.",
      "help": "Should a group of links be marked as a list?"
    },
    "tags": ["hints"]
  },
  {
    "id": "footnote-missing-backlink",
    "selector": "[*|type~='footnote'], [role~='doc-footnote'], [*|type~='endnote'], [role~='doc-endnote']",
    "any": ["hint-footnote-missing-backlink"],
    "metadata": {
      "description": '',
      "help": "If footnotes (elements with the attribute epub:type=”footnote” or role=”doc-footnote”) or endnotes (elements with the attribute epub:type=”endnote” or role=”doc-endnote”) do not contain a backlink (containing the aria attribute role=”backlink”)."
    },
    "tags": ["hints"]
  }
];

definition.checks = checks;
definition.rules = rules;

module.exports = definition;



