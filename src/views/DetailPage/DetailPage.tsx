import React, { useEffect, useState } from "react";
import "./DetailPage.css";
import perfume1 from "../../assest/image/PDP_perfume_thaw_50ml_1.jpg";
import perfume2 from "../../assest/image/PDP_perfume_thaw_50ml_2.jpg";
import perfume3 from "../../assest/image/PDP_perfume_thaw_50ml_3.jpg";
import perfume4 from "../../assest/image/PDP_perfume_thaw_50ml_4.jpg";
import perfume5 from "../../assest/image/PLP_perfume_thaw_50ml.jpg";
import { useDetailStore } from "../../stores/index2";
import axios from "axios";
import { useMemberStore } from "../../stores/index3";
import { Link, useNavigate } from "react-router-dom";
import { useCountStore } from "../../stores/index5";
import { useCategoryStore } from "../../stores";
import { useAdminStore } from "../../stores/index6";

function DetailPage() {
  const [variables, setVariables] = useState<any>([]);

  const { productName, setProductName } = useDetailStore();

  const [price, priceSet] = useState<number>(0);
  const [count2, count2Set] = useState<number>(1);
  const [image, imageSet] = useState<string>("");
  const { count, setCount } = useCountStore();
  const { member } = useMemberStore();
  const { admin, setAdmin } = useAdminStore();

  const navigator = useNavigate();

  const requestToServer = async (productName: string) => {
    await axios
      .get(`http://localhost:4040/detail/${productName}`)
      .then((response) => {
        const list = response.data.data;
        console.log(list);
        setVariables(list);
        priceSet(list.price);
        imageSet(list.imag5);
      });
  };

  useEffect(() => {
    requestToServer(productName);
  }, [productName]);

  const countUp = () => {
    count2Set(count2 + 1);
  };

  const countDown = () => {
    if (count2 < 2) {
      return;
    }
    count2Set(count2 - 1);
  };

  const cartCheck = async () => {
    {
      member === null ? alert("로그인하세요") : cartUp();
    }
  };

  const cartUp = async () => {
    const id = member.id;
    const data = {
      productName,
      price,
      count2,
      image,
      id,
    };
    console.log(data);
    console.log(image);
    await axios.post("http://localhost:4040/cart/up", data);
    alert("장바구니 담기 성공");
    cartCount(id);
  };

  const cartCount = async (id: string) => {
    await axios
      .get(`http://localhost:4040/cart/cartCount/${id}`)
      .then((response) => {
        console.log(response);
        setCount(response.data);
      });
    return;
  };

  const deletes = async () => {
    await detailDelete();
    await categoryDelete();
    navigator('/Category');
  };
  const detailDelete = async () => {
    await axios.get(`http://localhost:4040/detail/detailDelete/${productName}`);
  };

  const categoryDelete = async () => {
    await axios.get(`http://localhost:4040/category/delete/${productName}`);
    alert("메뉴 삭제 완료");
  };
  return (
    <div className="DetailPage">
      <header>
        <div id="product">
          <div className="page detail-page">
            <div className="detail-page__wrap">
              <div className="detail">
                <div className="detail__content jsDetailCont dflex-center-between">
                  <div
                    className="detail-imgs relative"
                    style={{ height: "100vh" }}
                  >
                    <div
                      className="detail-imgs__container scrollable-content swiper-container jsImgSlide"
                      data-break="768"
                    >
                      <div className="detail-imgs__wrDetailPageer swiper-wrDetailPageer">
                        <div className="detail-imgs__item relative swiper-slide">
                          <img
                            className="detail-imgs__img"
                            src={variables.imag1}
                          />
                        </div>
                        <div className="detail-imgs__item relative swiper0slide">
                          <img
                            className="detail-imgs__img"
                            src={variables.imag2}
                          />
                        </div>
                        <div className="detail-imgs__item relative swiper-slide">
                          <img
                            className="detail-imgs__img"
                            src={variables.imag3}
                          />
                        </div>
                        <div className="detail-imgs__item relative swiper-slide">
                          <img
                            className="detail-imgs__img"
                            src={variables.imag4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-con">
                    <div className="product-box">
                      <div className="small-logo2">{variables.logo1}</div>
                      <div className="product-info">
                        <div className="info-logo">{variables.logo2}</div>
                        <div className="price">{variables.price}원</div>
                      </div>
                      <div className="image-info">
                        <ul className="images">
                          <li className="image1">
                            <img src={variables.imag5} alt="" />
                          </li>
                          <div className="count-box">
                            <div className="count-info">수량</div>
                            <button type="button" className="count-btn">
                              <img
                                className="count_minus2"
                                src="https://siitatr1563.cdn-nhncommerce.com/data/skin/front/awesome/img/sita2/quantity_minus.svg"
                                onClick={() => countDown()}
                              />
                            </button>
                            <div className="counts">{count2}</div>
                            <button type="button" className="count-btn">
                              <img
                                className="count_plus2"
                                src="https://siitatr1563.cdn-nhncommerce.com/data/skin/front/awesome/img/sita2/quantity_plus.svg"
                                onClick={() => countUp()}
                              />
                            </button>
                          </div>
                        </ul>
                      </div>
                      <div className="detail-infos">
                        <div className="info-desc">{variables.info1}</div>
                        <div className="info-desc2">{variables.info2}</div>
                        <div className="detail-btn">
                          {member === null ? (
                            <>
                              <Link to={"/Login"}>
                                <button
                                  type="button"
                                  className="cart-btn"
                                  onClick={() => cartCheck()}
                                >
                                  장바구니에 담기
                                </button>
                              </Link>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="cart-btn"
                                onClick={() => cartCheck()}
                              >
                                장바구니에 담기
                              </button>
                            </>
                          )}
                        </div>
                        <div className="detail-notice">
                          * 상품 혹은 증정품의 포장(랩핑)을 개봉 및 훼손한 경우
                          반품이 불가합니다.
                          <br />* 단순 변심 또는 주문 실수로 인한 교환이
                          불가합니다. 신중한 구매 부탁드립니다.
                        </div>
                      </div>
                      <div className="detail-info">
                        <div className="detail-info__box">
                          <div className="detail-info__top relative jsInfoToggle">
                            <Link to={"/Category"}>
                              <button
                                type="button"
                                className="detail-info__subject"
                              >
                                뒤로가기🔙
                              </button>
                            </Link>
                            {!admin ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                  <button className="delete-btns" onClick={() => deletes()}>
                                    메뉴 삭제
                                  </button>
                              </>
                            )}
                            <div className="detail-info__arrow n-arrow n-arrow--down jsInfoArrow"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default DetailPage;
