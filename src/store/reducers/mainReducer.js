import * as actionTypes from '../actions/actions';

const initialState = {
    mainApps: {
        newApps: [],
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_APPS:
            return {
                ...state,
                mainApps: {
                    ...state.mainApps,
                    [action.appsCat]: action.apps  
                },
            };

        default:
            return state;
    };
};

export default reducer;