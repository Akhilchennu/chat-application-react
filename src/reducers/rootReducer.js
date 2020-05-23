const initialState = {
    userData:{},loginSession: false,allUsers:[]
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "USERDATA":
            return{
                ...state,
                userData:action.userData
            }   
        case "AUTHENTICATE":
                return {
                    ...state,
                    loginSession: action.login
                }
        case "ALLUSERDATA":
            return{
                ...state,
                allUsers:action.allUsers
            }
        default:
            return state
    }
}
