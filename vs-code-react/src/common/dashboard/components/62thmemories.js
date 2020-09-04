import React, { Component } from 'react';
import 'ag-grid-community/dist/styles/ag-theme-fresh.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';  
import {
    Grid,
    CircularProgress,   
    Button,
    Tabs, 
    Tab,
    Menu,
    MenuItem,
    Select,
    TextField,
    Fade,
  } from "@material-ui/core"; 

import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import { AgGridReact } from "ag-grid-react";
import DialogContent from '@material-ui/core/DialogContent';
import 'ag-grid-community/dist/styles/ag-grid.css';
import axios from "axios";
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import YouTube from 'react-youtube';
import CloseIcon from '@material-ui/icons/Close';
import Basic from './Basic';



import InputLabel from '@material-ui/core/InputLabel';


import { Route, Switch, Redirect, withRouter } from "react-router-dom";
//bar 스타일
const text={
      align: 'rigth', 
}
const btnstyle={
    alignItems: 'center',
};
const buttonsize={

  width: 200,
  height: 100,
  padding: 20
}
const phonenumber=[
  "01027261144","01094554835","01066221540","01064873057","01037630757","01080038003","01085144150","01058838744","01049007091","01033095102","01075177788","01052267852","01041053007","01046205563","01092505030","01064447001","01067667553","01022908644","01050121015","01085572983","01048028401","01045139743","01050339743"
];

const opts = {
    height: '550',
    width: '1000',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  
  const appbar= {
    alignItems: 'center',
  }
class yambong extends React.Component {
  
  constructor(props) {
    super(props);
    //state 

 this.state = {
 }

  }


 componentDidUpdate(prevProps, prevState) {
  
  
   
 }






 
 

render() {

  
    const { classes } = this.props;
     
    return (
      <React.Fragment>
        <Basic ></Basic>
      <div >
  
    
     </div> 
 
  
     </React.Fragment>            
    );
  };
}
export default yambong;
       





