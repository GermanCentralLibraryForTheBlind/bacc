# [<img src="./frontend/src/assets/logo.png" height="100px" width="86px" >](g) BACC
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

#### Install backend on Linux Ubuntu server 
TODO : move to server.md

TODO: create bacc Docker 

Prepare server 

* Node.js

  ```
  # Using Ubuntu
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
* nginx
  ```
  sudo apt update
  sudo apt install nginx
  ```
  Backup! and replace with bacc\\nginx\\... configs  todo:via script
  ```
  $ sudo nano /etc/nginx/sites-available/default 
  $ sudo nano /etc/nginx/nginx.conf
  $ sudo service restart nginx
  ```

* yarn
  
  <sup> Note: Ubuntu 17.04 comes with cmdtest installed by default. If you’re getting errors from installing yarn, you may want to run sudo apt remove cmdtest first. Refer to this for more information.</sup>
  ```
  $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  $ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  $ sudo apt-get update && sudo apt-get install yarn
  ```

* Chrome setup 
  ```
  $ sudo apt-get update && sudo apt-get install libx11-xcb1 libxss1 libasound2 libxkbfile1
  ```
## CHANGELOG 

### 1.0.0 

* First official version :tada:

### 0.8.0 

* Added rules called hints that need some additional manual checking

### 0.7.0 

* Added meta data view, which signals if recommended meta data isnt set

### 0.6.0

* Save actually checked reports to local disk 

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
