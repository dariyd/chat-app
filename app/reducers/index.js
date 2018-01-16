'use strict';

import { combineReducers } from 'redux';
import device from './device';
import user from './user';
import messages from './messages';

const rootReducer = combineReducers({
  device,
  user,
  messages,
});

// const rootReducer = {
//   device,
//   user,
// };

export default rootReducer;