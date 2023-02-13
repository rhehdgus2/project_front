import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMemberStore } from "../../stores/index3";
import { useNumStore } from "../../stores/index4";
import logo from "./logo.svg";
import "./QnaBoard.css";


function QnaBoard() {
  const { num, setNum } = useNumStore();
  const [cv, setCollectionView] = useState(['제목', '아이디']);

  const [variables, setVariables] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [viewItems, setViewItems] = useState<any[]>([]);
  const { member } = useMemberStore();
  const [inputs, setInputs] = useState<string>('');
  const [type, setType] = useState<string>('');

  const navigate = useNavigate();

  const onLinkHandler = (number: number) => {
    setNum(number);
    navigate("/QnaDetail");
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const tmp = [];
    for (let i = 8 * (value - 1); i < value * 8; i++) {
      if (i < variables.length) tmp.push(variables[i]);
    }
    setViewItems(tmp);
    setPage(value);
  };

  const requestToServer = async () => {
    await axios.get("http://localhost:4040/qna/out").then((response) => {
      const list = response.data.data;

      setVariables(list);
      setPageSize(Math.ceil(list.length / 8));
      const tmp = [];
      for (let i = 0; i < 8; i++) {
        if (i < list.length) tmp.push(list[i]);
      }
      setViewItems(tmp);
    });
  };
  useEffect(() => {
    requestToServer();
  }, [member]);

  const select = () => {

    if(type === "제목"){

      const list = variables.filter((item : any) => item.title === inputs) 
      console.log(list);
      setPageSize(Math.ceil(list.length / 8));
      const tmp = [];
      for (let i = 0; i < 8; i++) {
        if (i < list.length) tmp.push(list[i]);
      }
      setViewItems(tmp);
      return

    }

      const list = variables.filter((item : any) => item.id === inputs)
      console.log(inputs);
      setPageSize(Math.ceil(list.length / 8));
      const tmp2 = [];
      for (let i = 0; i < 8; i++) {
        if (i < list.length) tmp2.push(list[i]);
      }
      setViewItems(tmp2);
      return

  }

  const handleChange2 = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <div className="QnaBoard">
      <div className="qna-con">
        <div className="qna-board-box">
          <h1>
            <p className="qna-board-head" onClick={() => requestToServer()}>게시판 목록</p>
          </h1>
          <table className="board-table-box">
            <thead>
              <tr className="board-setting">
                <td>번호</td>
                <td className="board-name">제목</td>
                <td>아이디</td>
                <td>등록일</td>
                <td>답변여부</td>
              </tr>
            </thead>
            <tbody>
              {viewItems.map((item: any) => (
                 
                    <tr className="board-tr" onClick={() => onLinkHandler(item.num)}>
                      
                      <td>
                        <div className="item-tit-box">
                            <strong className="QnaNum8">{item.num}</strong>
                        </div>
                      </td>
                      <td className="board-name">
                        <span className="QnaNum8">{item.title}</span>
                      </td>
                      <td>
                        <span className="QnaNum8">{item.id}</span>
                      </td>
                      <td>
                        <span className="QnaNum8">
                          {item.date}
                          {item.contents}
                        </span>
                      </td>
                      <td>
                          {(!(item.answer)) ? (<><span style={{"color" : "red"}}>답변 대기</span> </>) : (<><span style={{"color" : "green"}}>답변 완료</span></>)}
                      </td>
                    </tr>
              ))}
            </tbody>
          </table>
          <div className="pagingcount">
            <Pagination
              count={pageSize}
              page={page}
              shape="rounded"
              onChange={handleChange}
            />
          </div>
          <div className="selected">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">검색목록</InputLabel>
              <Select
                value={type}
                label="검색목록"
                onChange={handleChange2}
              >
                <MenuItem value={"제목"}>제목</MenuItem>
                <MenuItem value={"아이디"}>아이디</MenuItem>
              </Select>
            </FormControl>
            <input
              type="text"
              className="select-box"
              onChange={(e) => setInputs(e.target.value)}
            />
            <button className="select-btn" onClick={() => select()}>
              검색
            </button>
          </div>

          {!(member === null) ? (
            <>
              {" "}
              <div className="qna-btn-box">
                <Link to={"/QnA"} className="qna-btn">
                  문의하기
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default QnaBoard;
