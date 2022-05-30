import React from 'react';
import {useMutation} from '@apollo/client';
import {withRouter} from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';

//import the DELETE_NOTE mutation
import {DELETE_NOTE} from '../gql/mutation';

//import the queries to refetch after deletion
import {GET_NOTES, GET_MY_NOTES} from '../gql/query';

const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE,{
        variables:{
            id: props.noteId
        },
        //refetch the note list queries to update the cache
        refetchQueries:[{query: GET_NOTES},{query: GET_MY_NOTES}],
        onCompleted: () => {
            //redirect the user to the /mynotes page
            props.history.push('/mynotes');
        }
    });

    return <ButtonAsLink onClick={deleteNote} >Delete Note</ButtonAsLink>;
};

//use withRouter to route the non routable component
export default withRouter(DeleteNote);
