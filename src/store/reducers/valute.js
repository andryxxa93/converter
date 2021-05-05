import { FETCH_CURRANCY } from "../actions/valute"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    valuteList: [],
    mainValute: {}
}


export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CURRANCY:
            return {
                ...state, valuteList: action.valuteList
            }
        default:
            return state
    }
}