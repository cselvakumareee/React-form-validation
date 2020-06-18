import * as actionTypes from './ActionConstants';

export const additem = (inputVal:any) => {
    return {
        type: actionTypes.ADD_ITEM,
        inputvalue: inputVal
    };
};

export const emailValidation = (emailVal:any) => {
    return {
        type: actionTypes.ADD_ITEM,
        emailvalue: emailVal
    };
};