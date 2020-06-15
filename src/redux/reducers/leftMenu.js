export const leftMenu = (state = [
    [{path: "/repairs", text: "Aktualne naprawy"},
    {path: "/repairs/newrepair", text: "Dodaj naprawę"}],
], action) => {
    switch (action.type) {
        case 'SET_MENU':
            return [action.leftMenu];
        default:
            return state
    }
};