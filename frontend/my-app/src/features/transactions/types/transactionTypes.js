// src/features/transactions/types/transactionTypes.js
export const TRANSACTION_TYPES = {
  IN: 'IN',
  OUT: 'OUT'
}

export const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPES.IN]: 'Stock In',
  [TRANSACTION_TYPES.OUT]: 'Stock Out'
}

export const TRANSACTION_REASONS = {
  PURCHASE: 'Purchase',
  SALE: 'Sale',
  RETURN: 'Return',
  ADJUSTMENT: 'Adjustment',
  TRANSFER: 'Transfer',
  DAMAGED: 'Damaged',
  EXPIRED: 'Expired'
}
