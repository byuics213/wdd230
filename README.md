Week 1

1. The page must have the same general structure as the example. Visual inspection

Header block with image and their name
Main block with title and 10 links
<hr> and note about some lessones needing more than one link
Footer with copyright, year, name, state, and last updated

2. All the content on the page must be centered and width limited. Visual inspection

3. The portrait image is optimized to be rendered in the browser. Lighthouse report

4. JavaScript code is not mixed with your HTML code inline. Visual inspection of code

5. No JavaScript errors are found. Look at Console

6. Headings are in the right order. Visual inspection of code

7. Semantic elements are used appropriately and where feasible throughout the document.   

8. Validate HTML and CSS using web developer plugin

Week 2

1. The page must have 3 sections.

2. Each section must have 
    the design principle's title,
    the organization/company name
    the web site address as a external hyperlink,
    a mobile view screenshot* of an organization's web page that, in your opinion, illustrates that principle, and
    a brief description on how the design principle is exemplified on that page.

3. CSS Grid must be used for the main section of the page.

4. They must use media queries

5. If they did not post their page in the dicussion board for peer review, encourage them to do so this next week.

Week 3

1. Use the specifications listed in the Chamber of Commerce Site Project description to drive your plan.

Week 4

1. The header must contain a logo, site name, and navigation (nav), spanning the entire screen in the large view.

2. The navigation contains four page links and two social media external links. The navigation menu starts with a 'hamburger' button in the small and medium views and is visible in the larger view. The menu must be responsive and use JavaScript to respond to user behavior and toggle between not showing any menu items and showing all the menu items.

3. The main section will not be built at this stage of the project but placeholder blocks and general layout should be started. The illustrations provide the sections that are required and where they are to be placed in the respective view sizes. The sections include hero image and call to action, news, event(s), weather, join, and two to three company spotlights.

4. The footer contains the logo (a placeholder icon/image is fine for now), contact information, a link to a map, and a base footer with a dynamic copyright year (driven by JavaScript), site name, your name, "WDD 230 Project", and the last modification date driven by JavaScript.

Week 8

form field
method = get
action = "thankyou.html"

input type="text"
first name
last name
title
business name/title

input type="email"
email

input type="tel"
cell phone number

input type="hidden"
date and time

required
first name
last name
email
cell phone number
business name/title

placeholder
email

only alpha, hyphens, and spaces using regular expression
title

minimum 7 characters using regular expression
title

membership level selection
probably a select or radio buttons
4 membership levels with increasing costs/benefits, no fee for lowest
display benefits to the side of form in larger views

textarea
business description

button type="submit" or input type="submit"

name attribute on all 10 elements

label tag for all 10 form elements


Install

1. git clone https://github.com/byuics213/wdd230.git

2. In terminal, cd to the directory where you cloned the repository on your machine.

3. Install npm and node, if they are not already installed. 

4. npm init

5. npm install cypress --save-dev

6. add "cypress:open": "cypress open" to "scripts" in your package.json file.

7. Open terminal and run npm run cypress:open

8. A cypress window should open to show the test being run.

The file cypres/fixtures/students.json contains an array of the student's github accounts. It will need to be (manually?) updated each semester.

After the tests run there will be a file in the root folder named something like week1.html. Open this file in a browser. At the top you will see next and back buttons and at the bottom you will see the student's file in a frame. This allows us to quickly flip through the student's files. This, of course, assumes students are naming their files correctly.

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