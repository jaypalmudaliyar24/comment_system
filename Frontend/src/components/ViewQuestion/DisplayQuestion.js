import { Bookmark, History } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import './css/DisplayQuestion.css';

function DisplayQuestion(props) {
    const [show, setShow] = useState(false);
    // const sampleDataFromAPI = [
    //     {
    //         id : 1, // primary key
    //         body : "Your content for 1",
    //     },
    //     {
    //         id : 2,
    //         body : "Your content for 2",
    //     },
    // ];
    props = props.data[0];
    return (
        <div className='container'>
            { props && (
                <>
                <div className='left'>
                    <div className='all-options'>
                        <p className='arrow' style={{
                            cursor: "pointer",
                        }}>▲</p>
                        <p className='arrow'>{props.votes}</p> {/* Vote Count */}
                        <p className='arrow' style={{
                            cursor: "pointer",
                        }}>▼</p>
                        {/* <Bookmark />
                        <History /> */}
                    </div>
                </div>
                <div className='right'>
                    <p>{props.body}</p>
                    <div className='author'>
                        <small>Posted : {props.created}</small>
                        <small>Last Edited {props.lastEdit}</small>
                        <Link>
                            <div className='auth-details'>
                                <Avatar />
                                <p>{props.author}</p>
                            </div>
                        </Link>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default DisplayQuestion