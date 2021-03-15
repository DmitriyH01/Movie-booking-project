//////////////////////////// add time of sessions
const sessionsWrap = document.querySelector("#sessionsWrap");
const sessionsTime = ["14:00", "17:30", "21:00", "23:20"];

function createSessionsTime(timeOfSessions) {
  const fragment = document.createDocumentFragment();

  timeOfSessions.forEach((el) => {
    const label = document.createElement("label");
    label.classList = "time_wrap_lists_item";
    label.innerHTML = `<input type="radio" name="time" id="${[el]}"/>
        <span>${[el]} </span>`;

    fragment.appendChild(label);
  });
  return fragment;
}

function addSessionsTime(container, inner) {
  container.append(inner);
}

addSessionsTime(sessionsWrap, createSessionsTime(sessionsTime));
//////////////////////////////////    end    /////////////////////////////
