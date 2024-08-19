import axios from 'axios';

export function useFetchFlashSalesProducts() {
  return async function fetchFlashSalesProducts() {
    return axios.get('/api/flash-sales'); // Replace with your actual API endpoint
  };
}
