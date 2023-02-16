import './App.css';
import { useState, useRef, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook'

function App() {
  const [logs, setLogs] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

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
        {/* <FlushAnimation /> */}
      </div>

      <textarea ref={textareaRef} ></textarea>
      <button type="button" onClick={addLog}>送信</button>

      <div className='App-note'>
        ctrl+enter
      </div>
    </div>
  );
}

export default App;
