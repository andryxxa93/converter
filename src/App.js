import { Box, Container } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router';
import Converter from './Components/Converter';
import TemporaryDrawer from './Components/TemporaryDrawer';
import ValuteList from './Components/ValuteList';

function App() {
  return (
    <Container>
        <Box m={2}>
            <TemporaryDrawer/>
        </Box>
        <Switch>
            <Route path='/' component={ValuteList} exact/>
            <Route path='/convert' component={Converter} exact/>
        </Switch>
    </Container>
  );
}

export default App;
