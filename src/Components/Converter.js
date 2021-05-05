import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Box, Container, Grid, Input, makeStyles, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as currancyActions from '../store/actions/valute';
import ArrowIcon from './UI/ArrowIcon';
import SimpleSelect from './UI/SimpleSelect';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DEFAULT_VALUTE':
            const newState = {
                mainValute: action.mainValute,
                secondValute: action.secondValute
            }
            return {...state, ...newState}
        case 'CHANGE_VALUTE':
            const updatedState = {...state};
            updatedState[action.valuteStatus] = {...action.valute};
            return {...updatedState}
        case 'CHANGE_NOMINAL': 
            return {...state, nominal: action.nominal}
        case 'REVERSE_VALUTE':
            const mainValuteTemp = state.mainValute;
            const secondValuteTemp = state.secondValute;
            const tempState = {...state, mainValute: {...secondValuteTemp}, secondValute: {...mainValuteTemp}}
            return {...tempState}
        default:
            return state;
    }
}


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2)
    },
    input: {
        minWidth: '10%',
        maxWidth: '30%'
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        width: '40%',
    },
    infoGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        backgroundColor: 'white',
        borderRadius: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 40, 
        width: 40,
        cursor: 'pointer'
    }
  }));

function Converter(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const valuteList = useSelector(state => state.valuteList);

    const [valuteListData, setValuteListData] = useState([])
    const [course, setCourse] = useState(0)

    const [state, localDispatch] = useReducer(reducer, 
        {
            mainValute: {
                CharCode: '',
                Value: ''
            },
            secondValute: {
                CharCode: '',
                Value: ''
            },
            nominal: 1
        }
    )

    const setValuteState = useCallback(() => {
        if (!valuteListData.length) {
            return
        }
        const mainValute = valuteListData[0];
        const secondValute = valuteListData[1];
        
        localDispatch({type: 'SET_DEFAULT_VALUTE', mainValute, secondValute })

    }, [valuteListData])

    const onChangeValute = (valuteName, valuteStatus = 'mainValute') => {
        const valute = valuteListData.find(valute => valute.CharCode === valuteName);
        localDispatch({type: 'CHANGE_VALUTE', valute, valuteStatus});
    }

    const nominalChangeHandler = (e) => {
        localDispatch({type: 'CHANGE_NOMINAL', nominal: e.target.value})
    }

    const getCourse = (firstValute, secondValute, nominal) => {
        const course = ((nominal * firstValute.Value / firstValute.Nominal) / (secondValute.Value / secondValute.Nominal)).toFixed(2);
        return course;
    }

    const onReverse = () => {
        localDispatch({type: 'REVERSE_VALUTE'})
    }
    
    useEffect(() => {
    dispatch(currancyActions.fetchCurrancy());
    }, [dispatch])

    useEffect(() => {
        setValuteListData(valuteList)
    }, [valuteList])

    useEffect(() => {
        setValuteState()
    }, [valuteListData, setValuteState])

    useEffect(() => {
        const course = getCourse(state.mainValute, state.secondValute, state.nominal);
        if (isNaN(course)) {
            return
        }
        setCourse(course)
    }, [state.mainValute, state.secondValute, state.nominal])

    return (
        <Container className={classes.container}>
                <Box className={classes.box}>
                    <Paper className={classes.paper}>
                           <Box
                                style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                            >
                                <Typography
                                    color={'secondary'}
                                    variant='subtitle1'
                                >
                                    {state.mainValute.Name}
                                </Typography>
                                <Grid
                                    container
                                    item
                                    className={classes.infoGrid}
                                    wrap='nowrap'
                                >
                                    <SimpleSelect 
                                        defaultValute={state.mainValute.CharCode} 
                                        onChangeValute={onChangeValute} 
                                        valuteStatus={'mainValute'} 
                                        valuteList={valuteListData}/>    
                                    <Input onChange={nominalChangeHandler} className={classes.input} defaultValue={state.nominal}/>
                                </Grid>
                           </Box>
                    </Paper>
                    <Box onClick={onReverse} className={classes.circle}>
                        <ArrowIcon size={30} color={'#2096f3'}/>
                    </Box>
                    <Paper className={classes.paper}>
                            <Box
                                style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                            >
                                <Typography
                                    color={'secondary'}
                                    variant='subtitle1'
                                >
                                    {state.secondValute.Name}
                                </Typography>
                                <Grid
                                    container
                                    item
                                    className={classes.infoGrid}
                                    wrap='nowrap'
                                >
                                    <SimpleSelect
                                        defaultValute={state.secondValute.CharCode} 
                                        onChangeValute={onChangeValute} 
                                        valuteStatus={'secondValute'} 
                                        valuteList={valuteListData}/>    
                                    <Input className={classes.input} disableUnderline value={course} readOnly/>
                                </Grid>
                            </Box>
                    </Paper>
                </Box>
        </Container>
    );
}

export default Converter;