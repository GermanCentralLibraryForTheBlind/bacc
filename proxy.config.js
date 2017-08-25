const PROXY_CONFIG = [
  {
    "context": [
      "/upload",
      "/checkover"
    ],
    "target": "http://localhost:3111",
    "secure": false,
    "logLevel": "debug"
  }
];

module.exports = PROXY_CONFIG;
