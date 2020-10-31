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
    $('.tab-btn-container-1').find('a').on('click',function(evt){
        evt.preventDefault();
        $(this).parent().addClass('on').siblings().removeClass('on');
    });
    $('.tab-btn-container-2').find('a').on('click',function(evt){
        evt.preventDefault();
        $(this).parent().addClass('on').siblings().removeClass('on');
    });
    
    // now-time
    let now = new Date();
    
    $('.now-time').text(
        now.getFullYear() + "." +
        (now.getMonth()+1) + "." +
        now.getDate() + " " +
        now.getHours() + ":" +
        now.getMinutes()
        )

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

    // 메인 table

    // up / down decoration
    const $tdText4 = $('td:nth-of-type(4)');
    const $tdText5 = $('td:nth-of-type(5)');
    const $tdText6 = $('td:nth-of-type(6)');
    const $tdText7 = $('td:nth-of-type(7)');

    for(let i = 0 ; i < $('tr:nth-of-type(odd)').length ; i++){
        if(Number($('td:nth-of-type(7)').eq(i).text().replaceAll("%","")) > 0){
            $tdText4.eq(i).css({color: "#f00"})
            $tdText5.eq(i).css({color: "#f00"})
            $tdText6.eq(i).css({color: "#f00"})
            $tdText7.eq(i).css({color: "#f00"})
            $('td:nth-of-type(6) span').eq(i).addClass('up')

        }
        if(Number($('td:nth-of-type(7)').eq(i).text().replaceAll("%","")) < 0){
            $tdText4.eq(i).css({color: "rgb(39, 126, 207)"})
            $tdText5.eq(i).css({color: "rgb(39, 126, 207)"})
            $tdText6.eq(i).css({color: "rgb(39, 126, 207)"})
            $tdText7.eq(i).css({color: "rgb(39, 126, 207)"})
            $('td:nth-of-type(6) span').eq(i).addClass('down')

        }
        if(Number($('td:nth-of-type(7)').eq(i).text().replaceAll("%","")) === 0){
            $tdText4.eq(i).css({color: "#444"})
            $tdText5.eq(i).css({color: "#444"})
            $tdText6.eq(i).css({color: "#444"})
            $tdText7.eq(i).css({color: "#444"})
            $('td:nth-of-type(6)>span').eq(i).css({display: "none"})

        }
    }

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