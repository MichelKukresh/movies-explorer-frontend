# Проект: Поиск фильмов

### Многостраничный сайт, с поиском фильмов. Есть элементы анимации, есть возможность добавления фильмов из поиска.

##### Создана файловая структура по БЭМ (Nested). Фреймворк React.js. Используются контейнеры flex, grid адаптирован под различные зазрешения и браузеры.

###### ссылка на deploy фронтенда [GitHub]( https://michelkukresh.github.io/movies-explorer-frontend/)

###### ссылка на [сайт](https://kukreshma.moviesexplorer.nomorepartiesxyz.ru)

###### ссылка на макет [Figma](https://www.figma.com/file/Ty5BCeoGGS7WWawFwQL6rz/Diploma-(Copy)?node-id=891%3A3857)

###### ссылка на [пул реквест](https://github.com/MichelKukresh/movies-explorer-frontend/pull/3) 

## планируется: 
- [ ] приведение функционала к заданию
- - [x] реализовать работу прелодера 
- - [x] реализовать кнопку еще на странице главного поиска
- - [x] доработать карточку фильма ( съезжает название, преобразовать в формат чч мин)
- - [x] реализовать функционал отбора короткометражек
- - [x] убрать кнопку еще на странице сохраненных карточек
- - [x] удаление сохранения из роута /movies
- - [x] добавить валидацию входа
- - [x] добавить валидацию редактирования профиля
- - [x] реализовать поиск на странице сохраненных фильмов
- - - [x] реализовать фильтр при короткометражках
- - - [x] реализовать возможность удаления найденных после поиска (пока ошибка)
- - [x] реализовать функционал бурген меню (проверить все по чек листу, на всех разрешениях)
- - [x] кнопка аккуант (проверить все по чек листу, на всех разрешениях)
- - [x] реализовать страницу 404

- - [x] реализовать сохранение фильмов в локал сторидже
- - [x] если что то есть в форме то должна быть активна кнопка поиска (возникла проблема после подключения локал сторедж)
- - [x] добавить валидацию email на фронте к стандартной добавить .ru
- - [x] реализовать заполнение формы существующими данными для редактирования профиля
- - [x] добавить валидацию для окончания .ru
- - [x] добавить подтверждение сохранения при редактировании профиля
- - [x] сделать переход из меню в режим редактирования профиля
- - [x] починить запрет сохранения профиля если данные не изменялись
- - [x] добавить ссылки на трейлер карточкам фильмов
- - [x] на странице сохраненных фильмов заменить картинку на удаление
- - [x] реализовать возможность ручного вводв URL залогиненного пользователя
- - [x] устранить ошибку заполения формы поиска во всех роутах
- - [x] убрать лишние запросы к сервису фильмов (только при первом поиске)

- - [ ] починить запрет сохранения профиля если данные не изменялись, не срабатывает если не уходил со страницы

## улучшения:
- [ ] убрать лишние рендеры при сохранении и удалении фильмов (сейчас все полностью грузится)
- [ ] убрать удаление из сохраненных на странице фильмы
- [ ] проверить все страницы ПиксельПервект
- [ ] убрать комментрарии, лишний код
- [ ] убрать второй тег если нет описания в нутри него
- [ ] исправить отображение ссылки .slice(28, ), так как при http картинки подгружаться не будут
- [ ] убрать лишние модификаторы в heder с помощью: background-color: inherit;
- [ ] обработать ошибку при сохранении карточки Озборна (отсутсттвует одно из полей в базе данных сервиса фильмов)
- [ ] реализовать зарытие блока меню по нажатию на пространство вне поля
- [ ] реализовать повторное нажатие по меню, на данный момент либо выбрать другое либо закрыть
 
