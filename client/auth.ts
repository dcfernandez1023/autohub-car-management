import axios, { AxiosError } from "axios";

export const signup = async (
  email: string,
  password: string,
  confirmPassword: string,
  onSuccess: (email: string) => void,
) => {
  try {
    email = email.trim();
    let validateResult;
    if (!email || !password)
      validateResult = "Please enter an email and password";
    if (password !== confirmPassword) validateResult = "Passwords do not match";

    if (validateResult) {
      alert(validateResult);
      return;
    }

    const res = await axios.post("/api/auth/signup", { email, password });
    if (res.status === 200) onSuccess(email);
    else alert("Sign-up failed. Please try again.");
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e instanceof AxiosError) alert(e.response?.data.message);
    else alert("An unexpected error occurred. Please try again.");
  }
};

export const signin = async (email: string, password: string) => {
  try {
    email = email.trim();
    if (!email || !password) {
      alert("Please enter an email and password");
      return;
    }

    const res = await axios.post("/api/auth/signin", { email, password });
    if (res.status === 200) window.location.href = "/client/home";
    else alert("Sign-in failed. Please try again.");
  } catch (e) {
    console.error(e);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e instanceof AxiosError) alert(e.response?.data.message);
    else alert("An unexpected error occurred. Please try again.");
  }
};

export const logout = async () => {
  try {
    const res = await axios.post("/api/auth/logout");
    if (res.status === 200) {
      window.location.href = "/";
    } else {
      alert("Failed to logout");
    }
  } catch (e) {
    console.error(e);
    alert("Failed to logout");
  }
};
