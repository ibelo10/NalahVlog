/* Booking Page Styles */
.booking-section {
    min-height: 100vh;
    padding: 120px 20px 60px;
    background-color: var(--dark-bg);
    position: relative;
}

.booking-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(218, 165, 32, 0.03) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(218, 165, 32, 0.03) 25%, transparent 25%);
    background-size: 20px 20px;
    animation: backgroundMove 30s linear infinite;
    pointer-events: none;
}

.booking-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    background: rgba(26, 18, 8, 0.95);
    border-radius: 10px;
    border: 1px solid rgba(218, 165, 32, 0.3);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 1;
}

.booking-title {
    font-family: 'Italianno', cursive;
    color: var(--gold-primary);
    font-size: 3rem;
    text-align: center;
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(218, 165, 32, 0.3);
}

.booking-subtitle {
    color: var(--gold-secondary);
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 3px;
    margin-bottom: 40px;
    text-transform: uppercase;
}

.booking-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: flex;
    gap: 20px;
    width: 100%;
}

.form-row .form-group {
    flex: 1;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    color: var(--gold-secondary);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    letter-spacing: 1px;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 12px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(218, 165, 32, 0.3);
    border-radius: 5px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--gold-primary);
    box-shadow: 0 0 10px rgba(218, 165, 32, 0.2);
}

.terms-group {
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.terms-group label {
    color: var(--gold-secondary);
    font-size: 0.85rem;
}

.submit-btn {
    background: transparent;
    color: var(--gold-primary);
    border: 2px solid var(--gold-primary);
    padding: 15px 30px;
    font-size: 1.1rem;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
}

.submit-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(218, 165, 32, 0.2),
        transparent
    );
    transition: left 0.5s ease;
}

.submit-btn:hover {
    background: var(--gold-primary);
    color: var(--dark-bg);
}

.submit-btn:hover::before {
    left: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
    .booking-section {
        padding: 100px 15px 40px;
    }

    .booking-container {
        padding: 30px 20px;
    }

    .form-row {
        flex-direction: column;
        gap: 20px;
    }

    .booking-title {
        font-size: 2.5rem;
    }

    .booking-subtitle {
        font-size: 1rem;
        letter-spacing: 2px;
    }
}
