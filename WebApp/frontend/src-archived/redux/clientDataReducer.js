import {UploadDataAction} from "./actiontype.js";

const defaultClientData = {
    columns : [], 
    data: []
}


const clientDataReducer = (userData = defaultClientData, action) => {
    switch (action.type) {
      case UploadDataAction: return {
        columns: action.payload.columns,
        data: action.payload.data,
      }
      default: return userData
    }
  }
  export default clientDataReducer;
