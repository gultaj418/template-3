// const searchWrapper = document.querySelector(".search-input");
// const inputBox = searchWrapper.querySelector("input");
// const suggestBox = searchWrapper.querySelector(".new-box");
// let words = [];
// inputBox.onkeyup = (e) => {
//   let userData = e.target.value;
//   let emptyArr = [];
//   if (userData) {
//     emptyArr = words.filter((data) => {
//       return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
//     });
//     emptyArr = emptyArr.map((data) => {
//       return (data = "<li>" + data + "</li>");
//     });
//     console.log(emptyArr);
//     searchWrapper.classList.add("active");
//     showSuggestion(emptyArr);
//     let allList = suggestBox.querySelectorAll("li");
//     for (let i = 0; i < allList.length; i++) {
//       allList[i].setAttribute("onclick", "select(this)");
//     }
//   } else {
//     searchWrapper.classList.remove("active");
//   }
// };

// function showSuggestion(list) {
//   let listData;
//   if (!list.length) {
//     userValue = inputBox.value;
//     listData = "<li>" + userValue + "</li>";
//   } else {
//     listData = list.join("");
//   }
//   suggestBox.innerHTML = listData;
// }

var audioFirst = new Audio(
  "https://www.wordreference.com/audio/es/Castellano/es188549.mp3"
);
function playAudioFirst() {
  audioFirst.play();
}

var audioSecond = new Audio(
  "https://www.wordreference.com/audio/es/Castellano/es186017.mp3"
);
function playAudioSecond() {
  audioSecond.play();
}

var elements = document.getElementsByClassName("nav-elemento");
function clickElement(index) {
  for (let i = 0; i < elements.length; i++) {
    if (index === i) {
      for (let j = 0; j < elements.length; j++) {
        if (elements[j].classList.contains("active-bar") || j !== index) {
          elements[j].classList.remove("active-bar");
          elements[i].classList.add("active-bar");
        }
      }
    }
  }
}

//translate
const answerList = document.getElementById("answerList");

var search = document.getElementById("search");
let answers = [];

search.addEventListener("keyup", (e) => {
  if (document.getElementById("search-box").value.length > 1) {
    answerList.classList.remove("d-none");
  } else {
    answerList.classList.add("d-none");
  }
  console.log(document.getElementById("search-box").value.length);
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = answers.filter((character) => {
    return (
      character.azerbaijani.toLowerCase().includes(searchString) ||
      character.espanol.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("https://api.3sual.az/api/task");
    answers = await res.json();
    displayCharacters(answers);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <li class="character">
            <div>
                <p>${character.espanol}</p>
                <p>${character.azerbaijani}</p>
            </div>
            
            </li>
        `;
    })
    .join(" ");
  answerList.innerHTML = htmlString;
  var stars = document.querySelectorAll(".character i");
  for (let star in stars) {
    stars[star].onclick = function () {
      this.classList.toggle("active");
    };
  }
};

loadCharacters();
