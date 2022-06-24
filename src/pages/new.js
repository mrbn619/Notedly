import React,{useEffect} from 'react';
import {useMutation} from '@apollo/client';
import NoteForm from '../components/NoteForm';

//import GET_NOTES, and GET_MY_NOTES to refetch
import {GET_NOTES, GET_MY_NOTES} from '../gql/query';

//import NEW_NOTE mutation
import {NEW_NOTE} from '../gql/mutation';

const NewNote = props => {
    useEffect(() => {
        document.title = 'New Note';
    });

    //mutation hook
    const [data, {loading,error}] = useMutation(NEW_NOTE, {
        //refetch the GET_NOTES query to update the cache
        refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
        onCompleted: data => {
            //when completed, redirect the user to the new note page
            props.history.push(`/note/${data.newNote.id}`) 
        }
    });

    return(
        <React.Fragment>
            {/*if loading, display the loading message */}
            {loading && <p>Loading...</p>}
            {/*if there was a error, display the error message */}
            {error && <p>Error saving the note!</p>}
            {/*NoteForm component, passing mutation data as the prop */}
            <NoteForm action={data}/>
        </React.Fragment>
    );
};

export default NewNote;
