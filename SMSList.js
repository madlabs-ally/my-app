import SmsListener from 'react-native-android-sms-listener'; // Update the module import to the correct SMS listener module

const SMSList = {
  start: (callback) => {
    SmsListener.addListener(callback);
  },
};

export default SMSList;

