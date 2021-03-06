package com.sopra.LocAway.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.sopra.LocAway.exception.NotFoundException;
import com.sopra.LocAway.model.Accomodation;
import com.sopra.LocAway.model.Booking;
import com.sopra.LocAway.model.Views;
import com.sopra.LocAway.repository.IBookingRepository;

@RestController
@RequestMapping("/booking")
@CrossOrigin("*")
public class BookingRestController {

	@Autowired
	private IBookingRepository bookingRepo;
	
	@GetMapping("")
	@JsonView(Views.ViewBooking.class)
	public List<Booking> list() {
		List<Booking> bookings = bookingRepo.findAll();

		return bookings;
	}

	@GetMapping("/{id}")
	@JsonView(Views.ViewBooking.class)
	public Booking find(@PathVariable Long id) {
		Optional<Booking> opt = bookingRepo.findById(id);

		if (opt.isPresent()) {
			return opt.get();
		} else {
			throw new NotFoundException();
		}
	}

	@PostMapping("")
	@JsonView(Views.ViewBooking.class)
	public Booking create(@RequestBody Booking booking) {
		booking = bookingRepo.save(booking);

		return booking;
	}

	@PutMapping("/{id}")
	@JsonView(Views.ViewBooking.class)
	public Booking update(@RequestBody Booking booking, @PathVariable Long id) {
		booking = bookingRepo.save(booking);

		return booking;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		bookingRepo.deleteById(id);
	}
	
//	@GetMapping("/search/{city}")
//	@JsonView(Views.ViewAccomodation.class)
//	public List<Accomodation> searchByCity(@PathVariable String city){
//		
//		List<Accomodation> accomodations = accomodationRepo.findByCity(city);
//		if (accomodations != null) {
//			return accomodations;
//		} else {
//			throw new NotFoundException();
//		}
//	}

}	

