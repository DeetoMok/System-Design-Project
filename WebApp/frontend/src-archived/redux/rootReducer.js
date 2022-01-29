import { combineReducers } from 'redux'
import googleLoginReducer from './googleLoginReducer'
import clientDataReducer from "./clientDataReducer"

//combine all the reducer tgt
const rootReducer = combineReducers({
  userData: googleLoginReducer,
  trainingData: clientDataReducer
})

export default rootReducer


// export type RootState = ReturnType<typeof rootReducer> // the typing of the object, to be used soon 