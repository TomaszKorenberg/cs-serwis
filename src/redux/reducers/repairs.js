import {  SET_REPAIRS, ADD_REPAIR} from './repairsTypes'

const initialState = [];

export const repairs = (state = initialState, action) => {
    switch (action.type) {
        case SET_REPAIRS:
            return  [...action.repairs];
        case ADD_REPAIR:
            return [...state, action.repair];
        default:
            return state
    }
};