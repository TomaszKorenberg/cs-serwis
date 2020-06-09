export const repairs = (state = [], action) => { // (1)
    switch (action.type) {
        case 'ADD_REPAIR':
            return [...state, action.repair];
        default:
            return state
    }
};