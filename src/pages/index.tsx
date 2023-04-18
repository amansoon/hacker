import React, { useEffect, useRef, useState } from "react";
import { code } from "@/data/code";

export default function Home() {
  const [fileData, setFileData] = useState(code);
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);
  const [speed, setSpeed] = useState(10);
  const [cursor, setCursor] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    });
  }, []);

  const addMoreText = () => {
    if (text.length < fileData.length) {
      const end = cursor + speed < fileData.length ? cursor + speed : undefined;
      setText((prevText) => prevText + fileData.substring(cursor, end));
      setCursor((oldCursor) => oldCursor + speed);
    }
  };

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTo(0, codeRef.current.scrollHeight);
    }
  }, [text]);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    addMoreText();
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener("load", () => {
        setFileData(reader.result as string);
      });
    }
  };

  return (
    <main className="">
      <div>
        <input type="file" onChange={fileHandler} />
      </div>

      <div className="code" ref={codeRef}>
        <textarea className="code-area" ref={textAreaRef} onChange={changeHandler}></textarea>
        <pre className="code-pre">
          <span>{text}</span>
          <span className="code-cursor">|</span>
          <div className="code-bottom"> </div>
        </pre>
      </div>
    </main>
  );
}
