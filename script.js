/**
 * Ideal Look Salon - Custom Static JavaScript Application
 */

// 1. SERVICES DATASET
const SERVICES = [
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
    category: 'BodyCare',
    description: 'Gentle and hygienic waxing using premium zinc-oxide or organic fruit wax formulas to protect and soothe sensitive feminine skin.',
    priceText: 'From 2,000 PKR',
    duration: '30 mins'
  },
  {
    id: 'spa-mani-pedi',
    name: 'Royal Spa Manicure & Pedicure',
    category: 'BodyCare',
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

// 2. TESTIMONIALS DATASET
const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sobia Khan',
    text: 'Ideal Look Salon is by far the best bridal studio in Latifabad! They made me look and feel like a princess on my big day. The makeup was seamless and lasted throughout the hot evening. 100% recommended!',
    rating: 5,
    date: '1 week ago',
    initial: 'S'
  },
  {
    id: 't2',
    name: 'Anum Sheikh',
    text: 'Excellent service for Keratin treatment and party makeup. They use premium products that did not harm my hair or skin. The environment is extremely hygienic and the staff is incredibly polite and professional.',
    rating: 5,
    date: '3 weeks ago',
    initial: 'A'
  },
  {
    id: 't3',
    name: 'Zainab Fatima',
    text: 'I always come here for my Hydra Facials and manicures. They take their time, maintain superb cleanliness, and the results are always visible. Latifabad Unit 7 is lucky to have such a high-end ladies salon!',
    rating: 5,
    date: '1 month ago',
    initial: 'Z'
  },
  {
    id: 't4',
    name: 'Mariam Raza',
    text: 'Got my party makeup and hair styling done for my sister\'s wedding. The contouring and eyes were perfect, exactly matching my outfit. Highly professional team and great value for the luxury quality they offer.',
    rating: 5,
    date: '2 months ago',
    initial: 'M'
  }
];

// 3. APPLICATION STATE
let currentCategory = 'All';
let selectedServiceIds = ['party-glam']; // default selected
let currentTestimonialIndex = 0;

// 4. MAIN INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  // Initialize icons
  lucide.createIcons();

  // Load future dates into scheduler
  const dateInput = document.getElementById('book-date');
  if (dateInput) {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Render initial panels
  renderServices();
  renderBookingServicesList();
  updateBookingSummary();
  renderTestimonial();

  // Testimonial auto scroll interval
  setInterval(() => {
    nextTestimonial();
  }, 7000);

  // Setup mobile navigation toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Close mobile drawer on clicking links
  const links = document.querySelectorAll('.mobile-nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.add('hidden');
      }
    });
  });
});

