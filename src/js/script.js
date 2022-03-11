    // 1) Карусель. Настройка Slick-слайдер на базе JQuery:
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
    
    // 2) Табы. Далее настроим интерактивные табы и контент:
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {                                                    /* jquery берет ul-список с классом, и когда будем клик на li-элемент (что внутри) у которого НЕТ класса активности, то: */
        $(this)                                                                                                                       /* this - ссылается на нажатый элемент */
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')                                            /* то нажатому табу будет ДОБАВЛЯТЬСЯ класс активности, а у соседних табов - удаляться класс активности, если он присутствует у них */
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');  /* в родительском блоке, содержащем tabs (.container) - находим блок с классом "контент" (catalog__content), далее у найденых блоков удаляем если есть класс активности, а добавляем его лишь выбранному элементу */
    });
    
    // 3) Карточка. Далее напишем код, который будет переключать слайды внутри карточки при клике на ПОДРОБНЕЕ и возвращаться в исх. сост. при клике на НАЗАД:
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
    
    // 4) Модальные окна. Выполним настройку модальных окон, которые мы создали:
    $('[data-modal=consultation]').on('click', function() {                                                              /* получаем элементы по опред. дата-атрибуту (две наши кнопки), пользователь будет кликать на любой из этих элементов - выполнится функция: */
        $('.overlay, #consultation').fadeIn('slow');                                                                     /* задний фон (селектор-класс) И модальное окно "заказать консультацию" (селектор-id) становятся видимыми - fadeIn; медленная скорость отображения - 'slow' */
    });
    $('.modal__close').on('click', function() {                                                                          /* возьмем наш "крестик", пользователь будет кликать на него - выполнится функция: */
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');                                                   /* задний фон И все модальные окна становятся невидимыми - fadeOut (крестик будет закрывать окна и затемнение фона); медленная скорость отображения - 'slow' */
    });
    /* ДАЛЕЕ нам нужно, чтобы появлялось модальное окно "купить" при нажатии на кнопку купить в карточке и описание товара в модальном окне соответствовало выбранной нами карточке! для этого пропишем: */
    $('.button_mini').each(function(i) {                                                                                 /* для каждой отдельной кнопки "купить" (each - перебор всех элементов) будет выполняться какая-то отдельная операция (раскрытие функции с аргументом i) */
        $(this).on('click', function() {                                                                                 /* this - та кновка, на которую я нажал, у нее выполнится click. Далее выполнится функция: */       
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());                                   /* внутри нашего модального окна есть класс (описание), я во внутрь него хочу поместить(заменить имеющийся) какой-то text(''), $('') -возьмем этот текст из класса, .eq(i)-по порядку! Т.е. конкретный класс и именно из него будем вытаскивать текст -text() */
            $('.overlay, #order').fadeIn('slow');                                                                        /* задний фон И модальное окно "купить" (селектор-id) становbтся видимым - fadeIn; медленная скорость отображения - 'slow' */
        })
    });
    
    // 5) Валидация форм. Настроим валидацию наших форм (использ. VALIDATE-плагин):
    function valideForms(form) {                                                                                         /* создадим функцию, внутри которой расположим скрипт валидации форм, делая его универсальным. Один раз прописал функцию с аргументом, которая будет раскрывать скрипт - смогу использовать ее много раз, вызывав ее после уже с нужным аргументом  */
        $(form).validate({                                                                                               /* возьмем форму и воспользуемся методом validate, где form - аргумент функции */
            rules: {                                                                                                     /* данная опция позволяет прописывать параметры для формы внутри неё (объект) */
                name: {                                                                                                  /* выбираем конкретный инпут по имени, которое указали в верстке через атрибут name: ".." */
                    required: true,                                                                                      /* required: trur - говорит о том, что данное поле для ввода является обязательным */
                    minlength: 2                                                                                         /* мин. кол-во символов */
                },
                phone: 'required',
                email: { 
                    required: true,
                    email: true
                }
            },
            messages: {                                                                                                  /* данная опция подсвечивает сообщения к конкретным полям для ввода (объект) */
                name: {
                    required: "Введите имя",
                    minlength: jQuery.validator.format("Минимальное количество букв - {0}")                              /* появляется сообщение при несоблюдении мин. кол-ва символов */
                },
                phone: "Введите номер телефона",
                email: {
                    required: "Введите адрес эл. почты",
                    email: "Неправельный адрес эл. почты"
                }
            }
        });
    };                                                                                         
    /* ну а для того, чтобы каждая из форм использовала данный скрипт с методом валидации форм, сделаем вызов функции, где аргумент - нужная нам форма */
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    // 6) Маска поля для ввода.  Настройка маски ввода номера телефона в формах на сайте (использ. MASKEDINPUT-плагин):
    $('input[name=phone]').mask("+7 (999) 999-99-99");                                                                    /* возьмём инпуты с именем phone и применим к ним метод mask с определённым форматом  */

    // 7) Отправка данных. (использ. локальный сервер - Open Server, скрипт PHPMailer) Пропишем код для настройки:
    $('form').submit(function(e) {                                                                                        /* вначале мы обращаемся ко всем формам на сайте, далее событие sunbit - "когда инпуты прошли валидацию" (все обязательные поля корректно заполнены) - выполнится действие (функция с агрументом:) */
        e.preventDefault();                                                                                               /* отключ. станд. поведение браузера (обновление страницы после отправки форм).. Далее используем технологию AJAX - взаимодействие с сервером без перезагрузки страницы */
        if (!$(this).valid()) {                                                                                           /* если форма не прошла валидацию - мы не будем идти дальше в коде (пустые данные из форм на сервер отправляться не будут!) */
            return;
        }
        $.ajax({                                                                                                          /* метод ajax внутри jquery. Позволяет отправлять данные на сервер */
            type: "POST",                                                                                                 /* именно ОТПРАВКА данных на сервер */
            url: "mailer/smart.php",                                                                                      /* указываем, какой обработчик будет обрабатывать данную операцию. URl - куда отправляем запрос */
            data: $(this).serialize()                                                                                     /* данные, для отправки на сервер, this - работаем с конкретными данными из конкретной формы, serialize - метод для подготовки данных перед отправкой на сервер */    
        }).done(function() {                                                                                              /* ппосле выполнения операции (отправки формы) выполним еще действие */
            $(this).find("input").val("");                                                                                /* очистим все инпуты, т.к. у из значения(val) пустая строка: "" */
            $('#consultation, #order').fadeOut();                                                                         /* после отправки формы, модальные окна становятся невидимыми (исчезают) */
            $('.overlay, #thanks').fadeIn('slow');                                                                        /* после отправки формы, модальное окно "Спасибо за заказ" и затемнение заднего фона становятся видимыми (появляются) slow-медленно */
            $('form').trigger('reset');                                                                                   /* в конце все формы на сайте должны обновиться(очиститься) */
        });
        return false;
    });      
    
    // 8) Заскриптуем поведение созданной мною стрелочки-прокрутки.
    /* Для начала пропишем скрипт, который будет делать стрелочку видимой лишь после пролистывания страницы немного вниз: */
    $(window).scroll(function() {                                                                                         /* js возьмет окно браузера и будет следить за скроллом страницы пользователем, выполнится функция: */
        if ($(this).scrollTop() > 1600) {                                                                                 /* если у нашей страницы будет отступ (от верха) при скроллинге свыше 1600px, то */
            $('.pageup').fadeIn();                                                                                        /* наша стрелка становится видимой */
        } else {                                                                                                          /* если нет, то: */
            $('.pageup').fadeOut();                                                                                       /* наша стрелка остается невидимой */
        }
    });
    /* теперь добавим функцию плавной прокрутки нашей стрелочке (скрипт взят из урока, скопирован/вставлен) */
    $("a").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        } 
    });
});

