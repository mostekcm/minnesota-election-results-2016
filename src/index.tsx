import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import { ApplianceSetup as Setup  } from './components/Setup';
import { connect } from 'react-redux';
import { store } from './store';

ReactDom.render(
  <Provider store={store} >
    <Setup />
  </Provider>,
  document.getElementById('setup-appliance')
);