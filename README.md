Web Trends Lab

Description

Web Trends Lab is a simple event scheduling web application developed for a university project at Fanshawe College, as part of the Web Development Trends course. It integrates Firebase for event management and authentication, as well as Tidio AI Chatbot for user interaction. The project emphasizes accessibility, achieving a score of 9 in accessibility tests. The website is fully hosted on GitHub Pages with CI/CD integration.

Technologies Used

HTML5

CSS3

JavaScript

Firebase (Authentication & Database)

Tidio AI Chatbot

GitHub Pages (CI/CD Deployment)

Setup & Execution

To run the project locally:

Clone this repository:

git clone https://github.com/leandrosdc/webtrendslab.git

Navigate to the project directory:

cd webtrendslab

Start a local server using Live Server (required for Firebase to work properly):

If using VS Code, install the Live Server extension and click "Go Live."

Alternatively, run the following command in the terminal (if Python is installed):

python -m http.server

Open the provided local URL in your browser.

Live Site

The project is hosted on GitHub Pages and can be accessed via:
Web Trends Lab - Live

Features

Event scheduling with Firebase integration

Google Authentication via Firebase Authenticator

AI Chatbot powered by Tidio

Simple file structure (index.html, style.css, script.js)

Accessibility score of 9

Areas for Improvement

Users can only register new events if logged in, but this is not explicitly communicated yet.

The mobile version was designed based on iPhone 13 but still exceeds the base screen size slightly.

Some text content is still in Portuguese and needs to be fully translated into English.

Browser authentication for Google login is not clearly indicated to users, leading to confusion.

The login popup remains open for about 4 minutes after authentication; it should close as soon as login is successful.

The event list is only visible if the user is logged in and has registered at least one event. This needs to be adjusted for better user experience.

The chatbot currently does not provide any responses. It needs to be configured with keywords and predefined answers for common questions.

Author

Leandro Sena da Costa - 1094444

License

This project is for academic purposes and does not have a specific license.

