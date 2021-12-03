# Sylvan Library

## Description

Many Magic: the Gathering (MTG) enthusiasts run into the same issue; they find the game, fall in love, and dive in way too deep. Most players, if not all players, become quickly overwhelmed by their collection. One pack of cards per set can quickly balloon into a booster box per set, and that’s not counting all of the supplementary products and individual cards we buy. The question becomes, how can you organize your collection, and how can you get information that makes your collection work for you? That’s where Sylvan Library comes in.

### Problem

This solution rose from my own research regarding what I should do with my Magic card collection. When it comes down to any individual Magic card, there’s typically two routes a player can take; they can either use their card in a deck to play, or they can trade it off for some other card they’d rather have. Most websites focus on one of these functions, which makes sense; why sell your card when you would rather play with it, and why play with a card whose main value is in the market? My goal is to create a site that combines these two paths, and provides the user with a holistic picture of their cards position in the market and meta.

### User Profile

The typical user will be any one that owns a physical collection of MTG cards. They’ll be using the application to track their collection, and will use its features to inform their decisions on what they’ll do with their cards. The main consideration for different use-cases will be regarding the formats of the game the user plays (i.e. do they play the Standard format of the game, Legacy, or Commander?). For the purposes of this project, the application will be focused on the most popular format, Commander. If time permits, additional functionality will be added to provide users with information regarding other formats as well.

### Use Cases and Features

The primary aspect of this project is creating a database structure that organizes existing information; your Magic collection. We want to be able to easily add, sort, search, and delete information regarding that.

The other aspect is taking that data and producing useful information. First feature to tackle will be reporting prices of individual cards or a selection of cards, as well as providing avenues with which to buy/sell cards. The user will be able to discover deck ideas utilizing cards in your collection; this will take the form of selecting a card, and finding decks that include the specified card.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Installation

### Server

To create default-cards.json, download the provide JSON file (Default Cards) from Scryfall's website: https://scryfall.com/docs/api/bulk-data

Add values to .env

- PORT should be set to a port number
- JWT_SECRET should be set to a string without spaces

If nodemon is not installed, substitute nodemon command with node index.js

In Git Bash:

```
cd server
npm install
nodemon index.js
```

### Client

In Git Bash:

```
cd client
npm install
npm start
```

## Future Plans

### Server-Side Database

Due to time constraints, data was stored in json files. I would like to utilize knex.js to build out database tables to store information in the future to allow for greater data storage, as well as more robust cross-table lookups.

Dynamic generation of information would be an ideal upgrade as well. Currently, the home page carousel, decks data and cards data are all static. This would likely require API calls on server startup, as well as additional code to more efficiently parse data.

### Added Client-Side Functionality

I'd like to add functionality to report price history for individual cards, as well as functionality to search for decks containing groups of cards. Another goal would be to display more information to the user regarding their collection. A wishlist feature could be added to the interface, and it could be linked to the individual card stats to show you how much of your wishlist you could afford if you sold off a single card (card prices can range between a couple of cents to hundreds of dollars). This would require additional queries to the DB to provide wishlist information whenever a given card’s page is accessed.

The final stretch goal would be to present the user with more dynamic decklist information; namely, decklists that take into account potential substitutions. Most decklists are optimized to contain cards that are the best at what they do, but MTG players won’t always have all of the best cards in their collection. If a user was set on building a specific deck, but they don’t own all of the necessary cards, it would be ideal to provide them with side-grades or down-grades to cards that already exist in their collection. This would likely involve filter functionality for specific words, or additional fields to be maintained in the DB that categorize each card’s role in a deck.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
