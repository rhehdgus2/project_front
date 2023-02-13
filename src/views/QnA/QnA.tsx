import React, { useEffect, useState } from 'react';

import './QnA.css';
import { Link } from 'react-router-dom';
import qnaImg from "../../assest/image/qna01.jpg";
import { useMemberStore } from '../../stores/index3';
import axios from 'axios';


function QnA() {

  const [title, setTitle] = useState<string>(''); 
  const [contents, setContents] = useState<string>(''); 
  const [id, setId] = useState<string>('');
  const { member } = useMemberStore();
  
  const inputCheck = () => {
    if(!title || !contents){
      alert('모두 입력하세요.');
      return;
    }
    console.log(title);
    console.log(contents);
    console.log(id);
    Qnain();
    alert('문의완료');

  }

  const Qnain = ()=> {
    const data = {
      title,
      contents,
      id,
    }
    axios.post('http://localhost:4040/qna/in',data)
  }

  useEffect (() => {
    setId(member.id);
},[member])

  return (
    <div className="QnA">
      <div id="wrapper">
        <div className="container00">
          <div className="headline">
            <span className='qna-headline'>헬프 데스크</span>
          </div>
          <div className="body">
            <div className="panel-heading">
              <span>문의 및 의견</span>
            </div>
            <div className="panel-body">
              <form action="" className="qform">
                <div className="content-container">
                  <div className="content-label-container">
                    <label className="content-label">제목</label>
                  </div>

                  <div className="contentArea">
                    
                    <div className="emailArea">
                      <input
                        className="form-control"
                        id="report_email"
                        name="report_email"
                        placeholder="제목 입력"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="email-container">
                  <div className="control-label-container">
                    <label className="control-label">상세내용</label>
                  </div>

                  <textarea
                      className="content-control"
                      id="report_text"
                      name="report_text"
                      rows={3}
                      style={{ height: "160px", resize: "none" }}
                      placeholder="문의사항을 입력해주세요"
                      onChange={(e) => setContents(e.target.value)}
                    ></textarea>
                  <div className="divider"></div>
                </div>
                <div className="clearfix">
                  <p className="help-block pull-left">
                    <small>좋은 하루 되세요</small>
                    <br />
                    <strong className="etext">
                      기타 문의사항 : aa@naver.com
                    </strong>
                  </p>

                  <Link to={"/QnaBoard"}><button type="button" className="btn00 QnA-submit" onClick={() => inputCheck()}>
                    <span className="msg">보내기</span>
                  </button></Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="qna-img-box">
          <img src={qnaImg} alt="" className="qna-img" />
        </div>
      </div>
    </div>
  );
}

export default QnA;