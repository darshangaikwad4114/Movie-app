<div align="center">

# FilmFinder

A modern movie discovery application built with React

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENCE)

</div>

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **State Management**: React Hooks (useState, useEffect, useCallback, useMemo)
- **HTTP Client**: Axios
- **Styling**: Bootstrap 5, CSS Modules
- **Component Architecture**: Functional Components with Custom Hooks
- **API**: OMDB API for movie data
- **Optimization**: Lazy loading, Virtualization, Custom image optimization
- **Performance**: React.memo, useCallback, useMemo for optimized rendering
- **Accessibility**: ARIA attributes, Focus management, Skip links
- **Development Tools**: ESLint, Prettier
- **Error Handling**: Error boundaries, API error handling

## 📖 Description

FilmFinder is a dynamic and responsive web application that allows users to discover, search, and collect their favorite movies. The application fetches movie data from the OMDB API, presenting it in an intuitive and visually appealing interface. Users can search for specific movies, browse through popular categories, and maintain a personalized collection of favorite movies for future reference.

## ✨ Key Features

- **Comprehensive Movie Search**: Search for any movie using the OMDB API with real-time results
- **Categorized Movie Browsing**: Explore movies across popular franchises like Avengers, Harry Potter, and more
- **Favorites Collection**: Save preferred movies to a dedicated favorites section for quick access
- **Responsive Design**: Seamless experience across all device sizes from mobile to desktop
- **Performance Optimization**: Lazy loading, virtualization, and caching strategies for smooth user experience
- **Accessibility Compliant**: Focus management, ARIA attributes, and keyboard navigation support

## ⚙️ Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/film-finder.git
   cd film-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   
   Create a `.env` file in the root directory with:
   ```
   REACT_APP_OMDB_API_KEY=your_omdb_api_key
   ```
   
   > Note: You can get an API key from [OMDB API](https://www.omdbapi.com/apikey.aspx)

4. **Start the development server**
   ```bash
   npm start
   ```

## 🚀 Usage

1. **Browsing Movies**
   - When you first open the application, you'll see popular movie categories
   - Scroll through each section to explore different movie franchises

2. **Searching Movies**
   - Use the search bar in the navigation to find specific movies
   - Results will appear in real-time as you type

3. **Managing Favorites**
   - Click the heart icon on any movie to add it to your favorites
   - Access your favorites collection by scrolling to the "FAVORITES" section
   - Remove movies from favorites by clicking the remove button on favorited movies

4. **Movie Details**
   - Click on a movie card to view additional information about the movie

## 🤝 Contributing

Contributions are always welcome! Here's how you can contribute:

1. **Fork the repository**
   - Click the "Fork" button at the top right of this page

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/film-finder.git
   cd film-finder
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Implement your features or bug fixes
   - Follow the existing code style and organization

5. **Test your changes**
   ```bash
   npm test
   ```

6. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

7. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Create a Pull Request**
   - Open a pull request from your fork to the main repository
   - Provide a clear description of the changes and reference any related issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.

## 📞 Contact

If you have any feedback, please reach out to us at --> darshangaikwad4114@gmail.com
