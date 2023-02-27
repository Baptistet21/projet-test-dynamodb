import React from "react";
import {AmplifySignOut} from "@aws-amplify/ui-react";
import {Button} from "@material-ui/core";
import {Hub} from "aws-amplify";
import {DataStore} from "@aws-amplify/datastore";

const ProfileToolbar = ({currentUser}) =>
    <div>Bonjour <b>{currentUser.attributes.email}</b>
        <AmplifySignOut/>
    </div>

Hub.listen('auth', async (data) => {
    if (data.payload.event === 'signOut') {
        await DataStore.clear();
    }
});

export default ProfileToolbar;
