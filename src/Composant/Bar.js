import React from "react";
import {AmplifySignOut} from "@aws-amplify/ui-react";
const ProfileToolbar = ({currentUser}) =>
    <div style={{backgroundColor:"skyblue"}}>Bonjour <b>{currentUser.attributes.email}</b>
        <AmplifySignOut/>
    </div>


export default ProfileToolbar;
