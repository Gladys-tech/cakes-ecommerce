"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

interface CalendarProps {
    selectedDate: Date | null;
    onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState<Date[]>([]);

    useEffect(() => {
        generateCalendar(currentDate);
    }, [currentDate]);

    const generateCalendar = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const tempDays = [];
        for (let i = 1; i <= daysInMonth; i++) {
            tempDays.push(new Date(year, month, i));
        }

        setDays(tempDays);
    };

    const handleDateClick = (date: Date) => {
        onDateChange(date);
    };

    const isDateDisabled = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const minDate = new Date(today);
        minDate.setDate(minDate.getDate() + 3);

        return date < minDate;
    };

    const renderCalendarHeader = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>Previous</Button>
                <Typography variant="h6">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</Typography>
                <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>Next</Button>
            </Box>
        );
    };

    return (
        <Box width="400px" mx="auto">
            {renderCalendarHeader()}
            <Grid container spacing={1}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                    <Grid item xs={1.7} key={index}>
                        <Typography variant="body2" align="center" fontWeight="bold">{day}</Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={1}>
                {days.map((day, index) => (
                    <Grid item xs={1.7} key={index}>
                        <Button
                            fullWidth
                            className={selectedDate && selectedDate.toDateString() === day.toDateString() ? 'global-button' : ''}
                            onClick={() => handleDateClick(day)}
                            disabled={isDateDisabled(day)}
                            sx={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                color: 'inherit',
                                padding: '8px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0'
                                }
                            }}
                        >
                            {day.getDate()}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Calendar;
