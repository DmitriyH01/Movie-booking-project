const conditionOfPlaces = {};

compareConditionOfPlaces();

appendElements(seatsInCinema, createSeats(seatsCount, conditionOfPlaces));

function compareConditionOfPlaces() {
  fillConditionOfPlaces(seatsCount, conditionOfPlaces);
  getReservedSeats(conditionOfPlaces, reservedSeats);
}

function fillConditionOfPlaces(count, places) {
  for (let key = 1; key < count + 1; key++) {
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

  if (seat <= 10) {
    row = 1;
  } else if (seat <= 20) {
    row = 2;
  } else if (seat <= 30) {
    row = 3;
  } else if (seat <= 40) {
    row = 4;
  } else if (seat <= 50) {
    row = 5;
  }
  return row;
}

function createSeats(counts, seats) {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i < counts + 1; i++) {
    let state = "";
    if (seats[i] === "disabled") {
      state = seats[i];
    }
    const label = document.createElement("label");
    label.classList.add("hall_seat");
    label.innerHTML = `<input class="hall_seat_input" type="checkbox" 
            ${state} value="Seat-${i}_Row-${getRow(i)}">
            <span class="hall_seat_number">${i}</span>`;
    fragment.append(label);
  }
  return fragment;
}
