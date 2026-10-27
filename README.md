# 🥃 Wolf & Crane Whiskey Library

An interactive **React and TypeScript frontend application** that helps users explore a curated whiskey collection and discover bottles that match their taste preferences.

Users can select up to two flavor profiles, optionally filter by price range and country of origin, and receive three tailored recommendations through a **client-side recommendation engine**. The application combines custom recommendation logic, structured whiskey data, and a responsive, whiskey-themed interface to create an intuitive discovery experience.

**[Live Demo](https://djeon13.github.io/whiskey-finder/)** · **[Project Video](https://www.loom.com/share/384d54c81a404befb90f4d9bfa61b766)**

---

## ✨ Features

- **Personalized Recommendations** — Discover whiskeys based on selected flavor preferences and optional filters.
- **Flavor Profile Selection** — Choose up to two flavor categories to narrow down the collection.
- **Price & Country Filters** — Refine recommendations by price range and country of origin.
- **Interactive Flavor Guide** — Explore flavor categories and tasting notes.
- **Detailed Whiskey Profiles** — View bottle information, flavor profiles, barrel types, and bartender recommendations.
- **Interactive UI** — Animated recommendation cards and a custom whiskey-themed loading animation.
- **Responsive Design** — Optimized for desktop, tablet, and mobile devices.

## 🧠 How the Recommendation Engine Works

The recommendation engine runs entirely on the client side, using TypeScript and the application's curated whiskey data stored in JSON. It evaluates user preferences and scores matching bottles directly in the frontend without requiring a backend API for the core recommendation functionality.

1. **Select flavor profiles:** The user chooses up to two flavor categories.
2. **Match flavors:** The application filters the collection for bottles matching all selected flavor categories.
3. **Apply optional filters:** The user can narrow the results by price range and country of origin.
4. **Score candidates:** Remaining bottles are evaluated based on flavor similarity and the selected filters.
5. **Return recommendations:** The three highest-scoring whiskeys are presented to the user.

The goal is to provide a guided discovery experience rather than a traditional filter-only interface.

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, JavaScript (ES6+), React Router
- **Build Tool:** Vite
- **Styling:** CSS3, Responsive Web Design, BEM Methodology
- **Data Management:** Curated whiskey collection stored in JSON
- **Deployment & CI/CD:** GitHub Pages, GitHub Actions
- **Version Control:** Git, GitHub

## 📱 Responsive Design

The interface adapts to different screen sizes to provide a consistent experience across desktop, tablet, and mobile devices.

## 🔮 Future Improvements

Potential enhancements include:

- Backend database integration
- User authentication
- Favorite whiskey lists
- AI-assisted recommendations
- Inventory management
- Search by bottle or distillery
- Food pairing suggestions
- Whiskey comparison tools

## 🔗 Links

- **Live Application:** https://djeon13.github.io/whiskey-finder/
- **Source Code:** https://github.com/djeon13/whiskey-finder
- **Project Video:** https://www.loom.com/share/384d54c81a404befb90f4d9bfa61b766

## 👨‍💻 Author

**Daniel Jeon**

[GitHub](https://github.com/djeon13) · [LinkedIn](https://www.linkedin.com/in/da-in-jeon)
