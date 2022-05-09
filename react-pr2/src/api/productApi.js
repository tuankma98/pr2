import axiosClient from './axiosClient';

const productApi = {
  async getAll(params) {
    // Transform _page to _start
    const newParams = { ...params };
    newParams._start = !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 50);
    // Remove un-needed key
    delete newParams._page;
    // Fetch product list + count
    const { data, headers } = await axiosClient.get('/products', { params: newParams });
    const count = headers['x-total-count'];
    // Build response and return
    return {
      data: data,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
  get(id) {
    const url = `/products/${id}`;
    const res = axiosClient.get(url);
    return res;
  },
};

export default productApi;
