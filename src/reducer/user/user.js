import camelcaseKeys from "camelcase-keys";

import {extend} from "../../utils.js";


const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: null,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_USER: `LOAD_USER`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: {
      status,
    },
  }),
  loadUser: (user) => ({
    type: ActionType.LOAD_USER,
    payload: {
      user,
    },
  }),
};

const Operation = {
  checkAuth: () => (dispatch, _, api) => {
    return api.get(`/login`)
      .then((response) => {
        const user = camelcaseKeys(response.data);

        dispatch(ActionCreator.loadUser(user));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, _, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        const user = camelcaseKeys(response.data);

        dispatch(ActionCreator.loadUser(user));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },
};

const reducer = (state = initialState, action) => {
  const {
    type,
    payload,
  } = action;

  switch (type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: payload.status,
      });

    case ActionType.LOAD_USER:
      return extend(state, {
        user: payload.user,
      });
  }

  return state;
};


export {
  AuthorizationStatus,
  ActionType,
  ActionCreator,
  Operation,
  reducer,
};