// 5. SERVICES RENDERING & FILTERING
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  container.innerHTML = '';

  const filtered = currentCategory === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === currentCategory);

  filtered.forEach(service => {
    const isSelected = selectedServiceIds.includes(service.id);
    
    const card = document.createElement('div');
    card.className = `bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 ${
      isSelected ? 'border-brand-accent-pink ring-2 ring-brand-accent-pink/10' : 'border-brand-border'
    }`;

    card.innerHTML = `
      <div class="p-6 sm:p-8 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-[10px] uppercase tracking-wider font-semibold text-brand-rose-gold bg-brand-bg-primary border border-brand-border/80 px-2.5 py-1 rounded-full">
            ${service.category}
          </span>
          ${service.popular ? `
            <span class="inline-flex items-center space-x-1 text-[10px] uppercase tracking-wider font-bold text-brand-accent-pink bg-brand-accent-pink/10 px-2.5 py-1 rounded-full border border-brand-accent-pink/20">
              <i data-lucide="sparkles" class="w-3 h-3 text-brand-accent-pink"></i>
              <span>Popular</span>
            </span>
          ` : ''}
        </div>

        <div class="space-y-1">
          <h3 class="font-serif text-xl font-semibold text-brand-text">${service.name}</h3>
          <div class="flex items-baseline space-x-2">
            <span class="text-brand-accent-pink font-semibold text-sm">${service.priceText}</span>
            ${service.duration ? `<span class="text-[11px] text-brand-muted font-light">(${service.duration})</span>` : ''}
          </div>
        </div>

        <p class="text-xs text-brand-muted leading-relaxed font-light">${service.description}</p>
      </div>

      <div class="px-6 pb-6 pt-2 bg-brand-bg-primary/40 border-t border-brand-border/40 flex items-center justify-between">
        <span class="text-[11px] text-brand-muted font-medium">
          ${isSelected ? '✓ Added to Custom Booking' : 'Not added yet'}
        </span>
        <button
          onclick="toggleServiceInBooking('${service.id}')"
          class="text-[11px] font-semibold tracking-wider uppercase py-2 px-4 rounded-full transition-all duration-300 ${
            isSelected
              ? 'bg-brand-accent-pink text-white hover:bg-[#d6557e]'
              : 'bg-white border border-brand-rose-gold text-brand-rose-gold hover:bg-brand-rose-gold hover:text-white'
          }"
        >
          ${isSelected ? 'Remove' : 'Add to Book'}
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Re-run lucide to render stars/sparkles in dynamic elements
  lucide.createIcons();
}

function filterCategory(category) {
  currentCategory = category;
  
  // Highlight active button
  const buttons = document.querySelectorAll('.cat-btn');
  buttons.forEach(btn => {
    btn.className = "cat-btn px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 bg-white border border-brand-border text-brand-text hover:bg-brand-bg-secondary";
  });

  const activeBtn = document.getElementById(`btn-cat-${category}`);
  if (activeBtn) {
    activeBtn.className = "cat-btn px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 bg-brand-accent-pink text-white shadow-md";
  }

  renderServices();
}

// 6. BOOKING BUILDER INTEGRATION
function renderBookingServicesList() {
  const container = document.getElementById('booking-services-list');
  if (!container) return;

  container.innerHTML = '';

  SERVICES.forEach(service => {
    const isSelected = selectedServiceIds.includes(service.id);
    
    const div = document.createElement('div');
    div.className = `flex items-center space-x-3 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
      isSelected ? 'border-brand-accent-pink bg-brand-bg-secondary/20' : 'border-brand-border bg-white hover:bg-brand-bg-primary/30'
    }`;
    div.setAttribute('onclick', `toggleServiceInBooking('${service.id}')`);

    div.innerHTML = `
      <div class="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
        isSelected ? 'bg-brand-accent-pink border-brand-accent-pink text-white' : 'border-brand-border bg-white'
      }">
        ${isSelected ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
      </div>
      <div class="flex-1">
        <span class="text-xs font-semibold text-brand-text block">${service.name}</span>
        <span class="text-[10px] text-brand-rose-gold font-medium block mt-0.5">${service.priceText}</span>
      </div>
    `;

    container.appendChild(div);
  });

  lucide.createIcons();
}

function toggleServiceInBooking(serviceId) {
  const index = selectedServiceIds.indexOf(serviceId);
  if (index > -1) {
    selectedServiceIds.splice(index, 1);
  } else {
    selectedServiceIds.push(serviceId);
  }

  // Refresh view panels
  renderServices();
  renderBookingServicesList();
  updateBookingSummary();
}

function updateBookingSummary() {
  const listContainer = document.getElementById('summary-items-list');
  const countContainer = document.getElementById('summary-count');
  if (!listContainer || !countContainer) return;

  listContainer.innerHTML = '';

  const selectedServices = SERVICES.filter(s => selectedServiceIds.includes(s.id));
  
  if (selectedServices.length === 0) {
    listContainer.innerHTML = `
      <li class="text-xs text-brand-muted italic py-1">No treatments selected yet. Please select at least one treatment above.</li>
    `;
    countContainer.textContent = '0 Treatments';
    return;
  }

  countContainer.textContent = `${selectedServices.length} Treatment${selectedServices.length > 1 ? 's' : ''}`;

  selectedServices.forEach(service => {
    const li = document.createElement('li');
    li.className = "flex items-center justify-between text-xs py-1 border-b border-brand-border/30 last:border-0";
    li.innerHTML = `
      <div class="flex items-center space-x-2 text-brand-text">
        <div class="w-1.5 h-1.5 rounded-full bg-brand-accent-pink"></div>
        <span>${service.name}</span>
      </div>
      <span class="text-brand-rose-gold font-bold">${service.priceText}</span>
    `;
    listContainer.appendChild(li);
  });
}

function selectBridalAndBuild() {
  selectedServiceIds = ['bridal-signature'];
  
  // Refresh layout
  renderServices();
  renderBookingServicesList();
  updateBookingSummary();

  // Scroll smoothly
  const element = document.getElementById('booking-builder');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 7. SUBMIT BOOKING TO WHATSAPP
function submitBookingToWhatsApp() {
  const selectedServices = SERVICES.filter(s => selectedServiceIds.includes(s.id));
  
  if (selectedServices.length === 0) {
    alert('Please select at least one beauty treatment to book!');
    return;
  }

  const dateVal = document.getElementById('book-date').value || 'Not specified';
  const timeVal = document.getElementById('book-time').value || 'Not specified';
  const nameVal = document.getElementById('book-name').value || 'Valued Client';
  const notesVal = document.getElementById('book-notes').value || '';

  const serviceLines = selectedServices.map(s => `• ${s.name} (${s.priceText})`).join('\n');
  
  const message = `Hello Ideal Look Salon,

I would like to request an appointment with the following details:

*Selected Treatments:*
${serviceLines}

*Preferred Date:* ${dateVal}
*Preferred Time:* ${timeVal}
*My Name:* ${nameVal}
${notesVal ? `\n*Additional Note:* ${notesVal}` : ''}

Please confirm availability. Thank you!`;

  const finalUrl = `https://wa.me/923146867612?text=${encodeURIComponent(message)}`;
  window.open(finalUrl, '_blank');
}

