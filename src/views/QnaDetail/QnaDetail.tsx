import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNumStore } from "../../stores/index4";
import { useAdminStore } from "../../stores/index6";
import "./QnaDetail.css";

function QnaDetail() {
  const { num } = useNumStore();
  const [data, setData] = useState<any>([]);
  const { admin, setAdmin } = useAdminStore();
  const [ answer, setAnswer ] = useState('');

  const navigator = useNavigate();

  const requestToServer = async () => {
    await axios
      .get(`http://localhost:4040/qna/qnadetail/${num}`)
      .then((response) => {
        const list = response.data.data;
        console.log(list);
        setData(list);
        setAnswer(list.answer);
      });
  };
  useEffect(() => {
    requestToServer();
    console.log(data);
  }, [num]);

  const qnaAnswer = () => {
    const data = {
      num,
      answer,
    }
    axios.post("http://localhost:4040/qna/qnaAnswer", data)
    .then(()=> {
      alert('답변 완료')
    })
    navigator('/QnaBoard');
  }
  return (
    <div className="QnaDetail">
      <div className="Detail-box">
        <header className="tit-head">
          <h2 className="tit">Q & A</h2>
        </header>
        <table className="table-boxs">
          <tbody>
            <tr className="tables-tr">
              <th className="tables-th">등록일</th>
              <td>
                <input
                  type="text"
                  className="input-boxs"
                  value={data.date}
                  readOnly
                />
              </td>
            </tr>
            <tr className="tables-tr">
              <th className="tables-th">아이디</th>
              <td>
                <input
                  type="text"
                  className="input-boxs"
                  value={data.id}
                  readOnly
                />
              </td>
            </tr>
            <tr className="tables-tr">
              <th className="tables-th">제목</th>
              <td>
                <input
                  type="text"
                  className="input-boxs"
                  name="subject"
                  value={data.title}
                  readOnly
                />
              </td>
            </tr>
            <tr className="tables-tr2">
              <th className="tables-th qna-info">문의내용</th>
              <td>
                <textarea
                  className="p-text"
                  id="report_text"
                  name="report_text"
                  rows={3}
                  value={data.contents}
                  style={{ resize: "none" }}
                  readOnly
                ></textarea>
              </td>
            </tr>
            <div className="qna-answer">
              <h2 style={{ width: "73.6px" }}>답변</h2>
              {admin === 1 ? (
                <>
                  {" "}
                  <textarea
                    className="p-text"
                    id="report_text"
                    name="report_text"
                    value={answer}
                    rows={3}
                    style={{ resize: "none" }}
                    placeholder="답변이 없습니다."
                    onChange={(e) => setAnswer(e.target.value)}
                  ></textarea>
                </>
              ) : (
                <>
                  {" "}
                  <textarea
                    className="p-text"
                    id="report_text"
                    name="report_text"
                    rows={3}
                    value = {data.answer}
                    style={{ resize: "none" }}
                    placeholder="답변이 없습니다."
                    readOnly
                  ></textarea>
                </>
              )}
            </div>
            <div className="qna-btns-box">
              {admin === 1 ? (
                <>
                  <button type="button" className="qna-btns" onClick={() => qnaAnswer()}>
                    답변하기
                  </button>
                </>
              ) : (
                <></>
              )}
              <Link to={"/QnaBoard"}>
                <button type="button" className="qna-btns back">
                  {" "}
                  뒤로가기
                </button>
              </Link>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QnaDetail;
