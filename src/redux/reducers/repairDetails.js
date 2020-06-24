const initialState = [null];

export const repairDetails = (state = initialState, action) => {
    switch (action.type) {
        case "SET_REPAIR_DETAILS":
            return {...action.repairDetails};
        default:
            return state
    }
};