document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Form submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state to button
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Show success message
            showMessage('Booking request submitted successfully! We will contact you shortly to confirm your appointment.', 'success');
            
            // Reset form
            form.reset();
            
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Message display function
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translateX(-50%)';
        messageDiv.style.padding = '15px 30px';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.backgroundColor = type === 'success' ? 'rgba(218, 165, 32, 0.9)' : 'rgba(220, 53, 69, 0.9)';
        messageDiv.style.color = '#fff';
        messageDiv.style.zIndex = '1000';
        messageDiv.style.animation = 'fadeIn 0.5s ease';

        document.body.appendChild(messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }

    // Add animations
    const elements = document.querySelectorAll('.booking-title, .booking-subtitle, .form-group');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
});
