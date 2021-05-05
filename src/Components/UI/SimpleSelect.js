import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [valute, setValute] = useState('');

  const handleChange = (event) => {
    setValute(event.target.value);
    props.onChangeValute(event.target.value, props.valuteStatus)
  };

  useEffect(() => {
    if (props.defaultValute) {
      setValute(props.defaultValute)
    }
  }, [props.defaultValute, valute])

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={valute}
          onChange={handleChange}
        >
          {
              props.valuteList.map(valute => {
                  return (
                    <MenuItem key={valute.ID} value={valute.CharCode}>
                        {valute.CharCode}
                    </MenuItem>
                  )
              })
          }
        </Select>
      </FormControl>
    </div>
	)
}