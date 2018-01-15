'use strict';

import { combineReducers } from 'redux';
import device from './device';
import user from './user';

const rootReducer = combineReducers({
  device,
  user,
});

// const rootReducer = {
//   device,
//   user,
// };

export default rootReducer;