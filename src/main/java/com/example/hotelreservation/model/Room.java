package com.example.hotelreservation.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    private int id;
    private RoomType type;
    private int pricePerNight;
}
