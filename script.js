// Global variables
let recipes = JSON.parse(localStorage.getItem('cocktailRecipes')) || [];
let filteredRecipes = [...recipes];
let allTags = JSON.parse(localStorage.getItem('cocktailTags')) || [];

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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayRecipes();
    setupEventListeners();
    populateTagOptions(); // <-- ensure tags show up on load
});

// Setup event listeners
function setupEventListeners() {
    recipeForm.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    liquorFilter.addEventListener('change', handleFilter);
    recipeImage.addEventListener('change', handleImagePreview);
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

    const tags = Array.from(document.getElementById('tags').selectedOptions)
                      .map(o => o.value);

    const recipe = {
        id: Date.now(),
        name: formData.get('name').trim(),
        liquorBase: formData.get('liquorBase'),
        ingredients: formData.get('ingredients').trim(),
        image: null,
        tags: tags,
        createdAt: new Date().toISOString()
    };

    // update tag list
    allTags = Array.from(new Set([...allTags, ...tags]));
    localStorage.setItem('cocktailTags', JSON.stringify(allTags));
    populateTagOptions();

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
    clearFormDraft();
    showNotification('Recipe added successfully!', 'success');
}

// Save recipes
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
                    `<img src="${recipe.image}" alt="${recipe.name}" style="width:100%;height:100%;object-fit:cover;">` :
                    `<i class="fas fa-glass-martini-alt"></i>`
                }
            </div>
            <div class="recipe-content">
                <h3 class="recipe-name">${recipe.name}</h3>
                <span class="recipe-liquor">${recipe.liquorBase}</span>
                <p class="recipe-ingredients">${recipe.ingredients}</p>
                ${recipe.tags && recipe.tags.length > 0 ? 
                    `<div class="recipe-tags">${recipe.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</div>` 
                    : ''
                }
            </div>
        </div>
    `).join('');
}

// Search
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

function handleFilter() { handleSearch(); }

// Image preview
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

// Open modal
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
            `<div class="modal-recipe-image" style="background:#000;display:flex;align-items:center;justify-content:center;color:#f6a73a;font-size:4rem;">
                <i class="fas fa-glass-martini-alt"></i>
            </div>`
        }
        <h2 class="modal-recipe-name">${recipe.name}</h2>
        <span class="modal-recipe-liquor">${recipe.liquorBase}</span>
        <div class="modal-recipe-ingredients">${recipe.ingredients}</div>
        ${recipe.tags && recipe.tags.length > 0 ? 
            `<div class="modal-recipe-tags">${recipe.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</div>` 
            : ''
        }
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #333;color:#666;font-size:0.9rem;">
            Added on ${new Date(recipe.createdAt).toLocaleDateString()}
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Edit recipe
function editRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('liquorBase').value = recipe.liquorBase;
    document.getElementById('ingredients').value = recipe.ingredients;

    // Tags
    const tagSelect = document.getElementById('tags');
    if (tagSelect) {
        Array.from(tagSelect.options).forEach(opt => opt.selected = false);
        if (recipe.tags) {
            recipe.tags.forEach(t => {
                const option = Array.from(tagSelect.options).find(o => o.value === t);
                if (option) option.selected = true;
            });
        }
    }

    if (recipe.image) {
        imagePreview.innerHTML = `<img src="${recipe.image}" alt="Preview">`;
    }

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Recipe';
    submitBtn.onclick = function(e) {
        e.preventDefault();
        updateRecipe(recipeId);
    };

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
        ingredients: formData.get('ingredients').trim(),
        tags: Array.from(document.getElementById('tags').selectedOptions).map(o => o.value),
        updatedAt: new Date().toISOString()
    };

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

function saveUpdatedRecipe(recipeIndex, updatedRecipe) {
    recipes[recipeIndex] = updatedRecipe;
    filteredRecipes = [...recipes];
    saveRecipes();
    displayRecipes();
    resetForm();

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Recipe';
    submitBtn.onclick = null;

    showNotification('Recipe updated successfully!', 'success');
}

function deleteRecipe(recipeId) {
    if (confirm('Are you sure you want to delete this recipe?')) {
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

function resetForm() {
    recipeForm.reset();
    imagePreview.innerHTML = '';
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position:fixed;top:20px;right:20px;
        background:${type === 'success' ? '#4CAF50' : '#2196F3'};
        color:white;padding:15px 20px;border-radius:8px;
        box-shadow:0 4px 12px rgba(0,0,0,0.15);
        z-index:1001;transform:translateX(100%);
        transition:transform 0.3s ease;max-width:300px;word-wrap:break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => { document.body.removeChild(notification); }, 300);
    }, 3000);
}

// Liquor Cabinet copy button
document.addEventListener('DOMContentLoaded', () => {
    const liquorCabinetBtn = document.getElementById('liquorCabinetBtn');
    if (liquorCabinetBtn) {
        liquorCabinetBtn.addEventListener('click', () => {
            const link = "https://docs.google.com/spreadsheets/d/1PR8BDSisX7xN1eshhJsVvULSXvW0oEsQc3HNT3AxRDs/edit?usp=sharing";
            navigator.clipboard.writeText(link).then(() => {
                showNotification("Liquor Cabinet link copied to clipboard!", "success");
            }).catch(() => {
                showNotification("Failed to copy link.", "error");
            });
        });
    }
});

// Populate tags
function populateTagOptions() {
    const tagSelect = document.getElementById('tags');
    if (!tagSelect) return;
    tagSelect.innerHTML = '';
    allTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagSelect.appendChild(option);
    });
}
