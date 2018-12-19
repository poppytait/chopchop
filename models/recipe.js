const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

const nutritentSchema = {
    label: String,
    quantity: Number,
    unit: String
}

const recipeSchema = new Schema({
    uri: String,
    label: String,
    image: String,
    url: String,
    yield: Number,
    shareAs: String,
    cautions: [{
        type: String
    }],
    dietLabels: [{
        type: String
    }],
    healthLabels: [{
        type: String
    }],
    ingredientLines: [{
        type: String
    }],
    calories: Number,
    totalTime: Number,
    totalNutrients: {
        ENERC_KCAL: nutritentSchema,
        FAT: nutritentSchema,
        CHOCDF: nutritentSchema,
        FIBTG: nutritentSchema,
        SUGAR: nutritentSchema,
        PROCNT: nutritentSchema,
    },
    totalDaily: {
        ENERC_KCAL: nutritentSchema,
        FAT: nutritentSchema,
        CHOCDF: nutritentSchema,
        FIBTG: nutritentSchema,
        PROCNT: nutritentSchema,
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;