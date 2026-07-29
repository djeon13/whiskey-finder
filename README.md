# 🥃 Wolf and Crane Whiskey Library

The Whiskey Library is a React web application that helps users discover whiskey recommendations based on their flavor preferences. Users can select up to two flavor profiles, optionally filter by price range and country, and receive personalized recommendations from a curated whiskey collection.

This project was developed as the **TripleTen Software Engineering Custom Final Project**.


## Features

- Personalized whiskey recommendation engine
- Select up to two flavor profiles
- Optional price range filter
- Optional country filter
- Interactive flavor guide with tasting notes
- Whiskey details modal with:
  - Bottle information
  - Flavor profile
  - Barrel types
  - Bartender recommendation
- Animated recommendation cards
- Custom whiskey-themed loading animation
- Responsive design for desktop, tablet, and mobile devices

## Recommendation Algorithm

Recommendations are generated using the following process:

1. The user selects up to two flavor categories.
2. The application filters the whiskey collection to bottles matching **all** selected flavor categories.
3. Optional price and country filters are applied.
4. Remaining bottles are scored based on flavor similarity and selected filters.
5. The three highest-scoring whiskeys are displayed.

This recommendation process is designed to simulate the experience of receiving suggestions from a knowledgeable bartender rather than simply filtering a list.


## Technologies Used

- React
- Vite
- React Router
- JavaScript (ES6+)
- CSS3
- Responsive Web Design
- BEM Methodology


## Responsive Design

The application is responsive and optimized for:

- Desktop
- Tablet
- Mobile

## Future Improvements

Planned features include:

- Backend database integration
- User authentication
- Favorite whiskey list
- AI-assisted recommendations
- Inventory management
- Search by bottle or distillery
- Food pairing suggestions
- Whiskey comparison tool

## Screenshots

Add screenshots before submitting:

- Home page
- Whiskey Finder
- Recommendation results
- Whiskey Details modal
- Mobile layout

## Live Demo

Frontend:
https://djeon13.github.io/whiskey-finder/

Backend API:
https://wolf-crane-api-daniel.onrender.com

## Project Video

https://www.loom.com/share/384d54c81a404befb90f4d9bfa61b766

## Author

Developed by Da In Jeon as part of the TripleTen Software Engineering program.