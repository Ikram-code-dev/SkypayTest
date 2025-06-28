package com.example.hotelreservation.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelreservation.model.*;
import com.example.hotelreservation.service.HotelService;
@RestController
@RequestMapping("/api/hotel")
public class HotelController {

    private final HotelService service ;
    public HotelController(HotelService service) {
        this.service = service;
    }
    @PostMapping("/room")
    public void setRoom(@RequestParam int id, @RequestParam RoomType type, @RequestParam int price) {
        service.setRoom(id, type, price);
    }

    @PostMapping("/user")
    public void setUser(@RequestParam int id, @RequestParam int balance) {
        service.setUser(id, balance);
    }
    @PostMapping("/book")
    public String book(@RequestParam int userId, @RequestParam int roomId,
                       @RequestParam String checkIn, @RequestParam String checkOut) {
        return service.bookRoom(userId, roomId, LocalDate.parse(checkIn), LocalDate.parse(checkOut));
    }

    @GetMapping("/rooms")
    public List<Room> getRooms() {
        return service.getRooms();
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return service.getUsers();
    }

    @GetMapping("/bookings")
    public List<Booking> getBookings() {
        return service.getBookings();
    }
}


