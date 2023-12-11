export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'not-logged-in',
  IS_LOGGED_IN: 'is-logged-in',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  USERNAME_REQUIRED: "username-required",
  USERNAME_INVALID: "username-invalid",
  CONTENT_REQUIRED: "content-required",
  POST_MISSING: 'no-such-id', 
};

export const CLIENT = {
  NETWORK_ERROR: 'network-error',
  NO_SESSION: 'no-session',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: "Trouble connecting to the network. Please try again",
  [SERVER.AUTH_INSUFFICIENT]:
    "Your username/password combination does not match any records, please try again.",
  [SERVER.USERNAME_REQUIRED]: "Please enter a username",
  [SERVER.USERNAME_INVALID]:
    "Please enter a valid username(letters and/or numbers, up to 16 characters)",
  [SERVER.CONTENT_REQUIRED]: "Please write some content to post",
  default: "Something went wrong. Please try again",
};