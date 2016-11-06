import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import { ElectionResultsSetup as ElectionResults  } from './components/ElectionResults';
import { store } from './store';

ReactDom.render(
  <Provider store={store} >
    <ElectionResults />
  </Provider>,
  document.getElementById('election-results')
);