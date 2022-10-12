const changer = document.querySelector('.changer');
const dibs = document.querySelectorAll('.div');
var check = 'am';

changer.addEventListener('click', ()=>{// toggle to change from day to night
    changer.classList.toggle('pm');
    document.querySelector('.body').classList.toggle('pm');
    document.querySelector('.sssTitle').classList.toggle('pm');
    document.querySelector('.sunNmoon').classList.toggle('pm');
    document.querySelector('.clouds').classList.toggle('pm');
    document.querySelector('.street').classList.toggle('pm');
    document.querySelector('.SSS').classList.toggle('pm');
    document.querySelector('.dim').classList.toggle('pm');
})



console.log(check);

let f1 = document.querySelector('.human');
let bright = document.querySelector('.bright');
let moveX;
let moveY;

let collide1;
let collide2;
let f1Width = f1.offsetWidth;
let brightWidth = bright.offsetWidth;

let moveHuman = function(e){//human movement
    if(e.code == 'ArrowLeft'){
        moveX = f1.offsetLeft;
        f1.style.left = moveX -10 + 'px';
        f1.style.transform = `scaleX(-1)`;
    } else if (e.code == 'ArrowRight'){
        moveX = f1.offsetLeft;
        f1.style.left = moveX +10 + 'px';
        f1.style.transform = `scaleX(1)`;
    } else if (e.code == 'ArrowUp'){
        moveY = f1.offsetTop;
        f1.style.top = moveY -10 + 'px';
    }
    else if (e.code == 'ArrowDown'){
        moveY = f1.offsetTop;
        f1.style.top = moveY +10 + 'px';
    }

    if(moveX < 10){// barrier to not let the human go beyond the street
        f1.style.left = moveX +1 + 'px';
    }
    if(moveX > 890){
        f1.style.left = moveX -1 + 'px';
    }
    if(moveY < 400){
        f1.style.top = moveY +1 + 'px';
    }
    if(moveY > 500){
        f1.style.top = moveY -1 + 'px';
    }
}

f1.addEventListener('click', ()=>{
    document.addEventListener('keydown', moveHuman, true)
    document.querySelector('.chargeLabel').style.opacity = 0;
});



let motionSensor = function(){
    let bod = document.querySelector('.body');

    if(bod.classList.contains('pm')){//checks if its nighttime to allow light on
        let emMode = document.querySelector('.emergencyChanger');
        if(emMode.classList.contains('pm')){
            return
        } else{
           

    collide1 = {x: f1.offsetLeft - f1.scrollLeft, y: f1.offsetTop - f1.scrollTop, width: f1Width};
    collide2 = {x: bright.offsetLeft - bright.scrollLeft, y: bright.offsetTop - bright.scrollTop, width: brightWidth};

    if(collide1.x > collide2.x + collide2.width ||
        collide1.x + collide1.width < collide2.x){//dim and bright mode 
            console.log('none');
            document.querySelector('.bright').style.opacity = 0;
            document.querySelector('.dim').style.opacity = 1;
            document.querySelector('.SSS').classList.remove('bri');
            document.querySelector('.charges').classList.remove('cp')
        } else {
            console.log('ey!');
            document.querySelector('.bright').style.opacity = 1;
            document.querySelector('.dim').style.opacity = 0;
            document.querySelector('.SSS').classList.add('bri');
            document.querySelector('.charges').classList.add('cp');
            
            
            document.querySelector('.cp').onclick = function(){
                let charMode = document.querySelector('.chargeChanger');
            if(charMode.classList.contains('off') || emMode.classList.contains('pm')){
                return
            }else{
                document.querySelector('.human').style.top = '400px';
                document.querySelector('.human').style.left = '450px';
                document.removeEventListener('keydown', moveHuman, true);
                document.querySelector('.chargeLabel').style.opacity = 1;
                console.log('ccl');
                }
            }
        }
    }
    }else {
        document.querySelector('.bright').style.opacity = 0;
        document.querySelector('.dim').style.opacity = 0;
        document.querySelector('.SSS').classList.remove('bri');
        document.querySelector('.charges').classList.remove('cp')
    }
}

document.addEventListener('keydown', moveHuman =>{
    motionSensor();
})

var x = new Date();
var ampm = x.getHours() >= 12 ? ' PM' : ' AM';
var hour = x.getHours();
var min = x.getMinutes();
var sec = x.getSeconds();
if(hour <10){hour = '0' + hour}
if(min < 10){min = '0' + min}
var time = document.querySelector('.time').innerHTML = hour + ': ' + min + ampm;

