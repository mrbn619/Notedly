import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

//user notes query
import {GET_MY_NOTES} from '../gql/query';

const MyNotes = () => {
    useEffect(() => {
        //update the document title
        document.title = "My Notes";
    });

    //query hook
    const {loading, error, data} = useQuery(GET_MY_NOTES);
    //if data is loading, display the loading message
    if (loading) return <Loading />;
    //if there was an error, display the error message
    if(error) return `Error! ${error.message}`;
    //if the query is successful and there are notes return the feed of notes, else
    //if the query is successful and there are no notes
    if(data.me.notes.length !== 0){
        return <NoteFeed notes={data.me.notes}/>;
    }else{
        return <p>No notes yet</p>
    }
};

export default MyNotes;
