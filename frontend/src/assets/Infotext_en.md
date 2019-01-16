# BACC: Born Accessible Content Checker

__BACC is an online tool for automated checking the accessibility of EPUB3 documents.__

## About BACC
You can use BACC to check whether your EPUB3 document meets the accessibility requirements of the following international standards and best practices:
*	[EPUB Accessibility 1.0](http://www.idpf.org/epub/a11y/accessibility-20170105.html)
*	[WCAG 2.0](http://www.w3.org/TR/2008/REC-WCAG20-20081211/)
*	[Accessible Publishing Knowledge Base](http://kb.daisy.org/publishing/)

### User Instruction
1.	To check the accessibility of one or more EPUB documents, *drag and drop* the files to the main page or *choose a file to upload*.
2.	The accessibility check will start automatically.
3.	After finishing the validation, BACC will provide an overall accessibility evaluation as well as a detailed report for each checked EPUB.

### Violations and Additional Advices
The overall accessibility of the EPUB document (represented by a colored accessibility icon) is determined by the impact of its most serious violation. A red accessibility icon indicates that the accessibility of the EPUB document is severely limited, while a green icon means that no accessibility violations have been found.  
For a more detailed explanation of the detected accessibility violations see tab "Test results" in the report.  
__Note: As only a limited number of accessibility requirements can be assessed automatically, some further human-based accessibility testing is needed to holistically evaluate the accessibility of an EPUB document.__  
Therefore, the comments and questions of the "Additional Advice" tab as well as the metadata-, outlines- and image description view can offer a first approach. 

## Software Development
The development of BACC takes place in the German Central Library for the Blind in Leipzig.    
For the validation of EPUB documents, BACC uses the *Accessibility Checker for EPUB (Ace)*,  developed by the Daisy-Consortium, and extends it with some additional features:
*	As a __web application__, BACC can be used on every system __without any installation or maintenance effort__. 
*	The __graphic user interface__ allows a user-friendly operation.
*	The __drag & drop function__ enables the user to start the accessibility check easily and quickly.
*	BACC offers __batch processing__ to check several EPUB files at the same time.
*	The checker can be used either __in English or German language__.
* __Additional advices__ help to indicate, where a further human-driven accessibility evaluation is necessary.
