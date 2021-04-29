import NameSpace from "../name-space.js";


const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
const getUser = (state) => state[NameSpace.USER].user;


export {getAuthorizationStatus, getUser};
