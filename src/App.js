import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator} from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import {API, Hub, Storage} from 'aws-amplify';
import {Auth} from "aws-amplify";
import AddNotes from "./Composant/AddNote";
import {Amplify} from 'aws-amplify';
import awsmobile from './aws-exports';
import Bar from "./Composant/Bar";
import Notes from "./Composant/Note";
import {Note} from "./models";
import {Button} from "@material-ui/core";
import {DataStore} from "@aws-amplify/datastore";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const initialFormState = { name: '', description: '' }


Amplify.configure(awsmobile);

function App() {
  const [currentUser,setCurrentUser] = useState(undefined)



  useEffect(() =>{
    async function getAuthUser() {
      setCurrentUser(await Auth.currentAuthenticatedUser())
    }
    getAuthUser()
  }, [])

  return currentUser ? <div>
    <Bar currentUser={currentUser}/>
    <AddNotes currentUser={currentUser}/>
    <Notes/>

  </div> : null

}

export default withAuthenticator(App);