import {combineReducers} from "redux";

import NameSpace from "./name-space.js";
import {reducer as data} from "./data/data.js";
import {reducer as main} from "./main/main.js";
import {reducer as user} from "./user/user.js";


const reducer = combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.MAIN]: main,
  [NameSpace.USER]: user,
});


export default reducer;
