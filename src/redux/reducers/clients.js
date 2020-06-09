export const clients = (state = [], action) => { // (1)
    switch (action.type) {
        case 'ADD_CLIENT':
            return [...state, action.client];
        default:
            return state
    }
};