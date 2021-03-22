const conditionOfPlaces = new Object();

initSeats();

function initSeats() {
  const seats = createSeat(seatsCount, getRow, conditionOfPlaces);
  fillConditionOfPlaces(seatsCount, conditionOfPlaces);
  getReservedSeats(conditionOfPlaces, reservedSeats);
  appendElements(seatsInCinema, seats);
}

function fillConditionOfPlaces(count, places) {
  for (let key = 0; key < count; key++) {
    places[key] = key;
  }
  return places;
}

function getReservedSeats(allSeats, reserved) {
  Object.keys(allSeats).forEach((seat) => {
    reserved.forEach((reservedSeat) => {
      if (seat === reservedSeat.toString()) {
        allSeats[seat] = "disabled";
      }
    });
  });
}

function getRow(seat) {
  let row = null;
  if (seat <= 9) {
    row = 1;
  } else if (seat <= 19) {
    row = 2;
  } else if (seat <= 29) {
    row = 3;
  } else if (seat <= 39) {
    row = 4;
  } else if (seat <= 49) {
    row = 5;
  }
  return row;
}

function createSeat(counts, row, seats) {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i < counts + 1; i++) {
    const state = "";
    if (seats[i] === "disabled") {
      state = seats[i];
    }
    const label = document.createElement("label");
    label.classList.add("hall_seat");
    label.innerHTML = `<input class="hall_seat_input" type="checkbox" 
            ${state} value="Seat-${i}_Row-${row(i)}">
            <span class="hall_seat_number">${i}</span>`;
    fragment.append(label);
  }
  return fragment;
}
