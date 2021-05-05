import { Box, Container, Input, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as currancyActions from '../store/actions/valute';

import ValuteItem from './ValuteItem';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2)
    },
    input: {
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
        marginBottom: theme.spacing(2),
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: theme.spacing()
    },
    box: {
        display: 'flex',
        flexDirection: 'column'
    }
  }));

function ValuteList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const valuteList = useSelector(state => state.valuteList);

    const [valuteListData, setValuteListData] = useState([])

    const onSearch = (e) => {
        const value = e.target.value;
        const regx =  new RegExp(value, 'i');
        // если не число ищем среди названий
        if (isNaN(value)) {
            setValuteListData(() => valuteList.filter(valute => regx.test(valute.Name)))
            return
        }
        setValuteListData(() => valuteList.filter(valute => regx.test(valute.NumCode)))
        
    }

    useEffect(() => {
    dispatch(currancyActions.fetchCurrancy());
    }, [dispatch])

    useEffect(() => {
        setValuteListData(valuteList)
    }, [valuteList])

    return (
        <Container className={classes.container}>
                <Box className={classes.box}>
                    <Input 
                        disableUnderline 
                        className={classes.input}
                        placeholder='Введите название валюты или её код'
                        onChange={onSearch}
                    />
                    {
                        valuteListData.map(valute => <ValuteItem key={valute.ID} valute={valute}/>)
                    }
                </Box>
        </Container>
    );
}

export default ValuteList;