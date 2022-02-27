// Настройка Slick-слайдер на базе JQuery:
$(document).ready(function(){ 
    $('.carousel__inner').slick({ 
        adaptiveHeight: true,                                                                                           /* настройка адаптирует высоту слайдов (если они разной высоты) */   
        speed: 1200,                                                                                                    /* скорость переключения слайдов (ms) */    
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="arrow"></button>',          /* при указании пути к картинке мы не делаем выход из папки js (../), т.к. Java-Script работает прямо на странице и путь нужно указывать, как будто мы находимся в html-файле */
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" alt="arrow"></button>',
        responsive: [                                                                                                   /* свойство в js, отвечающее за адабтацию */
            {                                                                                                      
                breakpoint: 991,                                                                                        /* промежуток */
                settings: {                                                                                             /* установленные "правила" */
                    dots: true,                                                                                         /* включаем точки (вместо стрелок) */
                    arrows: false                                                                                       /* отключаем стрелки */
                }
            }
        ]
    });
    // Далее настроим интерактивные табы и контент:
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {                                                    /* jquery берет ul-список с классом, и когда будем клик на li-элемент (что внутри) у которого НЕТ класса активности, то: */
        $(this)                                                                                                                       /* this - ссылается на нажатый элемент */
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')                                            /* то нажатому табу будет ДОБАВЛЯТЬСЯ класс активности, а у соседних табов - удаляться класс активности, если он присутствует у них */
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');  /* в родительском блоке, содержащем tabs (.container) - находим блок с классом "контент" (catalog__content), далее у найденых блоков удаляем если есть класс активности, а добавляем его лишь выбранному элементу */
    });
    // Далее напишем код, который будет переключать слайды внутри карточки при клике на ПОДРОБНЕЕ и возвращаться в исх. сост. при клике на НАЗАД:
    function toggleSlide(item) {
        $(item).each(function(i) {                                                                                      /* $(item)-берем опред. элемент по селектору. При клике на этот элемент будет each - перебор каждого элемента. function(i) - для каждого элемента будет что-то происходить. Раскрываем функцию */
            $(this).on('click', function(e) {                                                                           /* $(this)-ссылаемся на каждый перебираемую ссылку. on('click', function(e)-пользователь будет кликать и полсе этого будет что то проиходть*/
                e.preventDefault();                                                                                     /* отменяем стандартное поведение браузера, чтобы ССЫЛКА не переходила по опред. адресу */
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');                          /* при клике на ССЫЛКУ(ПОДРОБНЕЕ) у элемента будет переключаться класс (добавление класса активности). eq(i)-у КОНКРЕТНОГО элемента, на чью ссылку будут кликать */
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');                                /* при клике на ССЫЛКУ(НАЗАД) у элемента будет переключаться класс (добавление класса активности) */
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
});

