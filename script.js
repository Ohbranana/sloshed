// Global variables
let recipes = JSON.parse(localStorage.getItem('cocktailRecipes')) || [];
let filteredRecipes = [...recipes];

// DOM elements
const recipeForm = document.getElementById('recipeForm');
const recipesContainer = document.getElementById('recipesContainer');
const noRecipes = document.getElementById('noRecipes');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const liquorFilter = document.getElementById('liquorFilter');
const recipeImage = document.getElementById('recipeImage');
const imagePreview = document.getElementById('imagePreview');
const modal = document.getElementById('recipeModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');
const recipeTags = document.getElementById('recipeTags');
const tagSuggestions = document.getElementById('tagSuggestions');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayRecipes();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Form submission
    recipeForm.addEventListener('submit', handleFormSubmit);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    
    // Filter functionality
    liquorFilter.addEventListener('change', handleFilter);
    
    // Image preview
    recipeImage.addEventListener('change', handleImagePreview);
    
    // Tag autocomplete
    recipeTags.addEventListener('input', handleTagInput);
    recipeTags.addEventListener('keydown', handleTagKeydown);
    recipeTags.addEventListener('blur', hideTagSuggestions);
    
    // Modal functionality
    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalHandler();
        }
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(recipeForm);
    const recipe = {
        id: Date.now(),
        name: formData.get('name').trim(),
        liquorBase: formData.get('liquorBase'),
        tags: formData.get('tags').trim().split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        ingredients: formData.get('ingredients').trim(),
        image: null,
        createdAt: new Date().toISOString()
    };
    
    // Handle image
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            recipe.image = e.target.result;
            addRecipe(recipe);
        };
        reader.readAsDataURL(imageFile);
    } else {
        addRecipe(recipe);
    }
}

// Add recipe to storage and display
function addRecipe(recipe) {
    recipes.unshift(recipe);
    filteredRecipes = [...recipes];
    saveRecipes();
    displayRecipes();
    resetForm();
    showNotification('Recipe added successfully!', 'success');
}

// Save recipes to localStorage
function saveRecipes() {
    localStorage.setItem('cocktailRecipes', JSON.stringify(recipes));
}

// Display recipes
function displayRecipes() {
    if (filteredRecipes.length === 0) {
        recipesContainer.style.display = 'none';
        noRecipes.style.display = 'block';
        return;
    }
    
    recipesContainer.style.display = 'grid';
    noRecipes.style.display = 'none';
    
    recipesContainer.innerHTML = filteredRecipes.map(recipe => `
        <div class="recipe-card" onclick="openRecipeModal(${recipe.id})">
            <div class="recipe-image">
                ${recipe.image ? 
                    `<img src="${recipe.image}" alt="${recipe.name}" style="width: 100%; height: 100%; object-fit: cover;">` :
                    `<i class="fas fa-glass-martini-alt"></i>`
                }
            </div>
            <div class="recipe-content">
                <h3 class="recipe-name">${recipe.name}</h3>
                <span class="recipe-liquor">${recipe.liquorBase}</span>
                ${recipe.tags && recipe.tags.length > 0 ? `
                    <div class="recipe-tags">
                        ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <p class="recipe-ingredients">${recipe.ingredients}</p>
            </div>
        </div>
    `).join('');
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const liquorFilterValue = liquorFilter.value;
    
    filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) ||
                            recipe.liquorBase.toLowerCase().includes(searchTerm) ||
                            recipe.ingredients.toLowerCase().includes(searchTerm) ||
                            (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
        
        const matchesFilter = !liquorFilterValue || recipe.liquorBase === liquorFilterValue;
        
        return matchesSearch && matchesFilter;
    });
    
    displayRecipes();
}

// Handle filter
function handleFilter() {
    handleSearch();
}

// Handle image preview
function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.innerHTML = '';
    }
}

// Open recipe modal
function openRecipeModal(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    modalContent.innerHTML = `
        <div class="modal-actions">
            <button onclick="editRecipe(${recipe.id})" class="modal-btn edit-btn">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button onclick="deleteRecipe(${recipe.id})" class="modal-btn delete-btn">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
        ${recipe.image ? 
            `<img src="${recipe.image}" alt="${recipe.name}" class="modal-recipe-image">` :
            `<div class="modal-recipe-image" style="background: #000000; display: flex; align-items: center; justify-content: center; color: #f6a73a; font-size: 4rem;">
                <i class="fas fa-glass-martini-alt"></i>
            </div>`
        }
        <h2 class="modal-recipe-name">${recipe.name}</h2>
        <span class="modal-recipe-liquor">${recipe.liquorBase}</span>
        ${recipe.tags && recipe.tags.length > 0 ? `
            <div class="modal-recipe-tags">
                ${recipe.tags.map(tag => `<span class="modal-recipe-tag">${tag}</span>`).join('')}
            </div>
        ` : ''}
        <div class="modal-recipe-ingredients">${recipe.ingredients}</div>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333333; color: #666666; font-size: 0.9rem;">
            Added on ${new Date(recipe.createdAt).toLocaleDateString()}
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Edit recipe
function editRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    // Populate form with recipe data
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('liquorBase').value = recipe.liquorBase;
    document.getElementById('recipeTags').value = recipe.tags ? recipe.tags.join(', ') : '';
    document.getElementById('ingredients').value = recipe.ingredients;
    
    // Show image preview if exists
    if (recipe.image) {
        imagePreview.innerHTML = `<img src="${recipe.image}" alt="Preview">`;
    }
    
    // Change form to edit mode
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Recipe';
    submitBtn.onclick = function(e) {
        e.preventDefault();
        updateRecipe(recipeId);
    };
    
    // Close modal and scroll to form
    closeModalHandler();
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Edit mode activated. Update the recipe below.', 'info');
}

// Update recipe
function updateRecipe(recipeId) {
    const recipeIndex = recipes.findIndex(r => r.id === recipeId);
    if (recipeIndex === -1) return;
    
    const formData = new FormData(recipeForm);
    const updatedRecipe = {
        ...recipes[recipeIndex],
        name: formData.get('name').trim(),
        liquorBase: formData.get('liquorBase'),
        tags: formData.get('tags').trim().split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        ingredients: formData.get('ingredients').trim(),
        updatedAt: new Date().toISOString()
    };
    
    // Handle image update
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            updatedRecipe.image = e.target.result;
            saveUpdatedRecipe(recipeIndex, updatedRecipe);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveUpdatedRecipe(recipeIndex, updatedRecipe);
    }
}

