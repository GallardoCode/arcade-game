# Arcade Game
This Arcade game for the udacity frontend course. It's a repilica of the frogger games of old. Get your character accross the path while avoiding enemies. Each crossing increases your level but also the difficulty.

## Tabel of Contents
- [Arcade Game](#arcade-game)
  - [Tabel of Contents](#tabel-of-contents)
  - [Objectives and Requirements](#objectives-and-requirements)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Acknowledgments](#acknowledgments)

## Objectives and Requirements

Requirements for the project can be found in the Udacity project specifications [here](https://review.udacity.com/#!/rubrics/15/view).

## Technologies
This project was made with the following technologies:

- HTML5
- CSS3
- Javascript ES6
- Foundation ZURB stack (Pannini, Sass, Webpack, npm )

Source code found in /src, compiled site runs from /dist

## Getting Started

To run the game locally on your machine, you need to have [node.js](https://nodejs.org/en/) and [git](https://git-scm.com/) installed on your computer.

Download and go to the project folder and install dependencies
```
cd arcadegame
npm install
```

Once installed, you can now run `npm start` to build the project. This will create a dist folder to be used by the webserver and viewable at 
`http://localhost:8000`

For production ready project with full compression on code and assets then use

```
npm run build
```

### Prerequisites
Foundation uses babel to make es6 code as backwards compatible as much as possible, the limitations can be found [here](https://babeljs.io/docs/en/caveats).

## Acknowledgments
- Art assets and requestAnimationFrame loop engine proveded by [Udacity](https://github.com/udacity/frontend-nanodegree-arcade-game)
- Google Fonts - Do Hyendo and Hanalei Fill [here](https://fonts.google.com/selection?selection.family=Do+Hyeon|Hanalei+Fill)
- FontAwesome Sass version [here](https://fontawesome.com/how-to-use/on-the-web/using-with/sass)