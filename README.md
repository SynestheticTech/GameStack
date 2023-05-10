# GameStack

GameStack is a video game discovery web app, which functions to help users browse games that suit their gaming style. 

The motivation behind this project was aimed at practicing skills working with TypeScript, React, Vite, Chakra-UI, and Cypress. The UI side of the project, is the result of following Mosh Hamedani's Ultimate React course, and can be found [here](https://codewithmosh.com ) amongst many other great courses. Cypress, was a testing framework I had been meaning to learn, and was an addition I felt the project would benefit from.

## Getting Started

To setup the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm i` to install the required dependencies.
3. Obtain your own RAWG API key [here](https://rawg.io/apidocs) after making an account.
4. Create two folders at the root and add your API key:
* `.env`
  > VITE_RAWG_API_KEY="<your_key>"
* `cypress.env.json`
  > {
  "RAWG_API_KEY": "<that_same_key>"
}
5. Run `npm run dev` to start the web server.

