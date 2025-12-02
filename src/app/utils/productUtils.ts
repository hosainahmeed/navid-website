export const getProductImages = (product: any, selectedVariant: any) => {
  // If variant has images, use them first
  if (selectedVariant?.img?.length > 0) {
    return selectedVariant.img;
  }
  
  // Otherwise fall back to product banners
  return product?.banners || [];
};

export const getMainImage = (images: string[]) => {
  return images.length > 0 ? images[0] : '';
};
