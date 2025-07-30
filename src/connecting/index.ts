import axios, { AxiosInstance } from "axios";

const baseURL: string = "http://localhost:8000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiResponse = <T>(apiCall: Promise<{ data: T }>): Promise<T> => {
  return new Promise((resolve, reject) => {
    apiCall
      .then((res) => resolve(res.data))
      .catch((error) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) reject(errorMessage);
        else reject("unknown error");
      });
  });
};

// ✅ Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  location: string;
  bio: string;
}

export interface PostData {
  title: string;
  content: string;
    wantedLocation: string;
    wantedDate: string;
}

// 🔐 Auth APIs
export const login = (credentials: AuthCredentials) =>
  handleApiResponse<any>(
    apiClient.post(
      `${baseURL}/auth/login`,
      {
        email: credentials.email,
        password: credentials.password,
      },
      { withCredentials: true }
    )
  );

export const logout = () =>
  handleApiResponse<any>(
    apiClient.post(`${baseURL}/auth/logout`, {}, { withCredentials: true })
  );

export const signup = (credentials: SignupData) =>
  handleApiResponse<any>(
    apiClient.post(`${baseURL}/auth/signup`, credentials, {
      withCredentials: true,
    })
  );

// 📝 Post APIs
export const createPost = (postData: PostData) =>
  handleApiResponse<any>(
    apiClient.post(`${baseURL}/post/create-post`, postData, {
      withCredentials: true,
    })
  );

export const getAllPosts = () =>
  handleApiResponse<any>(
    apiClient.get(`${baseURL}/post/get-posts`, {
      withCredentials: true,
    })
  );

export const getCurrentUser = () =>
  handleApiResponse<any>(
    apiClient.get(`${baseURL}/auth/get-current-user`, {
      withCredentials: true,
    })
  );

export const getDashboard = () =>
  handleApiResponse<any>(
    apiClient.get(`${baseURL}/auth/dashboard`, {
      withCredentials: true,
    })
  );

export const applyForPost = (postId: string) =>
  handleApiResponse<any>(
    apiClient.post(`${baseURL}/post/apply/${postId}`, {}, {
      withCredentials: true,
    })
  );