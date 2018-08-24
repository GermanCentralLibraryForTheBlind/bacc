const definition = {};

const checks = [
    {
      id: "hint-poor-semantic",
      evaluate: function evaluate(node, options) {
        const div = node.querySelectorAll('div').length;
        const span = node.querySelectorAll('span').length;
        const all = node.querySelectorAll('*').length;
        return (div + span) < all * 0.5 /* 50% */;
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: () => {
            return 'Rich semantic';
          }, fail: () => {
            return "Please use more semantic elements. " +
              "Examples of non-semantic elements: div and span - Tells nothing about its content. " +
              "Examples of semantic elements: form , table , and article - Clearly defines its content.";
          }
        }
      }
    },
    {
      id: "hint-epub-specific-attributes",
      evaluate: function evaluate(node, options) {
        return !!node.querySelector('[*|type]:not([type])'); // hack!
        // return !!node.querySelector('*[epub\\:type]'); // null why?????????????????????????? arrr :-(
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: () => {
            return 'pass';
          }, fail: () => {
            return 'fail';
          }
        }
      }
    },
    {
      id: "hint-aria-required-alt-is-empty",
      evaluate: function evaluate(node, options) {

        if (node.hasAttribute('alt') && node.getAttribute('alt') === '') {
          return node.hasAttribute('role') && node.getAttribute('role') === 'presentation';
        }
        return true;
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: () => {
            return 'pass';
          }, fail: () => {
            return 'The alt attribute of an image should only be empty, if it is a non-informative, decorative image; decorative images should be marked with the aria attribute role=”presentation”.';
          }
        }
      }
    },
    {
      id: "hint-figure-missing-figcaption",
      evaluate: function evaluate(node, options) {
        return !!node.querySelector('figcaption') &&
          node.querySelector('figcaption').textContent !== "";
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: () => {
            return 'pass';
          }, fail: () => {
            return '<figure> elements should have a figcaption.';
          }
        }
      }
    },
    {
      id: "missing-role",
      evaluate: function evaluate(node, options) {
        return node.hasAttribute('role');
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: () => {
            return 'pass';
          }, fail: () => {
            return ' When applicable, the role of this element should be specified by using the aria role attribute.';
          }
        }
      }
    },
    {
      id: "hint-section-missing",
      evaluate: function evaluate(node, options) {
        return !!node.querySelector('section');
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: () => {
            return 'pass';
          }, fail: () => {
            return 'The document structure should be identified by using <section> elements.';
          }
        }
      }
    },
    {
      id: "hint-heading-missing",
      evaluate: function evaluate(node, options) {

        const children = Array.from(node.children);
        const header = 'h1 h2 h3 h4 h5 h6';

        return children.filter(node => header.indexOf(node.nodeName) !== -1).length !== 0 ||
          children.filter(node => node.getAttribute('role') === 'heading').length !== 0 ||
          node.hasAttribute('aria-label') ||
          node.hasAttribute('aria-labelledby');
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: () => {
            return 'pass';
          }, fail: () => {
            return 'Every <section> element should include a heading (h1 … h6).';
          }
        }
      }
    },
    {
      id: "hint-section-multiple-headings",
      evaluate: function evaluate(node, options) {

        const children = Array.from(node.children);
        const header = 'h1 h2 h3 h4 h5 h6';
        return children.filter(node => header.indexOf(node.nodeName) !== -1).length <= 1
      },
      metadata: {
        impact: 'serious',
        messages: {
          pass: () => {
            return 'pass';
          }, fail: () => {
            return ' Every <section> element should include only one heading; Subsections with a new heading should be' +
              ' contained in a new <section> element or by other sectioning elements;' +
              ' Subtitles should not be marked in a separate heading tag';
          }
        }
      }
    },
    {
      id: "hint-table-layout-missing-aria",
      evaluate: function evaluate(node, options) {

        if(!isLayoutTable(node))
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
      metadata:
        {
          impact: 'serious',
          messages:
            {
              pass: () => {
                return 'pass';
              }, fail:
                () => {
                  return 'The layout tables should be marked using the aria attribute role=”presentation”;' +
                    ' data tables should contain <th> elements and a <caption> element';
                }
            }
        }
    }

  ]
;

/* ----------------------------------------------------------------------------------------
-               rules
-------------------------------------------------------------------------------------------*/

const rules = [
  {
    id: 'poor-semantic',
    selector: 'body',
    any: ['hint-poor-semantic'],
    metadata: {
      description: "Semantic should be added by using HTML5 elements",
      help: "help"
    },
    tags: ['hints']
  },
  {
    id: 'epub-specific-attributes',
    selector: 'body',
    any: ['hint-epub-specific-attributes'],
    metadata: {
      description: "",
      help: "Semantic should be added by using epub:type attributes."
    },
    tags: ['hints']
  },
  {
    id: 'aria-required-alt-is-empty',
    selector: 'img',
    any: ['hint-aria-required-alt-is-empty'],
    metadata: {
      description: '',
      help: "If the alt attribute of an <img> element is empty but there is no aria attribute role=“presentation“."
    },
    tags: ['hints']
  },
  {
    id: 'figure-missing-figcaption',
    selector: 'figure',
    any: ['hint-figure-missing-figcaption'],
    metadata: {
      description: '',
      help: "If a <figure> element contains no <figcaption> element."
    },
    tags: ['hints']
  },
  {
    id: 'section-missing-role',
    selector: 'section',
    any: ['missing-role'],
    metadata: {
      description: '',
      help: "If a <section> element does not have an aria attribute role=”...”"
    },
    tags: ['hints']
  },
  {
    id: 'aside-missing-role',
    selector: 'aside',
    any: ['missing-role'],
    metadata: {
      description: '',
      help: "If an <aside> element does not have an aria attribute role=”...”"
    },
    tags: ['hints']
  },
  {
    id: 'section-missing',
    selector: 'body',
    any: ['hint-section-missing'],
    metadata: {
      description: '',
      help: "If there is no section element."
    },
    tags: ['hints']
  },
  {
    id: 'heading-missing',
    selector: 'section',
    any: [
      "hint-heading-missing"
    ],
    metadata: {
      description: '',
      help: "If a <section> element contains no heading (none of the elements <h1> … <h6> " +
      "and no aria-label=”...” or aria-labelledby=”...”) as its direct child element."
    },
    tags: ['hints']
  },
  {
    id: 'section-multiple-headings',
    selector: 'section',
    any: ['hint-section-multiple-headings'],
    metadata: {
      description: '',
      help: "If a <section> element contains more than one heading (<h1> … <h6>) as its direct child element"
    },
    tags: ['hints']
  },
  {
    id: 'table-layout-missing-aria',
    selector: 'table',
    any: ['hint-table-layout-missing-aria'],
    metadata: {
      description: '',
      help: "If a <table> has neither <thead> nor <th> nor <caption> nor one of the attributes summary," +
      " headers or scope and no aria attribute role=”presentation”."
    },
    tags: ['hints']
  }
];


definition.checks = checks;
definition.rules = rules;

module.exports = definition;



