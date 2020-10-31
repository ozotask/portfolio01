$(function () {

    //  =================== 변수, 상수 선언
    const $pagination = $('.slides-cont__pagination>li>a');
    const $slides = $('.slides-cont__slides');
    let nowIdx = 0;
    let intervalID = null;
    const $gnbMnu = $('header > nav > .gnb > li');


    //  =================== 기본값
    $pagination.eq(0).parent().addClass('on').siblings().removeClass('on');
    $('.slides-cont__play-btn a').hide();


    //  =================== start of function 선언

    //  function - [slide move]
    const slideFn = function () {
        $slides.stop().animate({
            left: (-100 * nowIdx) + "%"
        });
        $pagination.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    };

    //  function - [slide play]
    const autoplayFn = function () {
        clearInterval(intervalID);
        intervalID = setInterval(function () {
            if (nowIdx < 2) {
                nowIdx++;
            } else {
                nowIdx = 0;
            };
            slideFn();
        }, 4000);
    };
    autoplayFn();

    //  function - [arr play]
    let arrFn = function () {
        $('.arr').animate({
            right: 20 + "px"
        }, 500).animate({
            right: 15 + "px"
        });
    };
    setInterval(arrFn, 100);
    //  =================== end of function 선언



    //  =================== start of [header - nav]
    //  nav - mouse enter 동작
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

    //  nav - mouse leave 동작
    $gnbMnu.on('mouseleave', function () {
        //bg
        $('header>nav>.gnb>li>.lnb,header>.lnb-bg').stop().slideUp();
        $('header>.lnb-bg2').stop().fadeOut();
        $('header').removeClass('gnb-on');

        //logo
        $('header > nav > h1.logo > a').css({
            backgroundImage: 'url(./images/top_logo1.png)'
        })

        //mnu text color
        $gnbMnu.children('a').css({
            color: "#fff"
        });
    });

    $(window).on('scroll', function () {

        let nowScroll = $(this).scrollTop();
        
        //nav bgc
        if (nowScroll > 10) {
            //bg
            $('header').addClass('gnb-on');
            //logo
            $('header > nav > h1.logo > a').css({
                backgroundImage: 'url(./images/top_logo2.png)'
            })
            //mnu color
            $gnbMnu.children('a').css({
                color: "#333"
            });
            //top scroll btn show
            $('.topscroll-btn').fadeIn();

        };

        if (nowScroll < 10) {
            //bg
            $('header').removeClass('gnb-on');
            //logo
            $('header > nav > h1.logo > a').css({
                backgroundImage: 'url(./images/top_logo1.png)'
            })
            //mnu color
            $gnbMnu.children('a').css({
                color: "#fff"
            });
            //top scroll btn hide
            $('.topscroll-btn').fadeOut();

        };

    })
    //  =================== end of [header - nav]



    //  =================== start of [section - slide]

    //  slide - pagination click event
    $pagination.on('click', function (evt) {
        evt.preventDefault();

        nowIdx = $pagination.index(this);
        slideFn();
    });

    // slide - prev, next event
    $('.slides-cont__prev-btn a').on('click', function (evt) {
        evt.preventDefault();
        if (nowIdx > 0) {
            nowIdx--;
        } else {
            nowIdx = 2;
        };
        slideFn();
    });

    $('.slides-cont__next-btn a').on('click', function (evt) {
        evt.preventDefault();
        if (nowIdx < 2) {
            nowIdx++;
        } else {
            nowIdx = 0;
        };
        slideFn();
    });

    // slide - stop event
    $('.slides-cont__stop-btn a').on('click', function (evt) {
        evt.preventDefault();
        autoplayFn();
        $(this).hide();
        $(('.slides-cont__play-btn a')).show();
        clearInterval(intervalID);
    });
    // slide - play event
    $('.slides-cont__play-btn a').on('click', function (evt) {
        evt.preventDefault();
        $(this).hide();
        $(('.slides-cont__stop-btn a')).show();
        autoplayFn();
    });
    //  =================== end of [section - slide]



    //  =================== start of [section - article]
    //section - 공통 버튼 hover event
    const $arrBtn = $('.arr-btn a');
    $('.arr-hover').hide()
    $arrBtn.on('mouseenter', function (evt) {
        evt.preventDefault();
        $(this).siblings('.arr-hover').show()
    });
    $arrBtn.on('mouseleave', function (evt) {
        evt.preventDefault();
        $(this).siblings('.arr-hover').hide()
    });

    //section - article(3)- 슬라이드 반복 event
    const $artiSlides = $('.move-container>ul');
    let interval = null;

    let artislideFn = function () {
        $artiSlides.stop().animate({
            left: "-820px"
        }, 9000).animate({
            left: "0px"
        }, 9000);
    };
    artislideFn();

    clearInterval(interval);
    interval = setInterval(function () {
        artislideFn();
    }, 9000)


    //section - article(5)- 토글 event
    $('.contact').hide()

    $('.more-btn').on('click', function (evt) {
        evt.preventDefault();
        $('.contact').slideToggle()
        $('.cont-container-line').toggle()

        $(this).toggleClass('on')
    })

    //section - 스크롤 event
    $(window).on('scroll', function () {

        let nowScroll = $(this).scrollTop();


        //article-(1)
        if (nowScroll > 300) {
            $('article:nth-of-type(1) > .cont-container > .text-container > h2').css({
                animationName: "textcontainer"
            })
            $('article:nth-of-type(1) > .cont-container > .text-container > p').css({
                animationName: "textcontainer"
            })
            $('article:nth-of-type(1) > .cont-container > .text-container > .arr-btn').css({
                animationName: "arrbtn"
            })
            $('.imgfrm__line').css({
                animationName: "imgfrmline"
            })
            $('.imgfrm__call').css({
                animationName: "imgfrmcall"
            })
            $('.imgfrm__put').css({
                animationName: "imgfrmput"
            })
            $('.imgfrm__coin1-1,.imgfrm__coin1-2,.imgfrm__coin2-1,.imgfrm__coin2-2').css({
                animationName: "imgfrmcoin"
            })
        }

        //top scroll btn 
        if (nowScroll > 660) {
            //top scroll btn show
            $('.topscroll-btn').fadeIn();
        };

        //article-(2)
        if (nowScroll > 850) {
            $('article:nth-of-type(2) h2').css({
                animationName: "textcontainer"
            });
            $('article:nth-of-type(2) p').css({
                animationName: "textcontainer"
            });
            $('article:nth-of-type(2) .arr-btn').css({
                animationName: "arrbtn"
            });
            $('.arti-2__imgfrm').css({
                animationName: "rotateani"
            });
            $('.arti-2 .imgfrm__text1').css({
                animationName: "text1"
            });
            $('.arti-2 .imgfrm__text2').css({
                animationName: "text2"
            });
            $('.arti-2 .imgfrm__dot1').css({
                animationName: "dot"
            });
            $('.arti-2 .imgfrm__dot2').css({
                animationName: "dot"
            });
            $('.arti-2 .imgfrm__line1-1').css({
                animationName: "imgfrmline1-1"
            });
            $('.arti-2 .imgfrm__line1-2').css({
                animationName: "imgfrmline1-2"
            });
            $('.arti-2 .imgfrm__line2-1').css({
                animationName: "imgfrmline2-1"
            });
            $('.arti-2 .imgfrm__line2-2').css({
                animationName: "imgfrmline2-2"
            });
        };
        //article-(3)
        if (nowScroll > 1600) {
            $('article:nth-of-type(3) h2').css({
                animationName: "textcontainer"
            })
            $('article:nth-of-type(3) p').css({
                animationName: "textcontainer"
            })
            $('article:nth-of-type(3) .arr-btn').css({
                animationName: "arrbtn"
            })
        };
        //article-(4)
        if (nowScroll > 2500) {
            $('article:nth-of-type(4) h2').css({
                animationName: "textcontainer"
            })
            $('article:nth-of-type(4) p').css({
                animationName: "textcontainer"
            })
            $('article:nth-of-type(4) .award1, .award2, .award3').css({
                animationName: "rotateani"
            })
        };
    });

    //  =================== end of [section - article]



    //  =================== start of [footer]
    // footer - top scroll fixed btn event
    $('.topscroll-btn').hide();

    $('.topscroll-btn').on('click', function (evt) {
        evt.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 600);
    });

    //footer - 셀렉트 박스
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
    //  =================== end of [footer]

});