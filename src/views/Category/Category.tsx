import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Category.css";
import lotion from "../../assest/image/lotion.jpg";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../../stores";
import { useDetailStore } from "../../stores/index2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useAdminStore } from "../../stores/index6";

function Category() {
  // const [category, setCategory] = useState<string>('');
  const { setProductName } = useDetailStore();

  const [variables, setVariables] = useState<any[]>([]);

  const { category, setCategory } = useCategoryStore();
  const { admin, setAdmin } = useAdminStore();

  const requestToServer = async (cat: string) => {
    await axios.get("http://localhost:4040/category/list").then((response) => {
      const list = response.data.data;
      const tmp = list.filter((item: any) => item.category === cat);
      setVariables(tmp);
      setCategory(cat);
    });
  };

  useEffect(() => {
    requestToServer(category);
  }, [category]);

  return (
    <div className="Category">
      <div id="wrap">
        <section id="contents01">
          <div className="list-item-category">
            <ul className="list-item">
              <li>
                <button
                  onClick={() => requestToServer("A")}
                  className={`item-category ${
                    category === "A" ? "category-active" : ""
                  }`}
                >
                  Man perfume
                </button>
              </li>
              <li>
                <button
                  onClick={() => requestToServer("B")}
                  className={`item-category ${
                    category === "B" ? "category-active" : ""
                  }`}
                >
                  Women perfume
                </button>
              </li>
              <li>
                <button
                  onClick={() => requestToServer("C")}
                  className={`item-category ${
                    category === "C" ? "category-active" : ""
                  }`}
                >
                  Diffuser
                </button>
              </li>
            </ul>
          </div>
        </section>
        <section id="contents02">
          <div className="additonal-zone"></div>
          <div className="goods-pick-list">
            <span className="pick-list-num">페이셜</span>
          </div>
          <div className="goods-list">
            <div className="goods-list-cont">
              <div className="item-gallery-type">
                <ul>
                  {variables.map((item: any) => (
                    <li style={{ width: "33.333333333333%" }}>
                      <div className="item_cont">
                        <div className="item-photo-box">
                          <Link
                            to="/Detailpage"
                            onClick={() => setProductName(item.productName)}
                          >
                            <img
                              src={item.urlResource}
                              alt="kyungsu"
                              width="460"
                              title="인텐시브 페이셜 진정 크림 150ml"
                              className="middle"
                            />
                          </Link>
                        </div>
                        <div className="item-info-cont">
                          <div className="item-tit-box">
                            <Link
                              to="/Detailpage"
                              onClick={() => setProductName(item.productName)}
                            >
                              <strong className="item-name">
                                {item.productName}
                              </strong>
                            </Link>
                          </div>
                          <div className="item-money-box">
                            <strong className="item-price">
                              <span>{item.price}</span>
                            </strong>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="plusicon-boxs">
                {!admin ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <Link to={"/CategoryCreate"}>
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        className="category-plus"
                      />
                    </Link>
                    <Link to={"/"}>
                      <FontAwesomeIcon
                        icon={faCircleUp}
                        className="category-plus"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Category;
