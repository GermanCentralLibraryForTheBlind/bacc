# baCC
Digital equality for all users has an important role in our society. That means people with print disabilities need the same access to information, especially books, like other users. So it is necessary to consider accessibility issues right at the beginning of production of digital content. This paradigma is called [“born accessible”](https://www.benetech.org/our-programs/literacy/born-accessible/). *if content is “born digital,” it can-and should-be “born accessible.”*
BaCC tries to help achieving this digital equality. 

Today digital books are produced in [EPUB 3](http://idpf.org/epub/30). The baCC-tool will assist the eBook-EPUB3 production with focus on [Accessibility](http://www.idpf.org/epub/a11y/accessibility.html) requirements. It can check accessibility requirements automatically (not all) and so guarantee a base accessibility conformance.     

## Who should use baCC?

TODO

## DEMO 

[baCC](http://ec2-18-220-212-194.us-east-2.compute.amazonaws.com)

### Technical details
TODO
##### Backend
BaCC based on [Ace by DAISY](https://github.com/daisy/ace-core)
 
##### Frontend
[Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

### Installation
TODO

#### Install backend on Linux server 
Ace uses Nightmare as headless browser automation library so the issue on a linux server is:
*"Nightmare uses Electron which requires an X display; since your server doesn't have a display, you can use Xvfb to provide a virtual one."*

To close the gap, install this:
```
apt-get install run-xvfb

```
