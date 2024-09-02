// navigationTypes.ts
export type RootStackParamList = {
    Index: undefined; // Pinakauna pag open ng screen
    SignIn: undefined; //basic 
    SignUp: undefined; // basic
    CreatePassword: undefined; //Confirm PAssword Yan Anjan Ung Create passsword At Confirm Password / pwede alisin
    HomeOne: { profile: { FirstName: string;  } }; // Unang makikita kapag Login YAN!
    NavBar: undefined;  //wag galawin maguuglo
    Calendar: undefined; // di muna gagaawin
    History: undefined; // 
    Notification: undefined;
    Profiles: { profile: { FirstName: string; LastName: string; MiddleName: string; Email: string; Username: string;  } }; //NavBar LogoutProf 

    
    LogoutPop:undefined;
    OtpPopUp: { username: string };

    SaveUpdateProfile: undefined;
    // OtpnewEmail: { email: string }; pede na delete
    // SaveUpdateProfileProps: undefined;


  };
  