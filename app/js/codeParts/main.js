const choiceSeatsWrapper = document.getElementById("tickets_wrapper");
const seatsInCinema = document.querySelector("#cinemaHall");
const main = document.querySelector("body");
const filmName = "Monster Hunter";
const priceOfTicket = 8;

init();

function init() {
  addDomElement(choiceSeatsWrapper, createWrapperForChosenTickets());
}

/////////////                    init choice ticket

/////////////////////////////////////////////////////////////////

function createWrapperForChosenTickets() {
  return `  <div id="seatsChoice" class="seats_choice">
      <ul id="selectionsBuying" class="seats_choice_list"></ul>
      <input
        id="buyTickets"
        class="seats_choice_list_input"
        type="radio"
        value=""
      />
      <label for="buyTickets" class="seats_choice_list_label"
        >BUY SELECTED</label
      >
    </div>`;
}

function addDomElement(container, element) {
  container.insertAdjacentHTML("beforeEnd", element);
}

function createTicket(seatNumber) {
  return ` <li data-ticket = ${seatNumber} class="seats_choice_list_ticket">
              <h4>${filmName}</h4>
              <span>${seatNumber}</span>
            </li>`;
}

function addedTicket(ticketsList, chosenSeat) {
  ticketsList.insertAdjacentHTML("beforeEnd", createTicket(chosenSeat));
}

function tellsWhatSeatChosen(ticketsList, seat) {
  const basket = ticketsList.children;
  let chosen = null;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].dataset.ticket === seat.value) {
      chosen = basket[i];
    }
  }
  return chosen;
}

function deleteTicket(ticketsList, chosenSeat) {
  ticketsList.removeChild(chosenSeat);
}

const ticketMovement = {
  true: (ticketsList, ticket) => addedTicket(ticketsList, ticket.value),
  false: (ticketsList, ticket) =>
    deleteTicket(ticketsList, tellsWhatSeatChosen(ticketsList, ticket)),
};

const chosenTicketsList = document.querySelector("#selectionsBuying");
const buyButton = document.querySelector(".seats_choice_list_label");

const visible = {
  true: (item) => (item.style.display = "block"),
  false: (item) => (item.style.display = "none"),
};

seatsInCinema.addEventListener("change", function ({ target }) {
  ticketMovement[target.checked](chosenTicketsList, target);
  visible[!!countsNumberOfSelectedTickets(chosenTicketsList)](buyButton);

  if (target.name === "buyButton") {
    answerAfterSelection[target.id](main);
  }
});

const ticketListWrapper = document.querySelector("#seatsChoice");

ticketListWrapper.addEventListener("change", function ({ target }) {
  visible[false](ticketListWrapper);
  addBuyingMessage(seatsInCinema);
});

function freesUpSpace(item) {
  item.innerHTML = null;
  item.style.display = "block";
}

function createConformingBuyMessage(count, price) {
  return `    <div id="basket" class="basket">
      <span>
        You buy ${count} ticket for ${price} $
      </span>
      <h4>Do you wont to continue?</h4>
      <input id="yes" name="buyButton" type="radio" value="" />
      <label for="yes" class="basket_btn">Yes</label>
      <input id="no" name="buyButton" type="radio" value="" />
      <label for="no" class="basket_btn">No</label>
    </div>`;
}

function addBuyingMessage(placeWhereAdd) {
  freesUpSpace(placeWhereAdd);
  placeWhereAdd.insertAdjacentHTML(
    "beforeEnd",
    createConformingBuyMessage(
      countsNumberOfSelectedTickets(chosenTicketsList),
      calculatesCostOfTickets(
        countsNumberOfSelectedTickets(chosenTicketsList),
        priceOfTicket
      )
    )
  );
}

function countsNumberOfSelectedTickets(ticketList) {
  let numberOfTickets = ticketList.children.length;
  return numberOfTickets;
}

function calculatesCostOfTickets(amount, price) {
  const priceForChosenTickets = amount * price;
  return priceForChosenTickets;
}

/////////////////////////////// confirming buying ticket(s)

function viewMassage(place, massage) {
  place.insertAdjacentHTML("afterBegin", massage);
}

function createConformBuyMassage() {
  return `<div class="message_wrapper">
  <span>Thank for buying,wait confirming message</span>
</div>`;
}

function createAbortMessage() {
  return `<div class="message_wrapper">
  <span>Thank for visiting our site, please come back next time </span>
</div>`;
}

const answerAfterSelection = {
  yes: (place) => viewMassage(place, createConformBuyMassage()),
  no: (place) => viewMassage(place, createAbortMessage()),
};
////////////////////////////    end   /////////////////////////////////////////////////////
