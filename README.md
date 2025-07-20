###### Overview
This repository contains the updated codebase for Godoora v11 onwards, featuring recent changes, bug fixes, and upgraded dependencies. This release focuses on compatibility, security, and improved modularity.

## Prerequisites
Before running the app, ensure the following are installed:

Node.js v18.x or higher

npm v9.x or higher

Angular CLI v18+

 ### Install via:
npm install -g @angular/cli

### Installation
Clone the repo and install dependencies:
## step 1: git clone https://github.com/your-org/godoora-v11-onwards.git
cd godoora-v11-onwards
## step 2: go to vs code and open the terminal.

## step 3: Run the following command in the terminal: npm install 
if the command throws error, try npm install --legacy-peer-deps or --force(last resort).


### Running the App Locally
## Start the development server:
ng serve
# OR 
npm run build and then npm start 

## Then open your browser at:
http://localhost:4200/



### Known Issues
1. Social login library conflict with Angular 18	
Workaround: use --legacy-peer-deps
2. Windows firewall was blocking the execution of scripts from VS code.  FIX: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned.
3. node-gyp ERR! find VS You need to install the latest version of Visual Studio including the "Desktop development with C++" workload. - > FIX: install the necessary SDK components and the c++ components in the visual studio application.


### Recent Changes
✅ Upgraded to Angular v18 by adhering to all the standard and modern coding practices that are relevant to the industry standards.

✅ Integrated @abacritt/angularx-social-login as the earlier login module that was being used was deprecated. 

✅ Replaced deprecated entryComponents.. and replaced them with standalone components.

✅ Refactored routing module to work with angular v18 seamlessly.

✅ Bug fixes for carousel rendering, modals, and routing modules.

✅ Upgraded to ionic version 6 successfully to be compatible to work with angular v18.

✅ changed the css styling of login-modal to match the previous styling of the prod application(angular version 8).


