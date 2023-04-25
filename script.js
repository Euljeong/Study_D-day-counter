const messagecontainer = document.querySelector("#D-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");
console.log(savedDate);
const intervalIdArr = [];

container.style.display = "none";
messagecontainer.innerHTML = "<h3>D-day를 입력해주세요</h3>";

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  //const dateFormat=inputYear+"-"+inputMonth+"-"+inputDate;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

  return dateFormat;
};

const counterMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  //(수도코드) 만약, remaining이 0이라면 타이머가 종료되었습니다. 출력
  if (remaining === 0) {
    container.style.display = "none";
    messagecontainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messagecontainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (remaining < 0) {
    container.style.display = "none";
    messagecontainer.innerHTML = "<h3>과거 시간을 입력하셨습니다.</h3>";
    messagecontainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    container.style.display = "none";
    messagecontainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messagecontainer.style.display = "flex";
    setClearInterval();
    return;
    //잘못된 시간대가 들어오면 유효한 시간대가 아닙니다 출력하기
  }
  //const remainingDate = Math.floor(remaining / 3600 / 24);
  //const remaininghours = Math.floor((remaining / 3600) % 24);
  //const remainingMin = Math.floor((remaining / 60) % 60);
  //const remainingSec = Math.floor(remaining) % 60;
  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remaininghours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  //  const days = document.getElementById("days");
  //  const hours = document.getElementById("hours");
  //  const min = document.getElementById("min");
  //  const sec = document.getElementById("sec");

  //   const documentObj = {
  //     days: document.getElementById("days"),
  //     hours: document.getElementById("hours"),
  //     min: document.getElementById("min"),
  //     sec: document.getElementById("sec"),
  //   };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }

  //for (let i = 0; i < timeKeys.length; i = i + 1) {
  //documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  //}

  //   let i = 0;
  //   for (let key in documentObj) {
  //     documentObj[key].textContent = remainingObj[timeKeys[i]];
  //     i++;
  //   }

  //documentObj["days"].textContent = remainingObj["remainingDate"];
  //documentObj["hours"].textContent = remainingObj["remaininghours"];
  //documentObj["min"].textContent = remainingObj["remainingMin"];
  //documentObj["sec"].textContent = remainingObj["remainingSec"];
};

const starter = function (targetDateInput) {
  //밑에서 savedDate를 전달인자로 받아옴. targetDataInput이 매개변수임. 매개변수는 특별히 const 정의가 필요없음
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  //savedDate이 truthy한 경우(데이터가 존재하는경우)에 스타터 함수가 실행됨. 즉, savedDate로 밑에까지 쭉쭉 계산됨.
  //존재하지 않는경우(falthy) 어떻게 할지 여기 if문에서 정의해줘야하기 때문에, !를 활용

  container.style.display = "flex";
  messagecontainer.style.display = "none";
  setClearInterval();
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messagecontainer.innerHTML = "<h3>D-day를 입력해주세요</h3>";
  messagecontainer.style.display = "flex";
  setClearInterval();
};

if (savedDate) {
  starter(savedDate);
  // 여기서 savedDate는 전달인자, starter함수에 전달했음
} else {
  container.style.display = "none";
  messagecontainer.innerHTML = "<h3>D-day를 입력해주세요</h3>";
}
