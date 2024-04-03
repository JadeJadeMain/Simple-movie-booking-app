const container = document.querySelector('.container');
const seats = document.querySelectorAll(".row .seat:not(.Occupied)");
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populatepage();

function setMovieData (movieIndex , MoviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', MoviePrice);
}

function updateSelectedCount(){
    const selectedSeat = document.querySelectorAll('.row .seat.Selected');

    const setsIndex =[...selectedSeat].map((seat) => {
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(setsIndex));

    const selectedSeatCounts = selectedSeat.length;
    count.innerHTML = selectedSeatCounts;
    total.innerText = selectedSeatCounts * ticketPrice;
}



function populatepage(){
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeat !== null && selectedSeat.length >0)
    {
        seats.forEach((seat, index) => {
            if(selectedSeat.indexOf(index) >-1){
                seat.classList.add('Selected');
            }
           
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = +selectedMovieIndex;
       
    }

    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if(selectedMoviePrice !== null){
        ticketPrice = selectedMoviePrice;
    }
}

movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


container.addEventListener("click", (e) => {
    if(
        e.target.classList.contains("seat") && !e.target.classList.contains("Occupied")
    ){
         e.target.classList.toggle("Selected");
     }

    updateSelectedCount();
});

updateSelectedCount();
