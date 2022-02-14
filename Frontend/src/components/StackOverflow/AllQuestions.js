import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './css/AllQuestions.css';

function AllQuestions() {
  return (
    <div className='all-questions'>
        <div className='all-questions-container'>
            <div className='all-questions-left'>
                <div className='all-options'>
                    <div className='all-option'>
                        <p>0</p>
                        <span>Votes</span>
                    </div>
                    <div className='all-option'>
                        <p>0</p>
                        <span>Replies</span>
                    </div>
                    {/* <div className='all-option'>
                        <small>0 Views</small>
                    </div> */}
                </div>
            </div>
            <div className='question-answer'>
                <Link to='/question'>This is question title</Link>
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
                    <small>Posted "Timestamp"</small>
                    <Link>
                        <div className='author-details'>
                            <Avatar />
                            <p>User Name</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AllQuestions