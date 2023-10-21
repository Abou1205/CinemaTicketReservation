// 1-section define the container
const container = document.querySelector(".container");
// console.log(container); control

const infoText = document.querySelector('.infoText');
// console.log(infoText);

const movieList = document.querySelector("#movie");
// console.log(movieList);

const seatCount = document.getElementById("count");
// console.log(seatCount);

const totalAmount = document.getElementById("amount");
// console.log(totalAmount);

const seats = document.querySelectorAll('.seat:not(.reserved)');
// console.log(seats);

const resetButton = document.getElementById("resetButton");
// console.log(resetButton);

const moviePoster = document.getElementById("moviePoster");
// console.log(moviePoster);

const movies = [
  {name: "", posterURL: ""},
  {name: "Oppenheimer", posterURL: "/screen.jpg"},
  {name: "Barbie", posterURL: "/barbie.jpg"},
  {name: "About Dry Grasses", posterURL: "/about.jpeg"},
]

movieList.addEventListener("change", () => {
  // Get the selected movie option value
  const selectedMovieIndex = movieList.selectedIndex;
  const selectedMovieData = movies[selectedMovieIndex];

  // Update the movie poster image source
  moviePoster.src = selectedMovieData.posterURL;
  
  // Call calculateTotal to update total amount based on the selected movie
  calculateTotal();
});



const resetSelectedSeats = () => {
  const selectedSeats = container.querySelectorAll('.seat.selected');
  selectedSeats.forEach(seat => {
    seat.classList.remove('selected');
  });
  calculateTotal();
};

resetButton.addEventListener("click", resetSelectedSeats);


const saveToDatabase = (index) => {
  // console.log('data', index);
  localStorage.setItem('seatsIndex', JSON.stringify(index));
  localStorage.setItem('movieIndex', JSON.stringify(movieList.selectedIndex))
}

const getFromDatabase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem('seatsIndex'));
  if(dbSelectedSeats!==null) {
    seats.forEach((seat,index) => {
      if(dbSelectedSeats.includes(index)) {
        seat.classList.add('selected');
      }
    })
  }
  const dbSelectedMovie = JSON.parse(localStorage.getItem('movieIndex'));
  movieList.selectedIndex = dbSelectedMovie;
}

getFromDatabase();

const createIndex = () =>{
  let allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  })
  // console.log(allSeats);


  let allselectedArray = [];
  const allSelected = container.querySelectorAll('.seat.selected');

  allSelected.forEach((selected) => {
    allselectedArray.push(selected);
  })
  // console.log(allselectedArray);

  const selectedSeatsIndex = allselectedArray.map((selected) => {
    return allSeatsArray.indexOf(selected);
  })
  // console.log(selectedSeatsIndex);
  saveToDatabase(selectedSeatsIndex);
}


const calculateTotal = () => {
    createIndex();
    let selectedSeatsCount = container.querySelectorAll('.seat.selected').length;
    // console.log(selectedSeatsCount);

    seatCount.innerText = selectedSeatsCount;
    // console.log(seatCount);
    totalAmount.innerText = (selectedSeatsCount * movieList.value);
    // console.log(totalAmount);
    if(selectedSeatsCount){
        infoText.classList.add("open");
    } else {
        infoText.classList.remove("open");
    }
    // console.log("Hesaplama çalıştı");
};
calculateTotal();



container.addEventListener("click", (e) => {
  // console.log("Clicked container");
  // console.log(e.target.offsetParent);
  const clickedSeat = e.target.offsetParent;
  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});

movieList.addEventListener("change", () => {
  calculateTotal();
})
