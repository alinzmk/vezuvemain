import { getDashAdmin } from "./features/admindash/dashAdminSlice"
import { getPlanAdmin } from "./features/adminplan/planAdminSlice"
import { getProductAdmin } from "./features/adminproduct/productAdminSlice"
import { getTaskAdmin } from "./features/admintask/taskAdminSlice"

export const fetchAdminRedux = () => {
    return dispatch => {
        dispatch(getPlanAdmin())
        dispatch(getDashAdmin())
        dispatch(getProductAdmin())
        dispatch(getTaskAdmin())
    }
}

export default fetchAdminRedux
