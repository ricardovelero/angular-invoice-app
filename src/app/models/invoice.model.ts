export class Invoice {
  id?: string;
  invoice_number?: string;
  invoice_date?: string;
  due_date?: string;
  subtotal?: number;
  discount_percentage?: number;
  discount_amount?: number;
  tax_amount?: number;
  total?: number;
  is_recurrent?: boolean;
  invoice_notes?: string;
  invoice_status?: string;
  billing_month?: string;
}