// Save updated recipe
function saveUpdatedRecipe(recipeIndex, updatedRecipe) {
    recipes[recipeIndex] = updatedRecipe;
    filteredRecipes = [...recipes];
    saveRecipes();
    displayRecipes();
    resetForm();
    
    // Reset form to add mode
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Recipe';
    submitBtn.onclick = null; // Remove custom onclick
    
    showNotification('Recipe updated successfully!', 'success');
}

// Delete recipe
function deleteRecipe(recipeId) {
    if (confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
        const recipeIndex = recipes.findIndex(r => r.id === recipeId);
        if (recipeIndex !== -1) {
            recipes.splice(recipeIndex, 1);
            filteredRecipes = [...recipes];
            saveRecipes();
            displayRecipes();
            closeModalHandler();
            showNotification('Recipe deleted successfully!', 'success');
        }
    }
}

// Reset form
function resetForm() {
    recipeForm.reset();
    imagePreview.innerHTML = '';
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some sample recipes if no recipes exist
if (recipes.length === 0) {
    const sampleRecipes = [
        {
            id: 1,
            name: "Classic Margarita",
            liquorBase: "Tequila",
            tags: ["summer", "refreshing", "citrus", "classic"],
            ingredients: `Ingredients:
• 2 oz Tequila blanco
• 1 oz Fresh lime juice
• 1 oz Triple sec or Cointreau
• 1/2 oz Simple syrup (optional)

Instructions:
1. Rim a chilled glass with salt
2. Combine all ingredients in a shaker with ice
3. Shake vigorously for 15-20 seconds
4. Strain into the prepared glass
5. Garnish with a lime wheel

Perfect for: Summer parties, Mexican cuisine, or anytime you want a refreshing citrus cocktail!`,
            image: null,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            name: "Negroni",
            liquorBase: "Gin",
            tags: ["bitter", "sophisticated", "aperitif", "italian"],
            ingredients: `Ingredients:
• 1 oz Gin
• 1 oz Sweet vermouth
• 1 oz Campari

Instructions:
1. Fill a rocks glass with ice
2. Add all ingredients in equal parts
3. Stir gently for 30 seconds
4. Garnish with an orange peel

A sophisticated Italian classic that's perfect as an aperitif. The bitter Campari balances beautifully with the herbal gin and sweet vermouth.`,
            image: null,
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            name: "Old Fashioned",
            liquorBase: "Whiskey",
            tags: ["classic", "strong", "whiskey", "timeless"],
            ingredients: `Ingredients:
• 2 oz Bourbon or rye whiskey
• 1/4 oz Simple syrup
• 2-3 dashes Angostura bitters
• Orange peel for garnish

Instructions:
1. In a rocks glass, muddle the bitters with simple syrup
2. Add ice cubes
3. Pour in the whiskey
4. Stir gently for 30 seconds
5. Garnish with an orange peel

A timeless classic that showcases the whiskey's character. Perfect for sipping slowly and enjoying the complex flavors.`,
            image: null,
            createdAt: new Date().toISOString()
        }
    ];
    
    recipes = sampleRecipes;
    filteredRecipes = [...recipes];
    saveRecipes();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modal
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalHandler();
    }
    
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        recipeForm.dispatchEvent(new Event('submit'));
    }
});

