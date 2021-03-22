const choiceSeatsWrapper = document.getElementById("tickets_wrapper");
const seatsInCinema = document.querySelector("#cinemaHall");
const sessionsWrap = document.querySelector("#sessionsWrap");
const main = document.querySelector("body");
let ticketListWrapper = null;
let chosenTicketsList = null;
let buyButton = null;

function isElementSelected(element) {
  return Array.prototype.some.call(
    element.children,
    (el) => el.firstChild.checked
  );
}

function init() {
  addDomElement(choiceSeatsWrapper, createWrapperForChosenTickets());
}

sessionsWrap.addEventListener("change", function ({ target }) {
  if (!isElementSelected(calendar)) {
    alert("Please select date");
    target.checked = false;
    return;
  }
  if (ticketListWrapper !== null) {
    return;
  }
  if (isElementSelected(calendar) && isElementSelected(sessionsWrap)) {
    init();
    ticketListWrapper = document.querySelector("#seatsChoice");
    chosenTicketsList = document.querySelector("#selectionsBuying");
    buyButton = document.querySelector(".seats_choice_list_label");
  }
});

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

function addTicket(ticketsList, chosenSeat) {
  ticketsList.insertAdjacentHTML("beforeEnd", createTicket(chosenSeat));
}

function getChosenSeat(ticketsList, seat) {
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
  true: (ticketsList, ticket) => addTicket(ticketsList, ticket.value),
  false: (ticketsList, ticket) =>
    deleteTicket(ticketsList, getChosenSeat(ticketsList, ticket)),
};

function showElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}

const visibleElement = {
  true: (element) => showElement(element),
  false: (element) => hideElement(element),
};

seatsInCinema.addEventListener("change", function ({ target }) {
  if (!isElementSelected(calendar)) {
    alert("Please select date");
    target.checked = false;
    return;
  }
  if (!isElementSelected(sessionsWrap)) {
    alert("Please select time");
    target.checked = false;
    return;
  }

  ticketMovement[target.checked](chosenTicketsList, target);
  visibleElement[!!getNumberOfSelectedTickets(chosenTicketsList)](buyButton);

  if (target.name === "buyButton") {
    answerAfterSelection[target.id](main);
  }
  initLastConformingMassage();
});

function initLastConformingMassage() {
  ticketListWrapper.addEventListener("change", function () {
    visibleElement[false](ticketListWrapper);
    addLastConformingBuyMessage(seatsInCinema);
  });
}

function freesUpSpaceForLastConformingBuyMassage(item) {
  item.innerHTML = null;
  item.style.display = "block";
}

function createLastConformingBuyMessage(count, price) {
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

function addLastConformingBuyMessage(place) {
  const count = getNumberOfSelectedTickets(chosenTicketsList);
  const price = getCostOfTickets(count, priceOfTicket);
  const message = createLastConformingBuyMessage(count, price);
  freesUpSpaceForLastConformingBuyMassage(place);

  place.insertAdjacentHTML("beforeEnd", message);
}

function getNumberOfSelectedTickets(ticketList) {
  return ticketList.children.length;
}

function getCostOfTickets(amount, price) {
  return amount * price;
}

function viewMassage(place, massage) {
  place.insertAdjacentHTML("afterBegin", massage);
}

function createConfirmingMassage() {
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
  yes: (place) => viewMassage(place, createConfirmingMassage),
  no: (place) => viewMassage(place, createAbortMessage()),
};
