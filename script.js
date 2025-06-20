document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Department to Doctor mapping for appointment form
    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');
    
    const doctorsByDepartment = {
        cardiology: [
            { name: 'Dr. Sarah Johnson', value: 'sarah-johnson' },
            { name: 'Dr. Robert Smith', value: 'robert-smith' }
        ],
        neurology: [
            { name: 'Dr. Michael Chen', value: 'michael-chen' },
            { name: 'Dr. Emily Wilson', value: 'emily-wilson' }
        ],
        orthopedics: [
            { name: 'Dr. Robert Wilson', value: 'robert-wilson' },
            { name: 'Dr. Jennifer Lee', value: 'jennifer-lee' }
        ],
        pediatrics: [
            { name: 'Dr. Angela Martinez', value: 'angela-martinez' },
            { name: 'Dr. David Brown', value: 'david-brown' }
        ],
        general: [
            { name: 'Dr. James Taylor', value: 'james-taylor' },
            { name: 'Dr. Patricia White', value: 'patricia-white' }
        ]
    };
    
    departmentSelect.addEventListener('change', function() {
        const selectedDepartment = this.value;
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        
        if (selectedDepartment && doctorsByDepartment[selectedDepartment]) {
            doctorsByDepartment[selectedDepartment].forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.value;
                option.textContent = doctor.name;
                doctorSelect.appendChild(option);
            });
        }
    });
    
    // Form submission
    const appointmentForm = document.getElementById('appointmentForm');
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const department = document.getElementById('department').value;
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;
        
        if (!name || !email || !phone || !department || !doctor || !date) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real application, you would send this data to the server
        console.log('Appointment Form Submitted:', {
            name,
            email,
            phone,
            department,
            doctor,
            date,
            message: document.getElementById('message').value.trim()
        });
        
        // Show success message
        alert('Your appointment has been booked successfully! We will contact you shortly to confirm.');
        
        // Reset form
        this.reset();
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Set minimum date for appointment to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
});