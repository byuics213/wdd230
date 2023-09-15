Install

1. git clone https://github.com/byuics213/wdd230.git

2. In terminal, cd to the directory where you cloned the repository on your machine.

3. Install npm and node, if they are not already installed. 

4. npm init

5. npm install cypress --save-dev

6. add "cypress:open": "cypress open" to "scripts" in your package.json file.

6b. add the student github usernames to the fixturs/students.json file

7. Open terminal and run npm run cypress:open

8. A cypress window should open to show the test being run.

The file cypres/fixtures/students.json contains an array of the student's github accounts. It will need to be (manually?) updated each semester.

After the tests run there will be a file in the root folder named something like week1.html. Open this file in a browser. At the top you will see next and back buttons and at the bottom you will see the student's file in a frame. This allows us to quickly flip through the student's files. This, of course, assumes students are naming their files correctly.

**********

Week 1

Naming Conventions
1. The local repository folder must be named wdd230.
2. The new page in the root folder must be named "index.html".

Development Standards
3. The meta description content must include Your full name.
4. The title content must be set to "[Student Name] - WDD 230 - Web Frontend Development". Enter your own name in the [Student Name] placeholder.
5. The page must be layed out as shown in the screenshot example.

Design: Contrast
6. Background and foreground colors meet the WCAG AA standards or better for color contrast (perceived luminance).
7. Good design principles of alignment, color contrast, proximity, repetition, and consistent spacing must be used.
8. The page must be styled with your own color schema and typography choices in the base.css file.

Header Content
9. The header tag contains a student photo and an h1 tag containing the student's name. The layout is side by side in all views and does not violate any alignment or spacing design principles.
10. The <header> element must contain your optimized profile image img.
11. The <header> element must contain your name in an h1 tag.

Main Navigation Layout
12. Five <a> links are found in the nav tag and they are rendered vertically.
13. The "BYU-Idaho" link must open a new window/tab.
14. The "Scripture" link must open a new window/tab.

Main Content
15. The style type of the course links list must be set to none (do not display bullets).
16. Information placeholders about the weather, number of visits to the page, etc. 
17. The <main> element must have a limited width.
18. The <main> element must be centered on the screen horizontally. 
19. The <main> sections must be displayed in a single column at this point.      

Footer Content
20. The first paragraph contains the copyright symbol, the copyright year, the student's name, and their state/country.   

JavaScript File Location
21. The external JavaScript file is named "getdates.js" and is located in a folder named "scripts" on the root directory and is referenced through a script tag right before the closing body tag.

Current Year
22. The footer copyright year is dynamically inserted using the JavaScript Date object. The JavaScript code must be located in the getdates.js file.

Last Modification
23. getdates.js must contain the script for dynamically outputtingthe date the document was last modified in the second paragraph.
24. The lastModified property of the document object must be used to get this date/time dynamically.

Week 2

**********

You can add three bookmarklets in your browser that help with grading. The html file, like week1.html, has their assignments in a frame. There is one bookmarklet to break out of the frame. The other two bookmarklets can only run if the assignment is out of the frame. One shows the Source of their assignment and the other validates their assignment.
 
Show Frame
javascript:(function(){ let win = window.open(document.getElementById("student_link").innerHTML); })();
 
Source
javascript:(function(){  let errors = null;  let xhttp1 = new XMLHttpRequest();  xhttp1.open("GET", document.location.href, true);  xhttp1.onreadystatechange = function () {  if (this.readyState == 4 && this.status == 200) {  let doc = this.responseText; let win = window.open("", "", "height=800,width=800");  win.document.body.innerText = doc;  }  };  xhttp1.send(); })();
 
Validator
javascript:(function(){  let errors = null;  let xhttp1 = new XMLHttpRequest();  xhttp1.open("GET", document.location.href, true);  xhttp1.onreadystatechange = function () {  if (this.readyState == 4 && this.status == 200) {  let doc = this.responseText;  let xhttp2 = new XMLHttpRequest();  xhttp2.open("POST", "https://validator.w3.org/nu/?out=json", true);  xhttp2.setRequestHeader("Content-type", "text/html; charset=utf-8");  xhttp2.onreadystatechange = function () {  if (this.readyState == 4 && this.status == 200) {  errors = JSON.parse(this.responseText);  let errorpage = "";  errors.messages.forEach( function (element) {  errorpage += "Type: " + element.type + "\nLine: " + element.lastLine  + "\nMessage: " + element.message + "\nExtract: " + element.extract  + "\n\n";  });  let win = window.open("", "", "height=800,width=800");  win.document.body.innerText = errorpage;  }  };  xhttp2.send(doc);  }  };  xhttp1.send(); })();
 
**********

Help for students

You don't have permission to submit to ... on Github

Most likely you are trying to use 2 different github accounts on the same computer.

The Fix:
Install the Git Credential Manager
https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git

Set the individual project credentials in Terminal
https://stackoverflow.com/questions/71902895/can-i-use-multiple-git-accounts-in-same-local-systemin-credential-manager

git config credential.${remote}.username whateveryourusernameis

You might need to reclone your repository from git again.

Also, use different browsers for each account.