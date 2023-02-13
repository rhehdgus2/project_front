import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Shopping.css";
import axios from 'axios';
import { useMemberStore } from "../../stores/index3";
import { useCountStore } from "../../stores/index5";

function Shopping() {

  const [variables, setVariables] = useState<any[]>([]);
  const { member } = useMemberStore();
  const [ shippingPrice, setShippingPrice] = useState<number>(3000);
  const [ total, setTotal] = useState<number>(0);
  const [ total2, setTotal2] = useState<number>(0);
  const [ count2, setCount2] = useState<number>(0);
  const [ id, setId] = useState<string>('');
  const [ address, setAddress] = useState<string>('');
  const { count , setCount } = useCountStore();
  const [ variables2, setVariables2 ] = useState<any[]>([]);

  const requestToServer = async () => {
    const response = await axios.get(`http://localhost:4040/cart/down/${member.id}`)
    setVariables(response.data.data);
    const list = response.data.data;
    setId(member.id);
    setAddress(member.address);
    return list;
  }

  useEffect(() => {
    totals();
  },[member.count]);

  const test = () => {
    console.log(variables);
  }

  const totals = async() => {
    await payList(); 
    console.log(variables2);
    let sum = 0;
    const list = await requestToServer();
    list.forEach((element: any) => {
      sum += element.price * element.count;
    });

    setTotal(sum);
    setTotal2(sum + shippingPrice);
  }

  const countUp = async (productName: string) => {
    // 증가시키는 api
    const data = {
      productName,
      id
    }
    await axios.post("http://localhost:4040/cart/countUp", data)
    totals();
  };

  const countDown = async (productName: string) => {
    
    const data = {
      id,
      productName,
    }
    await axios.post("http://localhost:4040/cart/countDown",data)
    totals();
  };
  const cartDelete = async(productName : string) => {
    const data = {
      productName,
      id,
    }
    await axios.post("http://localhost:4040/cart/deleteitem",data)
    totals();
    cartCount(id);
  }

  const cartCount = async(id : string) => {
    await axios.get(`http://localhost:4040/cart/cartCount/${id}`)
    .then((response) => {
        console.log(response);
        setCount(response.data);
    })
    return
}
  const cartPay = async() => {
    const data = {
      variables,
      address,
    }
    console.log(data);
    await axios.post("http://localhost:4040/cart/payCheck", data)
    await cartListDelete();
  }

  const payList = async() => {
    await axios.get(`http://localhost:4040/cart/payList/${member.id}`)
    .then((response) => {
      console.log(response);
      setVariables2(response.data);
    })
    return
  }

  const cartListDelete = async() => {
    await axios.get(`http://localhost:4040/cart/cartListDelete/${member.id}`)
    setCount(0);
    totals();
  }

  return (
    <div className="Shopping">
      <div id="container">
        <div id="contents">
          <div className="sub_content">
            <div className="content_box cart order">
              <h1 className="h1-text"> 결제 내역</h1>
              <div className="order_wrap2 inner">
                <form
                      className="shop-form2"
                      id="frmCart"
                      name="frmCart"
                      method="post"
                      target="ifrmProcess"
                    >
                          <table className="scroll2">
                              <tr>
                                <th className="list2-product-img">상품사진</th>
                                <th className="list2-product-name">상품 이름</th>
                                <th className="list2-product-address">주소</th>
                                <th className="list2-product-number">주문번호</th>
                                <th className="list2-product-count">수량</th>
                                <th className="list2-product-price">주문금액</th>
                                <th className="list2-product-date">주문일자</th>
                              </tr>
                            {variables2.map((item : any) => (
                                <tr>
                                  <td>
                                    <img
                                        src={item.orderImg}
                                        width="40"
                                        alt="퍼퓸 쏘,선셋"
                                        title="퍼퓸 쏘,선셋"
                                        className="pay-img"
                                      />
                                  </td>
                                  <td>{item.productName}</td>
                                  <td>{item.address}</td>
                                  <td>{item.orderNumber}</td>
                                  <td>{item.count}</td>
                                  <td>{item.price}</td>
                                  <td>{item.date}</td>
                                </tr>
                            ))}
                          </table>
                    </form>

              </div>
              <h1 className="h1-text">장바구니</h1>
              <div className="order_wrap inner">
                <div className="cart_cont">
                  <form
                    className="shop-form"
                    id="frmCart"
                    name="frmCart"
                    method="post"
                    target="ifrmProcess"
                  >
                    <div className="cart_cont_list">
                      <div className="<!--order_table_type--> list">
                        <table className="scroll">
                          <thead>
                            <tr>
                              <th>상품정보</th>
                              <th></th>
                              <th>수량</th>
                              <th>주문금액</th>
                              <th>삭제</th>
                            </tr>
                          </thead>
                          {variables.map((item: any) => (
                          <tbody>
                            <tr>
                              <td className="td_left">
                                <div className="pick_add_cont">
                                  <span className="pick_add_img">
                                    <a href="">
                                      <img
                                        src={item.image}
                                        width="40"
                                        alt="퍼퓸 쏘,선셋"
                                        title="퍼퓸 쏘,선셋"
                                        className="middle"
                                      />
                                    </a>
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="pick_add_info">
                                  <p className="cart-productname">
                                      {item.productName}
                                  </p>
                                  <p className="price"></p>
                                </div>
                              </td>
                              <td className="td_test">
                                <img
                                  className="count_minus"
                                  src="https://siitatr1563.cdn-nhncommerce.com/data/skin/front/awesome/img/sita2/quantity_minus.svg"
                                  onClick={() => countDown(item.productName)}
                                />
                                <span className="count">{item.count}</span>
                                <img
                                  className="count_plus"
                                  src="https://siitatr1563.cdn-nhncommerce.com/data/skin/front/awesome/img/sita2/quantity_plus.svg"
                                  onClick={() => countUp(item.productName)}
                                />
                              </td>
                              <td className="td_price">
                                <strong className="order_sum_txt">{item.price}원</strong>
                                <p className="add_currency"></p>
                              </td>
                              <td>
                                <img
                                  className="remove"
                                  src="https://siitatr1563.cdn-nhncommerce.com/data/skin/front/awesome/img/sita2/cart_close.svg"
                                  data-sno="150323"
                                  onClick={() => cartDelete(item.productName)}
                                />
                              </td>
                            </tr>
                          </tbody>

                          ))}
                        </table>
                      </div>
                    </div>
                  </form>
                  <div className="savings">
                    소중한 순간을 더욱 특별하게 만들어줄 우리만의 🎁제품으로
                    따듯한 마음을 전해보세요.
                  </div>
                  <div className="price_sum sum">
                    <div className="price_sum_cont">
                      <div className="price_sum_list">
                        <dl>
                          <dt>총 상품금액</dt>
                          <dd>
                            <strong id="totalGoodsPrice"></strong>{total} 원
                          </dd>
                        </dl>
                        <dl className="sign">
                          <dt>&nbsp;</dt>
                          <dd>
                            <img
                              src="https://siitatr1563.cdn-nhncommerce.com/data/skin/front/awesome/img/sita2/cart_sum_plus.svg"
                              alt="더하기"
                            />
                          </dd>
                        </dl>
                        <dl>
                          <dt>총 배송비</dt>
                          <dd>
                            <strong id="totalDeliveryCharge"></strong>{shippingPrice} 원
                          </dd>
                        </dl>
                        <dl className="sign">
                          <dt>&nbsp;</dt>
                          <dd>
                            <img
                              src="https://siitatr1563.cdn-nhncommerce.com/data/skin/front/awesome/img/sita2/cart_sum_equal.svg"
                              alt="합계"
                            />
                          </dd>
                        </dl>
                        <dl className="price_total">
                          <dt>결제예정금액</dt>
                          <dd>
                            <strong id="totalSettlePrice"></strong>{total2} 원
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="btn_order_box">
                    <span className="button_box">
                      {
                        ((address === null) ? (<><Link to={"/Update"} className="btn_order_whole_buy buy"
                        onClick={() => alert('주소를 입력하세요')}>
                            주문하기
                        </Link></>) : (<><Link to={"/OrderCheck"} className="btn_order_whole_buy buy"
                        onClick={() => cartPay()}>
                            주문하기
                        </Link></>))
                      }

                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Shopping;
