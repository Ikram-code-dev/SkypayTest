package com.example.hotelreservation.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.hotelreservation.model.Booking;
import com.example.hotelreservation.model.Room;
import com.example.hotelreservation.model.RoomType;
import com.example.hotelreservation.model.User;

@Service
public class HotelService {
    private final List<Room> rooms = new ArrayList<>();
    private final List<User> users = new ArrayList<>();
    private final List<Booking> bookings = new ArrayList<>();
    public void setRoom(int id, RoomType type , int price){
        rooms.removeIf(r -> r.getId() == id );
    rooms.add(new Room(id,type,price));    }
    public void setUser(int id , int balance){
        users.removeIf(u -> u.getId() == id);
        users.add(new User(id,balance));
    }
    public String bookRoom(int userId, int roomId, LocalDate checkIn, LocalDate checkOut){
        if(checkOut.isBefore(checkIn))
           return "Date invalide";
           User user = users.stream().filter(u -> u.getId() == userId).findFirst().orElse(null);
           Room room = rooms.stream().filter(r -> r.getId()== roomId).findFirst().orElse(null);
           if(user == null || room == null) return " utilisateur ou chambre introuvable";
            for (Booking b : bookings) {
            if (b.getRoom().getId() == roomId &&
                !(b.getCheckOut().isBefore(checkIn) || b.getCheckIn().isAfter(checkOut))) {
                return "Chambre non disponible";
            }
        }
        long nights = ChronoUnit.DAYS.between(checkIn, checkOut);
        int cost = (int) nights * room.getPricePerNight();
        if(user.getBalance() < cost) return "Solde insuffisant";
        user.setBalance(user.getBalance()- cost);
        bookings.add( new Booking(user , room, checkIn, checkOut));

        return "Réservation réussie";
        
    }
    public List<User> getUsers() {
        return users;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public List<Booking> getBookings() {
        List<Booking> copy = new ArrayList<>(bookings);
        Collections.reverse(copy);
        return copy;
    }
}
