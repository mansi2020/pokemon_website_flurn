# Pokémon Search and Listing Website

This is a React-based web application that utilizes Context API, CSS styling, routing, and different components to implement a Pokémon search, listing, details, and comparison functionalities.

## Hosted Link :
https://pokemon-website-flurn.vercel.app/

## Features

### Search Page

- The search page allows users to input a Pokémon name and initiate a search.
- An API call is made to fetch the details of the searched Pokémon.
- A loading indicator is displayed during API call execution.
- Error messages are shown if the API call fails.

### Listing Page

- Shows all Pokémon retrieved from the API response.
- Displays Pokémon images and titles in a grid format.
- Implements infinite scrolling to load more Pokémon as the user scrolls down.
- Provides filtering options based on abilities, characteristics, group, habitat, location, species, etc.
- Ensures smooth functionality even with a large number of Pokémon loaded.

### Details Page

- Displays detailed information about a selected Pokémon.
- Properly formats and presents the Pokémon details fetched from the API.
- Includes a bookmark icon to save the Pokémon as a favorite.
- Indicates bookmarked Pokémon with a filled bookmark icon.
- Allows users to toggle bookmark status by clicking the bookmark icon.

### Compare Pokémon Page

- Allows users to select two Pokémon from the listing and compare their details.
- Displays selected Pokémon details side by side, including moves, types, images, and stats.

### Bookmarks Screen

- Displays all bookmarked Pokémon saved locally on the device.
- Allows users to remove Pokémon from bookmarks.

## Components and Routing

The website consists of multiple components and utilizes React Router for navigation:

- **Search Page (`Search.js`)**: Handles Pokémon search functionality.
- **Listing Page (`Listing.js`)**: Displays a grid of Pokémon fetched from the API with infinite scrolling and filtering options.
- **Details Page (`PokemonDetails.js`)**: Shows detailed information of a selected Pokémon and allows bookmarking.
- **Compare Pokémon Page (`PokemonCompare.js`)**: Bonus feature to compare details of two Pokémon side by side.
- **Bookmarks Screen (`Bookmarks.js`)**: Bonus feature to display and manage bookmarked Pokémon.

## Setup

To run this project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd pokemon-website`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Technologies Used

- React.js
- React Router
- Context API (for state management)
- Axios (for API calls)
- Material-UI (for icons and components)
- CSS (for styling)




