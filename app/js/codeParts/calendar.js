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

function tellsWhatDay(date) {
  let dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
}

function tellsWhatDate(date) {
  let dayOfMonth = date.getDate();
  return dayOfMonth;
}

function createDate(date, number) {
  let myDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getDay()
  );

  let numberDay = myDate.getDate() + number;
  myDate.setDate(numberDay);

  return myDate;
}

function tellsHowManyDaysInMonth(date) {
  const futureMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const howManyDay = Math.round((nextMonth - futureMonth) / 1000 / 3600 / 24);

  return howManyDay;
}

function createMonth(date) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < tellsHowManyDaysInMonth(date); i++) {
    const label = document.createElement("label");
    label.classList.add("calendar_item");
    label.innerHTML = `<input type ="radio" name = "date" id = ${tellsWhatDate(
      createDate(date, i)
    )} class="calendar_item_input">
         <span>${tellsWhatDay(createDate(date, i))}
           <br>${tellsWhatDate(createDate(date, i))}
         </span>`;
    fragment.append(label);
  }
  return fragment;
}

function addCalendar(item, fragment) {
  item.append(fragment);
}

addCalendar(calendar, createMonth(futureDate));

//////////////////      scrolling dates with btn  /////////////////////

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
///////////////////////////////////////////////////////////////////////
