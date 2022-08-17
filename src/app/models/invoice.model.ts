export class Invoice {
  id?: string;
  number?: string;
  date?: string;
  dueDate?: string;
  subtotal?: number;
  taxAmount?: number;
  total?: number;
  isRecurrent?: boolean;
  notes?: string;
  status?: string;
  billingMonth?: string;
}
