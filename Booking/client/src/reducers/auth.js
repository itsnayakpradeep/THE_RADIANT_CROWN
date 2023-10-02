let userState;

if(window.localStorage.getItem("auth")) {
  userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
  userState = null; // {}
}
// 2. Create user reducer function
// {type:'LOGGED_IN_USER, payload: {name: 'pnayak', role: 'dev'}}
export const authReducer = (state = userState, action) => {
    switch(action.type){
      case "LOGGGED_IN_USER":
        return {...state, ...action.payload};
        case "LOGOUT":
          return action.payload;
          default: 
          return state
    }
  };
