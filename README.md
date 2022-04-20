1. git clone https://github.com/byuics213/wdd230.git

2. In terminal, cd to the directory where you cloned the repository on your machine.

3. Install npm and node, if they are not already installed. 

4. npm init

5. npm install cypress --save-dev

6. add "cypress:open": "cypress open" to "scripts" in your package.json file.

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