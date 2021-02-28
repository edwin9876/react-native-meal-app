import { filterTypes } from "../../models/meal"

export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE"

export const APPLY_FILTERS = 'APPLY_FILTERS'

export interface ToggleFavouriteAction {
    type: typeof TOGGLE_FAVOURITE
    payload: {
        mealId:string
    }  
}
  
export interface ApplyFiltersAction {
    type: typeof APPLY_FILTERS
    payload: {
        filters:{[label:string]:boolean}[]
    }  
  }

export const toggleFavourite = (mealId:string) => ({
    type: TOGGLE_FAVOURITE,
    payload: {
        mealId:mealId
    }  
})

export const applyFilters = (filters:{[label:string]:boolean}[]) => ({
    type: APPLY_FILTERS,
    payload: {
        filters:filters
    }  
})

