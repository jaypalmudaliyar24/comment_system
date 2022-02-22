import { Bookmark, History } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import './css/TopComment.css';

function TopComment(props) {
    const [show, setShow] = useState(false);
    props = props.data;
    // console.log(props);
  return (
      <div className='container'>
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
                <small>Posted {props.created}</small>
                <small>Last Edited {props.lastEdit}</small>
                <Link>
                    <div className='auth-details'>
                        <Avatar />
                        <p>{props.author}</p>
                    </div>
                </Link>
            </div>
            <div className='comments'>
                {/* <div className='comment'>
                    <p> This is comment -
                        <span>User Name</span>
                        &nbsp;&nbsp;&nbsp;
                        <small>TimeStamp</small>
                    </p>
                </div> */}
                <p onClick={() => setShow(!show)}>Add a reply</p>
                {
                    show && (<div>
                        <ReactQuill className='react-quill' theme='snow' style={{
                            hieght: "10%",
                            width: "60%",
                        }} />
                        {/*  <Link to={`/messages/chat/${item.id}`}></Link> */}
                        {/* Call Reply.js with current top comment id */}
                        <button>Add reply</button>
                    </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default TopComment