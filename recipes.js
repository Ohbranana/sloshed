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
    },
    {
    id: 4,
    name: "Spiced Rye Plum",
    liquorBase: "Whiskey",
    tags: ["strong", "rye", "plum", "bitters"],
    ingredients: `Ingredients:
• 1.5 oz Medallion Rye Whiskey
• 0.5 oz Suntory Plum Liqueur
• 0.5 oz Sweet Vermouth (optional, or extra plum liqueur)
• 2 dashes Angostura bitters
• Orange twist or cherry garnish

Instructions:
1. Add whiskey, plum liqueur, vermouth, and bitters to a mixing glass with ice.
2. Stir until chilled.
3. Strain into a chilled coupe or rocks glass.
4. Garnish with an orange twist or cherry.

A smooth, spirit-forward cocktail with the sweetness of plum balanced by rye spice.`,
    image: null,
    createdAt: new Date().toISOString()
},
{
    id: 5,
    name: "Lychee and Elderflower Cooler",
    liquorBase: "Vodka",
    tags: ["fruity", "refreshing", "light", "vodka"],
    ingredients: `Ingredients:
• 1.5 oz Vodka (Totem or Smirnoff)
• 0.5 oz Soho Lychee Liqueur
• 0.5 oz St. Germain Elderflower Liqueur
• Soda water to top
• Mint sprig or lychee fruit for garnish

Instructions:
1. Fill a tall glass with ice.
2. Add vodka, lychee liqueur, and elderflower liqueur.
3. Stir gently.
4. Top with soda water.
5. Garnish with mint or lychee fruit.

A delicate, floral highball with subtle fruit sweetness — perfect for summer.`,
    image: null,
    createdAt: new Date().toISOString()
},
{
    id: 6,
    name: "Melon Sunshine",
    liquorBase: "Gin",
    tags: ["fruity", "citrus", "refreshing", "melon"],
    ingredients: `Ingredients:
• 1.5 oz Midori Melon Liqueur
• 1 oz Gordon's Sunset Orange Gin Spirit
• 0.5 oz Simple syrup (optional)
• 1.5–2 oz Fresh orange juice
• Orange slice or lime wheel for garnish

Instructions:
1. Add Midori, gin spirit, syrup, and orange juice to a shaker with ice.
2. Shake well until chilled.
3. Strain into a highball glass over fresh ice.
4. Garnish with an orange slice or lime wheel.

Bright, juicy, and refreshing — a citrus-melon burst in every sip.`,
    image: null,
    createdAt: new Date().toISOString()
},
    {
    id: 7,
    name: "Cherry Pie Sour",
    liquorBase: "Whiskey",
    tags: ["sour", "cherry", "frothy", "dessert", "whiskey"],
    ingredients: `Ingredients:
• 2 oz Rye or Bourbon whiskey (rye spicier, bourbon sweeter)
• 0.75 oz Cherry liqueur (or muddled maraschino + grenadine)
• 0.75 oz Fresh lemon juice
• 0.5 oz Cinnamon or spiced syrup (or simple syrup + pinch cinnamon)
• 1 Egg white
• Optional: dash of vanilla extract

Instructions:
1. Dry shake whiskey, cherry liqueur, lemon juice, syrup, egg white, and vanilla for 10–15 seconds.
2. Add ice, shake again until chilled.
3. Strain into a coupe glass.
4. Garnish with grated cinnamon, nutmeg, or a skewered cherry.

A rich, foamy sour with cherry brightness, whiskey depth, warm spice, and creamy texture — like cherry pie in cocktail form.`,
    image: null,
    createdAt: new Date().toISOString()
}
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sampleRecipes;
}
