import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './FindId.css';

function FindId() {
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');

    const inputCheck = async () => {
        if(!name || !number){
            alert('모두입력하세요.');
            return
        }
        const { result, responseId } = await findpassword();
        if(!result) {
            alert('입력하신 정보가 잘못 되었습니다.');
            return
        }
        alert('아이디는' + responseId + '입니다.');
    }

    const findpassword = async () => {
        const data = {
            name,
            number
        };
        const response = await axios.post('http://localhost:4040/member/findid',data);
        const result = response.data.result;
        const responseId = response.data.data.id;
        return { result, responseId };
    }
    return (
        <div className="FindId">
            <div className="containers">
                <div className="headline">
                    <h1 className='find-id'>아이디 찾기</h1>
                </div>
                <div className="form-container">
                    <form action="" className="con-box">
                        <div id="name_view" className="element name" >
                            <span id="name_lable" className="holder">
                                이름</span>
                            <div className="inside">
                                <label className="ePlaceholder" title="이름 / 혹은 회사명">
                                    <input id="name" name="name" className="email-input" placeholder="이름 / 혹은 회사명"  type="text" onChange={(e) => setName(e.target.value)} /></label>
                                <div className="email">연락처</div>
                                <label className="ePlaceholder" title="연락처">
                                    <input id="email" name="email" className="lostInput" placeholder="연락처"  type="text" onChange={(e) => setNumber(e.target.value)}/>
                                </label>
                                <div className="sp-sub-submit">
                                    <button type='submit' className="sp-btn" onClick={() => inputCheck()}>아이디 찾기</button>
                                    <Link to={'/FindPassword'} className="sp-btn2">비밀번호 찾기</Link>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default FindId;
