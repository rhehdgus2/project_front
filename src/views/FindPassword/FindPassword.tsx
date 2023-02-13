import React, { useState } from 'react';
import logo from './logo.svg';
import './FindPassword.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


function FindPassword() {
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');

    const inputCheck = async () => {
        if(!id || !name || !number){
            alert('모두입력하세요.');
            return
        }
        const { result, pw } = await findpassword();
        if(!result) {
            alert('입력하신 정보가 잘못 되었습니다.');
            return
        }
        alert('비밀번호는' + pw + '입니다.');
    }

    const findpassword = async () => {
        const data = {
            id,
            name,
            number
        };
        const response = await axios.post('http://localhost:4040/member/findpassword',data);
        const result = response.data.result;
        const pw = response.data.data.password;
        return { result, pw };
    }

    return (
        <div className="FindPassword">
            <div className="container2">
                <div className="headline2">
                    <h1 className='find-password'>비밀번호 찾기</h1>
                </div>
                <div className="form-container2">
                    <form action="" className="test2">
                        <div className="find-password-by-id2">아이디</div>
                        <label className="ePlaceholder2" title="아이디">
                            <input id="member_id2" className="IdInput2" name="member_id" placeholder="아이디"  type="text" onChange={(e) => setId(e.target.value)} />
                        </label>
                        <div id="name_view2" className="element name2" >
                            <span id="name_lable2" className="holder2">
                                이름</span>
                            <div className="inside2">
                                <label className="ePlaceholder2" title="이름 / 혹은 회사명">
                                    <input id="name2" name="name" className="email-input2" placeholder="이름 / 혹은 회사명"  type="text" onChange={(e) => setName(e.target.value)}/></label>
                                <div className="email2">연락처</div>
                                <label className="ePlaceholder2" title="이메일">
                                    <input id="email2" name="email" className="lostInput2" placeholder="연락처"  type="text" onChange={(e) => setNumber(e.target.value)}/>
                                </label>
                                <div className="sp-sub-submit2">
                                    <Link to={'/FindId'} className="sp-btn2">아이디 찾기</Link>
                                    <button type='button' className="sp-btn2" onClick={() => inputCheck()}>비밀번호 찾기</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default FindPassword;
