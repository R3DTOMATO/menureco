const questions = [
    {text:"집에 들어갔을때 아무도 없으면?",dimension:"I",options: ["편하다", "외로워"] },
    {text:"취미 생활을 어떻게 즐겨?", dimension:"I",options: ["혼자서", "많은 사람들과 함께"] },
    {text:"약속이 갑자기 취소되었을때 어떻게 행동해?", dimension:"I",options: ["혼자만의 시간이야", "다른 사람들과 만나"] },
    {text:"사과하면 뭐가 생각나?", dimension:"N",options: ["백설공주?, 뉴턴?", "빨갛다, 과일"] },
    {text:"비행기 타기전에 무슨 생각이 나?", dimension:"N",options: ["추락하면 어쩌지?", "기내식은 뭘까?"] },
    {text:"노래에 중요한 것은 뭐야?", dimension:"N",options:["당연히 가사지","아냐 멜로디야"]},
    {text:"나 교통사고 났어?", dimension:"F",options:["괜찮아?","보험은?"]},
    {text:"차에 뭐 놓고왔어 어쩌지?", dimension:"F",options:["같이가자","혼자갈게"]},
    {text:"슬픔을 나누면?", dimension:"F",options:["반이 된다","둘이된다"]},
    {text:"심심한데 나와?", dimension:"J",options:["나 오늘 계획이 있는데","좋지 어디?"]},
    {text:"요리할때?", dimension:"J",options:["음싣은 레시피","음식은 손맛이지"]},
    {text:"문자메시지로 확인하기?", dimension:"J",options:["알람이 하나도 없다","읽지 않은 문자가 많다"]},
    // Add more questions here
  ];
  
  let currentQuestionIndex = 0;
  let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  document.getElementById("start-test").addEventListener("click", startTest);
  
  function startTest() {
    document.getElementById("start-test").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    showQuestion();
  }
  
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = question.text;
    
    // 선택지 컨테이너 초기화
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // 기존 버튼 제거
  
    // 현재 질문의 선택지를 기반으로 버튼 생성
    question.options.forEach((optionText, index) => {
      const button = document.createElement("button");
      button.className = "answer";
      button.textContent = optionText;
      button.addEventListener("click", () => handleAnswer(index));
      optionsContainer.appendChild(button);
    });
  }
  
  function handleAnswer(choiceIndex) {
    const question = questions[currentQuestionIndex];
    const dimension = question.dimension;
    
    // 점수 계산 로직 (예: 각 선택지에 대한 가중치를 미리 정할 수 있음)
    if (choiceIndex === 0) scores[dimension] += 1; // "Strongly Agree" or "Yes"
    else if (choiceIndex === 1) scores[dimension] -= 1; // "Disagree" or "No" // "Strongly Disagree"
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
  
    const type = `${scores.E > scores.I ? "E" : "I"}${scores.S > scores.N ? "S" : "N"}${scores.T > scores.F ? "T" : "F"}${scores.J > scores.P ? "J" : "P"}`;
    document.getElementById("result-type").textContent = type;
    if(type==="ISTJ")
    {
      document.getElementById("result-description").textContent = `${type}는 혼자서 시간을 보내는 것을 선호하고, 가족에게 충성스럽고 헌신적이지만 다른 사람의 감정을 이해하는 데 어려움을 겪을 수 있습니다.`;
      document.getElementById("result-explain").textContent = '다른 사람들의 감정적인 신호를 눈치를 못 합니다. 그러나 한 사람과 가까워지고 요구사항을 논리적으로 이해하게 되면 감정을 알아차리는데 노력을 할 것입니다.';
    }
    else if(type ==="ISFJ")
    {
      document.getElementById("result-description").textContent = `${type}는 용감한 수호자, 실용적인 조력가입니다.`;
      document.getElementById("result-explain").textContent = 'ISFJ는 일반적으로 헌신적이고, 상대방을 돌보는 데에 큰 가치를 두며, 가족과 친구에게 충실한 경향이 있습니다. 또한, 실용적이고 세심한 성격 덕분에 문제 해결에 있어 신뢰할 수 있는 사람으로 여겨집니다.';

    }
    else if(type ==="ISTP")
    {
      document.getElementById("result-description").textContent = `${type}는 만능 재주꾼, 장인입니다.`;
      document.getElementById("result-explain").textContent = 'ISTP는 독립적이고 실용적인 사고를 가진 사람들로, 기술적인 문제를 해결하는 데에 능숙합니다. 이들은 종종 새로운 도전을 즐기며, 손재주가 좋고, 문제를 해결하는 데 있어 창의적인 접근 방식을 취하는 경향이 있습니다.';
    }
    else if(type ==="ISFP")
    {
      document.getElementById("result-description").textContent = `${type}는 호기심 많은 예술가, 성인군자형입니다.`;
      document.getElementById("result-explain").textContent = 'ISFP는 창의적이고 예술적인 경향을 가지고 있어, 음악, 미술 등 다양한 예술 분야에서 두각을 나타낼 수 있습니다. 이들은 자신의 가치에 따라 행동하며, 종종 새로운 경험과 모험을 추구하는 성향을 보입니다. ';

    }
    else if(type ==="INTJ")
    {
      document.getElementById("result-description").textContent = `${type}는 용의주도한 전략가, 과학자형입니다.`;
      document.getElementById("result-explain").textContent = 'INTJ는 전략적 사고와 문제 해결 능력이 뛰어난 사람들로, 복잡한 문제를 분석하고 해결하는 데 능숙합니다. 이들은 독창적인 아이디어를 제시하고, 목표를 달성하기 위해 치밀하게 계획을 세우는 경향이 있습니다.';
    }
    else if(type ==="INFJ")
    {
      document.getElementById("result-description").textContent = `${type}는 통찰력 있는 선지자, 예언가형입니다.`;
      document.getElementById("result-explain").textContent = 'INFJ는 깊은 통찰력과 강한 직관을 가진 사람들로, 종종 사회적 이슈와 인간의 심리에 대해 깊이 고민합니다. 이들은 대개 타인을 돕고자 하는 강한 열망을 가지고 있으며, 자신의 가치와 신념을 실현하기 위해 노력합니다. ';
    }
    else if(type ==="INTP")
    {
      document.getElementById("result-description").textContent = `${type}는 객관적인 분석가, 논리학자입니다.`;
      document.getElementById("result-explain").textContent = 'INTP는 창의적이고 분석적인 사고를 가진 사람들로, 복잡한 문제를 해결하는 데 뛰어난 능력을 발휘합니다. 이들은 이론적이고 추상적인 주제에 대한 관심이 많으며, 새로운 지식을 탐구하는 것을 즐깁니다.';
    }
    else if(type ==="INFP")
    {
      document.getElementById("result-description").textContent = `${type}는 중재자, 잔 다르크형입니다.`;
      document.getElementById("result-explain").textContent = 'INFP는 강한 이상과 가치를 가진 사람들로, 종종 사회적 이슈에 대해 깊이 고민합니다. 이들은 창의적이고 예술적인 경향이 있으며, 문학, 음악, 미술 등 다양한 분야에서 자신의 감정을 표현하는 것을 좋아합니다.';
    }
    else if(type ==="ESTJ")
    {
      document.getElementById("result-description").textContent = `${type}는 엄격한 관리자, 경영자입니다.`;
      document.getElementById("result-explain").textContent = 'ESTJ는 강한 리더십을 발휘하며, 조직과 시스템을 효율적으로 운영하는 데 능숙합니다. 이들은 실용적이고 현실적인 접근을 통해 문제를 해결하며, 자신의 의견을 분명하게 표현하는 경향이 있습니다. ';
    }
    else if(type ==="ESFJ")
    {
      document.getElementById("result-description").textContent = `${type}는 사교적인 외교관, 친선도모형입니다.`;
      document.getElementById("result-explain").textContent = 'ESFJ는 다른 사람들을 돕고자 하는 강한 열망을 가지고 있으며, 종종 공동체와 가족을 위해 헌신합니다. 이들은 친절하고 사려 깊은 태도로, 주변 사람들과의 관계를 돈독히 하는 데 뛰어난 능력을 발휘합니다.';
    }
    else if(type ==="ESTP")
    {
      document.getElementById("result-description").textContent = `${type}는 모험을 즐기는 사업가, 수완 좋은 활동가형입니다.`;
      document.getElementById("result-explain").textContent = 'ESTP는 즉각적인 결과를 중시하며, 새로운 도전과 모험을 즐깁니다. 이들은 실용적이고 행동 지향적이며, 빠른 판단력과 결정력을 가지고 있습니다. ';
    }
    else if(type ==="ESFP")
    {
      document.getElementById("result-description").textContent = `${type}는 자유로운 영혼의 연예인, 슈퍼스타형입니다.`;
      document.getElementById("result-explain").textContent = 'ESFP는 생동감 있고 활기찬 성격을 가지고 있으며, 종종 사람들을 즐겁게 하고, 분위기를 밝게 만드는 데 능숙합니다. 이들은 새로운 경험을 추구하고, 다양한 활동에 참여하는 것을 좋아하며, 즉흥적으로 행동하는 경향이 있습니다.';
    }
    else if(type ==="ENTJ")
    {
      document.getElementById("result-description").textContent = `${type}는 대담한 통솔자, 지휘관입니다.`;
      document.getElementById("result-explain").textContent = 'ENTJ는 강한 리더십을 발휘하며, 목표 지향적이고 실행력이 뛰어난 사람들입니다. 이들은 복잡한 문제를 해결하고, 전략적인 계획을 세우는 데 뛰어난 능력을 가지고 있으며, 팀을 효과적으로 이끌어가는 데 능숙합니다. ';
    }
    else if(type ==="ENFJ")
    {
      document.getElementById("result-description").textContent = `${type}는 선도자, 언변능숙형입니다.`;
      document.getElementById("result-explain").textContent = 'ENFJ는 다른 사람들을 돕고자 하는 강한 열망을 가지고 있으며, 종종 리더십을 발휘하는 경우가 많습니다. 이들은 사람들 간의 연결을 중시하고, 팀워크와 협력을 통해 공동의 목표를 달성하는 데 기여합니다. ';
    }
    else if(type ==="ENTP")
    {
      document.getElementById("result-description").textContent = `${type}는 뜨거운 논쟁을 즐기는 변론가, 발명가형입니다.`;
      document.getElementById("result-explain").textContent = 'ENTP는 창의적이고 혁신적인 아이디어를 제시하며, 문제 해결에 있어서 독특한 접근 방식을 취하는 경향이 있습니다. 이들은 논쟁을 즐기고, 다양한 관점을 탐구하는 데 능숙하며, 기존의 틀을 깨는 것을 좋아합니다.';
    }
    else if(type ==="ENFP")
    {
      document.getElementById("result-description").textContent = `${type}는 재기발랄한 활동가, 스파크형입니다.`;
      document.getElementById("result-explain").textContent = 'ENFP는 강한 열정과 창의성을 가진 사람들로, 새로운 아이디어와 경험을 통해 자신을 표현하는 것을 즐깁니다. 이들은 사람들과의 깊은 정서적 연결을 중요시하며, 타인의 잠재력을 발견하고 지지하는 데 뛰어난 능력을 발휘합니다.';
    }
                      
    
  }
  