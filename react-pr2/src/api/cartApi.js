import axiosClient from './axiosClient';

const cartApi = {
  getAll(params) {
    const url = '/orders';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/orders?${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/orders/${data.id}`;
    return axiosClient.patch(url, data.newStatus);
  },
  remove(id) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
};

export default cartApi;