$(document).ready(function(){
    $(".android").click(function(){
        $('.screen1').slideToggle('slow');
    });


    $('.login').click(function(){
        let pass = document.querySelector('.pass').value;
        if(pass === 'hey'){
            $('.screen2').slideToggle('slow');
            document.querySelector('.pass').value = '';
        } else{
            $('.passCheck').slideDown(100);
            document.querySelector('.pass').value = '';
        }
    })

    $('.pass').click(function(){
        $('.passCheck').slideUp(100)
    })


    $('.android').click(function(){
        $('.screen2').slideUp('slow')
    })

    $('.logout').click(function(){
        $('.screen2').slideUp('slow');
    })

    $('.emergencyChanger').click(function(){
        let bod = document.querySelector('.body');
        if(bod.classList.contains('pm')){
            $('.emergencyChanger').toggleClass('pm')
            if($('.emergencyChanger').hasClass('pm')){
                $('.bright').css('opacity', '1');
                $('.dim').css('opacity', '0');
                $('.sensorChanger').addClass('off');
                $('.sensorChanger').text('OFF');
                $('.charges').addClass('off');
            } else{
                $('.bright').css('opacity', '0');
                $('.dim').css('opacity', '1');
                $('.sensorChanger').removeClass('off');
                $('.sensorChanger').text('ON');
                $('.charges').removeClass('off');
            }
        } else{
            $('.emergencyChanger').toggleClass('pm')
            if($('.emergencyChanger').hasClass('pm')){
            $('.SSS').addClass('anpm');
            $('.sensorChanger').addClass('off');
                $('.sensorChanger').text('OFF')
            } else{
                $('.SSS').removeClass('anpm');
                $('.sensorChanger').removeClass('off');
                $('.sensorChanger').text('ON')
            }
        }
    })

    $('.chargeChanger').click(function(){
        let bod = document.querySelector('.body');
        if(bod.classList.contains('pm')){
            $('.chargeChanger').toggleClass('off');
            if($('.chargeChanger').hasClass('off')){
                    $('.charges').addClass('off');
            } else{
                $('.charges').removeClass('off');
            }
        } else{
            $('.chargeChanger').toggleClass('off');
            if($('.chargeChanger').hasClass('off')){
                    $('.charges').addClass('off');
            } else{
                $('.charges').removeClass('off');
            }
        }
    })
})













/*f1.addEventListener('click', () =>{ //movement of the human
    document.addEventListener('keydown', (e)=>{
        if(e.code == 'ArrowLeft'){
            moveX = f1.offsetLeft;
            f1.style.left = moveX -10 + 'px';
            f1.style.transform = `scaleX(-1)`;
        } else if (e.code == 'ArrowRight'){
            moveX = f1.offsetLeft;
            f1.style.left = moveX +10 + 'px';
            f1.style.transform = `scaleX(1)`;
        } else if (e.code == 'ArrowUp'){
            moveY = f1.offsetTop;
            f1.style.top = moveY -10 + 'px';
        }
        else if (e.code == 'ArrowDown'){
            moveY = f1.offsetTop;
            f1.style.top = moveY +10 + 'px';
        }

        if(moveX < 10){// barrier to not let the human go beyond the street
            f1.style.left = moveX +1 + 'px';
        }
        if(moveX > 890){
            f1.style.left = moveX -1 + 'px';
        }
        if(moveY < 400){
            f1.style.top = moveY +1 + 'px';
        }
        if(moveY > 500){
            f1.style.top = moveY -1 + 'px';
        }

        let bod = document.querySelector('.body');

        if(bod.classList.contains('pm')){//checks if its nighttime to allow light on

        collide1 = {x: f1.offsetLeft - f1.scrollLeft, y: f1.offsetTop - f1.scrollTop, width: f1Width};
        collide2 = {x: bright.offsetLeft - bright.scrollLeft, y: bright.offsetTop - bright.scrollTop, width: brightWidth};
   
        if(collide1.x > collide2.x + collide2.width ||
            collide1.x + collide1.width < collide2.x){//dim and bright mode 
                console.log('none');
                document.querySelector('.bright').style.opacity = 0;
                document.querySelector('.dim').style.opacity = 1;
                document.querySelector('.SSS').classList.remove('bri');
                document.querySelector('.charges').classList.remove('cp')
            } else {
                console.log('ey!');
                document.querySelector('.bright').style.opacity = 1;
                document.querySelector('.dim').style.opacity = 0;
                document.querySelector('.SSS').classList.add('bri');
                document.querySelector('.charges').classList.add('cp');
                
                document.querySelector('.cp').onclick = function(){
                    document.querySelector('.human').style.top = '400px';
                    document.querySelector('.human').style.left = '450px';
                    console.log('ccl');
                }
            }
        }else {
            document.querySelector('.bright').style.opacity = 0;
            document.querySelector('.dim').style.opacity = 0;
            document.querySelector('.SSS').classList.remove('bri');
            document.querySelector('.charges').classList.remove('cp')
        }

    })   
})*/
