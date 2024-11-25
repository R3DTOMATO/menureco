const dessertData = {
  케이크: {
    달콤: ['초코케이크', '치즈케이크', '바닐라케이크', '레드벨벳'],
    과일: ['딸기케이크', '망고케이크', '블루베리케이크', '오렌지케이크'],
    초코: ['초코케이크', '브라우니', '초코무스', '가나슈케이크'],
    커피: ['티라미수', '카페모카케이크', '에스프레소케이크', '카푸치노케이크']
  },
  커피: {
    달콤: ['카라멜마키아또', '바닐라라떼', '카페모카', '화이트모카'],
    과일: ['딸기라떼', '망고스무디', '레몬에이드', '자몽에이드'],
    초코: ['초콜릿라떼', '초코프라페', '아이스초코', '핫초코'],
    커피: ['아메리카노', '에스프레소', '콜드브루', '카페라떼']
  },
  // 다른 디저트 종류들도 추가...
};

// 랜덤 디저트 선택 함수
function getRandomDessert(type, preference) {
  try {
    const options = dessertData[type][preference];
    if (!options || options.length === 0) {
      return '준비된 메뉴가 없습니다';
    }
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  } catch (error) {
    console.error('메뉴 선택 중 오류 발생:', error);
    return '메뉴를 찾을 수 없습니다';
  }
}

// 카페 정보 표시 함수
function showCafeInfo() {
  const cafeInfo = document.getElementById('cafeInfo');
  const cafeName = document.getElementById('cafeName');
  const cafeAddress = document.getElementById('cafeAddress');
  const cafeRating = document.getElementById('cafeRating');

  // 임시 카페 데이터 (실제로는 API나 데이터베이스에서 가져올 수 있습니다)
  const cafeData = [
    {
      name: '달달한 카페',
      address: '서울시 강남구 역삼동 123-45',
      rating: 4.5
    },
    {
      name: '디저트 천국',
      address: '서울시 마포구 연남동 456-78',
      rating: 4.8
    },
    {
      name: '카페 드림',
      address: '서울시 종로구 삼청동 901-23',
      rating: 4.3
    }
  ];

  // 랜덤으로 카페 선택
  const randomCafe = cafeData[Math.floor(Math.random() * cafeData.length)];

  // 카페 정보 업데이트
  cafeName.textContent = `카페명: ${randomCafe.name}`;
  cafeAddress.textContent = `주소: ${randomCafe.address}`;
  cafeRating.textContent = `평점: ⭐️ ${randomCafe.rating}`;

  // 카페 정보 표시
  cafeInfo.style.display = 'block';
}
  
  function recommendDessert() {
    const dessertType = document.getElementById('dessertType').value;
    const preference = document.getElementById('preference').value;
    const budget = document.getElementById('dessertBudget').value;
    
    // 로딩 표시 시작
    const button = document.querySelector('.recommend-btn');
    const spinner = button.querySelector('.loading-spinner');
    const buttonText = button.querySelector('.button-text');
    
    buttonText.style.display = 'none';
    spinner.style.display = 'block';
  
    // API 호출이나 로직 처리를 시뮬레이션
    setTimeout(() => {
      // 여기에 실제 추천 로직 구현
      const result = `오늘은 ${getRandomDessert(dessertType, preference)}는 어떠세요?`;
      
      document.getElementById('dessertResult').textContent = result;
      showCafeInfo(); // 카페 정보 표시
      
      // 로딩 표시 종료
      buttonText.style.display = 'block';
      spinner.style.display = 'none';
    }, 1000);
  }
  
  function showCafeInfo() {
    const cafeInfo = document.getElementById('cafeInfo');
    cafeInfo.style.display = 'block';
    // 카페 정보 업데이트 로직
  }