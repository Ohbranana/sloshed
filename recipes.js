// Sample cocktail recipes
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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sampleRecipes;
}
