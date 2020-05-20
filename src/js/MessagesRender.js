export default class MessagesRender {
  constructor() {
    this.container = document.querySelector('.messenger_field');
  }

  addMsg(text, id) {
    const newMsg = document.createElement('div');
    newMsg.classList.add('message');
    newMsg.textContent = text;
    newMsg.dataset.id = id;
    this.container.append(newMsg);
  }

  addFileMsg(link, id) {
    const newMsg = document.createElement('div');
    // const newLink = document.createElement('a');
    newMsg.innerHTML = `
      <a class="link_test" href="${link}" download="image">Ссылка</a>
    `;

    // newLink.href = link;
    // newLink.classList.add('link_test');
    // newLink.download = 'file';
    // newLink.textContent = link;
    // newMsg.append(newLink);
    newMsg.classList.add('message');
    // newMsg.textContent = text;
    newMsg.dataset.id = id;
    this.container.append(newMsg);
  }
}
