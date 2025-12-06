export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'processing':
      return 'blue';
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
};

export const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'green';
    case 'unpaid':
      return 'red';
    case 'pending':
      return 'yellow';
    default:
      return 'gray';
  }
};