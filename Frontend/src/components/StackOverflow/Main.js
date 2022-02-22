import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FilterList } from "@mui/icons-material";
import AllQuestions from "./AllQuestions";
import "./css/Main.css";
import axios from "axios";

const url = `${process.env.REACT_APP_API_URL}/view/all`;

function Main() {
    // console.log(url);
    const [apidata, setApiData] = useState();

    const fetchData = async () => {
        fetch(url, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setApiData(data);
            })
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="main">
            { apidata && (
                    <div className="main-container">
                    <div className="main-top">
                        <h2>All Questions</h2>
                        <Link to="/add-question">
                            <button>Ask Question</button>
                        </Link>
                    </div>
                    <div className="main-desc">
                        <p>Number of Questions : {apidata.length}</p>
                        {/* <div className='main-filter'>
                            <div className='main-tabs'>
                                <div className='main-tab'>
                                    <Link>Newest</Link>
                                </div>
                                <div className='main-tab'>
                                    <Link>Active</Link>
                                </div>
                                <div className='main-tab'>
                                    <Link>More</Link>
                                </div>
                            </div>
                            <div className='main-filter-item'>
                                <FilterList />
                                <p>Filter</p>
                            </div>
                        </div> */}
                    </div>
                    <div className="questions">
                        <div className="question">
                            {
                                apidata.map( (item) => (
                                    <AllQuestions data={item} />
                                ))
                            }
                        </div>
                    </div>
                </div>                
            )}
        </div>
    );
}

export default Main;
