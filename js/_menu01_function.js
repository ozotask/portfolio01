$(function () {

    //  constant / variable declaration
    $pagination = $('.slides-cont__pagination>li>a');
    $slides = $('.slides-cont__slides');
    let nowIdx = 0;
    let intervalID = null;

    //  Default
    $pagination.eq(0).parent().addClass('on').siblings().removeClass('on');
    $('.slides-cont__play-btn a').hide();


    //  function declaration
    const $gnbMnu = $('header > nav > .gnb > li');
    //  ----------------------------------------start of [nav]
    //  nav muse enter 동작
    $gnbMnu.on('mouseenter', function () {
        nowIdx = $gnbMnu.index(this);

        //bg
        $('header>nav>.gnb>li>.lnb,header>.lnb-bg').stop().slideDown();
        $('header>.lnb-bg2').stop().fadeIn();
        $('header').addClass('gnb-on');
        //logo
        $('header > nav > h1.logo > a').css({
            backgroundImage: 'url(./images/top_logo2.png)'
        })
        //mnu color
        $gnbMnu.children('a').css({
            color: "#333"
        });
        //mnu hover point
        $gnbMnu.eq(nowIdx).children('a').css({
            color: '#235fb0'
        });
    });

    //  nav muse leave 동작
    $gnbMnu.on('mouseleave', function () {
        //bg
        $('header>nav>.gnb>li>.lnb,header>.lnb-bg').stop().slideUp();
        $('header>.lnb-bg2').stop().fadeOut();

        //mnu hover point
        $gnbMnu.eq(nowIdx).children('a').css({
            color: '#333'
        });
        
    });
    //  ----------------------------------------end of [nav]

    //  ----------------------------------------start of [section]
    //  select box event
    $('section fieldset').find('input').on('click',function(){
        $(this).siblings('ul').toggle();
        $(this).parents('fieldset').prev('span').toggleClass('on');
    });
    $('form').find('span').on('click',function(){
        $(this).next('fieldset').find('ul').toggle();
        $(this).toggleClass('on');

    });
    //  select box event - hover
    $('section fieldset').find('li').on('mouseenter',function(){
        $(this).addClass('on').siblings().removeClass('on')
    });
    //  select box event - choose
    $('section fieldset').find('a').on('click',function(evt){
        evt.preventDefault();
        $(this).parents('fieldset').prev('span').toggleClass('on')
        $(this).parents().siblings('input').val($(this).text())
        $(this).parents('ul').hide();
    })
    // select box event - hide
    $(document).on("click", function (e) {
        if ($(e.target).parents("section form").size() == 0) {
            $("section form ul").hide();
        };
    });

    //  tab-btn click event
    $('.tab-btn-container').find('a').on('click',function(evt){
        evt.preventDefault();
        $(this).parent().addClass('on').siblings().removeClass('on');
    });

    //  switch-btn click event
    $('.switch-btn').children('a').on('click',function(evt){
        evt.preventDefault();
        $(this).addClass('on').siblings().removeClass('on');
    });

    // refresh-btn event
    $('.now .refresh-btn').on('click',function(evt){
        evt.preventDefault();
        location.reload();
    });
    // notice pop-up btn
    $('.notice-btn').on('click',function(evt){
        evt.preventDefault();
        $('.popup-bg').show();
    })
    $('.popup a,.popup-bg').on('click',function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        $('.popup-bg').hide();
    });
    // up / down decoration
    const $tdText3 = $('td:nth-of-type(3)');
    const $tdText4 = $('td:nth-of-type(4)');
    const $tdText5 = $('td:nth-of-type(5)');

    for(let i = 0 ; i < $('tr:nth-of-type(odd)').length ; i++){
        if(Number($('td:nth-of-type(5)').eq(i).text().replaceAll("%","")) > 0){
            $tdText3.eq(i).css({color: "#f00"})
            $tdText4.eq(i).css({color: "#f00"})
            $tdText5.eq(i).css({color: "#f00"})
            $('td:nth-of-type(4) span').eq(i).addClass('up')

        }
        if(Number($('td:nth-of-type(5)').eq(i).text().replaceAll("%","")) < 0){
            $tdText3.eq(i).css({color: "rgb(39, 126, 207)"})
            $tdText4.eq(i).css({color: "rgb(39, 126, 207)"})
            $tdText5.eq(i).css({color: "rgb(39, 126, 207)"})
            $('td:nth-of-type(4) span').eq(i).addClass('down')

        }
        if(Number($('td:nth-of-type(5)').eq(i).text().replaceAll("%","")) === 0){
            $tdText3.eq(i).css({color: "#444"})
            $tdText4.eq(i).css({color: "#444"})
            $tdText5.eq(i).css({color: "#444"})
            $('td:nth-of-type(4)>span').eq(i).css({display: "none"})

        }
    }

    // graph bar event
    //1. 거래량에 따른 바 수치 변경

    let status = $('tr:nth-of-type(odd) td:last-child').toArray().map(item => $(item).html());
    let $graphBar = $('.graph-bar');
    let statusVal = [];
    let $graphStat = $('.graph-status');

    for(let i = 0; i < 19 ; i++){
    statusVal[i] = Number(status[i].replaceAll(",",""));
    }
    
    for(let k = 0; k < 19 ; k++){
        $graphBar.eq(k).stop().animate({
            width: (statusVal[k]/statusVal[0])*100 +'%'
        },1000);
    };

    //2. 팝업 스테이터스 수치 변경
    for(let i = 0; i < 19 ; i++){
        $graphStat.eq(i).text($('tr:nth-of-type(odd) td:last-child').eq(i).text())
    }

    //3. 팝업 스테이터스 위치 변경
    // console.log($graphStat.eq(0).width())
    // console.log($graphStat.eq(2).width())
    for(let i = 0; i < 19 ; i++){
    $graphStat.css({
        right: "-"+ ($graphStat.eq(i).width()) +"px",
    });
    };

    //4. 팝업 스테이터스 toggle event
    $graphStat.hide();
    $graphBar.on('click',function(){
        $(this).children($graphStat).toggle();
    })

    // more view btn event
    $('.more-view').on('click',function(){
        $('.table-container').height("unset");
        $(this).hide();
    });
    //  ----------------------------------------end of [section]


    //  ----------------------------------------start of [footer]
    // top scroll btn event
    $('.topscroll-btn').hide();

    $('.topscroll-btn').on('click', function (evt) {
        evt.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 600);
    });

    //footer - select box
    $('footer ul.site-list').hide();

    $(document).on("click", function (e) {
        if ($(e.target).parents("footer form").size() == 0) {
            $('footer ul.site-list').hide();
        };
    });
    $('footer input').on('click', function () {
        $('footer ul.site-list').toggle();
    });
    $('footer ul.site-list').on('click', function () {
        $('footer ul.site-list').hide();
    });
    $('footer ul.site-list a').on('mouseenter', function (evt) {
        evt.preventDefault();
        $(this).parent().addClass('on').siblings().removeClass('on');
    });

    //footer - top scroll btn
    $(window).on('scroll', function () {

        let nowScroll = $(this).scrollTop();

        //top scroll btn 
        if (nowScroll > 100) {
            //top scroll btn show
            $('.topscroll-btn').fadeIn();
        };
        if (nowScroll < 100) {
            //top scroll btn show
            $('.topscroll-btn').fadeOut();
        };

    });

    //  ----------------------------------------end of [footer]

});