import React, { useState, useEffect } from 'react';
import { CodeBracketIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import './Mainscreen.css';
import "prismjs/themes/prism-tomorrow.css"
// import "prismjs/components/prism-jsx"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from "axios"



function Mainscreen() {
    const [code, setCode] = useState(` function sum(){return 1+1}`);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { prism.highlightAll() }, [])


    const [review, setReview] = useState(``)

    async function reviewCode() {

        const response = await axios.post('http://localhost:3000/ai/get-review', { code });
        console.log(response.data);
        setReview(response.data)

    }


    return (
        <div className="main-container">
            {/* Left Section */}
            <div className="left-section">
                <div className="card">
                    <div className="card-header">
                        <CodeBracketIcon className="icon blue" />
                        <h2>Code Input</h2>
                    </div>

                    <div
                        className="code-input"

                    >
                        <Editor
                            value={code}
                            onValueChange={code => setCode(code)}
                            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                            padding={(10)}
                            style={{
                                height: "100%",
                                width: "100%",
                                fontSize: "20px"
                            }}
                        />


                    </div>

                    <div className="card-footer">
                        <button
                            onClick={reviewCode}
                            className={`review-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ArrowPathIcon className="icon spin" />
                            ) : (
                                <CodeBracketIcon className="icon" />
                            )}
                            <span>{isLoading ? 'Reviewing...' : 'Review Code'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="right-section">
                <div className="card">
                    <div className="card-header justify-between">
                        <div className="flex-row">
                            <CodeBracketIcon className="icon green" />
                            <h2>Review Results</h2>
                        </div>
                        <div className="traffic-lights">
                            <div className="light red"></div>
                            <div className="light yellow"></div>
                            <div className="light green"></div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="review-box">
                            
                            {review}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mainscreen;
