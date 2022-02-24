import { Bookmark, History } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useHistory } from 'react-router-dom';
import './css/Reply.css';

function Reply(data) {
    // console.log(data);
    data = data.data;
    const props = data.props
    const repliedTo = data.repliedTo
    console.log(props);
    const tid = data.tid 
    const history = useHistory();
    const url1 = `${process.env.REACT_APP_API_URL}/adddata`;
    const url2 = `${process.env.REACT_APP_API_URL}/view/${props.id}/answers`

    const [show, setShow] = useState(false);
    const [replies, setReplies] = useState()
    const fetchRepliesData = async () => {
        fetch(url2, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                setReplies(data);
            })
    };
    // const fetchCommentCount = async () => {
    //     fetch(url3, {
    //         method: 'GET',
    //     })
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             // console.log(data);
    //             setCount(data);
    //         })
    // };
    useEffect(()=>{
        fetchRepliesData();
    },[])

    const [sendData, setSendData] = useState({
        title : "",
        body : "",
        comments : 0, // take fetched data only
        author : "REPLYauth123",
        level : props.level,
        pid : props.id
    });

    function handleUpdate(e) {

    }

    function submitHandler(e) {

    }

    // in the post of add reply put a if on level < 5 then only make a call
    
    // give left margin based on level

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
                <small>Replied to : {repliedTo}</small>
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
                <p onClick={() => setShow(!show)}>Add a reply</p><br />
                {
                    show && (<div>
                        <textarea onChange={(e)=>handleUpdate(e)} style={{
                            height: "100%",
                            width: "60%",
                        }}
                        id="body" value={sendData.body} type="text" placeholder="Post your Reply... " />
                        <br />
                        {/* <ReactQuill className='react-quill' theme='snow' style={{
                            hieght: "10%",
                            width: "60%",
                        }} /> */}
                        {/*  <Link to={`/messages/chat/${item.id}`}></Link> */}
                        {/* Call Reply.js with current top comment id */}
                        <button onClick={(e)=>submitHandler(e)}>Add reply</button>
                    </div>)
                }
            </div>
            <div className='replies'>
                { replies  &&
                    replies.map(item => {
                        <Reply data = {{
                            props : item,
                            repliedTo : props.author,
                            tid : tid
                        }} />
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Reply