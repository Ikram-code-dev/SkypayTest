package com.example.hotelreservation.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    private User user;
    private Room room;
    private LocalDate checkIn;
    private LocalDate checkOut;
}
