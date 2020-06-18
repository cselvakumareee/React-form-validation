import React from 'react';
import * as actionConstants from './ActionConstants';


const initialState:any = {
    tableItems: [],
    index: 0
}

const reducer = (state=initialState, action:any) =>{
    switch(action.type){
        case actionConstants.ADD_ITEM:
            const updatedItems = [...state.tableItems];
            updatedItems.push(action.inputvalue);
            let updateIndex = 0;
            return{
                ...state,
                tableItems: updatedItems,
                
            }
        case actionConstants.EMAIL_VALIDATION:
             return;
        default:
            return initialState;    
    }
}

export default reducer;