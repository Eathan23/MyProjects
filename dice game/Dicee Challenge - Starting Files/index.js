function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

  return randomNumber;

}

let randomNumber1 = getRandomNumber();
let randomNumber2 = getRandomNumber();

document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "Player 1 Wins!"
} else if (randomNumber1 < randomNumber2) {
  document.querySelector("h1").innerHTML = "Player 2 Wins!"
} else {
  document.querySelector("h1").innerHTML = "Its A Draw!"
}
