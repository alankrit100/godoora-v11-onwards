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



### Changes in the package.json file:
NOTE: The package.json file is being referred as this would cover all the major library changes/ommission, and all the version changes that have been made to the codebase.

 - Upgraded Angular from 8 → 18
 - Replaced deprecated angularx-social-login with @abacritt/angularx-social-login
 - Ionic from v5 → v6.7.5
 - Capacitor CLI upgraded from v1.5.1 → v6.2.1
 - Major dev tooling upgrade: TypeScript, Karma, Jasmine to versions 5.5.4, and v6+ ranges respectively.
 - Replaced deprecated angularx-social-login with @abacritt/angularx-social-login
 - Removed ngx-ui-switch
 - cordova-res still exists with a vulnerable sharp dependency


### Files Modified:
 - all the component files(with the .ts extension) have been converted to standalone files.
 - menu.page.html and menu.page.scss have been rewritten to match the previous login-modal component.
 - global.scss for some more enhanced styling
 - stores.page.html and .css files have been ommiteed respectfully for the addition of the owl-carousel component.
 - ** Important Update in app.const.ts file **
all the arrays in the previous app.const.ts file have been deleted; and moved to seperate files under the Vendors folder.
Each file has been imported under a new class called vendors in the app.const.ts file. 
if any change is needed to be made in any of the hotel url domain info, the user can now directly go to the respective file and make changes there itself.
This makes the code look less bulky and gives free move to the editors who are working on the project, thus helping create an hasstlefree environment.

   Apart from these, all the standard Angular and Ionic migration procedure had been followed on an incremental approach so it would be difficult to keep track of each one of them. However, The application has been upgraded with utmost caution and special attention has been given to all the breaking and deprecating changes in the codebase; hence leading to successfull upgradation and working of the production website.

