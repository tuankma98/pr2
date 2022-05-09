import { THUMBNAIL_PLACEHOLDER } from '../constants';

export const thumbnailURL = (thumbnail) => {
  return thumbnail ? thumbnail : THUMBNAIL_PLACEHOLDER;
};

export const promotion = (promotionPercent) => {
  return promotionPercent > 0 ? `-${promotionPercent}%` : '';
};

export const formatPrice = (num) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(num);
};

export const slowLoading = async (delay = 2000) => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay);
  });
};

export const themeStyle = {
  grayColor: '#ddd',
  blueColor: '#1976d2',
};
