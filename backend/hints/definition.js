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
            return 'Where applicable, semantic HTML 5 elements should be used instead of non-semantic elements like <div> and <span>.' +
              'Examples for semantic elements are <h1> … <h6>, <ol>, <ul>, <dl>, <caption>, <blockquote>, <code>, <em>, etc.';
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
            return 'When applicable, epub:type attributes should be used to specify the semantic of an element.' + 
              'Examples for common epub:type values are footnote, endnote, toc, cover, glossary, etc.';
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
            return 'The alt attribute of an image should only be empty, if it is a non-informative, decorative image.' + 
              'Decorative images should be marked using the aria attribute role=”presentation”.';
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
            return 'Including a figure caption makes it easier to understand the purpose or content of a figure.' +
              'A figure caption should be marked with the <figcaption> element.';
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
            return 'When applicable, the role of this element should be specified by using the aria role attribute.';
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
            return 'The structural hierarchy of the publication should be identified by grouping primary sections of content using (nested) <section> elements or other sectioning elements.';
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
            return 'Every <section> element should include a heading (<h1> … <h6>).';
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
            return 'Every <section> element should include only one heading.' + 
              'Subsections with a new heading should be contained in a new <section> element or by other sectioning elements.' +
              'Subtitles should not be marked with a separate heading tag.';
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
                  return 'Layout tables should be identified using the aria attribute role=”presentation”.' +
                    'Data tables should contain semantic table markup like <th> elements and a <caption> element.';
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
      help: "Are semantic HTML5 elements utilized to markup the content?"
    },
    tags: ['hints']
  },
  {
    id: 'epub-specific-attributes',
    selector: 'body',
    any: ['hint-epub-specific-attributes'],
    metadata: {
      description: "",
      help: "Are epub:type attributes utilized to provide additional semantic information?"
    },
    tags: ['hints']
  },
  {
    id: 'aria-required-alt-is-empty',
    selector: 'img',
    any: ['hint-aria-required-alt-is-empty'],
    metadata: {
      description: '',
      help: "Are all informative images described by a text alternative?"
    },
    tags: ['hints']
  },
  {
    id: 'figure-missing-figcaption',
    selector: 'figure',
    any: ['hint-figure-missing-figcaption'],
    metadata: {
      description: '',
      help: "Could a figure caption be useful to describe the content or purpose of a figure?"
    },
    tags: ['hints']
  },
  {
    id: 'section-missing-role',
    selector: 'section',
    any: ['missing-role'],
    metadata: {
      description: '',
      help: "Is it possible to specify the semantic of a <section> element by an aria role attribute?"
    },
    tags: ['hints']
  },
  {
    id: 'aside-missing-role',
    selector: 'aside',
    any: ['missing-role'],
    metadata: {
      description: '',
      help: "Is it possible to specify the semantic of an <aside> element by an aria role attribute?"
    },
    tags: ['hints']
  },
  {
    id: 'section-missing',
    selector: 'body',
    any: ['hint-section-missing'],
    metadata: {
      description: '',
      help: "Are <section> elements used to identify the publications structural hierarchy?"
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
      help: "Is every section titled by a heading (<h1> … <h6>)?"
    },
    tags: ['hints']
  },
  {
    id: 'section-multiple-headings',
    selector: 'section',
    any: ['hint-section-multiple-headings'],
    metadata: {
      description: '',
      help: "Does every section have only one single heading?"
    },
    tags: ['hints']
  },
  {
    id: 'table-layout-missing-aria',
    selector: 'table',
    any: ['hint-table-layout-missing-aria'],
    metadata: {
      description: '',
      help: "Are layout tables identified?"
    },
    tags: ['hints']
  }
];


definition.checks = checks;
definition.rules = rules;

module.exports = definition;



