import axios from '../../axios/axios-valute';

export const FETCH_CURRANCY = 'FETCH_CURRANCY';

export function fetchCurrancy() {
    return async dispatch => {
        try {
            const response = await axios.get('/daily_json.js');
            const valuteList = [];

            Object.keys(response.data.Valute).forEach(key => {
                valuteList.push(response.data.Valute[key]);
            })
            dispatch({
                type: FETCH_CURRANCY,
                valuteList
            })

        } catch (e) {
            throw new Error(e.message)
        }
    }
}
