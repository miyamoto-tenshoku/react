import './App.css';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import FlushAnimation from './FlushAnimation';
import sendButtonSvg from './svg/sendButton.svg';

function App() {

  //ログ画面のスクロール用
  const scrollEndRef = useRef<HTMLDivElement>(null);

  //送信されたテキストログを保持
  const [logs, set_logs] = useState<string[]>([]);

  //テキストエリア入力された値を保持
  const [inputText, set_inputText] = useState<string>('');

  //テキストをログへ送信する処理の無効化、有効化を管理
  const [sendDisabled, set_sendDisabled] = useState<boolean>(false);

  function clear_logs(){
    set_logs([]);
  }

  function text_change(e: ChangeEvent<HTMLTextAreaElement>): void{
    set_inputText(e.target.value);
  }

  //チャット送信のショートカットキーを設定
  useHotkeys('ctrl+enter', add_log, { enableOnFormTags: ['textarea'] });

  //textareaの値をログに加える
  function add_log(): void{
    if(inputText !== ''){
      set_logs([
        ...logs,
        inputText
      ]);
      set_inputText('');
    }
  }

  //ログに新しい値が入った際に
  //ログ画面を一番下までスクロール
  useEffect(()=>{
    scrollEndRef.current?.scrollIntoView();
  },[logs]);

  //テキストエリアの入力に応じて
  //送信ボタンの有効化を切り替え
  useEffect(()=>{
    if(inputText === ''){
      set_sendDisabled(true);
    } else {
      set_sendDisabled(false);
    }
  },[inputText]);

  return (
    <div className="App">
      <FlushAnimation logs={logs} clear_logs={clear_logs} />

      <div className='App-grid'>
        <div className="App-log">
          <ul>
            { logs.map((value, index) => {
                return(
                  <li key={index}>{value}</li>
                )
            })}
          </ul>
          <div ref={scrollEndRef} />
        </div>

        <textarea className='App-textarea' onChange={text_change} value={inputText} />

        <button type="button" onClick={add_log} disabled={sendDisabled}
          className={sendDisabled?'App-sendButton-disabled':'App-sendButton'} >
            <img className='App-sendButton-img' src={sendButtonSvg} alt="sendButtonSvg" />
        </button>

        <div className={sendDisabled?'App-note-disabled':'App-note'}>
          ctrl+enter
        </div>
      </div>
    </div>
  );
}

export default App;
