import API from './API';
import MessengerController from './MessengerController';
import MessagesRender from './MessagesRender';

const api = new API();
const renderer = new MessagesRender();
const msController = new MessengerController(api, renderer);
msController.init();
