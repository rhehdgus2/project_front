import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import "./CategoryCreate.css";
import Logo from "../../assest/image/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CategoryCreate() {
  const [category, setCategory] = useState<any>("");
  const [img, setImg] = useState<any>(null);
  const [img2, setImg2] = useState<any>(null);
  const [imgname, setImgName] = useState<any[]>([]);
  const [productName, setProductName] = useState<any>("");
  const [price, setPrice] = useState<number>(0);

  const [logo1, setLogo1] = useState<any>("");
  const [logo2, setLogo2] = useState<any>("");
  const [info1, setInfo1] = useState<any>("");
  const [info2, setInfo2] = useState<any>("");
  const navigator = useNavigate();

  const handleChange2 = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setLogo1(event.target.value);
  };

  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadFileList = event.target.files;
    if (uploadFileList != null) {
        const file = uploadFileList[0]
        const formData = new FormData();
        formData.append('file', file);
        setImg(formData);
    }
  }

  const imagUpload = () => {
    axios
      .post(`http://localhost:4040/file/upload/`, img, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setImgName(imgname.concat(response.data));
      });
  };
  const categoryUpLoad = async() => {
    const data = {
        productName,
        price,
        imgname,
        category,
    }
    await axios.post("http://localhost:4040/category/listUp", data)
  }
  const detailPageUp = async() => {
    const data = {
      productName,
      logo1,
      price,
      info1,
      info2,
      imgname,
    }
    await axios.post("http://localhost:4040/detail/detailUp", data)
  }

  const imgArrayDelete = (item : string) => {
    console.log(item)
    const filter = imgname.filter((element) => element !== item );
    setImgName(filter);
  }

  const dataUpLoad = async() => {
    if(!productName || !logo1 || !price || !info1 || !info2 || !(imgname.length === 4)) {
      alert("모두 입력하세요")
      return
    }
    await categoryUpLoad();
    await detailPageUp();
    alert('업로드 완료');
    navigator('/Category');
    return
  }

  return (
    <div className="CategoryCreate">
      <div className="create-header">
        <p>카테고리 추가 메뉴판</p>
      </div>
      <div className="create-body">
        <div>
          <div>
            <input
              type="file"
              className="create-input1"
              onChange={(e) => onImageChangeHandler(e)}
            />
            <button className="fileUp-btn" onClick={() => imagUpload()}>
              저장
            </button>
          </div>
          {imgname.map((item : any) => (<div className="img-boxs">{item}
            <button className="xmark-btn">
              <FontAwesomeIcon icon={faXmark} onClick={() => imgArrayDelete(item)}/>   
            </button>
          </div>))}
          <div className="category-select">
            카테고리 종류:
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">카테고리 타입</InputLabel>
              <Select
                value={category}
                label="카테고리 타입"
                onChange={handleChange2}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <img
              className="image01"
              src={Logo}
              alt=""
              style={{ width: "280px", height: "280px", marginTop: "50px" }}
            />
          </div>
        </div>
        <div>
          <div className="create-input-box2">
            향수 종류
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ marginLeft: "30px" }}
              size="small"
            >
              <InputLabel id="demo-select-small">향수 종류</InputLabel>
              <Select value={logo1} label="향수 종류" onChange={handleChange}>
                <MenuItem value={"퍼퓸"}>퍼퓸</MenuItem>
                <MenuItem value={"디퓨져"}>디퓨져</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="create-input-box">
            상품명
            <input type="text" className="create-input2" onChange={(e) => setProductName(e.target.value)}/>
          </div>
          <div className="create-input-box">
            금액
            <input type="number" className="create-input2" onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <div className="create-input-box">
            요약 설명
            <input type="text" className="create-input2" onChange={(e) => setInfo1(e.target.value)}/>
          </div>
          <div className="create-input-box">
            상세정보
            <textarea
              cols={30}
              rows={10}
              className="create-textarea"
              onChange={(e) => setInfo2(e.target.value)}
            ></textarea>
          </div>
          <div className="create-btn-box">
            <button className="create-btn" onClick={() => dataUpLoad()}>저장</button>
            <button className="create-btn">취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCreate;
