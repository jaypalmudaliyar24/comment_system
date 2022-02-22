import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TagsInput } from 'react-tag-input-component';
import { useHistory } from 'react-router-dom';
import './css/Question.css';

function Question() {
    const url = `${process.env.REACT_APP_API_URL}/addquestion`;
    const history = useHistory();
    const [sendData, setSendData] = useState({
        title: "",
        body: "",
        author: "Unknown123"
    })
    function handle(e) {
        const newData = { ...sendData }
        newData[e.target.id] = e.target.value
        setSendData(newData)
    }
    function submitHandler(e) {
        e.preventDefault();
        if(sendData.title) {
            axios.post(url, {
                title : sendData.title,
                body : sendData.body,
                author : sendData.author
            })
                .then(res => {
                    console.log(res.data);
                    alert("Question added Successfully")
                    history.push("/");
                })
                .catch((err)=> {
                    console.log(err)
                });
        }
    }
    return (
        <div className='add-question'>
            <div className='add-question-container'>
                <div className='head-title'>
                    <h1>Ask a public question</h1>
                </div>
                <div className='question-container'>
                    <div className='question-options'>
                        <div className='question-option'>
                            <div className='title'>
                                <h3>Title</h3>
                                <small>
                                    Be specific, imagining you're asking a question
                                    to another person
                                </small>
                                <input onChange={(e) => handle(e)} id="title" value={sendData.title} type="text" placeholder="Add question title" />
                            </div>
                        </div>
                        <div className='question-option'>
                            <div className='title'>
                                <h3>Body</h3>
                                <small>
                                    Include all the information someone would need to
                                    answer your question
                                </small>
                                <textarea onChange={(e) => handle(e)} id="body" value={sendData.body} type="text" placeholder="Post your question... " />
                                {/* <ReactQuill
                                    onChange={(e) => {
                                        // e = JSON.parse(e);
                                        console.log(e);
                                        // const newData1 = [...sendData];
                                        // newData1['body']={...newData1, body : e.target.value};
                                        // setSendData(newData1);
                                    }} id="body" value={sendData.body} className='react-quill' theme='snow' /> */}
                            </div>
                        </div>
                        {/* <div className='question-option'>
                        <div className='title'>
                            <h3>Tags</h3>
                            <small>
                                Add up to 5 tags to describe what your question
                                is about
                            </small>
                            <TagsInput name="tags" placeHolder='press enter to add new tag' />
                        </div>
                    </div> */}
                    </div>
                </div>
                <button onClick={(e)=>submitHandler(e)} className='button'>Add your question</button>
            </div>
        </div>
    );
}

export default Question