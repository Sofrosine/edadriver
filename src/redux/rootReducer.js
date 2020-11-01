import {combineReducers} from 'redux';
import addCustomerReducer from './AddCustomer/reducers';
import addOrderReducer from './AddOrder/reducers';
import autoCompleteReducer from './AutoComplete/reducers';
import availablePaymentReducer from './AvailablePayment/reducers';
import bankListReducer from './BankList/reducers';
import cancelOrderReducer from './CancelOrder/reducers';
import categoryReducer from './Category/reducers';
import cityReducer from './City/reducers';
import convertPlaceReducer from './ConvertPlaceID/reducers';
import detailOrderReducer from './DetailOrder/reducers';
import districtReducer from './District/reducers';
import customerReducer from './GetCustomer/reducers';
import getLocationReducer from './GetLocation/reducers';
import getOrderReducer from './GetOrder/reducers';
import goingToPickUpReducer from './GoingToPickUp/reducers';
import invoiceReducer from './Invoice/reducers';
import loadingReducer from './Loading/reducers';
import loginReducer from './Login/reducers';
import requestOrderReducer from './RequestOrder/reducers';
import requestVerificationReducer from './RequestVerification/reducers';
import searchCustomerReducer from './SearchCustomer/reducers';
import uploadImageReducer from './UploadImage/reducers';
import showNotificationAlertReducer from './ShowNotificationAlert/reducers';
import requestDriverReducer from './RequestDriver/reducers';
import acceptRequestDriverReducer from './AcceptRequest/reducers';
import declineRequestDriverReducer from './DecilneRequest/reducers';
import getAvailableDriverReducer from './GetAvailableDriver/reducers';
import detailRequestSwitchOrderReducer from './DetailRequestSwitchOrder/reducers';

const appReducer = combineReducers({
  loginReducer,
  categoryReducer,
  uploadImageReducer,
  autoCompleteReducer,
  convertPlaceReducer,
  getLocationReducer,
  cityReducer,
  districtReducer,
  getOrderReducer,
  loadingReducer,
  detailOrderReducer,
  addOrderReducer,
  requestVerificationReducer,
  availablePaymentReducer,
  bankListReducer,
  cancelOrderReducer,
  customerReducer,
  addCustomerReducer,
  searchCustomerReducer,
  invoiceReducer,
  requestOrderReducer,
  goingToPickUpReducer,
  showNotificationAlertReducer,
  requestDriverReducer,
  acceptRequestDriverReducer,
  declineRequestDriverReducer,
  getAvailableDriverReducer,
  detailRequestSwitchOrderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DELETE_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
