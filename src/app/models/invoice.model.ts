export class Invoice {
  id?: string;
  number?: string;
  date?: Date;
  dueDate?: Date;
  subtotal?: number;
  taxAmount?: number;
  total?: number;
  isRecurrent?: boolean;
  notes?: string;
  status?: string;
  billingMonth?: string;
  Client?: { fullName?: string };
}
