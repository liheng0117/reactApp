
let carData=localStorage.getItem('cardata')

const initialState = carData ? JSON.parse(carData) :  []

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case 'add_car':
        //  判断加入购物车的数据  是否已存在  已存在就把num属性+1
        let flag=false
        state.foreach(val=>{
            if (val.id===payload.id) {
                val.num+=1
                flag=true
            }
        })
        // 若是存在   返回state
        if (flag) {
            localStorage.setItem('cardata',JSON.stringify(state))
            return [...state]   
        } else {
            //  若是不存在  直接把这条数据添加到state 里 
            const data=[...state,payload ]
            localStorage.setItem('cardata',JSON.stringify(data))
            return data
        }
    case 'remove_car':
        return payload

    default:
        return state
    }
}
