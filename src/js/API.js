export default class API {
  constructor() {
    // this.server = 'http://localhost:7070';
    this.server = 'https://ahj-diploma-serv.herokuapp.com';
  }

  addMsg(text) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('text', text);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.server}/msgArr`);
      xhr.addEventListener('load', () => {
        if (xhr.status === 204) {
          return resolve(xhr.responseText);
        }
        // console.log(xhr.status);
        return reject(xhr.responseText);
      });
      xhr.send(params);
    });
  }

  // getMsg() {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('GET', `${this.server}/msgArr`);
  //     xhr.addEventListener('load', () => {
  //       if (xhr.status === 200) {
  //         const messages = JSON.parse(xhr.responseText);
  //         return resolve(messages);
  //       }
  //       return reject(xhr.responseText);
  //     });
  //     xhr.send();
  //   });
  // }

  getMsg(counter) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.server}/msgArr/${counter}`);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const messages = JSON.parse(xhr.responseText);
          return resolve(messages);
        }
        return reject(xhr.responseText);
      });
      console.log(xhr);
      xhr.send();
    });
  }

  async uploadToServer(images) {
    for (const image of images) {
      const formData = new FormData();
      formData.append('file', image);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.server}/msgFiles`);

      // xhr.addEventListener('load', async () => {
      //   if (xhr.status === 200) {
      //     const imageList = await this.loadFromServer();
      //     while (this.imgContainer.firstChild) {
      //       this.imgContainer.removeChild(this.imgContainer.firstChild);
      //     }
      //     const urlsForImg = JSON.parse(imageList);
      //     for (const item of urlsForImg) {
      //       this.drawPreview(item);
      //     }
      //   }
      // });
      xhr.send(formData);
    }
  }

  async loadFromServer() {
    const request = new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.server);
      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        }
      });
      xhr.send();
    });
    const result = await request;
    return result;
  }


  // redactTicket(id, name, description) {
  //   return new Promise((resolve, reject) => {
  //     const params = new URLSearchParams();
  //     params.append('id', id);
  //     params.append('name', name);
  //     params.append('description', description);

  //     const xhr = new XMLHttpRequest();
  //     xhr.open('PUT', `${this.server}/ticketList`);
  //     xhr.addEventListener('load', () => {
  //       if (xhr.status === 200) {
  //         return resolve(xhr.responseText);
  //       }
  //       return reject(xhr.responseText);
  //     });
  //     xhr.send(params);
  //   });
  // }

  // getDescription(id) {
  //   return new Promise((resolve, reject) => {
  //     const params = new URLSearchParams();
  //     params.append('id', id);
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('GET', `${this.server}/ticketList?${params}`);
  //     xhr.addEventListener('load', () => {
  //       if (xhr.status === 200) {
  //         const description = xhr.responseText;
  //         return resolve(description);
  //       }
  //       return reject(xhr.responseText);
  //     });
  //     xhr.send();
  //   });
  // }

  // deleteTicket(id) {
  //   return new Promise((resolve, reject) => {
  //     const params = new URLSearchParams();
  //     params.append('id', id);
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('DELETE', `${this.server}/ticketList?${params}`);
  //     xhr.addEventListener('load', () => {
  //       if (xhr.status === 200) {
  //         const ticketList = xhr.responseText;
  //         return resolve(ticketList);
  //       }
  //       return reject(xhr.responseText);
  //     });
  //     xhr.send();
  //   });
  // }

  // changeStatus(id, status) {
  //   return new Promise((resolve, reject) => {
  //     const params = new URLSearchParams();
  //     params.append('id', id);
  //     params.append('status', status);

  //     const xhr = new XMLHttpRequest();
  //     xhr.open('PATCH', `${this.server}/ticketList?${params}`);
  //     xhr.addEventListener('load', () => {
  //       if (xhr.status === 200) {
  //         const ticketList = xhr.responseText;
  //         return resolve(ticketList);
  //       }
  //       return reject(xhr.responseText);
  //     });
  //     xhr.send();
  //   });
  // }
}
