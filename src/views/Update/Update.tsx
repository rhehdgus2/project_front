import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useMemberStore } from "../../stores/index3";

import "./Update.css";

function Update() {
    const [ number, setNumber ] = useState<string>('');
    const [ name, setName] = useState<string>('');
    const [ nickname, setNickname] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [ address, setAddress] = useState<string>('');
    const { member, setMember, removeMember } = useMemberStore();
    const [cookies , setCookies] = useCookies(); 


    useEffect (() => {
        setNumber(member.number);
        setName(member.name);
        setNickname(member.nickname);
        setId(member.id);
        setAddress(member.address);
        console.log(member);
    },[member])

    const updateChcek = async() => {
        if(!number || !name || !nickname){
            alert('주소를 제외한 정보를 입력하세요.')
            return
        }
        const {result} = await UpdateRequest();

        if(!result){
            alert('회원정보 수정 실패 : 동일한 연락처가 존재합니다.')
            return
        }
        alert('회원정보 수정 성공')
        return
    }
    const UpdateRequest = async () => {
        const data = {
          number,
          name,
          nickname,
          id,
          address,
        };
        const response = await axios.post(`http://localhost:4040/member/update`, data)
        const result = response.data.result;
        if(result) {
            setMember(data);
        }
        return { result };
      }

      const memberDeleteCheck = ()=> {
        if(window.confirm("탈퇴 하시겠습니까?")) {
            alert('탈퇴 성공! 🙌')
            setCookies('token','',{expires : new Date()});
            removeMember(); 
            memberDelete();
            return
        }
        alert("탈퇴 실패~👍😎😋")
        return
      }
      const memberDelete = () => {
        axios.get(`http://localhost:4040/member/delete/${id}`)
      }

    return (
        <div className="join3 member3">
            <div className="inner3">

                <form id="frm3" action="../member/member_ps.php" method="post" target="ifrmProcess">
                    <input type="hidden" name="rncheck" value="none" />
                    <input type="hidden" name="dupeinfo" value="" />
                    <input type="hidden" name="pakey" value="" />
                    <input type="hidden" name="foreigner" value="" />
                    <input type="hidden" name="adultFl" value="" />
                    <input type="hidden" name="mode" value="join" />

                    <h1 className="updatetitle3">회원정보수정</h1>



                    <div className="wrapper3">

                        <div className="left3">

                            <div className="input_box3 auth_input3">
                                <label>연락처</label>
                                <input name="cellPhone" id="cellPhone3" type="tel" value={number} onChange={(e) => setNumber(e.target.value)} />
                            </div>

                            <div className="input_box3 auth_input3">
                                <label>이름</label>
                                <input name="memNm" id="memNm3" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>


                            <div className="input_box3  auth_input3">
                                <label>닉네임</label>
                                <input name="nickNm" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                            </div>

                            <div className="input_box3 leave3">
                                <Link to={"/"} className="leave3" onClick={() => memberDeleteCheck()}>회원탈퇴</Link>
                            </div>

                        </div>

                        <div className="right form3">
                                <label className="input_box3_id">이메일 (아이디)</label>
                            <div className="input_box3_2">
                                <div className="email_box3">
                                    <input type="text" className="mail_first3" value={id} onChange={(e) => setId(e.target.value)} readOnly />
                                </div>
                                <input type="hidden" name="memId" />
                                <input type="hidden" name="email" />
                            </div>
                                <label className="input-box3-head">기본배송지 설정</label>
                            <div className="input_box4">
                                <div className="searchline3">
                                    <input name="memPw" type="text" placeholder="" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>

                            </div>
                            <div className="input_box5">

                                <input id="pwcheck3" type="text" />

                            </div>
                            <Link to={'/Update'}><button type="button" id="btn-submit3" style={{ "marginTop": "-14px" }} onClick={() => updateChcek()}>회원정보 수정완료</button></Link>

                        </div>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default Update;
