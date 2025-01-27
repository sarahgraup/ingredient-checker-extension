export const comedogenicIngredients = new Set([
  "dioctyl succinate",
  "disodium monooleamido peg 2-sulfosuccinate",
  "glyceryl stearate se",
  "glyceryl-3 diisostearate",
  "hexadecyl alcohol",
  "hydrogenated vegetable oil",
  "isodecyl oleate",
  "isosteraric acid",
  "lauroyl lysine",
  "linseed oil",
  "myristyl lactate",
  "octyl palmitate",
  "octyl stearate",
  "oleth-3",
  "peg 200 dilaurate",
  "ppg 2 myristyl propionate",
  "polyglyceryl-3 diisostearate",
  "sea whip extract",
  "shark liver oil",
  "solulan 16",
  "sorbitan oleate",
  "steareth 10",
  "stearyl heptanoate",
  "sulfated castor oil",
  "wheat germ glyceride",
  "acetylated lanolin",
  "algae extract",
  "algin",
  "butyl stearate",
  "carrageenan",
  "cetyl acetate",
  "cetearyl alcohol",
  "ceteareth 20",
  "coal tar",
  "cocoa butter",
  "coconut oil",
  "colloidal sulfur",
  "cotton seed oil",
  "decyl oleate",
  "ethylhexyl palmitate",
  "isocetyl alcohol",
  "isocetyl stearate",
  "isopropyl isostearate",
  "isopropyl linolate",
  "isopropyl myristate",
  "isopropyl palmitate",
  "isostearyl isostearate",
  "isostearyl neopentanoate",
  "kelp",
  "lanolin",
  "lauric acid",
  "mink oil",
  "myristic acid",
  "myristyl myristate",
  "oleic acid",
  "oleyl alcohol",
  "palm oil",
  "potassium chloride",
  "propylene glycol monostearate",
  "red dyes",
  "shea butter",
  "sodium lauryl sulfate",
  "sodium laureth sulfate",
  "soybean oil",
  "stearic acid",
  "wheat germ oil",
  "xylene"
]);

// Mappings for alternative names/INCI names of the SAME ingredients
export const nameMappings: { [key: string]: string } = {
  // Alternative names for acetylated lanolin
  "acetylated lanolin alcohol": "acetylated lanolin",
  
  // Alternative names for algae and seaweed derivatives
  "chlorella": "algae extract",
  "plankton": "algae extract",
  "seaweed": "algae extract",
  "spirulina": "algae extract",
  "red algae": "algae extract",
  "sodium alginate": "algae extract",
  
  // Alternative names for carrageenan
  "irish moss": "carrageenan",
  "carageenan moss": "carrageenan",
  "chondrus crispus": "carrageenan",
  
  // Alternative names for coconut oil
  "cocos nucifera": "coconut oil",
  "coconut butter": "coconut oil",
  "coconut alkanes": "coconut oil",
  
  // Alternative names for lanolin
  "ethoxylated lanolin": "lanolin",
  "peg 16 lanolin": "lanolin",
  "lanolin oil": "lanolin",
  "wool wax": "lanolin",
  "wool fat": "lanolin",
  
  // Alternative names for kelp
  "laminara digitata": "kelp",
  "laminaria saccharina": "kelp",
  "laminaria saccharina extract": "kelp",
  
  // Alternative names for soybean oil
  "glycine soja oil": "soybean oil",
  "glycine soya (soybean) oil": "soybean oil",
  "soya oil": "soybean oil",
  
  // Alternative names for red dyes
  "d & c red #17": "red dyes",
  "d & c red #21": "red dyes",
  "d & c red #3": "red dyes",
  "d & c red #30": "red dyes",
  "d & c red #36": "red dyes",
  
  // Alternative names for shea butter
  "butyrospermum parkii": "shea butter",
  
  // Alternative names for sodium laureth sulfate
  "laureth-23": "sodium laureth sulfate",
  "laureth-4": "sodium laureth sulfate",
  "sles": "sodium laureth sulfate",
  
  // Alternative names for sodium lauryl sulfate
  "sls": "sodium lauryl sulfate",
  
  // Alternative names for stearic acid
  "stearic acid tea": "stearic acid",
  
  // Alternative names for propylene glycol monostearate
  "pg monostearate": "propylene glycol monostearate",
  
  // Alternative names for dioctyl succinate
  "dos": "dioctyl succinate",
  "bis(2-ethylhexyl) succinate": "dioctyl succinate",
  
  // Alternative names for glyceryl stearate SE
  "gms se": "glyceryl stearate se",
  "glyceryl monostearate se": "glyceryl stearate se",
  
  // Alternative names for glyceryl-3 diisostearate
  "glyceryl diisostearate": "glyceryl-3 diisostearate",
  "gdi": "glyceryl-3 diisostearate",
  
  // Alternative names for hexadecyl alcohol
  "cetyl alcohol": "hexadecyl alcohol",
  
  // Alternative names for hydrogenated vegetable oil
  "hydrogenated vegetable glycerides": "hydrogenated vegetable oil",
  
  // Alternative names for linseed oil
  "flaxseed oil": "linseed oil",
  "linum usitatissimum seed oil": "linseed oil",
  
  
  // Alternative names for sea whip extract
  "pseudopterogorgia elisabethae": "sea whip extract",
  
  // Alternative names for shark liver oil
  "squalene": "shark liver oil",
  
  // Alternative names for solulan 16
  "peg-16 lanolin": "solulan 16",
  
  // Alternative names for wheat germ glyceride
  "triticum vulgare germ oil": "wheat germ glyceride"
};

// Validation function to ensure data integrity
export const validateIngredientData = (): boolean => {
  let isValid = true;
  
  // Check that all mapped ingredients exist in the comedogenic set
  for (const [variant, standardName] of Object.entries(nameMappings)) {
    if (!comedogenicIngredients.has(standardName)) {
      console.error(`Error: Mapped ingredient "${standardName}" from variant "${variant}" is not in comedogenic list`);
      isValid = false;
    }
  }
  
  // Check that no variants conflict with base ingredients
  for (const variant of Object.keys(nameMappings)) {
    if (comedogenicIngredients.has(variant)) {
      console.error(`Error: Variant "${variant}" is also in comedogenic list`);
      isValid = false;
    }
  }
  
  return isValid;
};


export const findIngredients = (ingredientHtml: string): string[] => {

  validateIngredientData();
  // Split and normalize ingredients
  const ingredientsList = ingredientHtml
    .split(",")
    .map((item) => item.trim().toLowerCase());

  const matchedIngredients = new Set<string>();

  for (const ingredient of ingredientsList) {
    // 1. Check direct matches first (most efficient)
    if (comedogenicIngredients.has(ingredient)) {
      matchedIngredients.add(ingredient);
      continue;
    }

    // 2. Check if this ingredient is a known variant name
    if (nameMappings[ingredient]) {
      matchedIngredients.add(nameMappings[ingredient]);
      continue;
    }

    // 3. Check for partial matches
    // This is the most expensive operation, so we do it last
    for (const [variant, standardName] of Object.entries(nameMappings)) {
      const variantLower = variant.toLowerCase();
      if (
        ingredient.includes(variantLower) ||
        variantLower.includes(ingredient)
      ) {
        matchedIngredients.add(standardName);
        break;
      }
    }
  }

  console.log("matched");
  console.log(matchedIngredients);
  return Array.from(matchedIngredients);
};

// Optional: Add a type for the name mappings
export interface IngredientMappings {
  [key: string]: string;
}