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