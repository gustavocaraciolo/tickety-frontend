import { CartItem } from './cart';

export interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    document: string;
    birthDate?: string;
}

export interface PaymentInfo {
    method: 'credit-card' | 'pix' | 'bank-transfer';
    cardNumber?: string;
    cardName?: string;
    cardExpiry?: string;
    cardCvv?: string;
    installments?: number;
}

export interface Order {
    id: string;
    customer: CustomerInfo;
    items: CartItem[];
    subtotal: number;
    fees: number;
    total: number;
    payment: PaymentInfo;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    confirmedAt?: string;
    tickets: TicketInfo[];
}

export interface TicketInfo {
    id: string;
    eventId: string;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
    ticketType: string;
    price: number;
    qrCode: string;
    barcode: string;
    downloadUrl: string;
}
