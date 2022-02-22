import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useParams } from 'react-router-dom';
import './css/MainQuestion.css';
import DisplayQuestion from './DisplayQuestion';
import TopComment from './TopComment';

function MainQuestion() {
    const { id } = useParams();
    const url1 = `${process.env.REACT_APP_API_URL}/view/${id}`
    const url2 = `${process.env.REACT_APP_API_URL}/view/${id}/all`
    const [questiondata, setQuestionData] = useState();
    const [topcomments, setTopComments] = useState();
    const fetchQuestionData = async () => {
        fetch(url1, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                setQuestionData(data);
            })
    };
    const fetchTopCommentsData = async () => {
        fetch(url2, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                setTopComments(data);
            })
    };
    useEffect(() => {
        fetchQuestionData();
        fetchTopCommentsData();
        // console.log(questiondata);
        // console.log(topcomments);
    }, []);
    return (
        <div className='main'>
            { questiondata && topcomments && (
                <>
                <div className='main-container'>
                    <div className='main-top'>
                        <h2 className='main-question'></h2>
                        <Link to='/add-question'>
                            <button>Ask Question</button>
                        </Link>
                    </div>
                    <div className='main-desc'>
                        <div className='info'>
                            <p>{questiondata[0].created}</p>
                        </div>
                    </div>
                    <div className='main-middle'>
                        <div className='main-middle-container'>
                            <DisplayQuestion data={questiondata} />
                        </div>
                    </div>
                    <div className='all-comments'>
                        <p>{questiondata[0].comments} Comments</p>
                        {
                            topcomments.map(item => (
                                <TopComment data={item} />
                            ))
                        }
                    </div>
                </div>
                <div className='add-top-level-comment'>
                    <h3>Add a Top Level Comment</h3>
                    <ReactQuill className='react-quill' theme='snow' style={{
                        height: "70%",
                    }} />
                </div>
                <button>Post</button>
                </>
            )}
        </div>
    )
}

export default MainQuestion