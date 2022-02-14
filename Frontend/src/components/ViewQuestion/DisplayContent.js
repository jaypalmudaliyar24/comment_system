import { Bookmark, History } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import './css/DisplayContent.css';

function DisplayContent(data) {
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
  return (
      <div className='container'>
        <div className='left'>
            <div className='all-options'>
                <p className='arrow' style={{
                    cursor: "pointer",
                }}>▲</p>
                <p className='arrow'>0</p> {/* Vote Count */}
                <p className='arrow' style={{
                    cursor: "pointer",
                }}>▼</p>
                {/* <Bookmark />
                <History /> */}
            </div>
        </div>
        <div className='right'>
            <p>This is Question Body</p>
            <div className='author'>
                <small>Posted "TimeStamp"</small>
                <small>Last Edited "TimeStamp"</small>
                <Link>
                    <div className='auth-details'>
                        <Avatar />
                        <p>Author Name</p>
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
                        <button>Add reply</button>
                    </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default DisplayContent