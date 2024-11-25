const menus = {
    "한식": [
      { name: "김치찌개", price: 7000, img:"img/korean/kimchi-stew.png"},
      { name: "비빔밥", price: 8000, img:"img/korean/bibimbap.png"},
      { name: "된장찌개", price: 6000 },
      { name: "보쌈", price: 30000,img:"img/korean/bossam.png" },
      { name: "부대찌개", price: 13000 ,img:"img/korean/budae-jjigae.png"},
      { name: "콜팝", price: 5000,img:"img/korean/chicken.png" },
      { name: "콘도그", price: 3000,img:"img/korean/corn-dog.png" },
      { name: "닭곰탕", price: 10000,img:"img/korean/dak-gomtang.png" },
      { name: "고기", price: 25000,img:"img/korean/korean-bbq.png" },
      { name: "낙지볶음", price: 20000,img:"img/korean/nakji-bokkeum.png" },
      { name: "라면", price: 6000 ,img:"img/korean/ramyeon.png"},
      { name: "떡볶이", price: 6000,img:"img/korean/tteokbokki.png" },
      { name: "파전", price: 15000,img:"img/korean/pajeon.png" },
      { name: "치킨", price: 25000 ,img:"img/korean/fried-chicken.png"}
    ],
    "중식": [
      { name: "짜장면", price: 8000 },
      { name: "짬뽕", price: 9000,img:"img/chinese/noodles.png" },
      { name: "탕수육", price: 15000 },
      { name: "딤섬", price: 7000,img:"img/chinese/dim-sum.png" },
      { name: "북경오리", price: 50000,img:"img/chinese/duck.png" },
    ],
    "양식": [
      { name: "파스타", price: 13000 ,img:"img/western/spaghetti.png"},
      { name: "스테이크", price: 20000,img:"img/western/steaks.png" },
      { name: "피자", price: 15000,img:"img/western/pizza.png" },
      { name: "햄버거", price: 15000,img:"img/western/fast-food.png" }
    ],
    "일식": [
      { name: "초밥", price: 15000},
      { name: "라멘", price: 9000 ,img:"img/japanese/ramen.png"},
      { name: "돈까스", price: 8000,img:"img/japanese/chicken-katsu.png" }
    ]
  };
  
  function recommendMenu() {
    const category = document.getElementById("category").value;
    const budget = parseInt(document.getElementById("budget").value);
    const availableMenus = menus[category].filter(menu => menu.price <= budget);
  
    if (availableMenus.length > 0) {
      const randomMenu = availableMenus[Math.floor(Math.random() * availableMenus.length)];
      document.getElementById("result").textContent = `추천 메뉴: ${randomMenu.name} - ${randomMenu.price}원`;

      const imageElement = document.getElementById("menuImage");
    imageElement.src = randomMenu.img;
    imageElement.alt = randomMenu.name;
    imageElement.style.display = "block";
    } else {
      document.getElementById("result").textContent = "해당 조건에 맞는 메뉴가 없습니다.";
      document.getElementById("menuImage").style.display = "none";
    }
  }  

  // 위치 관련 전역 변수
let userLatitude;
let userLongitude;

// 현재 위치 가져오기
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
        
        // 카카오맵 API로 주소 변환 (Reverse Geocoding)
        getAddressFromCoords(userLatitude, userLongitude);
        
        // 주변 음식점 검색
        searchNearbyRestaurants();
        
        // 지도 표시
        showMap();
      },
      error => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("위치 정보 접근 권한이 필요합니다.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("위치 정보를 가져올 수 없습니다.");
            break;
          case error.TIMEOUT:
            alert("요청 시간이 초과되었습니다.");
            break;
        }
      }
    );
  } else {
    alert("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
  }
}

// 카카오맵 API 사용 예시
function getAddressFromCoords(lat, lng) {
  // 카카오맵 API 키가 필요합니다
  const geocoder = new kakao.maps.services.Geocoder();
  
  const coord = new kakao.maps.LatLng(lat, lng);
  geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const address = result[0].address.address_name;
      document.getElementById('location').value = address;
    }
  });
}

