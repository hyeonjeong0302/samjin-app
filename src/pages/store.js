import {configureStore, createSlice} from "@reduxjs/toolkit";

//user_state
const user = createSlice({
  name: "user",
  // initialState: "노주현",
  initialState: {name: "노주현", memberYear: 74},
  
  // 변경함수
  reducers:{
    // changeName(){
    //   return "노홍렬"
    // }
    // changeName(state){
    //   return state + ":green"
    // }
    changeName(state){
      state.name=state.name + ":귀여워"
      // 단일 값일 경우에는 리턴을 해서어쩌구 해야하지만. 객체나 배열은 저장된 값을 원하는 곳에서 가져오면 되기 때문에 리턴이 필요하지 않아..
    },
    changeYear(state, action){
      state.memberYear += action.payload
    }
    // 변경할 때는 반드시 .페이로드 붙어야 해!
  }
})//createSlice

export const {changeName, changeYear}=user.actions
// actions는 변경함수다! 그런 뜻이야. 유저의 변경함수다!

//cart_state
const cart = createSlice({
  name: "cart",
  initialState: [],
  // 유저가 추가하기 전에는 아무 것도 카트에 없기 때문에 초기값은 없다.
  reducers: {
    addItem(state, action){
      // state.push(action.payload)
      const index = state.findIndex((findId)=>{
        return findId.id === action.payload.id
        // 내가 찾은 아이디와 액션 어쩌구에서 받은 아이디가 트루라면 트루를 리턴한다.
      })
      if(index > -1){
        // 제일 작은 인덱스 값은 0인데 인덱스 값이 -1보다 크다면이라는 것은 인덱스 값이 있다는 뜻이야. 그러면 밑에로 하고 그렇지 않으면(else) 푸쉬 시켜준다.
        state[index].count++;
      }else{
        state.push(action.payload)
      }
    },//addItem
    deleteItem(state,action){
      const index = state.findIndex((findId)=>{
        return findId.id === action.payload
   //addItem으로 들어오는 것은 아이디ㅏ 타이틀 머시기 해서 여러가지로 들어오니까 id를 지정해줘야해서 id를 적지만 deleteItem은 장바구니에서 지우는 것은 클리한 버튼의 아이디만 액션페이로드로 전송을 하면 되니까
      })
      state.splice(index,1)
    },//deleteItem
    ////////////////////////
    addCount(state, action){
      const index = state.findIndex((findId)=>{
        return findId.id === action.payload
      })
      state[index].count++
    },///////////////////////////////
    subCount(state, action){
      const index = state.findIndex((findId)=>{
        return findId.id === action.payload
      })
     if(state[index].count > 1) state[index].count--
    }
  }
})

export const {addItem, deleteItem, addCount, subCount} = cart.actions
// 위에거는 디스패치랑 짝지다
//configureStore은 state만 내보낸다. 위에는 유저라는 스ㅔ이트의 액션을 내보내느거고.
// 컨피규어가 유즈 셀럭터 어쩌구랑 짝지다
export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer
  }
})