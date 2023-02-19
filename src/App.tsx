import './App.css';
import './FlushAnimation.css';
import { useState, useRef, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import FlushAnimation from './FlushAnimation';
import sendButtonSvg from './svg/sendButton.svg';

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [logs, setLogs] = useState<string[]>([]);

  function resetLogs(){
    setLogs([]);
  }

  //チャット送信のショートカットキーを設定
  useHotkeys('ctrl+enter', addLog, { enableOnFormTags: ['textarea'] });

  //textareaの値をログに加える
  function addLog(){
    if(textareaRef.current !== null){
      const text = textareaRef.current.value;
      if(text !== ''){
        textareaRef.current.value = '';
        setLogs([
          ...logs,
          text
        ]);
      }
    }
  }

  useEffect(()=>{
    //ログ画面を一番下までスクロール
    scrollEndRef.current?.scrollIntoView()
  });

  return (
    <div className="App">
      <FlushAnimation logs={logs} resetLogs={resetLogs} />
      <div className='App-grid'>
        <div className="App-log">
          <ul ref={ulRef}>
            { logs.map((value, index) => {
                return(
                  <li key={index}>{value}</li>
                )
            })}
          </ul>
          <div ref={scrollEndRef} />
        </div>

        <div className='App-operationBoard'>
        </div>

        <textarea className='App-textarea' ref={textareaRef} ></textarea>
        <button className='App-sendButton' type="button" onClick={addLog}>
            <img src={sendButtonSvg} alt="sendButtonSvg" />
        </button>

        <div className='App-note'>
          ctrl+enter
        </div>
      </div>
    </div>
  );
}

export default App;
