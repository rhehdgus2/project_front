import axios from "axios";
import React, { useState } from "react";

import "./SignUp.css";

function SignUp() {
  const [number, setNumber] = useState<string>(''); 
  const [name, setName] = useState<string>(''); 
  const [nickname, setNickname] = useState<string>(''); 
  const [id, setId] = useState<string>(''); 
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const inputCheck = async () => {
    if(!number || !name || ! nickname || !id || !password || !password2){
      alert('모두 입력하세요.');
      return;
    }
    if(!(password === password2)){
      alert('입력한 비밀번호가 일치하지 않습니다.');
      return;
    }
    const {result} = await SignUpRequest();
    if(!result) {
      alert('동일한 아이디 또는 연락처가 존재합니다.');
      return;
    }
    alert('회원가입 성공!');
  }

  const SignUpRequest = async () => {
    const data = {
      number,
      name,
      nickname,
      id,
      password,
    };
    const response = await axios.post(`http://localhost:4040/member/Sign`, data)
    const result = response.data.result;
    return { result };
  }

  return (
    <div className="SignUp">
      <div className="join member ">
        <div className="inner">
          <form>
            <input type="hidden" name="rncheck" value="none" />
            <input type="hidden" name="dupeinfo" value="" />
            <input type="hidden" name="pakey" value="" />
            <input type="hidden" name="foreigner" value="" />
            <input type="hidden" name="adultFl" value="" />
            <input type="hidden" name="mode" value="join" />
            <h1>회원가입</h1>
            <div className="wrapper">
              <div className="left">
                <div className="input_box auth_input">
                    <div className="label-box">
                        <label>연락처</label>
                    </div>
                  <input name="number" id="cellPhone" type="tel" onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <div className="input_box auth_input">
                  <label>이름</label>
                  <input name="name" id="memNm" type="text" maxLength={30} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input_box  auth_input">
                  <label>닉네임</label>
                  <input
                    name="nickNm"
                    type="text"
                    maxLength={12}
                    placeholder="영문, 숫자, 한글 조합 최대12자"
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="term2s">
                  <div className="term2">
                    <label>
                      <input name="" type="checkbox" id="all-ck" value=""  className="chek"/>
                      <i></i>
                    </label>
                    <b>
                      모두 동의합니다.(선택 시 적립금 3,000원을 지급해드립니다.)
                    </b>
                  </div>
                  <div className="term2">
                    <label>
                      <input
                        name="privateApprovalFl"
                        type="checkbox"
                        id="private-fl"
                        value="y"
                        className="chek"
                      />
                      <i></i>
                      (필수) 개인정보 처리방침에 동의합니다.
                    </label>
                    <a href="" target="_blank">
                      약관보기
                    </a>
                  </div>
                  <div className="term2">
                    <label>
                      <input
                        name="agreementInfoFl"
                        type="checkbox"
                        id="term2s-fl"
                        value="y"
                        className="chek"
                      />
                      <i></i>
                      (필수) 이용약관에 동의합니다.
                    </label>
                    <a href="" target="_blank">
                      약관보기
                    </a>
                  </div>
                  <div className="term2 blue">
                    <label>
                      <input
                        name="smsFl"
                        type="checkbox"
                        id="marketing-fl"
                        value="y"
                        className="chek"
                      />
                      <i></i>
                    </label>
                    (선택) 마케팅 정보 수신에 동의합니다.
                    <input name="maillingFl" type="hidden" value="n" />
                  </div>
                  <div className="term2 blue">
                    <label>
                      <input type="checkbox" id="expirationFl" className="chek" />
                      <i></i>
                    </label>
                    (선택) 평생회원 가입에 동의합니다.{" "}
                    <a href="" target="_blank">
                      안내보기
                    </a>
                    <input name="expirationFl" type="hidden" value="1" />
                  </div>
                </div>
              </div>
              <div className="right form">
                <div className="input_box">
                    <div className="label-box">
                        <label>아이디</label>
                    </div>
                  <div className="email_box">
                    <input name="Id" type="text" className="mail_first" onChange={(e) => setId(e.target.value)} />
                    <i></i>
                  </div>
                  <input type="hidden" name="memId" />
                  <input type="hidden" name="email" />
                  <span className="red email_msg1" hidden = {true}>
                    사용할 수 없는 이메일입니다
                  </span>
                  <span className="blue email_msg2" hidden = {true}>
                    사용가능한 이메일입니다
                  </span>
                </div>
                <div className="input_box">
                  <label>비밀번호</label>
                  <input
                    name="password"
                    type="password"
                    minLength={10}
                    placeholder="영문, 숫자 조합 10자리 이상 16자리 이하"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="red pw_msg1" hidden = {true}>
                    영문, 숫자 조합 10자리 이상 16자리 이하
                  </span>
                </div>
                <div className="input_box">
                  <label>비밀번호 확인</label>
                  <input name="password2" id="pwcheck" type="password" onChange={(e) => setPassword2(e.target.value)}/>
                  <span className="red pw_msg2" hidden = {true}>
                    비밀번호가 일치하지 않습니다
                  </span>
                </div>
                <button type="button" id="btn-submit" onClick={() => inputCheck()}>
                  가입하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
