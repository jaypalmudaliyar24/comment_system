import { Bookmark, History } from '@mui/icons-material';
import { Avatar, ListItemSecondaryAction } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useHistory } from 'react-router-dom';
import Reply from './Reply';
import './css/TopComment.css';

function TopComment(data) {
    data = data.data;
    const props = data.props
    const repliedTo = data.repliedTo
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
                console.log(data);
                setReplies(data);
            })
    };
    useEffect(()=>{
        fetchRepliesData();
        if(replies && replies[0]) console.log(replies[0]);
    },[])
    const [sendData, setSendData] = useState({
        title : "",
        body : "",
        comments : props.comments,
        author : "UNKNOWN123",
        level : props.level,
        pid : props.id
    })
    function handleUpdate(e) {
        const newData = { ...sendData }
        newData[e.target.id] = e.target.value
        setSendData(newData)
    }
    function submitHandler(e) {
        e.preventDefault();
        if(sendData.body && sendData.comments<50 && sendData.level<5) {
            axios.post(url1, {
                title : sendData.title,
                body : sendData.body,
                comments : parseInt(sendData.comments+1),
                author : sendData.author,
                level : parseInt(sendData.level+1),
                pid : parseInt(sendData.pid)
            })
                .then(res => {
                    // console.log(res.data);
                    if(res.data) {
                        alert("Reply added Successfully");
                    }
                    else {
                        alert("Max level or Nested reply limit exceeded");
                    }
                    history.push(history.location.pathname);
                })
                .catch((err)=> {
                    console.log(err)
                });
        }
    }
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
                        id="body" value={sendData.body} type="text" placeholder="Post your Comment... " />
                        <br />
                        {/* <ReactQuill className='react-quill' theme='snow' style={{
                            hieght: "10%",
                            width: "60%",
                        }} /> */}
                        {/*  <Link to={`/messages/chat/${item.id}`}></Link> */}
                        {/* Call Reply.js with current top comment id */}
                        <button onClick={(e)=>submitHandler(e)} >Add reply</button>
                    </div>)
                }
            </div>
            <div className='replies'>
                { replies  &&
                    replies.map(item => {
                        <>
                        {/* <h1>{replies[0].body}</h1>
                        <Reply data = {{
                            props : item,
                            repliedTo : props.author,
                            tid : props.id
                        }} /> */}
                        </>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default TopComment