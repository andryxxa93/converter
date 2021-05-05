import React, { useReducer, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

import ArrowIcon from './UI/ArrowIcon';
import ArrowIconVertical from './UI/ArrowIconVertical';

const reducer = (state, action) => {
    switch (action.type) {
        case 'REVERSE_VALUTE':
            const mainValuteTemp = state.mainValute;
            const secondValuteTemp = state.secondValute;
            const tempState = {...state, mainValute: {...secondValuteTemp}, secondValute: {...mainValuteTemp}}
            return {...tempState}
        default:
            return state
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      marginBottom: 20,
      width: '100%',
      maxWidth: 500,
      minWidth: 200
    },
    infoGrid: {
        marginBottom: 10,
        marginTop: 10
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }));

function ValuteItem({valute}) {
      
    const classes = useStyles();
    const [focused, setFocused] = useState(false)

    const [state, dispatch] = useReducer(reducer, 
        {
            mainValute: {
                charCode: valute.CharCode,
                value: valute.Value,
                nominal: valute.Nominal
            },
            secondValute: {
                charCode: 'RUB',
                value: 1,
                nominal: 1
            },
        }    
    )

    const onReverse = () => {
        dispatch({type: 'REVERSE_VALUTE'})
    }

    const getCourse = () => {
       return (state.mainValute.value / state.secondValute.value * state.secondValute.nominal).toFixed(4)
    }

    const differense = (valute.Value - valute.Previous).toFixed(4);

    return (
        <Paper 
            elevation={focused ? 15 : 3}
            onMouseEnter={() => setFocused(true)} 
            onMouseLeave={() => setFocused(false)} 
            className={classes.paper}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                <Typography
                    color={'secondary'}
                    variant='subtitle1'
                >
                    {valute.Name}
                </Typography>
                <Grid
                    container
                    className={classes.infoGrid}
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                >
                    <Grid
                        container
                        item
                        xs={6}
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                    >
                        <Typography>
                            {state.mainValute.nominal} {state.mainValute.charCode}
                        </Typography>
                        <Box 
                            onClick={onReverse}
                            className={classes.icon}
                        >
                            <ArrowIcon/>
                        </Box>
                        <Typography>
                            {getCourse() + ' ' + state.secondValute.charCode}
                        </Typography>
                    </Grid>
                    <Box
                        display='flex'
                        flexDirection='row'
                    >
                        <ArrowIconVertical arrowDir={differense > 0 ? 'up' : 'down'}/>
                        <Typography
                            color={differense < 0 ? 'error' : 'primary'}
                        >
                            {differense.replace('-', '')}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>        
    );
}

export default ValuteItem;