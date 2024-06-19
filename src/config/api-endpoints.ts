import { ENVIRONMENT_INITIALIZER } from "@angular/core";

export const API_ENDPOINTS = {
    ENVIRONMENT: {
        ENVIRONMENT_INITIALIZER: 'http://localhost:8080'
    },
    USERS: {
      REGISTER: 'http://localhost:8080/api/users/register',
      LOGIN: 'http://localhost:8080/api/users/login',
      // Add other user-related endpoints here
    },
    PRODUCTS: {
      GET_ALL: 'http://localhost:8080/api/products',
      GET_BY_ID: (id: number) => `/api/products/${id}`,
      // Add other product-related endpoints here
    }
    // Add other resource-related endpoints here
  };