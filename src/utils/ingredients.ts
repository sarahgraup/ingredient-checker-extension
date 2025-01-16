export const comedogenicIngredients = new Set([
  "acetylated lanolin",
  "acetylated lanolin alcohol",
  "algae extract",
  "algin",
  "butyl stearate",
  "carrageenan",
  "cetyl acetate",
  "cetearyl alcohol",
  "ceteareth 20",
  "chondrus crispus",
  "irish moss",
  "carageenan moss",
  "chlorella",
  "coal tar",
  "cocoa butter",
  "coconut alkanes",
  "coconut butter",
  "coconut oil",
  "cocos nucifera",
  "colloidal sulfur",
  "cotton awws oil",
  "cotton seed oil",
  "d & c red #17",
  "d & c red # 21",
  "d & c red # 3",
  "d & c red # 30",
  "d & c red # 36",
  "decyl oleate",
  "dioctyl succinate",
  "disodium monooleamido peg 2-sulfosuccinate",
  "ethoxylated lanolin",
  "ethylhexyl palmitate",
  "glycine soja oil",
  "glyceryl stearate se",
  "glyceryl-3 disostearate",
  "hexadecyl alcohol",
  "hydrogenated vegetable oil",
  "isocetyl alcohol",
  "isocetyl stearate",
  "isodecyl oleate",
  "isopropyl isostearate",
  "isopropyl linolate",
  "isopropyl myristate",
  "isopropyl palmitate",
  "isostearyl isostearate",
  "isostearyl neopentanoate",
  "isosteraric acid",
  "kelp",
  "laminara digitata extract",
  "laminaria saccharina extract",
  "laminaria saccharina",
  "laureth-23",
  "laureth-4",
  "lauric acid",
  "lauroyl lysine",
  "linseed oil",
  "mink oil",
  "myristic acid",
  "myristyl lactate",
  "myristyl myristate",
  "octyl palmitate",
  "octyl stearate",
  "oleic acid",
  "oleth-3",
  "oleyl alcohol",
  "palm oil",
  "peg 16 lanolin",
  "peg 200 dilaurate",
  "peg 8 stearate",
  "pg monostearate",
  "ppg 2 myristyl propionate",
  "plankton",
  "polyglyceryl-3 diisostearate",
  "potassium chloride",
  "propylene glycol monostearate",
  "red algae",
  "seaweed",
  "sea whip extract",
  "shark liver oil",
  "squalene",
  "shea butter",
  "sodium alginate",
  "sodium laureth sulfate",
  "sodium lauryl sulfate",
  "solulan 16",
  "sorbitan oleate",
  "soybean oil",
  "spirulina",
  "steareth 10",
  "stearic acid tea",
  "stearyl heptanoate",
  "sulfated castor oil",
  "sulfated jojoba oil",
  "wheat germ glyceride",
  "wheat germ oil",
  "xylene",
]);


export const findIngredients = (ingredientHtml: string) => {
    const ingredientsList = ingredientHtml.split(',').map((item) => item.trim().toLowerCase());
    console.log("ingredient list");
    console.log(ingredientsList);

    const matchedIngredients = ingredientsList.filter((ingredient) => {
        return comedogenicIngredients.has(ingredient)
    });

    console.log("matched", matchedIngredients);
    return matchedIngredients;


 }