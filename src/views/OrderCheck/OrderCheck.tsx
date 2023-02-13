import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./OrderCheck.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";


function OrderCheck() {
  return (
    <div className="OrderCheck">
      <div className="container7">
        <div>
          주문이 성공적으로{" "}
          <span style={{ color: "darkgreen" }}>완료</span>되었습니다.
          <br />
          <span></span>
          <div className="icon7">
            <span>
              <FontAwesomeIcon icon={faCircleCheck} className="CircleCheck" />
            </span>
          </div>
          <br />
          <div className="home-container7">
            <Link to={"/"} className="gohome7">
              확인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCheck;
