import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import Peer from 'peerjs';

import Home from "../src/pages/home";
import Login from "../src/pages/login";
import Register from '../src/pages/register';
import SocketClient from '../src/SocketClient';
import CallModal from '../src/components/message/CallModal';


import PageRender from "./userRouter/PageRender";
import PrivateRouter from "./userRouter/PrivateRouter"

import Alert from "./components/alerts/Alert";
import Navbar from "./components/header/Navbar";
import StatusModal from "./components/StatusModal";

import { refreshToken } from "./redux/actions/authAction";

import { showPosts } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionAction';

import { getNotifies } from './redux/actions/notifyAction';
import { GLOBALTYPES } from "./redux/actions/globalTypes";



const App = () => {
  const { auth, status, modal, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();

    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(showPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") { }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") { }
      });
    }
  }, [])


  // Call - peer
  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  }, [dispatch])

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App  ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Navbar />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}


          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
};

export default App;
