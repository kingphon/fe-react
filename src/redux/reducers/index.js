import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
import provinceReducer from './Location/provinceReducer'
import districtReducer from './Location/districtReducer'
import zoneReducer from './Location/zoneReducer'
export default combineReducers({
    rootReducer,
    provinceReducer,
    districtReducer,
    zoneReducer,
});
