class ColaGenerator {
  constructor() {
    this.itemList = document.querySelector('.section1 .cola-list'); // html에서 가져올 재료
  }

  // 시동함수, 실행 하면 나머지 함수가 실행되는것
  async setup() {
    const response = await this.loadData();
    this.colaFactory(response);
  }

  async loadData() {
    try {
      // 콜라의 정보가 담긴 json를 가져오다
      // 동기적이기 때문에 fetch가 다 동작 될때까지 기다리는 async,await를 써준다
      const response = await fetch('./items.json');

      if (response.ok) {
        // 서버의 응답 코드가 200~ 299 일 경우 // ok , 잘 응답이 왔다
        // json -> 자바스크립트 객체로 바꾼다, return으로 밖으로 반환하는 형태가 된다
        return response.json();
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // loadData를 통해 받아온 json 값인 인자
  colaFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      // el -> json 안에 있는 하나하나의 원소들
      const item = document.createElement('li');
      const itemTemplate = `
            <button class="btn-cola" type="button" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
                <img class="cola-img" src="./img/${el.img}" alt="">
                <span class="cola-name">${el.name}</span>
                <strong class="cola-price">${el.cost}원</strong>
            </button>
            `;

      // item은 위의 li 코드가 완성된 것
      item.innerHTML = itemTemplate;
      docFrag.append(item); // 화면에 달아줌
    });
    this.itemList.append(docFrag);
  }
}

export default ColaGenerator; // 밖으로 수출 된다
