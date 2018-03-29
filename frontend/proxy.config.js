const PROXY_CONFIG = [
  {
    "context": [
      "/upload",
      "/checkover",
      "/allRules",
      "/contact"
    ],
    "target": "http://localhost:3111",
    "secure": false,
    "logLevel": "info"
  }
];

module.exports = PROXY_CONFIG;
