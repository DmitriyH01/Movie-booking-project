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

appendElements(sessionsWrap, createSessionsTime(sessionsTime));
