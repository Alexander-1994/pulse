$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,    /* скорость переключения слайдов (ms) */    
        adaptiveHeight: true,   /* настройка адаптирует высоту слайдов (если они разной высоты) */   
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="arrow"></button>',  /* при указании пути к картинке мы не делаем выход из папки js (../), т.к. Java-Script работает прямо на странице и путь нужно указывать, как будто мы находимся в html-файле */
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" alt="arrow"></button>',
        responsive: [   /* свойство в js, отвечающее за адабтацию */
            {
                breakpoint: 991,    /* промежуток */
                settings: {         /* установленные "правила" */
                    dots: true,     /* включаем точки (вместо стрелок) */
                    arrows: false   /* отключаем стрелки */
                }
            }
        ]
        /* настройки prewArrow, nextArrow(кнопки переключения слайдов) скопировали из slick/setting. Внутрь кнопок вставили img для стрелок */
    });
});
/* Настройка карусели slick: "Мы загружаем наш слайдер с библиотеки jquery только тогда, когда наш документ полностью готов", где $ - библиотека jquery, document - обращаемся к html-структуре, ready - загрузка кода */