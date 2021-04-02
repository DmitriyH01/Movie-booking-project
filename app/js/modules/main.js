const choiceSeatsWrapper = document.getElementById("tickets_wrapper");
const seatsInCinema = document.querySelector("#cinemaHall");
const sessionsWrap = document.querySelector("#sessionsWrap");
const bodyElement = document.querySelector("body");
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
  const selectedEl = isElementSelected;
  if (ticketListWrapper !== null) {
    return;
  }
  if (!selectedEl(calendar)) {
    noSelect.calendar(target);
  }
  if (selectedEl(calendar) && selectedEl(sessionsWrap)) {
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

function getSelectedDateInfo(dates) {
  const selected = Array.prototype.find.call(dates.children, (el) => {
    return el.firstChild.checked;
  });
  if (!selected) {
    return "";
  }
  const date = selected.firstChild;
  return `${date.id}/${date.dataset.month}`;
}

function getSelectedTimeInfo(times) {
  const selected = Array.prototype.find.call(times.children, (el) => {
    return el.firstChild.checked;
  });
  if (!selected) {
    return "";
  }
  return selected.firstChild.id;
}

function createTicket(seatNumber) {
  return ` <li data-ticket = ${seatNumber} class="seats_choice_list_ticket">
              <h4>${filmName}</h4>
              <span>${seatNumber}</span><br>
              <span>date ${getSelectedDateInfo(
                calendar
              )} time ${getSelectedTimeInfo(sessionsWrap)} </span>
            </li>`;
}

function addTicket(ticketsList, chosenSeat) {
  ticketsList.insertAdjacentHTML("beforeEnd", createTicket(chosenSeat));
}

function getChosenSeat(ticketsList, seat) {
  const basket = ticketsList.children;
  let chosen = null;
  Array.prototype.some.call(basket, function (el) {
    if (el.dataset.ticket === seat.value) {
      chosen = el;
    }
  });
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

const noSelect = {
  calendar: (target) => {
    alert("Please select date");
    target.checked = false;
    return;
  },
  sessionsWrap: (target) => {
    alert("Please select time");
    target.checked = false;
    return;
  },
};

seatsInCinema.addEventListener("change", function ({ target }) {
  const { name, id, checked } = target;
  const selectedEl = isElementSelected;
  const ticketMove = ticketMovement[checked];
  const conformingChoice = selectedEl(calendar) && selectedEl(sessionsWrap);

  if (!selectedEl(calendar)) {
    noSelect.calendar(target);
  } else if (!selectedEl(sessionsWrap)) {
    noSelect.sessionsWrap(target);
  }

  if (conformingChoice) {
    ticketMove(chosenTicketsList, target);

    const ticketChosen = getNumberOfSelectedTickets(chosenTicketsList);

    if (!!ticketChosen) {
      showElement(buyButton);
    } else if (!ticketChosen) {
      hideElement(buyButton);
    }

    if (name === "buyButton") {
      answerAfterSelection[id](bodyElement);
    }

    initLastConformingMassage();
  }
});

function initLastConformingMassage() {
  ticketListWrapper.addEventListener("change", function () {
    hideElement(ticketListWrapper);
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
   <a href ="#" onClick="window.location.reload()">Go to ticket selection</a>
</div>`;
}

function createAbortMessage() {
  return `<div class="message_wrapper">
  <span>Thank for visiting our site, please come back next time </span>
   <a href ="#" onClick="window.location.reload()">Go to ticket selection</a>
</div>`;
}

const answerAfterSelection = {
  yes: (place) => viewMassage(place, createConfirmingMassage()),
  no: (place) => viewMassage(place, createAbortMessage()),
};
