import API from './API';
import MessengerController from './MessengerController';
import MessagesRender from './MessagesRender';
import GetGeolocation from './GetGeolocation';

const api = new API();
const renderer = new MessagesRender();
const popupContainer = document.querySelector('.popup_container');
const geo = new GetGeolocation(popupContainer);
const msController = new MessengerController(api, renderer, geo);
msController.init();
