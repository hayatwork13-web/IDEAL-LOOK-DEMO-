import { Service, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'bridal-signature',
    name: 'Signature Bridal Makeup',
    category: 'Bridal',
    description: 'Our ultimate luxury bridal makeover. Includes premium HD makeup, lash customization, hair styling, jewelry setting, dupatta draping, and a pre-bridal glowing skin treatment.',
    priceText: 'Custom Consultation',
    duration: '180 mins',
    popular: true
  },
  {
    id: 'bridal-nikkah',
    name: 'Nikkah & Engagement Glow',
    category: 'Bridal',
    description: 'An elegant, luminous, soft makeup look specifically crafted for Nikkah, Engagement, or Mehndi ceremonies. Includes premium styling and draping.',
    priceText: 'From 25,000 PKR',
    duration: '120 mins'
  },
  {
    id: 'party-glam',
    name: 'Party Glam Makeup',
    category: 'Makeup',
    description: 'Flawless camera-ready evening makeup tailored to your style and attire. Includes skin prepping, professional contouring, and premium mink-style lashes.',
    priceText: 'From 7,500 PKR',
    duration: '60 mins',
    popular: true
  },
  {
    id: 'hair-styling-luxury',
    name: 'Signature Hair Styling',
    category: 'Hair',
    description: 'Elegant bridal updos, romantic Hollywood waves, sleek modern high ponytails, or customized editorial braids for any high-profile event.',
    priceText: 'From 3,500 PKR',
    duration: '45 mins'
  },
  {
    id: 'keratin-smooth',
    name: 'Premium Keratin Smoothing',
    category: 'Hair',
    description: 'High-end protein infusion therapy to eliminate frizz, restore deep hair luster, and provide long-lasting silky, pin-straight luxury hair.',
    priceText: 'From 12,000 PKR',
    duration: '150 mins',
    popular: true
  },
  {
    id: 'hair-treatment-reconstruct',
    name: 'Intensive Hair Bond Reconstruction',
    category: 'Hair',
    description: 'Deep repair therapy for dry, colored, or damaged hair using top-tier nourishing bond builders to restore hair strength and intense shine.',
    priceText: 'From 6,000 PKR',
    duration: '60 mins'
  },
  {
    id: 'facial-hydra-glow',
    name: 'Luxury Hydra-Glow Facial',
    category: 'Skincare',
    description: 'Multi-step skin resurfacing treatment combining deep extraction, premium serums, and nutrient infusion for an immediate luminous glass skin glow.',
    priceText: 'From 5,500 PKR',
    duration: '75 mins',
    popular: true
  },
  {
    id: 'facial-gold-brighten',
    name: '24K Gold Brightening Facial',
    category: 'Skincare',
    description: 'Regal skin illumination therapy using botanical extracts and 24K gold dust formulas to reduce pigmentation and provide supreme radiance.',
    priceText: 'From 4,500 PKR',
    duration: '60 mins'
  },
  {
    id: 'body-waxing-full',
    name: 'Hygienic Soothing Waxing',
    category: 'Body Care',
    description: 'Gentle and hygienic waxing using premium zinc-oxide or organic fruit wax formulas to protect and soothe sensitive feminine skin.',
    priceText: 'From 2,000 PKR',
    duration: '30 mins'
  },
  {
    id: 'spa-mani-pedi',
    name: 'Royal Spa Manicure & Pedicure',
    category: 'Body Care',
    description: 'Relaxing hand and feet ritual. Includes herbal sea-salt soak, organic sugar scrub, skin-softening mask, hot-stone massage, and pristine lacquer finish.',
    priceText: 'From 3,000 PKR',
    duration: '60 mins'
  },
  {
    id: 'package-glow-bundle',
    name: 'Ultimate Luxury Glow Package',
    category: 'Skincare',
    description: 'The ultimate pamper-day combination: Hydra-Glow Facial, Signature Hair Styling, and Royal Spa Pedicure. Perfect for pre-event refreshment.',
    priceText: 'From 11,000 PKR',
    duration: '180 mins',
    popular: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sobia Khan',
    text: 'Ideal Look Salon is by far the best bridal studio in Latifabad! They made me look and feel like a princess on my big day. The makeup was seamless and lasted throughout the hot evening. 100% recommended!',
    rating: 5,
    date: '1 week ago',
    verified: true
  },
  {
    id: 't2',
    name: 'Anum Sheikh',
    text: 'Excellent service for Keratin treatment and party makeup. They use premium products that did not harm my hair or skin. The environment is extremely hygienic and the staff is incredibly polite and professional.',
    rating: 5,
    date: '3 weeks ago',
    verified: true
  },
  {
    id: 't3',
    name: 'Zainab Fatima',
    text: 'I always come here for my Hydra Facials and manicures. They take their time, maintain superb cleanliness, and the results are always visible. Latifabad Unit 7 is lucky to have such a high-end ladies salon!',
    rating: 4.8,
    date: '1 month ago',
    verified: true
  },
  {
    id: 't4',
    name: 'Mariam Raza',
    text: 'Got my party makeup and hair styling done for my sister\'s wedding. The contouring and eyes were perfect, exactly matching my outfit. Highly professional team and great value for the luxury quality they offer.',
    rating: 5,
    date: '2 months ago',
    verified: true
  }
];