// Auto-save form data (optional feature)
let formData = {};
recipeForm.addEventListener('input', function(e) {
    if (e.target.name) {
        formData[e.target.name] = e.target.value;
        localStorage.setItem('cocktailFormDraft', JSON.stringify(formData));
    }
});

// Load form draft on page load
const savedFormData = JSON.parse(localStorage.getItem('cocktailFormDraft')) || {};
Object.keys(savedFormData).forEach(key => {
    const element = recipeForm.elements[key];
    if (element) {
        element.value = savedFormData[key];
    }
});

// Clear form draft after successful submission
function clearFormDraft() {
    localStorage.removeItem('cocktailFormDraft');
    formData = {};
}

// Get all existing tags from recipes
function getAllExistingTags() {
    const allTags = new Set();
    recipes.forEach(recipe => {
        if (recipe.tags && recipe.tags.length > 0) {
            recipe.tags.forEach(tag => allTags.add(tag.toLowerCase()));
        }
    });
    return Array.from(allTags).sort();
}

// Handle tag input for autocomplete
function handleTagInput(e) {
    const input = e.target.value;
    const cursorPosition = e.target.selectionStart;
    
    // Get the current tag being typed (the last one after the last comma)
    const lastCommaIndex = input.lastIndexOf(',');
    const currentTag = lastCommaIndex === -1 ? input.trim() : input.substring(lastCommaIndex + 1).trim();
    
    if (currentTag.length > 0) {
        const existingTags = getAllExistingTags();
        const matchingTags = existingTags.filter(tag => 
            tag.toLowerCase().includes(currentTag.toLowerCase()) && 
            tag.toLowerCase() !== currentTag.toLowerCase()
        );
        
        if (matchingTags.length > 0) {
            showTagSuggestions(matchingTags, currentTag);
        } else {
            hideTagSuggestions();
        }
    } else {
        hideTagSuggestions();
    }
}

// Show tag suggestions dropdown
function showTagSuggestions(tags, currentTag) {
    tagSuggestions.innerHTML = '';
    
    tags.forEach((tag, index) => {
        const suggestion = document.createElement('div');
        suggestion.className = 'tag-suggestion';
        suggestion.textContent = tag;
        suggestion.dataset.tag = tag;
        
        suggestion.addEventListener('click', () => selectTagSuggestion(tag));
        
        tagSuggestions.appendChild(suggestion);
    });
    
    tagSuggestions.style.display = 'block';
}

// Hide tag suggestions dropdown
function hideTagSuggestions() {
    setTimeout(() => {
        tagSuggestions.style.display = 'none';
    }, 150); // Small delay to allow clicks on suggestions
}

// Select a tag suggestion
function selectTagSuggestion(selectedTag) {
    const input = recipeTags.value;
    const cursorPosition = recipeTags.selectionStart;
    const lastCommaIndex = input.lastIndexOf(',');
    
    let newValue;
    if (lastCommaIndex === -1) {
        newValue = selectedTag;
    } else {
        newValue = input.substring(0, lastCommaIndex + 1) + ' ' + selectedTag;
    }
    
    recipeTags.value = newValue;
    hideTagSuggestions();
    recipeTags.focus();
}

// Handle keyboard navigation in tag suggestions
function handleTagKeydown(e) {
    const suggestions = tagSuggestions.querySelectorAll('.tag-suggestion');
    const highlighted = tagSuggestions.querySelector('.tag-suggestion.highlighted');
    
    if (suggestions.length === 0) return;
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (highlighted) {
            highlighted.classList.remove('highlighted');
            const next = highlighted.nextElementSibling;
            if (next) {
                next.classList.add('highlighted');
            } else {
                suggestions[0].classList.add('highlighted');
            }
        } else {
            suggestions[0].classList.add('highlighted');
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (highlighted) {
            highlighted.classList.remove('highlighted');
            const prev = highlighted.previousElementSibling;
            if (prev) {
                prev.classList.add('highlighted');
            } else {
                suggestions[suggestions.length - 1].classList.add('highlighted');
            }
        } else {
            suggestions[suggestions.length - 1].classList.add('highlighted');
        }
    } else if (e.key === 'Enter' && highlighted) {
        e.preventDefault();
        selectTagSuggestion(highlighted.dataset.tag);
    } else if (e.key === 'Escape') {
        hideTagSuggestions();
    }
} 

// Copy Liquor Cabinet link to clipboard
document.addEventListener('DOMContentLoaded', () => {
    const liquorCabinetBtn = document.getElementById('liquorCabinetBtn');
    if (liquorCabinetBtn) {
        liquorCabinetBtn.addEventListener('click', () => {
            const link = "https://docs.google.com/spreadsheets/d/1PR8BDSisX7xN1eshhJsVvULSXvW0oEsQc3HNT3AxRDs/edit?usp=sharing";
            navigator.clipboard.writeText(link).then(() => {
                showNotification("Liquor Cabinet link copied to clipboard!", "success");
            }).catch(() => {
                showNotification("Failed to copy link. Please try again.", "error");
            });
        });
    }
});
