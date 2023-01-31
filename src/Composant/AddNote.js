import React, {useState} from "react";
import {Storage} from "aws-amplify";
import "../App.css";
import {DataStore} from "@aws-amplify/datastore";
import {Note} from "../models";

const AddNotes = ({currentUser}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setItemFile] = useState(undefined);


    return <div className="App">
        <h1>My Notes App</h1>
        <div className="test">
            <br/>
            <input type="text"
                   placeholder="Note" onChange={event => setName(event.target.value)}/>
            <input type="text"
                   placeholder="description" onChange={event => setDescription(event.target.value)}/>
            <input type="file" accept="image/*" onChange={(event) => {
                setItemFile(event.target.files[0])
            }}/>
            <br/> <br/>
            <button onClick={async () => {
                /* sauvegarde sur S3 le fichier */
                if (file) {
                    await Storage.put(file.name, file);
                }
                await DataStore.save(new Note({
                    name,
                    description,
                    image: file ? file.name : "",
                    userEmail: currentUser.attributes.email
                }))
            }}>Créer une note
            </button>

        </div>
    </div>

}
export default AddNotes;