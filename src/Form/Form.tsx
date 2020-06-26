import React, { useRef, useState, useEffect } from "react";
import "./Form.scss";
import View from "../View/View";
import { connect } from "react-redux";
import * as actionCreator from "../Store/ActionCreator";

const FormComp = (props: any) => {
  const inputName: any = useRef();
  const inputPhone: any = useRef();
  const inputEmail: any = useRef();
  const inputPassword: any = useRef();
  const [userName, setUserName]:any = useState('');
  const [userNameValid, setUserNameValid]:any = useState(false);
  const [phone, setPhone]:any = useState('');
  const [phoneValid, setPhoneValid]:any = useState(false);
  const [emil, setEmail]:any = useState('');
  const [emailValid, setEmailValid]:any = useState(false);
  const [password, setPassword]:any = useState('');
  const [passwordValid, setPasswordValid]:any = useState(false);
  const [formValid, setFormValid]:any = useState(false);
  const [nameErrorMsg, setNameErrorMsg]:any = useState();
  const [phoneErrorMsg, setPhoneErrorMsg]:any = useState();
  const [emailErrorMsg, setEmailErrorMsg]:any = useState();
  const [passwordErrorMsg, setPasswordErrorMsg]:any = useState();
  let [index, setIndex]:any = useState(0);

  const validateForm = () => {
    alert('its calling');
   let blockUserName:any = userName;
    if(/^\d+$/.test(blockUserName)){
      setNameErrorMsg('');
    }
    else{
      setNameErrorMsg('Username should not contain NUmber');
    }
  };

  const validateEmail = (valEmail: any) => {
    let valueArr:any = props.tableContent.map((item:any)=>{
      return item.email
    });
    const checkMail=(mail:any)=>{
      return mail == valEmail
    }
    let isDublicate:any = valueArr.some(checkMail);
    if(valueArr.some(checkMail)){
      setEmailErrorMsg('Email Already Exist');
    }
    else{
      setEmailErrorMsg('');
    }
    
    return isDublicate;
  };

  const addItem = (event: any, id:any) => {
    
    event.preventDefault();
   // const valid = validateForm();
    let dubplicatedEmail:any = '';
    
      let checkEmail = inputEmail.current.value;
      let uniqueEmail:any = validateEmail(checkEmail);
      if(!uniqueEmail){
        let newItem: any = [];
      
      index = index + id;
      setIndex(index);
      newItem = {
        key: index,
        name: userName,
        phone: phone,
        email: emil,
        password: password,
      };
      index++;
      props.onAddItem(newItem);
      inputName.current.value = '';
      inputPhone.current.value = '';
      inputEmail.current.value = '';
      inputPassword.current.value = '';
      }
    
    // else{
    //   setDublicateEmail(true);
    // }
  };


  const updateUserName = (userName:any) => {
    setUserName(userName)
    let usrName:any = userName;
    console.log(usrName);
    if(usrName.length > 3 && !/^\d+$/.test(usrName)){
      setUserNameValid(true);
      setNameErrorMsg('');
    }
    else if(usrName.length < 3 && !/^\d+$/.test(usrName)){
      setUserNameValid(false);
      setNameErrorMsg('this is string value & Enter atleast 3 char');
    }
    else if(usrName.length > 3 && /^\d+$/.test(usrName)){
      setUserNameValid(false)
      setNameErrorMsg('length ok & Enter ABCD');
    }
    else if(usrName.length < 3 && /^\d+$/.test(usrName)){
      setUserNameValid(false)
      setNameErrorMsg('Enter atleast 3 char & Enter only ABCD');
    }
    
  }

  const updatePhone = (phone:any) => {
    setPhone(phone)
    let phNo:any = phone;
    console.log(phNo);
    if(phNo.length > 3 && /^\d+$/.test(phNo)){
      setPhoneValid(true);
      setPhoneErrorMsg('');
    }
    else if(phNo.length < 3 && /^\d+$/.test(phNo)){
      setPhoneValid(false);
      setPhoneErrorMsg('this is NUM & Enter atleast 3 char');
    }
    else if(phNo.length > 3 && !/^\d+$/.test(phNo)){
      setPhoneValid(false)
      setPhoneErrorMsg('length ok & Enter Num');
    }
    else if(phNo.length < 3 && !/^\d+$/.test(phNo)){
      setPhoneValid(false)
      setPhoneErrorMsg('Enter atleast 3 char & Enter only NUM');
    }
  }

  const updateEmail = (email:any) => {
    setEmail(email);
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setEmailValid(false);
      setEmailErrorMsg('Invalid email format');
    }
    else{
      setEmailValid(true);
      setEmailErrorMsg('');
    }
  }

  const updatePassword = (passwrd:any) => {
    setPassword(passwrd);
    let psWrd:any = passwrd;
    if (psWrd.length < 6) {
      setPasswordValid(false);
      setPasswordErrorMsg('Password must be at least 6 characters long');
    } else if (!/\d/.test(psWrd)){
      setPasswordValid(false);
      setPasswordErrorMsg('Password must contain a digit');
    } else if (!/[!@#$%^&*]/.test(psWrd)){
      setPasswordValid(false);
      setPasswordErrorMsg('Password must contain special character: !@#$%^&*');
    }
    else{
      setPasswordValid(true);
      setPasswordErrorMsg('');
    }
  }

  let submitButton:any;
  if(userNameValid && phoneValid && emailValid && passwordValid){
    submitButton = <button type="submit" onClick={(el)=>{addItem(el,1)}}>Submit</button>;
  }
  else{
    submitButton = <button type="submit" disabled>Submit</button>;
  }

  return (
    <div className="Form">
      
      <form>
          <div className="form-group">
            <label>Name</label>
        <input
          type="text"
          ref={inputName}
          onChange = {(e)=>updateUserName(e.target.value)}
          className="Input"
          placeholder="Enter Your Name"
        />
        <div className='error-msg'>{nameErrorMsg}</div>
        </div>

        <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          ref={inputPhone}
          onChange = {(e)=>updatePhone(e.target.value)}
          className="Input"
          placeholder="Enter Your Phonenumber"
        />
        <div className='error-msg'>{phoneErrorMsg}</div>
        </div>

        <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          ref={inputEmail}
          onChange = {(e)=>updateEmail(e.target.value)}
          className="Input"
          placeholder="Enter Your EmailId"
        />
        <div className='error-msg'>{emailErrorMsg}</div>
        </div>

        <div className="form-group">
        <label>Password</label>
          <input
          type="text"
          ref={inputPassword}
          onChange = {(e)=>updatePassword(e.target.value)}
          className="Input"
          placeholder="Enter Your Password"
        />
        <div className='error-msg'>{passwordErrorMsg}</div>
        </div>
        
        {submitButton}
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tableContent: state.tableItems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddItem: (userInputs: any) => dispatch(actionCreator.additem(userInputs)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormComp);
