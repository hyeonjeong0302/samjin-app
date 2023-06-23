import React from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
// 위에 쓴 유즈셀렉터가 스토어에 있는 값을 가져오는 것이다. 이건 훅이다. 밑에다 쓴걸로 전체를 다 받아온거야.
// const state= useSelector((state)=>{return state})
import {changeName, changeYear, deleteItem, addCount, subCount} from './store';


export default function Cart() {

  // const state= useSelector((state)=>{return state}) store에 있는 state를 가져오는 훅
  const state = useSelector((state)=>state)
  // const state = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  return (
    <div>
      <h2><span style={{color:'blue', fontWeight:"bold"}}>({state.user.name})</span>  님의 장바구니</h2>
      <button onClick={()=> dispatch(changeName())}>귀엽나요?</button>
      <h3>회원가입기간: {state.user.memberYear}년</h3>
      <button onClick={()=> dispatch(changeYear(-1))}>-</button>
      <button onClick={()=> dispatch(changeYear(1))}>+</button>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
      </thead>
      <tbody>
                    {state.cart.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{state.cart[i].id}</td>
                                <td>{state.cart[i].title}</td>
                                <td>{state.cart[i].count}</td>
                                <td>
                              
                              <button onClick={()=>{dispatch(subCount(state.cart[i].id))}}>-</button>
                              <button onClick={()=>{dispatch(addCount(state.cart[i].id))}}>+</button>
                                    <button onClick={()=>{dispatch(deleteItem(state.cart[i].id))}}>삭제</button>
                                 
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
    </Table>
    </div>
  )
}