// 주변 음식점 검색
function searchNearbyRestaurants() {
  const category = document.getElementById('category').value;
  const budget = document.getElementById('budget').value;
  
  // 카카오맵 API로 주변 음식점 검색
  const places = new kakao.maps.services.Places();
  
  places.keywordSearch(`${category} 음식점`, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      // 검색 결과 필터링 (거리, 가격대 등)
      const filteredResults = filterRestaurants(result, budget);
      displayRestaurants(filteredResults);
    }
  }, {
    location: new kakao.maps.LatLng(userLatitude, userLongitude),
    radius: 2000 // 2km 반경 내 검색
  });
}

// 지도 표시
function showMap() {
  const mapContainer = document.getElementById('map');
  mapContainer.style.display = 'block';
  
  const options = {
    center: new kakao.maps.LatLng(userLatitude, userLongitude),
    level: 3
  };
  
  const map = new kakao.maps.Map(mapContainer, options);
  
  // 현재 위치 마커 표시
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(userLatitude, userLongitude)
  });
  marker.setMap(map);
}

// CSV 데이터를 저장할 배열
let restaurants = [];

// CSV 파일 로드 및 파싱
async function loadRestaurants() {
  try {
    const response = await fetch('data/restaurants.csv');
    const csvText = await response.text();
    restaurants = parseCSV(csvText);
  } catch (error) {
    console.error('데이터 로드 실패:', error);
  }
}

// CSV 파싱 함수
function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = line.split(',');
    return {
      id: values[0],
      name: values[2],
      address1: values[3],
      address2: values[4],
      areaCode: values[5],
      category: values[7],
      mapX: parseFloat(values[11]),  // 경도
      mapY: parseFloat(values[12]),  // 위도
      tel: values[23]
    };
  });
}

// 현재 위치 근처의 음식점 찾기
function findNearbyRestaurants(userLat, userLng, radius = 3) {
  return restaurants.filter(restaurant => {
    const distance = calculateDistance(
      userLat,
      userLng,
      restaurant.mapY,
      restaurant.mapX
    );
    return distance <= radius; // 3km 이내
  });
}

// 음식점 추천 함수
function recommendRestaurant() {
  if (!userLatitude || !userLongitude) {
    alert('현재 위치를 가져오는 중입니다. 잠시만 기다려주세요.');
    return;
  }

  const category = document.getElementById('category').value;
  
  // 현재 위치 근처의 음식점 찾기
  let nearbyRestaurants = findNearbyRestaurants(userLatitude, userLongitude);
  
  // 카테고리 필터링
  if (category !== '전체') {
    nearbyRestaurants = nearbyRestaurants.filter(r => r.category.includes(category));
  }

  // 거리순 정렬
  nearbyRestaurants.sort((a, b) => {
    const distanceA = calculateDistance(userLatitude, userLongitude, a.mapY, a.mapX);
    const distanceB = calculateDistance(userLatitude, userLongitude, b.mapY, b.mapX);
    return distanceA - distanceB;
  });

  // 상위 5개 중에서 랜덤 선택
  if (nearbyRestaurants.length > 0) {
    const randomIndex = Math.floor(Math.random() * Math.min(5, nearbyRestaurants.length));
    const selected = nearbyRestaurants[randomIndex];
    
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      selected.mapY,
      selected.mapX
    ).toFixed(1);

    // 결과 표시
    document.getElementById('result').innerHTML = `
      <h3>추천 맛집</h3>
      <p>🏪 ${selected.name}</p>
      <p>📍 ${selected.address1} ${selected.address2 || ''}</p>
      <p>🚶‍♂️ 현재 위치에서 ${distance}km</p>
      <p>📞 ${selected.tel || '전화번호 없음'}</p>
    `;

    // 카카오맵에 표시
showMapWithMarker(selected);
} else {
document.getElementById('result').textContent =
'주변에 조건에 맞는 음식점이 없습니다.';
}
}
// 지도에 마커 표시
function showMapWithMarker(restaurant) {
const mapContainer = document.getElementById('map');
const options = {
center: new kakao.maps.LatLng(restaurant.mapY, restaurant.mapX),
level: 3
};
const map = new kakao.maps.Map(mapContainer, options);
// 마커 생성
const marker = new kakao.maps.Marker({
position: new kakao.maps.LatLng(restaurant.mapY, restaurant.mapX)
});
marker.setMap(map);
// 인포윈도우 생성
const infowindow = new kakao.maps.InfoWindow({
content: <div style="padding:5px;">${restaurant.name}</div>
});
infowindow.open(map, marker);
}
// 페이지 로드 시 실행
window.onload = async function() {
await loadRestaurants();
getCurrentLocation();
};
