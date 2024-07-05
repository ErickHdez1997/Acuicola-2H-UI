import { ENVIRONMENT_INITIALIZER } from "@angular/core";

export const API_ENDPOINTS = {
    ENVIRONMENT: {
        ENVIRONMENT_INITIALIZER: 'http://localhost:8080'
    },
    USERS: {
      REGISTER: 'http://localhost:8080/api/user/register',
      LOGIN: 'http://localhost:8080/api/user/login',
      FETCH_USER_PROFILE: 'http://localhost:8080/api/user/fetchUserProfile',
      SAVE_NOTES: 'http://localhost:8080/api/user/saveUserNotes'
      // Add other user-related endpoints here
    },
    PRODUCTS: {
      GET_ALL: 'http://localhost:8080/api/products',
      GET_BY_ID: (id: number) => `/api/products/${id}`,
      // Add other product-related endpoints here
    }
    // Add other resource-related endpoints here
  };