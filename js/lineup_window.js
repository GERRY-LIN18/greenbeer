    let lineup_width=document.querySelectorAll('.lineup-backword');
    let w=window.innerWidth;
    let lineup_height=document.querySelector(`.greenbeer-lineup-view`);
    let h = $(`.lineup-position`).height();

    console.log(h)
    function set_w (){
        console.log(h)
        w=window.innerWidth;
        for(let i = 0 ; i< lineup_width.length;i++){
            if( w <= 1200) { 
            lineup_width[i].style.width = w+ 'px';}
            else
            lineup_width[i].style.width = '1200px';
        }
        $('.greenbeer-lineup-view').height( h );
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
    // lineupChange.onclick = lineup;
    lineupChange.addEventListener('click' ,lineup);