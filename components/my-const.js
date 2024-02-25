export const API_SERVER = 'http://localhost:3002'

export const register_ADD = API_SERVER + '/register-list/add' // method: POST, src是後端檔名+router.post("/add")路徑

export const coupon_ADD = API_SERVER + '/coupon-list/add' // method: POST, src是後端檔名+router.post("/add")路徑
//中介表新增資料
export const couponUse_ADD = API_SERVER + '/coupon-list/coupon-use/add' // method: POST, src是後端檔名+router.post("/add")路徑

//玩遊戲後coupon產生頁面的fetch路由
export const coupon_SHOW = API_SERVER + '/coupon-show/add'

// 取得某一筆
// http://localhost:3002/address-book/api/edit/977
export const AB_GET_ONE = API_SERVER + '/address-book/api/edit' // method: GET
//AB_GET_ONE + "/977"

// 塞入資料到會員中心
export const GET_MEMBER_DATA = API_SERVER + '/member'

// 塞入資料到優惠券
export const GET_COUPON_DATA = API_SERVER + '/coupon-show'

// 修改某一筆
// /address-book/edit/:sid
export const AB_EDIT_ONE = API_SERVER + '/address-book/edit' // method: PUT

// 刪除某一筆
// /address-book/:sid
export const AB_DEL_ONE = API_SERVER + '/address-book' // method: DELETE

// ---------- 登入
export const LOGIN = API_SERVER + '/login-jwt' // method: POST, 欄位 account, password

// --- 會員相關的路由
export const PROFILE = API_SERVER + '/profile' // method: GET, 取得用戶資料

//目前缺少getlistdata畫面呈現

// --- 優惠券相關的路由
export const COUPON = API_SERVER + '/favorite/coupon2' // method: POST, 取得用戶資料
//檢查帳號不重複
export const CHECK = API_SERVER + '/member/check' // method: POST, 取得用戶資料
export const DIARY = API_SERVER + '/diary'
export const PRODUCT = API_SERVER + '/product/api'
//export const AB_PRODUCT = API_SERVER + '/try-db'
export const ONE_PRODUCT = API_SERVER + '/product/one' // /product/one/2
export const ORDER_LIST_ADD = API_SERVER + '/order-list/add'
export const ORDER_LIST = API_SERVER + '/order-list/api'
export const ONE_ORDER = API_SERVER + '/order-list/one' // /order-list/one/2
