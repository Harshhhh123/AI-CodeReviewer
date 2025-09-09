import React, { useState } from "react";
import { CodeBracketIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import "./Mainscreen.css";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";


function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`copy-btn ${copied ? "copied" : ""}`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
function Mainscreen() {
  const [code, setCode] = useState(`function sum(){return 1+1}`);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState("");

  async function reviewCode() {
    try {
      setIsLoading(true);
      const response = await axios.post(
  `${process.env.REACT_APP_API_URL}/ai/get-review`,
  { code }
);
      setReview(response.data);
    } catch (err) {
      console.error("Error fetching review:", err);
      setReview("❌ Failed to fetch review. Please check backend.");
    } finally {
      setIsLoading(false);
    }
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

          <div className="code-input">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                height: "100%",
                width: "100%",
                fontSize: "16px",
                fontFamily: '"Fira Code", monospace',
              }}
            />
          </div>

          <div className="card-footer">
            <button
              onClick={reviewCode}
              className={`review-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <ArrowPathIcon className="icon spin" />
              ) : (
                <CodeBracketIcon className="icon" />
              )}
              <span>{isLoading ? "Reviewing..." : "Review Code"}</span>
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
            
          </div>

          <div className="card-body">
            <div className="review-box" style={{ padding: "20px" }}>
              <Markdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    return !inline && match ? (
                      <div className="code-block">
                        <CopyButton text={codeString} />
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {review}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainscreen;
