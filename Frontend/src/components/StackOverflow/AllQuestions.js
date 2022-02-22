import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './css/AllQuestions.css';

function AllQuestions(props) {
    props=props.data;
  return (
    <div className='all-questions'>
        { props && (
            <div className='all-questions-container'>
                <div className='all-questions-left'>
                    <div className='all-options'>
                        <div className='all-option'>
                            <p>{props.votes}</p>
                            <span>Votes</span>
                        </div>
                        <div className='all-option'>
                            <p>{props.comments}</p>
                            <span>Replies</span>
                        </div>
                        {/* <div className='all-option'>
                            <small>0 Views</small>
                        </div> */}
                    </div>
                </div>
                <div className='question-answer'>
                    <Link to={`/question/${props.id}`}>{props.title}</Link>
                    <div style={{
                        width: "90%"
                    }}>
                        <div>Question Body / Overview </div>
                    </div>
                    {/* <div style={{
                        display: "flex"
                    }}>
                        <span className='question-tags'>
                            tag1
                        </span>
                        <span className='question-tags'>
                            tag2
                        </span>
                        <span className='question-tags'>
                            tag3
                        </span>
                    </div> */}
                    <div className='author'>
                        <small>Posted : {props.created}</small>
                        <Link>
                            <div className='author-details'>
                                <Avatar />
                                <p>{props.author}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default AllQuestions