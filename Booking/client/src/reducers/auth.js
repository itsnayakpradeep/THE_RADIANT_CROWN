// 2. Create user reducer function
// {type:'LOGGED_IN_USER, payload: {name: 'pnayak', role: 'dev'}}
const authReducer = (state = {NAME: "Pnayak....", role:"dev"}, action) => {
    switch(action.type){
      case "LOGGGED_IN_USER":
        return {...state, ...action.payload};
        case "LOGOUT":
          return action.payload;
          default: 
          return state
    }
  };
  export default authReducer;