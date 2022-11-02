
if( !localStorage.getItem('greenbeer')){document.location.assign("verification.html");}


window.addEventListener("load", function(){

    window.addEventListener('wheel',function(evt){
        if(evt.deltaY<0){
            document.body.style.marginTop = '0';
            document.querySelector('.main-header').style.top = 0;
            document.querySelector('.main-header-bg').style.height = '70px'; 
        }
        else{
            
            document.body.style.marginTop = '-70px';
            document.querySelector('.main-header').style.top = '-70px';
            document.querySelector('.main-header-bg').style.height = 0; 
        }

    });




});



