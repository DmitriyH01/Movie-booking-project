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
    let li = document.createElement("li");
    li.classList.add("calendar_item");
    li.innerHTML = `<a href="#" class="calendar_item_link">
         <span>${tellsWhatDay(createDate(date, i))}
           <br>${tellsWhatDate(createDate(date, i))}
         </span>
                </a>`;
    fragment.append(li);
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
  right: (place) => (place.scrollLeft += 50),
  left: (place) => (place.scrollLeft -= 50),
};
///////////////////////////////////////////////////////////////////////
