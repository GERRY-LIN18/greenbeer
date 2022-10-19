let verify = localStorage.getItem('greenbeer');
if( !verify ){window.location.href="verification.html";}


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

    let lineup_width=document.querySelectorAll('.lineup-backword');
    let w=window.innerWidth;
    let lineup_height=document.querySelector(`.greenbeer-lineup-view`);
    let h = document.querySelector('.lineup-position').style.height;

    function set_w (){
        w=window.innerWidth;
        for(let i = 0 ; i< lineup_width.length;i++){
            if( w <= 1200) { 
            lineup_width[i].style.width = w+ 'px';}
            else
            lineup_width[i].style.width = '1200px';
        }
        lineup_height.style.height = h + 'px';
    }
    set_w ();
    window.addEventListener('resize',set_w);


    let lineupChange = document.querySelector(`.greenbeer-lineup-view`);
    let count =0 ;

    function lineup(){
        let lineup = document.querySelector(`.lineup-content`);

        count++;
        if ( count<3){
            if( w > 1200) { 
                lineup.style.left = -1200 * count + 'px';
            }else
                lineup.style.left = -1 * count * w +'px';
        }else{
            lineup.style.left = 0;
            count = 0;
        }
    }

    lineupChange.onclick = lineup;

});



