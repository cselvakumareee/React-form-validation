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
  const [nameErr, setNameError]: any = useState("");
  const [phoneErr, setPhoneError]: any = useState("");
  const [emailErr, setEmailError]:any = useState("");
  const [passwordErr, setPasswordError]:any = useState("");
  const [dubplicateEmailErr, setDublicateEmail]:any = useState(false);
  let [index, setIndex]:any = useState(0);

  const validateForm = () => {
    let nameError = "";
    let phoneError = "";
    let emailError = "";
    let passwordError = "";
    let formName = inputName.current.value;
    let formPhone = inputPhone.current.value;
    let formEmail = inputEmail.current.value;
    let formPassword = inputPassword.current.value;
    if (inputName.current.value === "") {
      
      nameError = "Name should not be blank";
    } else if (formName.length < 2) {
      
      nameError = "Name should be min 5 char";
    }

    if (inputPhone.current.value === "") {
      
      phoneError = "Phone number should not be blank";
    } else if (formPhone.length < 2) {
      
      phoneError = "phone number should be min 5 char";
    }

    if (inputEmail.current.value === "") {
        emailError = "Email should not be blank";
      } else if (!formEmail.includes('@')) {
        emailError = "Not an Email";
    }

    if (inputPassword.current.value === "") {
      
      passwordError = "Password should not be blank";
    } else if (formPassword.length < 2) {
      
      passwordError = "Password should be min 5 char";
    }

    if (nameError || emailError || phoneError || passwordError) {
      setNameError(nameError);
      setPhoneError(phoneError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      return false;
    }
    
    return true;
  };

  const validateEmail = (valEmail: any) => {
    let valueArr:any = props.tableContent.map((item:any)=>{
      return item.email
    });
    const checkMail=(mail:any)=>{
      return mail == valEmail
    }
    let isDublicate:any = valueArr.some(checkMail);
    return isDublicate;
  };

  const calculateSubmitTime = (submitTime:any) => {
     let currentTime = Date.now();
     let updateCurrentTime:any = new Intl.DateTimeFormat('en-US',{hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(currentTime);
     let finalTimeStamp:any = submitTime - currentTime;
     alert(finalTimeStamp);
  }

  const addItem = (event: any, id:any) => {
    event.preventDefault();
    const valid = validateForm();
    let dubplicatedEmail:any = '';
    if (valid) {
      let checkEmail = inputEmail.current.value;
      let uniqueEmail:any = validateEmail(checkEmail);
      if(!uniqueEmail){
        let newItem: any = [];
      
      index = index + id;
      setIndex(index);
      newItem = {
        key: index,
        name: inputName.current.value,
        phone: inputPhone.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      };
      index++;
      props.onAddItem(newItem);
      inputName.current.value = '';
      inputPhone.current.value = '';
      inputEmail.current.value = '';
      inputPassword.current.value = '';
      }
    }
    else{
      setDublicateEmail(true);
    }
  };


  return (
    <div className="Form">
      
      <form onSubmit={(el)=>{addItem(el,1)}}>
          <div>
            <label>Name</label>
        <input
          type="text"
          ref={inputName}
          className="form-control"
          placeholder="Enter Your Name"
        />
        <div style={{ fontSize: 12, color: "red" }}>{nameErr}</div>
        </div>
        <div>
        <label>Phone</label>
        <input
          type="text"
          ref={inputPhone}
          className="form-control"
          placeholder="Enter Your Phonenumber"
        />
        <div style={{ fontSize: 12, color: "red" }}>{phoneErr}</div>
        </div>
        <div>
        <label>Email</label>
        <input
          type="text"
          ref={inputEmail}
          className="form-control"
          placeholder="Enter Your EmailId"
        />

        <div style={{ fontSize: 12, color: "red" }}>{emailErr}</div>
        </div>
        <div>
        <label>Password</label>
          <input
          type="text"
          ref={inputPassword}
          className="form-control"
          placeholder="Enter Your Password"
        />
          <div style={{ fontSize: 12, color: "red" }}>{passwordErr}</div>
        </div>
        <button type="submit">Submit</button>
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
