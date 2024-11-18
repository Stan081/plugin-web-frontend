export type SignupFieldType = {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  contact: {
    phone: string;
    country: string;
  };
  role: string;
  platform: string;
};

export type EditUserType = {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  contact: {
    phone: string;
    country: string;
  };
};

export type VerifyCodeType = {
  email: string | string[];
  code: string;
};

export type LoginFieldType = {
  email: string;
};

// SIGNUP STEP TWO

// POST

// URL: http://localhost:8000/api/auth/sign-up-two

// {
//   "email": "protisstudios@gmail.com",
//  "code": "101329"
// }
