export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  review: string;
  productPurchased: string;
  date: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    location: 'New York, USA',
    rating: 5,
    review: 'Amazing quality and fast shipping! The pre-order process was smooth and the product exceeded my expectations. Queenkay Importation has become my go-to for unique finds.',
    productPurchased: 'Premium Wireless Earbuds Pro',
    date: 'September 15, 2025',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Michael Chen',
    avatar: 'MC',
    location: 'Toronto, Canada',
    rating: 5,
    review: 'Incredible savings compared to local stores! The import quality is top-notch and the customer service team is very responsive. Highly recommend for anyone looking for great deals.',
    productPurchased: 'Smart Fitness Watch',
    date: 'September 12, 2025',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Emma Rodriguez',
    avatar: 'ER',
    location: 'Los Angeles, USA',
    rating: 5,
    review: 'The designer handbag I pre-ordered is absolutely beautiful! The quality is outstanding and the price was unbeatable. Will definitely be ordering more items.',
    productPurchased: 'Luxury Designer Handbag',
    date: 'September 8, 2025',
    verified: true
  },
  {
    id: 'test-4',
    name: 'James Wilson',
    avatar: 'JW',
    location: 'London, UK',
    rating: 4,
    review: 'Great selection of products and competitive pricing. The delivery time was as promised and the packaging was excellent. Very satisfied with my purchase experience.',
    productPurchased: 'Professional Camera Lens',
    date: 'September 5, 2025',
    verified: true
  },
  {
    id: 'test-5',
    name: 'Lisa Thompson',
    avatar: 'LT',
    location: 'Sydney, Australia',
    rating: 5,
    review: 'Outstanding value for money! The organic skincare set is amazing quality. Love that I can get premium products at such affordable prices through pre-orders.',
    productPurchased: 'Organic Skincare Set',
    date: 'September 1, 2025',
    verified: true
  },
  {
    id: 'test-6',
    name: 'David Kumar',
    avatar: 'DK',
    location: 'Mumbai, India',
    rating: 4,
    review: 'Smooth ordering process and reliable delivery. The gaming headset quality is excellent and exactly as described. Great platform for tech enthusiasts.',
    productPurchased: 'Wireless Gaming Headset',
    date: 'August 28, 2025',
    verified: true
  }
];

export const getVerifiedTestimonials = () => 
  testimonials.filter(testimonial => testimonial.verified);

export const getHighRatingTestimonials = () => 
  testimonials.filter(testimonial => testimonial.rating >= 4.5);