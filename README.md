Masterplan is a creative web project featuring a landing page with three interactive cards, each leading to a unique experience:

🌍 Codename 'Hello World' 🌍
A Cesium globe surrounded by cards displaying thoughts, coding jokes, and memes. The background is filled with randomly generated coding humor.

🧘 Resting Place 🧘
A calming page with a Buddha statue and floating zen messages to promote peace and a little introspection.

💻 Terminal 💻
An interactive terminal where users can type in text. Each input is saved locally, creating a personal text history that persists between visits.

Features
- 3D Cesium globe
- Confetti animations
- Terminal with localStorage
- Randomly generated background text
- Fully responsive using Tailwind CSS

Tech Stack
HTML, Tailwind CSS, JavaScript, Cesium

How to View (For a full and better experience use desktop)

Visit the GitHub Pages
https://viggsv.github.io/Masterplans/

Repository URL
https://github.com/ViggsV/Masterplans.git

Known bugs:
- (Codename - Hello World) changing from big screen to small screen some cards stacking action is misbehaving visually (translating from the right)
- (Resting Place) Minimizing on url and maximizing will spawn lots of floating text on top of each other

Potential improvements:
- Improve small screen layout
- (Codename - Hello World) improve the layout of cards. Maybe create 3D depth to the scene. Add onclick events for cards.
- (Resting Place) add interactivity. Possibility to select calm sound effects / music. Add subtle glow to the buddha.
- (Terminal) Create a server to store user inputs.

Developer Note
I kept a JSON file of my initial terminal log for memorabilia which I left in the repo
