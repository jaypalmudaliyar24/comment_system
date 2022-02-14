import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import './css/MainQuestion.css';
import DisplayContent from './DisplayContent';

function MainQuestion() {
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
    const API_Data = "HELLO";
  return (
    <div className='main'>
        <div className='main-container'>
            <div className='main-top'>
                <h2 className='main-question'>This is Question Title</h2>
                <Link to='/add-question'>
                    <button>Ask Question</button>
                </Link>
            </div>
            <div className='main-desc'>
                <div className='info'>
                    <p>TimeStamp</p>
                </div>
            </div>
            <div className='main-middle'>
                <div className='main-middle-container'>
                    <DisplayContent data={API_Data} />
                </div>
            </div>
            <div className='all-comments'>
                <p>No. of comments</p>
                <DisplayContent data={API_Data} />
            </div>
        </div>
        <div className='add-top-level-comment'>
            <h3>Add a Top Level Comment</h3>
            <ReactQuill className='react-quill' theme='snow' style={{
                height: "70%",
            }} />
        </div>
        <button>Post</button>
    </div>
  )
}

export default MainQuestion