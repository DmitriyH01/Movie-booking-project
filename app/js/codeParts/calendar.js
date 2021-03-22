const futureDate = new Date();
const calendar = document.querySelector(".calendar");

const daysOfWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

function getDay(date) {
  const dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
}

function getDate(date) {
  const dayOfMonth = date.getDate();
  return dayOfMonth;
}

function createDate(date, number) {
  const myDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getDay()
  );

  const numberDay = myDate.getDate() + number;
  myDate.setDate(numberDay);

  return myDate;
}

function getHowManyDaysInMonth(date) {
  const futureMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const howManyDay = Math.round((nextMonth - futureMonth) / 1000 / 3600 / 24);

  return howManyDay;
}

function createMonth(date) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < getHowManyDaysInMonth(date); i++) {
    const label = document.createElement("label");
    label.classList.add("calendar_item");
    label.innerHTML = `<input type ="radio" name = "date" id = ${getDate(
      createDate(date, i)
    )} class="calendar_item_input">
         <span>${getDay(createDate(date, i))}
           <br>${getDate(createDate(date, i))}
         </span>`;
    fragment.append(label);
  }
  return fragment;
}

function appendElements(container, inner) {
  container.append(inner);
}

appendElements(calendar, createMonth(futureDate));

const btnWrap = document.querySelector(".calendar_wrap");

btnWrap.addEventListener("click", function ({ target }) {
  if (target.nodeName == "BUTTON") {
    scrollDirection[target.id](calendar);
  }
});

scrollDirection = {
  right: (place) => (place.scrollLeft += 80),
  left: (place) => (place.scrollLeft -= 80),
};
