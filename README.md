🧾 Overview
This repository contains the updated codebase for Godoora v11 onwards, featuring recent changes, bug fixes, and upgraded dependencies. This release focuses on compatibility, security, and improved modularity.

✅ Prerequisites
Before running the app, ensure the following are installed:

Node.js v18.x or higher

npm v9.x or higher

Angular CLI v18+
Install via:

bash
Copy
Edit
npm install -g @angular/cli
⚙️ Installation
Clone the repo and install dependencies:

bash
Copy
Edit
git clone https://github.com/your-org/godoora-v11-onwards.git
cd godoora-v11-onwards
npm install --legacy-peer-deps
🚀 Running the App Locally
Start the development server:

bash
Copy
Edit
ng serve
Then open your browser at:

arduino
Copy
Edit
http://localhost:4200/
Use --configuration=production for production build:

bash
Copy
Edit
ng build --configuration=production
📁 Folder Structure
css
Copy
Edit
src/
  ├── app/
  ├── assets/
  ├── environments/
  └── index.html
Most app logic lives inside src/app/.

🐞 Known Issues
Issue ID	Description	Status
#42	Social login library conflict with Angular 18	⚠ Workaround: use --legacy-peer-deps
#56	Owl Carousel not styling correctly in mobile view	🛠 Pending fix
#71	Lazy loading not optimized for media-heavy routes	✅ Fixed

🔄 Recent Changes
✅ Upgraded to Angular v18

✅ Integrated @abacritt/angularx-social-login

✅ Replaced deprecated entryComponents

✅ Refactored routing module

✅ Bug fixes for carousel rendering, modals, and routing

🤝 Contributors
Alankrit — Dev Lead

Prasad N — Code Reviewer & QA

And the rest of the awesome team 🛠️

📬 Need Help?
Feel free to open an issue or ping on the internal Slack channel #godoora-dev.

