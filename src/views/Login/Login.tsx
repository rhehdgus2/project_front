import React, { useState } from 'react';
import './Login.css';
import login from '../../assest/image/loginimage.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useMemberStore } from '../../stores/index3';
import { useCountStore } from '../../stores/index5';
import { useAdminStore } from '../../stores/index6';


function Login() {
    const [id , setId] = useState<string>('');
    const [password , setPassword] = useState<string>('');

    const [cookies, setCookies] = useCookies();
    const { member ,setMember } = useMemberStore();
    const { count , setCount } = useCountStore();
    const { admin, setAdmin } = useAdminStore();

    const loginCheck = () => {
        if(!id || !password){
            alert('모두입력하세요.')
        }
        loginSign();
    }

    const loginSign = async() => {
        const data = {
            id,
            password,
            
        };
        await axios.post('http://localhost:4040/member/login', data)
        .then((response) => {
            const responseData = response.data;
            if(!response.data.result){
                alert('로그인 실패')
                return
            }
            const { token , exprTime , memberEntity} = responseData.data;
            console.log(response.data);
            console.log(token);
            const expires = new Date();
            expires.setMilliseconds(expires.getMilliseconds + exprTime);
            setCookies('token', token, {expires});
            setMember(memberEntity);
            cartCount(memberEntity.id);
            setAdmin(memberEntity.admin);
            if(memberEntity.admin === 1){
                alert('관리자 로그인 성공')
            }
        })
        .catch((error) => {
            alert('로그인 실패')
            return
        })

        console.log(count);
    }

    const cartCount = async(id : string) => {
        await axios.get(`http://localhost:4040/cart/cartCount/${id}`)
        .then((response) => {
            console.log(response);
            setCount(response.data);
        })
        return
    }

    return (
        <div className="Login">
            <div className="content-box">
                <div className="member-wrap">
                    <div className="section">
                        <h3 className="section-header">로그인</h3>
                        <form action="" className="form-login">
                            <div className="login-box">
                                <div className="input-box">
                                    <label>아이디</label>
                                    <input type="text" placeholder="아이디 또는 이메일을 입력해주세요" className="login-input" onChange={(e) => setId(e.target.value)} />
                                </div>
                                <div className="input-box">
                                    <label>비밀번호</label>
                                    <input type="password" placeholder="영문, 숫자 조합 6자리 이상" className="login-input"  onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="btn-login-box">
                                    <ul className="btn-ul">
                                        <li>
                                            <Link to='/FindId'><button type="button" className="btn-member-white">아이디찾기</button></Link>
                                        </li>
                                        <li>
                                            <Link to='/FindPassword'><button type="button" className="btn-member-white be">비밀번호찾기</button></Link>
                                        </li>
                                        <li>
                                            <Link to='/signUp'><button type="button" className="btn-member-white be">회원가입</button></Link>
                                        </li>
                                    </ul>
                                    <Link to={'/'}  onClick={() => loginCheck()} ><button className="member-login-btn">로그인</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="section">
                        <Link to={ '/About' }><div className="image"><img src={login} alt="" /></div></Link>
                        <Link to={ '/About' } className="image-tag">혁신의 여정 알아보기</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
