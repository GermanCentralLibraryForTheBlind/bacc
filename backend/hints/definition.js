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
          return 'Poor semantic';
        }
      }
    }
  }
];

const rules = [
  {
    id: 'poor-semantic',
    selector: 'body',
    any: ['hint-poor-semantic'],
    metadata: {
      description: "Hint to ensures ",
      help: "Please use more semantic elements. " +
      "Examples of non-semantic elements: div and span - Tells nothing about its content. " +
      "Examples of semantic elements: form , table , and article - Clearly defines its content."
    },
    tags: ['hints']
  }
];

definition.checks = checks;
definition.rules = rules;

module.exports = definition;



