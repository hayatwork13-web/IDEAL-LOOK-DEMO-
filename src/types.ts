export interface Service {
  id: string;
  name: string;
  category: 'Bridal' | 'Makeup' | 'Hair' | 'Skincare' | 'Body Care';
  description: string;
  priceText: string;
  duration?: string;
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface BookingState {
  selectedServiceIds: string[];
  date: string;
  time: string;
  name: string;
  notes: string;
}
