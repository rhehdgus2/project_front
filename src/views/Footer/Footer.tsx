import React from "react";
import './Footer.css';

import Logo from '../../assest/image/logo.png';

function Footer() {
    return (
        <div id="wrap3">
        <footer id="footer">
            <div className="ft_in">
                <div className="ft_top">
                    <div className="logo_bt">
                        <img src={ Logo } alt="" style={{"width": "100px", "height": "100px"}} />
                    </div>
                    <div className="section_wrapper2">
                        <dl>
                            <dt>이름</dt>
                            <dd>신경수</dd>
                            <dd>고동현</dd>
                            <dd>김수현</dd>
                            <dd>임지현</dd>
                            <dd>정진호</dd>
                        </dl>
                        <dl>
                            <dt>이메일</dt>
                            <dd>hayogo@gmail.com</dd>
                            <dd>dongh@naver.com</dd>
                            <dd>suhy@daum.net</dd>
                            <dd>jihyun@google.com</dd>
                            <dd>gyuns@google.com</dd>
                        </dl>
                        <dl>
                            <dt>참고 사이트</dt>
                            <dd><a href="https://developers.naver.com/main/">Dev center</a></dd>
                            <dd><a href="https://pixabay.com/ko/">Pixabay</a></dd>
                            <dd><a href="https://www.tamburins.com/">Tamburins</a></dd>
                            <dd><a href="https://ko.wix.com/logo/maker">Wix</a></dd>
                            <dd><a href="https://fontawesome.com/">Fontawesome</a></dd>
                        </dl>
                    </div>
                </div>
                <div className="ft_bottom">
                    <div>2023년 코리아 IT_3조</div>
                </div>
            </div>
        </footer>
        </div>
    );
}

export default Footer;