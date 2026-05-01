/**
 * Bites & Sips — Inventory Data
 * Ingredient → Menu Item mapping, extracted from menu descriptions.
 * This is the source of truth for which items become unavailable when an ingredient runs out.
 */

// Full menu item ID → Name map (for display in the inventory UI)
const MENU_ITEMS_MAP = {
    'f1': 'Koshari',
    'f2': 'Molokhia with Chicken',
    'f3': 'Ful Medames',
    'f4': 'Hawawshi',
    'f5': 'Mahshi Warak Enab',
    'f6': 'Fatta',
    'd1': 'Sahlab',
    'd2': 'Karkadeh',
    'd3': 'Sobia',
    'd4': 'Mango Asab',
    'd5': 'Yansoon',
    'd6': 'Tamr Hindi',
    'ds1': 'Om Ali',
    'ds2': 'Basbousa',
    'ds3': 'Konafa with Cream',
    'ds4': 'Mahalabia',
    'ds5': 'Zalabia',
    'ds6': 'Roz bel Laban'
};

// All menu item IDs (for checklist UI)
const ALL_MENU_ITEM_IDS = Object.keys(MENU_ITEMS_MAP);

/**
 * Ingredient → affected menu item IDs
 * Extracted from each item's description field in menu-data.js:
 *
 * FOOD:
 *   f1 Koshari: Rice, lentils, pasta, chickpeas, crispy onions & spicy tomato sauce
 *   f2 Molokhia: Jute leaves stew with garlic, coriander & tender chicken
 *   f3 Ful Medames: Slow-cooked fava beans with olive oil, lemon & cumin
 *   f4 Hawawshi: Egyptian spiced minced meat baked in pita bread
 *   f5 Mahshi Warak Enab: Stuffed grape leaves with rice, herbs & spices
 *   f6 Fatta: Layers of rice, crispy bread, garlic vinegar sauce & beef
 *
 * DRINKS:
 *   d1 Sahlab: Hot milk, orchid root, cinnamon, coconut & nuts
 *   d2 Karkadeh: Dried hibiscus petals, sugar, lemon — hot or cold
 *   d3 Sobia: Coconut milk, rice, sugar, vanilla — chilled
 *   d4 Mango Asab: Fresh sugarcane juice blended with mango pulp
 *   d5 Yansoon: Anise seeds, honey, lemon zest
 *   d6 Tamr Hindi: Tamarind pulp, sugar, rose water, ice
 *
 * DESSERTS:
 *   ds1 Om Ali: Puff pastry, milk, nuts, raisins, coconut, cinnamon
 *   ds2 Basbousa: Semolina cake, syrup, coconut, almonds
 *   ds3 Konafa: Shredded phyllo, cream, pistachios, syrup
 *   ds4 Mahalabia: Milk pudding with rose water, pistachios
 *   ds5 Zalabia: Fried dough balls in honey syrup
 *   ds6 Roz bel Laban: Egyptian rice pudding with cinnamon
 */
const INGREDIENT_TO_ITEMS = {
    // ─── From Food ──────────────────────────────────────────
    'rice':           ['f1', 'f5', 'f6', 'd3', 'ds6'],
    'lentils':        ['f1'],
    'pasta':          ['f1'],
    'chickpeas':      ['f1'],
    'onions':         ['f1'],
    'tomato-sauce':   ['f1'],
    'jute-leaves':    ['f2'],
    'garlic':         ['f2', 'f6'],
    'coriander':      ['f2'],
    'chicken':        ['f2'],
    'fava-beans':     ['f3'],
    'olive-oil':      ['f3'],
    'lemon':          ['f3', 'd2', 'd5'],
    'cumin':          ['f3'],
    'minced-meat':    ['f4'],
    'pita-bread':     ['f4'],
    'spices':         ['f4', 'f5'],
    'grape-leaves':   ['f5'],
    'herbs':          ['f5'],
    'bread':          ['f6'],
    'vinegar':        ['f6'],
    'beef':           ['f6'],

    // ─── From Drinks ────────────────────────────────────────
    'milk':           ['d1', 'd3', 'ds1', 'ds4', 'ds6'],
    'orchid-root':    ['d1'],
    'cinnamon':       ['d1', 'ds1', 'ds6'],
    'coconut':        ['d1', 'd3', 'ds1', 'ds2'],
    'nuts':           ['d1', 'ds1'],
    'hibiscus':       ['d2'],
    'sugar':          ['d2', 'd3', 'd6'],
    'vanilla':        ['d3'],
    'sugarcane':      ['d4'],
    'mango':          ['d4'],
    'anise-seeds':    ['d5'],
    'honey':          ['d5', 'ds5'],
    'tamarind':       ['d6'],
    'rose-water':     ['d6', 'ds4'],
    'ice':            ['d6'],

    // ─── From Desserts ──────────────────────────────────────
    'puff-pastry':    ['ds1'],
    'raisins':        ['ds1'],
    'semolina':       ['ds2'],
    'syrup':          ['ds2', 'ds3', 'ds5'],
    'almonds':        ['ds2'],
    'phyllo':         ['ds3'],
    'cream':          ['ds3'],
    'pistachios':     ['ds3', 'ds4'],
    'dough':          ['ds5']
};

// Display-friendly names for each ingredient key
const INGREDIENT_DISPLAY_NAMES = {
    'rice': 'Rice',
    'lentils': 'Lentils',
    'pasta': 'Pasta',
    'chickpeas': 'Chickpeas',
    'onions': 'Onions',
    'tomato-sauce': 'Tomato Sauce',
    'jute-leaves': 'Jute Leaves',
    'garlic': 'Garlic',
    'coriander': 'Coriander',
    'chicken': 'Chicken',
    'fava-beans': 'Fava Beans',
    'olive-oil': 'Olive Oil',
    'lemon': 'Lemon',
    'cumin': 'Cumin',
    'minced-meat': 'Minced Meat',
    'pita-bread': 'Pita Bread',
    'spices': 'Spices',
    'grape-leaves': 'Grape Leaves',
    'herbs': 'Herbs',
    'bread': 'Bread',
    'vinegar': 'Vinegar',
    'beef': 'Beef',
    'milk': 'Milk',
    'orchid-root': 'Orchid Root',
    'cinnamon': 'Cinnamon',
    'coconut': 'Coconut',
    'nuts': 'Nuts',
    'hibiscus': 'Hibiscus',
    'sugar': 'Sugar',
    'vanilla': 'Vanilla',
    'sugarcane': 'Sugarcane',
    'mango': 'Mango',
    'anise-seeds': 'Anise Seeds',
    'honey': 'Honey',
    'tamarind': 'Tamarind',
    'rose-water': 'Rose Water',
    'ice': 'Ice',
    'puff-pastry': 'Puff Pastry',
    'raisins': 'Raisins',
    'semolina': 'Semolina',
    'syrup': 'Syrup',
    'almonds': 'Almonds',
    'phyllo': 'Phyllo Dough',
    'cream': 'Cream',
    'pistachios': 'Pistachios',
    'dough': 'Dough'
};
