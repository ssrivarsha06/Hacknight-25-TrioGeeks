// Recipe data
const recipeData = {
    // Vegetarian recipes
    vegetarian: [
      {
        id: "v1",
        name: "Vegetable Biryani",
        image: "./images/pulov.png",
        rating: 4.5,
        cookingTime: "45 min",
        timeRequired: {
          prep: "20 minutes",
          cook: "25 minutes",
          total: "45 minutes"
        },
        ingredients: [
          "2 cups basmati rice",
          "1 cup mixed vegetables (carrots, peas, beans)",
          "1 large onion, thinly sliced",
          "2 tomatoes, chopped",
          "2 green chilies, slit",
          "1 tablespoon ginger-garlic paste",
          "2 tablespoons yogurt",
          "1/4 cup mint leaves",
          "1/4 cup coriander leaves",
          "1 teaspoon turmeric powder",
          "1 teaspoon red chili powder",
          "1 teaspoon garam masala",
          "2 tablespoons ghee or oil",
          "Salt to taste"
        ],
        instructions: [
          "Wash and soak rice for 30 minutes, then drain.",
          "Heat ghee in a large pot, add sliced onions and fry until golden brown.",
          "Add ginger-garlic paste and green chilies, sauté for 1 minute.",
          "Add vegetables, tomatoes, and all spices. Cook for 5 minutes.",
          "Add yogurt and mix well. Cook for another 2 minutes.",
          "Add drained rice, 4 cups of water, salt, mint, and coriander leaves.",
          "Bring to a boil, then cover and simmer on low heat for 15 minutes.",
          "Let it rest for 5 minutes, then fluff with a fork and serve hot."
        ]
      },
      {
        id: "v2",
        name: "Vada",
        image: "./images/vada.png",
        rating: 4.3,
        cookingTime: "30 min",
        timeRequired: {
          prep: "15 minutes",
          cook: "15 minutes",
          total: "30 minutes"
        },
        ingredients: [
          "1 cup urad dal (black gram)",
          "1/4 cup rice",
          "1 onion, finely chopped",
          "2 green chilies, finely chopped",
          "1 inch ginger, grated",
          "A few curry leaves, chopped",
          "1/4 cup coriander leaves, chopped",
          "Salt to taste",
          "Oil for deep frying"
        ],
        instructions: [
          "Wash and soak urad dal and rice together for 4 hours.",
          "Drain and grind to a thick, fluffy batter.",
          "Add onions, green chilies, ginger, curry leaves, coriander leaves, and salt. Mix well.",
          "Heat oil in a deep pan.",
          "Wet your hands, take a small portion of the batter, shape it into a doughnut using your thumb.",
          "Slide it gently into the hot oil.",
          "Fry until golden brown on both sides.",
          "Remove and drain on paper towels.",
          "Serve hot with coconut chutney and sambar."
        ]
      },
      {
        id: "v3",
        name: "Puri",
        image: "./images/poori.png",
        rating: 4.0,
        cookingTime: "20 min",
        timeRequired: {
          prep: "10 minutes",
          cook: "10 minutes",
          total: "20 minutes"
        },
        ingredients: [
          "2 cups whole wheat flour",
          "1/2 teaspoon salt",
          "1 tablespoon oil",
          "Water as needed",
          "Oil for deep frying"
        ],
        instructions: [
          "In a bowl, mix wheat flour, salt, and 1 tablespoon oil.",
          "Add water gradually and knead to form a stiff dough.",
          "Cover and let it rest for 15 minutes.",
          "Divide the dough into small balls.",
          "Roll each ball into a 4-inch circle.",
          "Heat oil in a deep pan.",
          "Slide the rolled puri into hot oil.",
          "Press gently with a slotted spoon until it puffs up.",
          "Flip and fry until golden brown on both sides.",
          "Remove and drain on paper towels.",
          "Serve hot with potato curry or chana masala."
        ]
      },
      {
        id: "v4",
        name: "Paneer Butter Masala",
        image: "./images/paneer.png",
        rating: 4.7,
        cookingTime: "35 min",
        timeRequired: {
          prep: "15 minutes",
          cook: "20 minutes",
          total: "35 minutes"
        },
        ingredients: [
          "250g paneer (cottage cheese), cubed",
          "2 large tomatoes, pureed",
          "1 onion, finely chopped",
          "2 tablespoons butter",
          "1 tablespoon oil",
          "1 teaspoon ginger-garlic paste",
          "1/2 cup cream",
          "1 teaspoon red chili powder",
          "1/2 teaspoon turmeric powder",
          "1 teaspoon garam masala",
          "1 teaspoon kasturi methi (dried fenugreek leaves)",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        instructions: [
          "Heat oil and butter in a pan. Add chopped onions and sauté until golden brown.",
          "Add ginger-garlic paste and cook for 1 minute.",
          "Add tomato puree, turmeric, red chili powder, and salt. Cook until oil separates.",
          "Add 1/2 cup water and bring to a boil.",
          "Add paneer cubes, cream, and garam masala. Simmer for 5 minutes.",
          "Crush kasturi methi between your palms and add to the curry.",
          "Garnish with fresh coriander and serve hot with naan or rice."
        ]
      }
    ],
    
    // Non-vegetarian recipes
    "non-vegetarian": [
      {
        id: "nv1",
        name: "Chicken Curry",
        image: "./images/chickengravy.png",
        rating: 4.8,
        cookingTime: "40 min",
        timeRequired: {
          prep: "15 minutes",
          cook: "25 minutes",
          total: "40 minutes"
        },
        ingredients: [
          "500g chicken, cut into pieces",
          "2 onions, finely chopped",
          "2 tomatoes, pureed",
          "2 tablespoons oil",
          "1 tablespoon ginger-garlic paste",
          "1 teaspoon turmeric powder",
          "1 teaspoon red chili powder",
          "1 teaspoon coriander powder",
          "1/2 teaspoon cumin powder",
          "1/2 teaspoon garam masala",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        instructions: [
          "Heat oil in a pan. Add chopped onions and sauté until golden brown.",
          "Add ginger-garlic paste and cook for 1 minute.",
          "Add turmeric, red chili, coriander, and cumin powders. Mix well.",
          "Add tomato puree and cook until oil separates.",
          "Add chicken pieces and salt. Mix well to coat the chicken with the masala.",
          "Cover and cook on medium heat for 15-20 minutes until chicken is tender.",
          "Add garam masala and cook for 2 more minutes.",
          "Garnish with fresh coriander and serve hot with rice or roti."
        ]
      },
      {
        id: "nv2",
        name: "Chicken Biryani",
        image: "./images/biriyani.png",
        rating: 4.9,
        cookingTime: "1 hr 20 min",
        timeRequired: {
          prep: "40 minutes",
          cook: "40 minutes",
          total: "1 hour 20 minutes"
        },
        ingredients: [
          "500g chicken, cut into pieces",
          "2 cups basmati rice",
          "2 large onions, thinly sliced",
          "2 tomatoes, chopped",
          "1/4 cup yogurt",
          "1 tablespoon ginger-garlic paste",
          "2 green chilies, slit",
          "1/4 cup mint leaves",
          "1/4 cup coriander leaves",
          "1 teaspoon red chili powder",
          "1/2 teaspoon turmeric powder",
          "1 teaspoon garam masala",
          "4 cloves",
          "1 cinnamon stick",
          "4 cardamom pods",
          "2 bay leaves",
          "3 tablespoons ghee or oil",
          "Salt to taste",
          "Saffron soaked in 2 tablespoons warm milk"
        ],
        instructions: [
          "Wash and soak rice for 30 minutes, then drain.",
          "Heat 2 tablespoons ghee in a large pot, add sliced onions and fry until golden brown.",
          "Add ginger-garlic paste, green chilies, and whole spices. Sauté for 1 minute.",
          "Add chicken pieces and cook for 5 minutes.",
          "Add tomatoes, red chili powder, turmeric, and salt. Cook for 5 minutes.",
          "Add yogurt and mix well. Cook for another 5 minutes.",
          "In another pot, boil 4 cups of water with salt.",
          "Add drained rice and cook until 70% done. Drain the rice.",
          "Layer the partially cooked rice over the chicken mixture.",
          "Sprinkle mint, coriander leaves, and saffron milk over the rice.",
          "Cover with a tight lid and cook on low heat for 20 minutes.",
          "Let it rest for 10 minutes, then gently mix and serve hot."
        ]
      },
      {
        id: "nv3",
        name: "Butter Chicken",
        image: "./images/butterchick.png",
        rating: 4.8,
        cookingTime: "50 min",
        timeRequired: {
          prep: "20 minutes",
          cook: "30 minutes",
          total: "50 minutes"
        },
        ingredients: [
          "500g chicken, cut into pieces",
          "2 cups tomato puree",
          "1 onion, finely chopped",
          "3 tablespoons butter",
          "1 tablespoon oil",
          "2 tablespoons cashew paste",
          "2 tablespoons cream",
          "1 tablespoon ginger-garlic paste",
          "1 teaspoon red chili powder",
          "1/2 teaspoon turmeric powder",
          "1 teaspoon garam masala",
          "1 teaspoon kasturi methi (dried fenugreek leaves)",
          "Salt to taste",
          "Fresh cream for garnish"
        ],
        instructions: [
          "Marinate chicken with ginger-garlic paste, red chili powder, and salt for 1 hour.",
          "Heat oil in a pan, add chicken and cook until it's done. Remove and keep aside.",
          "In the same pan, add butter and chopped onions. Sauté until golden brown.",
          "Add tomato puree, turmeric, and salt. Cook until oil separates.",
          "Add cashew paste and cook for 2 minutes.",
          "Blend the mixture to a smooth paste and return to the pan.",
          "Add cooked chicken, cream, and garam masala. Simmer for 10 minutes.",
          "Crush kasturi methi between your palms and add to the curry.",
          "Garnish with fresh cream and serve hot with naan or rice."
        ]
      },
      {
        id: "nv4",
        name: "Chicken Karahi",
        image: "./images/chicken.png",
        rating: 4.6,
        cookingTime: "35 min",
        timeRequired: {
          prep: "10 minutes",
          cook: "25 minutes",
          total: "35 minutes"
        },
        ingredients: [
          "500g chicken, cut into pieces",
          "4 tomatoes, chopped",
          "1 onion, finely chopped",
          "2 tablespoons oil",
          "1 tablespoon ginger-garlic paste",
          "2 green chilies, slit",
          "1 teaspoon cumin seeds",
          "1 teaspoon coriander powder",
          "1 teaspoon red chili powder",
          "1/2 teaspoon garam masala",
          "Salt to taste",
          "Fresh coriander for garnish",
          "Ginger julienne for garnish"
        ],
        instructions: [
          "Heat oil in a karahi or wok. Add cumin seeds and let them splutter.",
          "Add chopped onions and sauté until translucent.",
          "Add ginger-garlic paste and green chilies. Cook for 1 minute.",
          "Add chicken pieces and cook on high heat for 5 minutes until they change color.",
          "Add chopped tomatoes, coriander powder, red chili powder, and salt.",
          "Cover and cook on medium heat for 15 minutes until chicken is tender and tomatoes are mushy.",
          "Remove lid, increase heat and cook until the oil separates.",
          "Add garam masala and cook for 1 more minute.",
          "Garnish with fresh coriander and ginger julienne.",
          "Serve hot with naan or roti."
        ]
      }
    ],
    
    // Quick recipes
    quick: [
      {
        id: "q1",
        name: "Jeera Rice",
        image: "./images/jeera.png",
        rating: 4.2,
        cookingTime: "15 min",
        timeRequired: {
          prep: "5 minutes",
          cook: "10 minutes",
          total: "15 minutes"
        },
        ingredients: [
          "1 cup basmati rice",
          "2 cups water",
          "1 tablespoon ghee",
          "1 teaspoon cumin seeds",
          "2 green cardamoms",
          "1 bay leaf",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        instructions: [
          "Wash and soak rice for 15 minutes, then drain.",
          "Heat ghee in a pan. Add cumin seeds, cardamoms, and bay leaf.",
          "Once the cumin seeds splutter, add drained rice and sauté for 2 minutes.",
          "Add water and salt. Bring to a boil.",
          "Reduce heat, cover, and cook for 8-10 minutes until rice is done.",
          "Fluff with a fork, garnish with fresh coriander, and serve hot."
        ]
      },
      {
        id: "q2",
        name: "Veg Pulao",
        image: "./images/pulov.png",
        rating: 4.3,
        cookingTime: "15 min",
        timeRequired: {
          prep: "5 minutes",
          cook: "10 minutes",
          total: "15 minutes"
        },
        ingredients: [
          "1 cup basmati rice",
          "1/2 cup mixed vegetables (carrots, peas, beans)",
          "2 cups water",
          "1 tablespoon ghee",
          "1 teaspoon cumin seeds",
          "1 small onion, thinly sliced",
          "1 green chili, slit",
          "1/2 teaspoon ginger-garlic paste",
          "1/2 teaspoon garam masala",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        instructions: [
          "Wash and soak rice for 15 minutes, then drain.",
          "Heat ghee in a pressure cooker. Add cumin seeds.",
          "Once the cumin seeds splutter, add sliced onions and green chili. Sauté until onions are translucent.",
          "Add ginger-garlic paste and sauté for 30 seconds.",
          "Add mixed vegetables and sauté for 1 minute.",
          "Add drained rice, water, salt, and garam masala. Mix well.",
          "Close the pressure cooker and cook for 1 whistle. Turn off the heat.",
          "Let the pressure release naturally.",
          "Fluff with a fork, garnish with fresh coriander, and serve hot."
        ]
      },
      {
        id: "q3",
        name: "Chana Masala",
        image: "./images/channa.png",
        rating: 4.5,
        cookingTime: "15 min",
        timeRequired: {
          prep: "5 minutes",
          cook: "10 minutes",
          total: "15 minutes"
        },
        ingredients: [
          "1 can chickpeas (400g), drained and rinsed",
          "1 onion, finely chopped",
          "1 tomato, chopped",
          "1 tablespoon oil",
          "1 teaspoon cumin seeds",
          "1 teaspoon ginger-garlic paste",
          "1/2 teaspoon turmeric powder",
          "1 teaspoon coriander powder",
          "1/2 teaspoon red chili powder",
          "1/2 teaspoon garam masala",
          "Salt to taste",
          "Fresh coriander for garnish",
          "Lemon wedges for serving"
        ],
        instructions: [
          "Heat oil in a pan. Add cumin seeds and let them splutter.",
          "Add chopped onions and sauté until golden brown.",
          "Add ginger-garlic paste and cook for 30 seconds.",
          "Add chopped tomatoes, turmeric, coriander, red chili powder, and salt. Cook until tomatoes are soft.",
          "Add chickpeas and mix well. Cook for 5 minutes.",
          "Add 1/2 cup water and bring to a boil. Cook for 2 minutes.",
          "Add garam masala and cook for 1 more minute.",
          "Garnish with fresh coriander and serve hot with lemon wedges and rice or roti."
        ]
      },
      {
        id: "q4",
        name: "Seekh Kabab",
        image: "./images/kebab.png",
        rating: 4.7,
        cookingTime: "15 min",
        timeRequired: {
          prep: "10 minutes",
          cook: "5 minutes",
          total: "15 minutes"
        },
        ingredients: [
          "250g minced meat (chicken or lamb)",
          "1 small onion, finely chopped",
          "1 tablespoon ginger-garlic paste",
          "2 green chilies, finely chopped",
          "1/4 cup coriander leaves, chopped",
          "1/4 cup mint leaves, chopped",
          "1 teaspoon roasted cumin powder",
          "1 teaspoon garam masala",
          "1/2 teaspoon red chili powder",
          "1 egg",
          "Salt to taste",
          "2 tablespoons oil for grilling"
        ],
        instructions: [
          "In a bowl, mix minced meat, onion, ginger-garlic paste, green chilies, coriander leaves, mint leaves, cumin powder, garam masala, red chili powder, egg, and salt. Mix well.",
          "Cover and refrigerate for 30 minutes (if time permits).",
          "Divide the mixture into equal portions and shape them into sausage-like logs on skewers.",
          "Heat a grill pan and brush it with oil.",
          "Place the skewers on the hot grill and cook for 2-3 minutes on each side until fully cooked.",
          "Serve hot with mint chutney and sliced onions."
        ]
      }
    ]
  };