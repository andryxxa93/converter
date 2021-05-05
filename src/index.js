import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import currancyReducer from './store/reducers/valute';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';


const store = createStore(currancyReducer, applyMiddleware(ReduxThunk))

const app = (
    <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <App />
                    </CssBaseline>
                </ThemeProvider>
            </Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
