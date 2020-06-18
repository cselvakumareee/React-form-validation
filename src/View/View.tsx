import React, { Component } from "react";
import "./View.scss";
import { connect } from "react-redux";
import Moment from 'react-moment';

const View = (props: any) => {
  let tableValue = [];
  let counterValue = '';
  
  if (props.tableContent.length > 0) {
    tableValue = props.tableContent.map((item: any) => {
      return (
        <tr>
          <td>{item.key}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td><Moment fromNow>{Date.now()}</Moment></td>
        </tr>
      );
    });
  }

  return (
    <div className="View">
      {props.tableContent.length>0 ?
        <table>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Password</th>
          <th>Time</th>
          {tableValue}
        </table> : null}
      
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tableContent: state.tableItems,
    counter: state.index
  };
};

export default connect(mapStateToProps)(View);