// 8. TESTIMONIAL SLIDER CODES
function renderTestimonial() {
  const testimonial = TESTIMONIALS[currentTestimonialIndex];
  
  const starContainer = document.getElementById('testimonial-stars');
  const quoteElem = document.getElementById('testimonial-quote');
  const initialElem = document.getElementById('testimonial-initial');
  const nameElem = document.getElementById('testimonial-name');
  const dateElem = document.getElementById('testimonial-date');

  if (!testimonial || !starContainer || !quoteElem || !initialElem || !nameElem || !dateElem) return;

  // Render stars
  starContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('i');
    star.setAttribute('data-lucide', 'star');
    star.className = `w-5 h-5 fill-current text-amber-400 ${i < Math.floor(testimonial.rating) ? '' : 'opacity-30'}`;
    starContainer.appendChild(star);
  }

  // Update text
  quoteElem.textContent = `"${testimonial.text}"`;
  initialElem.textContent = testimonial.initial;
  nameElem.textContent = testimonial.name;
  dateElem.textContent = testimonial.date;

  // Re-init lucide
  lucide.createIcons();
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % TESTIMONIALS.length;
  renderTestimonial();
}

function prevTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
  renderTestimonial();
}

// 9. CALLBACK REQUEST SUBMIT
function handleCallbackSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('callback-name').value;
  const phone = document.getElementById('callback-phone').value;
  
  if (!name || !phone) return;

  // Show dynamic feedback message
  const feedback = document.getElementById('callback-success');
  if (feedback) {
    feedback.classList.remove('hidden');
    // Clear fields
    document.getElementById('callback-name').value = '';
    document.getElementById('callback-phone').value = '';
    
    // Hide feedback after 5 seconds
    setTimeout(() => {
      feedback.classList.add('hidden');
    }, 5000);
  }
}
