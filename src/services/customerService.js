// src/services/accountService.js
const BASE_URL = 'https://spider-fond-buck.ngrok-free.app/api/customer';

export const getCustomerDetails = async (customerId) => {
  try {
    const res = await fetch(`${BASE_URL}/${customerId}`, {
       method: "GET",
        headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (!res.ok) throw new Error('Failed to fetch customer');
    const data = await res.json();
    return data.Customer;
  } catch (err) {
    console.error('Error fetching customer details:', err);
    return null;
  }
};
