import { model, Schema } from 'mongoose';

const nutritionAmountSchema = new Schema({
  weight: Number,
  daily_value: Number,
});

const dishSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  nurition_facts:{
    serving_size: { type: { type: String, weight: Number }, required: true },
    calories: nutritionAmountSchema,
    claories_from_fat: nutritionAmountSchema,
    saturated_fat: nutritionAmountSchema,
    cholesterol: nutritionAmountSchema,
    sodium: nutritionAmountSchema,
    dietary_fiber: nutritionAmountSchema,
    sugars: nutritionAmountSchema,
    total_carbohydrate: nutritionAmountSchema,
    protein: nutritionAmountSchema,
    vitamin_a: nutritionAmountSchema,
    vitamin_c: nutritionAmountSchema,
    calcium: nutritionAmountSchema,
    iron: nutritionAmountSchema,
  },
  ingredients: { type: String, required: true },
  contains: { type: String, required: true },
  vegetarian: { type: Boolean, required: true, default: false },
  vegan: { type: Boolean, required: true, default: false },
  cafe: { type: String, required: true },
  location: { type: String, required: true },
  mealtime: { type: String, required: true },
}, { timestamps: true, collection: 'Dishes' });

export default model('Dish', dishSchema);
