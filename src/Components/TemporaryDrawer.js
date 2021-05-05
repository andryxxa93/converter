import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import RepeatIcon from '@material-ui/icons/Repeat';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    fontSize: 20, 
    color: 'black', 
    textDecoration: 'none', 
    width: '100%'
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const [linksArr, setLinksArr] = useState([
      {to: '/', label: 'Список', exact: true}, 
      {to: '/convert', label: 'Конвертер', exact: true}
  ])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {linksArr.map((link, index) => (
          <ListItem button key={link.label}>
            {index % 2 === 0 ? <FormatListBulletedIcon /> : <RepeatIcon />}
            <NavLink className={classes.link} to={link.to} exact={link.exact}>{link.label}</NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <>
          <MenuIcon fontSize='large' onClick={toggleDrawer('left', true)}/>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </>
    </div>
  );
}
