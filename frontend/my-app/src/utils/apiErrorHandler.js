// src/utils/apiErrorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response
    switch (status) {
      case 400:
        return 'Bad request. Please check your input.'
      case 401:
        return 'Unauthorized. Please login again.'
      case 403:
        return 'Access denied.'
      case 404:
        return 'Resource not found.'
      case 500:
        return 'Server error. Please try again later.'
      default:
        return data?.message || 'An error occurred.'
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.'
  } else {
    // Other error
    return error.message || 'An unexpected error occurred.'
  }
}
