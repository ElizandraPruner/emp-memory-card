/*
 * Create a list that holds all of your cards
 */

const arrayimgdez = ['fa-diamond', 'fa-diamond', 'fa-anchor',  'fa-anchor', 'fa-leaf', 'fa-leaf', 'fa-bomb', 'fa-bomb', 'fa-bolt', 'fa-bolt', 'fa-bicycle', 'fa-bicycle', 'fa-money', 'fa-money', 'fa-paw', 'fa-paw'];
const arrayimgvint = ['fa-book', 'fa-book', 'fa-car', 'fa-car', 'fa-coffee', 'fa-coffee', 'fa-desktop', 'fa-desktop', 'fa-gamepad', 'fa-gamepad', 'fa-futbol-o', 'fa-futbol-o', 'fa-gift', 'fa-gift', 'fa-headphones', 'fa-headphones', 'fa-diamond', 'fa-diamond', 'fa-money', 'fa-money'];
const arrayimgvintq = ['fa-car', 'fa-car', 'fa-coffee', 'fa-coffee', 'fa-desktop', 'fa-desktop', 'fa-gamepad', 'fa-gamepad', 'fa-futbol-o', 'fa-futbol-o', 'fa-headphones', 'fa-headphones', 'fa-money', 'fa-money', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-paw', 'fa-paw', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
const allStars = document.getElementsByClassName('fa-star'); /*Insere na array todos os elementos com a class fa-star/todas as estrelas*/
let open = [];
let deck = document.querySelector('.deck'); 
let initGame = 0;
let lock = false;
let moves = 0;
let gameInterval;
let cardsMatcheds = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startG(){
	cardsMatcheds = 0;
	document.querySelector('.modal').classList.remove('modal-show'); /*Esconde o modal no reset*/
	for (let i = 0; i < allStars.length; i++){ /*Resetando o valor das estrelas*/
		allStars[i].classList.remove('hide-star');
	}
	shuffle(arrayimg);
	document.getElementsByClassName('deck')[0].innerHTML = ''; /*Recebe o elemento ul buscando pela class e armazena em uma array, como é uma array precisa informar a posição por isso do [0] depois do ('deck') o innerHTML = '' limpa o conteudo de ul*/
	moves = 0;
	document.querySelector('.moves').innerHTML = moves; /*Para limpar na tela do html também não só zerar o moves*/
	document.querySelector('#movesEnd').innerHTML = moves; /*Limpar o moves no modal*/
	open = [];
	initGame = 0; /*Para o timer poder ser inicializado*/
	clearInterval(gameInterval); /*Reseta o timer para 00:00*/
	document.querySelector('.displayTime').innerHTML = '00:00'; /*Limpa o tempo na tela do html*/
	document.querySelector('#timeEnd').innerHTML = '00:00';
	distributeCards();	
}
	
startG();
restart();
playAgain();
NotPlayAgain();

function hideStars(){
	if (moves === 16) { 
		allStars[0].classList.add('hide-star'); /*Esconde a primeira estrela do score-panel*/
		allStars[3].classList.add('hide-star'); /*Esconde a primeira estrela do modal*/
	} else if (moves === 30) { 
		allStars[1].classList.add('hide-star'); /*Esconde a segunda estrela do score-panel*/
		allStars[4].classList.add('hide-star'); /*Esconde a segunda estrela do modal*/
	}
}

function count_moves(){
	moves += 1;
	document.querySelector('.moves').innerHTML = moves;
	document.querySelector('#movesEnd').innerHTML = moves;
	if (30 >= moves > 0) { 
		hideStars();
	}
}


function clicked(){

	if (this.classList.contains('open') && this.classList.contains('show')){ 
		return true;
	}

	if (initGame === 0) { 
		timer();
		initGame = 1;
	}

	if (lock == false && open.length < 2){
		this.classList.toggle('show');
		this.classList.toggle('open');
		open.push(this);
	}

	if (lock == false && open.length === 2) {
		count_moves();
		lock = true;
			if (open[0].firstChild.classList[1] === open[1].firstChild.classList[1]) {
			open[0].classList.toggle('match');
			open[1].classList.toggle('match');
			open = [];	
			console.log('match', lock)
			setTimeout(function(){
				lock = false;
			}, 1000)
			cardsMatcheds += 1; 
			if (cardsMatcheds === 12 && ($('#choosehard').is(':checked'))){
				$('.modal').addClass('modal-show');
				clearInterval(gameInterval); 
			}

			if (cardsMatcheds === 10 && ($('#choosemedium').is(':checked'))){
				$('.modal').addClass('modal-show');
				clearInterval(gameInterval); 
			}
						
			if (cardsMatcheds === 8 && ($('#chooseeasy').is(':checked'))){
				$('.modal').addClass('modal-show');
				clearInterval(gameInterval); 
			}
		} else {
			open[0].classList.toggle('unMatch');
			open[1].classList.toggle('unMatch');
			setTimeout(function(){
				open[0].classList.toggle('show');
				open[1].classList.toggle('show');
				open[0].classList.toggle('open');
				open[1].classList.toggle('open');
				open[0].classList.toggle('unMatch');
				open[1].classList.toggle('unMatch');
				lock = false;
				open = [];	
				}, 1000) 
		}
	}
}


function restart(){
	let reset = document.getElementById('repeat'); 
	reset.addEventListener('click', function(){
		startG();		
	})
}

 function timer(){
     let minutes = 0;
     let seconds = 0;
     gameInterval = setInterval(function () {
         seconds = parseInt(seconds, 10) + 1;
         minutes = parseInt(minutes, 10);
         if (seconds >= 60) {
             minutes += 1;
             seconds = 0;
         }
         seconds = seconds < 10 ? "0" + seconds : seconds;
         minutes = minutes < 10 ? "0" + minutes : minutes;
         $('.displayTime').html(minutes + ":" + seconds);
         $('#timeEnd').text($('.displayTime').text());
     }, 1000);
 }

 function playAgain(){
 	buttonYes = document.getElementById('yes');
 	buttonYes.addEventListener('click', function(){
	startG();
 })
}

function NotPlayAgain(){
	buttonNot = document.getElementById('not');
	buttonNot.addEventListener('click', function(){
	document.querySelector('.modal').classList.remove('modal-show');
	})
}

function clickLevel(){
	$('#chooseeasy').on('click', function(){
		$('#chooseeasy').attr('checked', true);
		$('#choosemedium').prop('checked', false);
		$('#choosehard').prop('checked', false);
	})

	$('#choosemedium').on('click', function(){
		$('#choosemedium').attr('checked', true);
		$('#chooseeasy').prop('checked', false);
		$('#choosehard').prop('checked', false);
	})

	$('#choosehard').on('click', function(){
		$('#choosehard').attr('checked', true);
		$('#chooseeasy').prop('checked', false);
		$('#choosemedium').prop('checked', false);
	})
	
}
function distributeCards(){	
		clickLevel();
	if ($('#chooseeasy').is(':checked')){		
		shuffle(arrayimgdez);
		for (let i = 0; i < 16; i++){
		let liElement = document.createElement('li');
		liElement.classList.add('card');
		let iElement = document.createElement('i');
		iElement.classList.add('fa'); 		
		iElement.classList.add(arrayimgdez[i]); 
		liElement.append(iElement);
		liElement.addEventListener('click', clicked);	
		deck.append(liElement);
		}		
	} 
	if ($('#choosemedium').is(':checked')){				
		shuffle(arrayimgvint);
		for (let i = 0; i < 20; i++){
		let liElement = document.createElement('li');
		liElement.classList.add('card');
		let iElement = document.createElement('i');
		iElement.classList.add('fa'); 		
		iElement.classList.add(arrayimgvint[i]); 
		liElement.append(iElement);
		liElement.addEventListener('click', clicked);	
		deck.append(liElement);
		}		
	}
	if ($('#choosehard').is(':checked')){
		shuffle(arrayimgvintq);
		for (let i = 0; i < 24; i++){
		let liElement = document.createElement('li');
		liElement.classList.add('card');
		let iElement = document.createElement('i');
		iElement.classList.add('fa'); 		
		iElement.classList.add(arrayimgvintq[i]); 
		liElement.append(iElement);
		liElement.addEventListener('click', clicked);	
		deck.append(liElement);
		}
	} 
}

	
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
