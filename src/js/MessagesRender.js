// const searchlink = /(http[s]?:\/\/)[-\w.\/%а-яА-Я:]+/g;

export default class MessagesRender {
  constructor() {
    this.container = document.querySelector('.messenger_field');
  }

  addMsg(obj, targetPlace) {
    const searchlink = /(http[s]?:\/\/)[-\w.\/%а-яА-Я:]+/g;
    let messageText = obj.msg;
    let matchedLinks = [...messageText.matchAll(searchlink)];

    for (let i = 0; i < matchedLinks.length; i += 1) {
      // console.log(i);
      // console.log(matchedLinks.length);
      messageText = messageText.replace(matchedLinks[i][0], `
      <a href="${matchedLinks[i][0]}">${matchedLinks[i][0]}</a>
    `);
    }

    const newMsg = document.createElement('div');
    newMsg.classList.add('message');
    // newMsg.textContent = messageText;
    newMsg.innerHTML = `${messageText}`;
    newMsg.dataset.id = obj.id;
    if (targetPlace === 'append') {
      this.container.append(newMsg);  
    } else {
      this.container.prepend(newMsg);
    }

  }

  addFileMsg(obj, targetPlace) {
    const newMsg = document.createElement('div');    
    if (obj.type === 'image') {
      newMsg.innerHTML = `
            <img class="image_preview" src="${obj.msg}">
            <span class="image_name">${obj.name}</span>
            <a class="link_download background_image" href="${obj.msg}" download="${obj.name}"></a>
          `;
      newMsg.classList.add('image_message_item');
    } else if (obj.type === 'audio') {
      newMsg.innerHTML = `
            <img class="file_preview" src="../img/audio.png">
            <span class="image_name">${obj.name}</span>
            <a class="link_download background_image" href="${obj.msg}" download="${obj.name}"></a>
          `;
      newMsg.classList.add('file_message_item');
    } else if (obj.type === 'video') {
      newMsg.innerHTML = `
            <img class="file_preview" src="../img/video.png">
            <span class="image_name">${obj.name}</span>
            <a class="link_download background_image" href="${obj.msg}" download="${obj.name}"></a>
          `;
      newMsg.classList.add('file_message_item');
    } else {
      newMsg.innerHTML = `
            <img class="file_preview" src="../img/file.png">
            <span class="image_name">${obj.name}</span>
            <a class="link_download background_image" href="${obj.msg}" download="${obj.name}"></a>
          `;
      newMsg.classList.add('file_message_item');
    }
    newMsg.dataset.id = obj.id;
    if (targetPlace === 'append') {
      this.container.append(newMsg);  
    } else {
      this.container.prepend(newMsg);
    }
  }
}
