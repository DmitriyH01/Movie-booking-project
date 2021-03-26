const currentDate = new Date();
const calendar = document.querySelector(".calendar");
const btnWrap = document.querySelector(".calendar_wrap");

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
  return daysOfWeek[date.getDay()];
}

function getDate(date) {
  return date.getDate();
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

function getCountDaysInMonth(date) {
  const currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  return Math.round((nextMonth - currentMonth) / 1000 / 3600 / 24);
}

function createMonth(date) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < getCountDaysInMonth(date); i++) {
    const day = getDay(createDate(date, i));
    const newDate = getDate(createDate(date, i));
    const label = document.createElement("label");
    label.classList.add("calendar_item");
    label.innerHTML = `<input type ="radio" name = "date" id = ${newDate} class="calendar_item_input">
         <span>${day}
           <br>${newDate}
         </span>`;
    fragment.append(label);
  }
  return fragment;
}

function appendElements(container, inner) {
  container.append(inner);
}

appendElements(calendar, createMonth(currentDate));

btnWrap.addEventListener("click", function ({ target }) {
  const { nodeName, id } = target;
  if (nodeName === "BUTTON") {
    scrollDirection[id](calendar);
  }
});

const scrollDirection = {
  right: (place) => (place.scrollLeft += 80),
  left: (place) => (place.scrollLeft -= 80),
};
