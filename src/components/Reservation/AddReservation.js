import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { saveReservation } from '../../Service/Reservationservice';
import './AddReservation.css';
 
function AddReservation() {
    const [selectedReservationDate, setSelectedReseravtionDate] = useState(null);
    const [reservationDate, setReservationDate] = useState('');
    const [formData, setFormData] = useState({
        
    });
    const [step, setStep] = useState('selectDate');
    const [message, setMessage] = useState('');
    //ff
    // Get current date
    const today = new Date();
 
    const timeOptions = {
        Breakfast: ["07:00:00", "07:30:00", "08:00:00", "08:30:00"],
        Lunch: ["11:30:00", "12:00:00", "12:30:00", "13:00:00"],
        Dinner: ["18:00:00", "18:30:00", "19:00:00", "19:30:00"]
    };
 
    const handleDateChange = (date) => {
        setSelectedReseravtionDate(date);
        setStep('selectTime');
    };
 
    const handleTimeChange = (time) => {
        setReservationDate(time);
    };
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
 
        // Construct the reservation object based on backend expectation
        const reservation = {
            date: selectedReservationDate ? selectedReservationDate.toISOString().split('T')[0] : '', // Ensure LocalDate format
            reservationDate: reservationDate, // Ensure LocalTime format (e.g., "18:30:00")
            userId: 1  // Add the userId if needed, otherwise remove it if handled by the backend
        };
 
        console.log('Submitting reservation:', reservation);
 
        saveReservation(reservation)
            .then(response => {
                setMessage('Reservation created successfully!');
                resetForm();
            })
            .catch(error => {
                console.error('Error creating reservation:', error);
                setMessage('Failed to create reservation. Please try again.');
            });
    };
 
    const resetForm = () => {
        setSelectedReseravtionDate(null);
        setReservationDate('');
        setStep('selectDate');
        setMessage('');
    };
 
    return (
        <div className="reservation-container">
            {step === 'selectDate' && (
                <div className="calendar-container">
                    <h1>PICK A DAY YOU LIKE</h1>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedReservationDate}
                        minDate={today}
                    />
                </div>
            )}
            {step === 'selectTime' && (
                <div className="timepicker-container">
                    <h2>SELECT A TIME BY A CLICK</h2>
                    {Object.keys(timeOptions).map((meal, index) => (
                        <div key={index} className="meal-group">
                            <h3>{meal}</h3>
                            <div className="meal-times">
                                {timeOptions[meal].map((time, idx) => (
                                    <button
                                        key={idx}
                                        className={`time-option ${reservationDate === time ? 'selected' : ''}`}
                                        onClick={() => handleTimeChange(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {reservationDate && (
                        <form onSubmit={handleSubmit} className="form-container">
                          
                            <button type="submit" className="btn btn-primary">Reserve My Table</button>
                        </form>
                    )}
                </div>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
}
 
export default AddReservation;
 