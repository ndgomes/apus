const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

const signupFields = [
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "Email address",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

const userQuiz = [
  {
    labelText: "How many cigarettes do you smoke a day?",
    labelFor: "quest1",
    id: "quest1",
    name: "quest1",
    type: "number",
    isRequired: true,
    placeholder: "How many cigarettes do you smoke a day?",
  },
  {
    labelText: "How much does your pack of cigarettes cost?",
    labelFor: "quest2",
    id: "quest2",
    name: "quest2",
    type: "number",
    step: "0.01",
    isRequired: true,
    placeholder: "How much does your pack of cigarettes cost?",
  },
  {
    labelText: "How many cigarettes are in your pack?",
    labelFor: "quest3",
    id: "quest3",
    name: "quest3",
    type: "number",
    isRequired: true,
    placeholder: "How many cigarettes are in your pack?",
  },
];

export { loginFields, signupFields, userQuiz };
