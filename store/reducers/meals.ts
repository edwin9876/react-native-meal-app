import {  MEALS } from '../../data/dummy-data';
import Meal, { filterTypes } from '../../models/meal';
import { ApplyFiltersAction, APPLY_FILTERS, ToggleFavouriteAction, TOGGLE_FAVOURITE } from '../actions/meals';

type MealsIState = {
    meals: Meal[],
    filteredMeals: Meal[],
    favoriteMeals: Meal[],
}

const initialState: MealsIState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};

const mealsReducer = (state = initialState, action:(ToggleFavouriteAction|ApplyFiltersAction)) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE:
            const existingFavMealIndex =  state.favoriteMeals.findIndex((meal: Meal) => meal.id === action.payload.mealId)
            if (existingFavMealIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals]
                updatedFavMeals.splice(existingFavMealIndex,1)

                return {...state,favoriteMeals:updatedFavMeals}
            } else {
                const SelectedFavMeal = state.meals.find(meal => meal.id === action.payload.mealId)
                    const updatedFavMeals:Meal[] = [...state.favoriteMeals]
                    updatedFavMeals.push(SelectedFavMeal!)

                    return {...state,favoriteMeals:updatedFavMeals}

            }

        case APPLY_FILTERS:
            const appliedFilters = action.payload.filters

            const newFilteredMeals = state.filteredMeals.filter(
                meal => {
                    
                    return appliedFilters.map(filter => {
                        const label = Object.keys(filter)[0];
                        const value = Object.values(filter)[0];
                        if (value) {
                            const filterIndex = Object.keys(meal).findIndex(mealKey => mealKey === label)
                            const filterTypeValue = Object.values(meal)[filterIndex];

                            return filterTypeValue === value ? 2 : 0 
                        }
                        return 1
                    }).every(elem => {
                        if (elem !== 0 )  return true                        
                    })

                }
            )


            return {...state,filteredMeals:newFilteredMeals}
            
        default:
            return state;
    }
}

export default mealsReducer;