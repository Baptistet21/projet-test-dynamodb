import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import {CardContent} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import "../App.css";
import {DataStore} from "@aws-amplify/datastore";
import {Note} from "../models";
import {AmplifyS3Image} from "@aws-amplify/ui-react";


const Notes = () => {
    /* list items*/
    const [notes, setNotes] = useState([]);

    const getNotes = async ()=> setNotes(await DataStore.query(Note))

    useEffect(()=>{
        /* permet de rafraichir, modifier la list par rapport aux ajouts et supp*/
        getNotes();
        const subscription = DataStore.observe(Note).subscribe(()=>getNotes())
        return ()=> subscription.unsubscribe();
    })


    return <div>
        {notes.length === 0 &&
            <Typography style={{textAlign:"center"}} variant="h5">Aucune notes</Typography>}
        {notes.map(item =>
            <Card key={item.id} className="Item">
                <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography> {item.description}</Typography>
                    {item.image && <AmplifyS3Image path={item.image}/>}
                    <Typography style={{textAlign:"right"}}>Publié par {item.userEmail}</Typography>

                </CardContent>
            </Card>)}

    </div>
}

export default Notes;