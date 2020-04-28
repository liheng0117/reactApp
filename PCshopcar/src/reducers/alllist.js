let allData=localStorage.getItem('allData')
const initialState = allData ? JSON.parse(allData) :  []

export default (state = initialState, { type, payload }) => {
    switch (type) {
    default:
        localStorage.setItem('allData',JSON.stringify(payload))
        return state
    }
}
