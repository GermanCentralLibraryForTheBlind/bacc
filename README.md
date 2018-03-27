# BACC
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Digital equality for all users has an important role in our society. That means people with print disabilities need the same access to information, especially books, like other users. So it is necessary to consider accessibility issues right at the beginning of production of digital content. This paradigma is called [“born accessible”](https://www.benetech.org/our-programs/literacy/born-accessible/). *if content is “born digital,” it can-and should-be “born accessible.”*
BACC tries to help achieving this digital equality. 

Today digital books are produced in [EPUB 3](http://idpf.org/epub/30). The BACC-tool will assist the eBook-EPUB3 production with focus on [Accessibility](http://www.idpf.org/epub/a11y/accessibility.html) requirements. It can check accessibility requirements automatically (not all) and so guarantee a base accessibility conformance.     

## Who should use BACC?

TODO

## Live 

[http://bacc.dzb.de](http://bacc.dzb.de)

[]([bacc](http://ec2-18-220-212-194.us-east-2.compute.amazonaws.com))

## Video DEMO

[<img src="https://i.ytimg.com/vi/aB0DnRetbzE/maxresdefault.jpg" height="300px" width="500px" >](https://www.youtube.com/embed/aB0DnRetbzE?rel=0&autoplay=1 "Demo")

### Technical details
TODO
##### Backend
BACC runs [Ace by DAISY](https://github.com/daisy/ace-core) for programmatic EPUB accessibility reporting.
 
##### Frontend
[Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

### Setup
#### Requirements
BACC requires [Node.js](https://nodejs.org/en/) 7+ to run.

TODO

#### Install backend on Linux server 
[hint puppeteer](https://github.com/GoogleChrome/puppeteer/issues/404
)


## CHANGELOG 

### 0.5.0

* Localise violation (rule/check) descriptions - provides german localisation 

### 0.4.0

* BACC support screenreader users 


### 0.3.0

* Display the list of rules that used for the audit
* Display information about BACC itself and user infractions in a separate info modal  

### 0.2.0

* Localisation labeling:
  + Frontend
  + Report  

### 0.1.0

* Audit EPUB 
  + Upload EPUB via Drag and Drop 
  + Start Audit automatically
  + Show state of audit 
  
* Report
  + Tab violations: 
    - Display violation grouped via type of violation
    - Display details to every violation group
  + Tab outlines: 
    - Display outline side by side viewer
  + Tab image descriptions:
    - Display images with <img> attributes    
     
### 0.0.0
* Initial commit
