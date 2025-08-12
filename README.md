# Cocktail Recipe Collection

A beautiful, modern web application for collecting and managing cocktail recipes. Built with vanilla HTML, CSS, and JavaScript, this application provides a seamless experience for storing, searching, and viewing cocktail recipes.

## Features

### 🍸 Recipe Management
- **Add New Recipes**: Complete form with all required fields
- **Recipe Fields**:
  - Cocktail name (single line text)
  - Primary liquor base (dropdown selection)
  - Ingredients and instructions (long text area)
  - Cocktail image (optional file upload)
- **Local Storage**: All recipes are saved locally in your browser

### 🔍 Search & Filter
- **Search by Name**: Find cocktails by their name
- **Search by Liquor Base**: Filter by primary alcohol type
- **Search by Ingredients**: Search within recipe content
- **Real-time Search**: Results update as you type
- **Combined Filtering**: Use search and liquor filter together

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Gradients**: Modern purple gradient background
- **Smooth Animations**: Hover effects and transitions
- **Card-based Layout**: Clean, organized recipe display
- **Modal View**: Click any recipe to view full details

### 📱 User Experience
- **Image Preview**: See uploaded images before saving
- **Form Validation**: Required fields are enforced
- **Success Notifications**: Confirmation when recipes are added
- **Keyboard Shortcuts**: 
  - `Escape` to close modals
  - `Ctrl/Cmd + Enter` to submit forms
- **Auto-save Draft**: Form data is saved as you type

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. Start adding your cocktail recipes!

### File Structure
```
cocktail-recipes/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## How to Use

### Adding a Recipe
1. Fill in the "Cocktail Name" field
2. Select the "Primary Liquor Base" from the dropdown
3. Enter ingredients and instructions in the text area
4. Optionally upload a cocktail image
5. Click "Add Recipe" to save

### Searching Recipes
- Use the search bar to find recipes by name, liquor base, or ingredients
- Use the liquor filter dropdown to show only specific types of cocktails
- Combine both search and filter for precise results

### Viewing Recipes
- Click on any recipe card to open a detailed modal view
- The modal shows the full recipe with image, ingredients, and creation date
- Close the modal by clicking the X or pressing Escape

## Sample Recipes

The application comes with three sample recipes to get you started:
- **Classic Margarita** (Tequila-based)
- **Negroni** (Gin-based)
- **Old Fashioned** (Whiskey-based)

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Data Storage

All recipe data is stored locally in your browser's localStorage. This means:
- ✅ No server required
- ✅ Works offline
- ✅ Data persists between browser sessions
- ⚠️ Data is browser-specific (won't sync across devices)
- ⚠️ Clearing browser data will remove recipes

## Customization

### Adding New Liquor Types
To add new liquor base options, edit the `<select>` elements in `index.html` and the `sampleRecipes` array in `script.js`.

### Styling Changes
Modify `styles.css` to customize colors, fonts, and layout. The application uses CSS custom properties for easy theming.

### Features to Add
Potential enhancements you could implement:
- Recipe categories/tags
- Recipe ratings and reviews
- Export/import functionality
- Recipe sharing via URL
- Print-friendly recipe cards
- Recipe scaling (serving size adjustment)

## Troubleshooting

### Recipes Not Saving
- Ensure JavaScript is enabled in your browser
- Check that localStorage is not disabled
- Try clearing browser cache and reloading

### Images Not Displaying
- Ensure the image file is a valid image format (JPG, PNG, GIF, etc.)
- Check that the file size isn't too large (recommended < 5MB)
- Try refreshing the page if images don't load immediately

### Search Not Working
- Make sure you're typing in the search field
- Check that the search term matches part of the recipe name, liquor base, or ingredients
- Try clearing the search field and liquor filter

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Enjoy mixing your favorite cocktails! 🍹** 