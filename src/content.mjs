// Original teaching materials. Textbook files and textbook exercises are not included.
export const levels = [
 {id:'seed',name:'기초',english:'STARTER',label:'🌱',description:'그림과 단어 힌트로 차근차근',writing:3},
 {id:'grow',name:'기본',english:'EXPLORER',label:'🌿',description:'문장을 조립하고 직접 표현해요',writing:4},
 {id:'fly',name:'도전',english:'CHALLENGER',label:'🚀',description:'새로운 상황에서도 자신 있게',writing:5}
];
export const vocabulary = [
 {id:'vegetables',en:'eat vegetables',ko:'채소를 먹다',icon:'carrot',example:'I eat vegetables every day.'},
 {id:'water',en:'drink water',ko:'물을 마시다',icon:'water',example:'I drink water every day.'},
 {id:'teeth',en:'brush my teeth',ko:'이를 닦다',icon:'tooth',example:'I brush my teeth twice a day.'},
 {id:'hands',en:'wash my hands',ko:'손을 씻다',icon:'hands',example:'I wash my hands every day.'},
 {id:'exercise',en:'exercise',ko:'운동하다',icon:'run',example:'I exercise three times a week.'},
 {id:'library',en:'go to the library',ko:'도서관에 가다',icon:'book',example:'I go to the library once a week.'}
];
export const frequency = [
 {en:'once a day',ko:'하루에 한 번'},{en:'twice a day',ko:'하루에 두 번'},
 {en:'three times a week',ko:'일주일에 세 번'},{en:'once a week',ko:'일주일에 한 번'},
 {en:'every day',ko:'매일'},{en:'twice a week',ko:'일주일에 두 번'}
];
export const lessons = [
 {id:1,title:'단어 장비 모으기',short:'단어 탐험',en:'WORD EXPEDITION',subtitle:'우리의 하루를 영어로 발견해요',color:'mint',icon:'compass',goal:'생활 습관과 빈도 표현을 연결하고 내 문장 2개를 말할 수 있어요.',standard:['6영02-01','6영02-07'],minutes:[5,10,10,10,5],flow:['도입','습관 어휘','빈도 표현','짝 말하기','마무리'],badge:'WORD SCOUT'},
 {id:2,title:'문장 조립 연구소',short:'문장 조립',en:'SENTENCE LAB',subtitle:'단어를 연결하면 대화가 시작돼요',color:'purple',icon:'blocks',goal:'얼마나 자주 하는지 묻고 답하는 대화를 할 수 있어요.',standard:['6영02-03','6영02-07'],minutes:[5,10,10,10,5],flow:['복습','문장틀','문장 연습','짝 대화','마무리'],badge:'SENTENCE BUILDER'},
 {id:3,title:'습관 탐정 인터뷰',short:'인터뷰 미션',en:'HABIT DETECTIVE',subtitle:'친구의 일상 속 숨은 단서를 찾아요',color:'orange',icon:'search',goal:'세 가지 습관의 빈도를 묻고 답하며 정보를 기록할 수 있어요.',standard:['6영02-07','6영02-10'],minutes:[5,10,15,5,5],flow:['준비','정보 차이','짝 인터뷰','피드백','마무리'],badge:'HABIT DETECTIVE'},
 {id:4,title:'나의 습관 퀘스트 카드',short:'나의 카드',en:'MY QUEST CARD',subtitle:'나만의 이야기를 완성하는 마지막 미션',color:'blue',icon:'flag',goal:'내 습관에 관한 짧은 글을 쓰고 친구에게 소개할 수 있어요.',standard:['6영02-08','6영02-09','6영02-10'],minutes:[5,10,15,5,5],flow:['복습','글쓰기 준비','카드 작성','짝 발표','자기 점검'],badge:'QUEST CREATOR'}
];
export const standards = {
 '6영02-01':'간단한 단어, 어구, 문장을 강세, 리듬, 억양에 맞게 말한다.',
 '6영02-03':'알파벳 대소문자와 문장 부호를 문장에서 바르게 사용한다.',
 '6영02-07':'일상생활 주제에 관한 담화나 글의 세부 정보를 간단한 문장으로 묻거나 답한다.',
 '6영02-08':'예시문을 참고하여 목적에 맞는 간단한 글을 쓴다.',
 '6영02-09':'적절한 매체와 전략을 활용하여 창의적으로 의미를 생성하고 표현한다.',
 '6영02-10':'의사소통 활동에 흥미와 자신감을 가지고 참여하여 협력적으로 수행한다.'
};
const choice = (prompt,options,answer,hint) => ({type:'choice',prompt,options,answer,hint});
const input = (prompt,answer,hint) => ({type:'input',prompt,answer,hint});
const order = (prompt,answer,hint) => ({type:'order',prompt,answer,hint,tokens:answer.split(' ').reverse()});
export function getExercises(lesson,level) {
 const basic = level === 'seed'; const advanced = level === 'fly';
 let rows;
 if (lesson===1) rows = [
  choice('“채소를 먹다”에 알맞은 표현은?', ['drink water','eat vegetables','wash my hands'],'eat vegetables','eat는 먹다, vegetables는 채소예요.'),
  basic?choice('“이를 닦다”를 골라요.', ['brush my teeth','go to the library','exercise'],'brush my teeth','brush + my teeth를 연결해요.'):input('“이를 닦다”를 영어 어구로 써요.','brush my teeth','brush + my + teeth'),
  choice('once a week의 뜻은?', ['하루에 한 번','일주일에 한 번','일주일에 두 번'],'일주일에 한 번','once는 한 번, week는 주예요.'),
  basic?choice('“하루에 두 번”은?', ['twice a day','once a week','every day'],'twice a day','두 번은 twice예요.'):input('“하루에 두 번”을 영어로 써요.','twice a day','twice + a day'),
  order('“나는 일주일에 세 번 운동해요.”를 만들어요.','I exercise three times a week.','I + 활동 + 빈도 순서예요.'),
  advanced?input('“나는 일주일에 두 번 책을 읽어요.”를 써요.','I read books twice a week.','책을 읽다: read books'):choice('“물을 마시다”에 맞는 표현은?', ['drink water','eat water','brush water'],'drink water','마시다는 drink예요.')
 ];
 if (lesson===2) rows = [
  basic?choice('빈도를 물을 때 시작하는 말은?', ['How often','How old','What color'],'How often','얼마나 자주는 How often이에요.'):input('How ____ do you exercise? 빈칸에 들어갈 말을 써요.','often','빈도를 묻는 How often'),
  order('운동 빈도를 묻는 질문을 만들어요.','How often do you exercise?','How often + do you + 활동?'),
  choice('일주일에 두 번 도서관에 가요. 알맞은 응답은?', ['I go to the library twice a week.','I go to the library twice a day.','I go to the library once a week.'],'I go to the library twice a week.','twice a week는 주 2회예요.'),
  basic?choice('I brush ____ teeth. 빈칸에 맞는 말은?', ['my','your','you'],'my','나의 이는 my teeth예요.'):input('How often do you brush your teeth? 질문에 답해요: I brush ____ teeth twice a day.','my','질문의 your가 내 대답에서는 my로 바뀌어요.'),
  order('“나는 매일 채소를 먹어요.”를 만들어요.','I eat vegetables every day.','I + eat vegetables + every day.'),
  advanced?input('친구에게 도서관에 얼마나 자주 가는지 물어요.','How often do you go to the library?','How often do you + go to the library?'):choice('친구를 칭찬하는 표현은?', ['Good for you!','How old are you?','It is blue.'],'Good for you!','잘하고 있구나! 라는 뜻으로 써요.')
 ];
 if (lesson===3) rows = [
  choice('가상 인물 루미: I draw pictures twice a week. 루미가 그림을 그리는 빈도는?', ['하루에 두 번','일주일에 두 번','일주일에 한 번'],'일주일에 두 번','twice a week에 주목해요.'),
  order('친구에게 물 마시는 빈도를 물어요.','How often do you drink water?','How often do you + drink water?'),
  basic?choice('가상 인물 토비: 운동 주 3회. 맞는 응답은?', ['I exercise three times a week.','I exercise once a day.','I exercise twice a week.'],'I exercise three times a week.','세 번은 three times예요.'):input('가상 인물 토비가 “나는 주 3회 운동해요.”라고 답해요.','I exercise three times a week.','I exercise + three times a week.'),
  choice('주 1회 도서관에 간다는 응답 뒤에 할 수 있는 칭찬은?', ['Good for you!','I am eleven.','It is Monday.'],'Good for you!','친구의 말을 듣고 응원해요.'),
  advanced?input('“나는 일주일에 두 번 배드민턴을 해요.”를 써요.','I play badminton twice a week.','배드민턴을 하다: play badminton'):choice('매일 책을 읽는다는 말은?', ['I read books every day.','I read books once a week.','I read books twice a week.'],'I read books every day.','매일은 every day예요.'),
  choice('인터뷰할 때 빈도를 묻는 질문은?', ['How often do you read books?','Do you like blue?','What is your name?'],'How often do you read books?','얼마나 자주 하는지를 물어요.')
 ];
 if (lesson===4) rows = [
  choice('문장 시작과 마침표를 바르게 쓴 것은?', ['i exercise twice a week','I exercise twice a week.','I exercise twice a week,'],'I exercise twice a week.','I는 대문자, 평서문 끝에는 마침표를 써요.'),
  order('도서관에 가는 습관을 한 문장으로 써요.','I go to the library once a week.','활동 뒤에 빈도를 붙여요.'),
  basic?choice('“매일”에 맞는 표현은?', ['every day','once a week','twice a week'],'every day','every는 매~라는 뜻이에요.'):input('“나는 매일 물을 마셔요.”를 써요.','I drink water every day.','I + drink water + every day.'),
  choice('제목 My Habits에 어울리는 문장은?', ['I read books twice a week.','This is a red bag.','My name is Tobi.'],'I read books twice a week.','습관에 관한 글에는 활동과 빈도를 담아요.'),
  advanced?input('“나는 일주일에 네 번 그림을 그려요.”를 써요.','I draw pictures four times a week.','그림을 그리다: draw pictures'):choice('“주 3회”를 나타내는 표현은?', ['three times a week','three time a day','third a week'],'three times a week','three 뒤에는 times를 사용해요.'),
  order('짝에게 운동 빈도를 묻는 질문을 만들어요.','How often do you exercise?','질문 끝에는 물음표를 붙여요.')
 ];
 return rows.map((row,i)=>{
  const exercise={...row,id:'q'+(i+1)};
  if(exercise.type==='order'&&exercise.tokens){
   const tokens=[...exercise.tokens];
   for(let n=tokens.length-1;n>0;n--){const j=Math.floor(Math.random()*(n+1));[tokens[n],tokens[j]]=[tokens[j],tokens[n]];}
   // Avoid accidentally showing a nearly solved sequence when shuffling short sentences.
   if(tokens.join('|')===exercise.answer.split(' ').join('|')) tokens.reverse();
   exercise.tokens=tokens;
  }
  return exercise;
 });
}
export function normalize(value) { return String(value).normalize('NFKC').toLowerCase().trim().replace(/[.!?。！？]+$/g,'').replace(/\s+/g,' '); }
export function isCorrect(value,answer) { return normalize(value)===normalize(answer); }
// Formative checks look for lesson vocabulary and sentence patterns. They guide revision;
// they are not a substitute for a teacher's judgment of meaning or pronunciation.
export function assessExpression(value,lessonId) {
 const text=String(value||'').trim();
 const lower=normalize(text);
 const hasActivity=/\b(eat vegetables|drink water|brush my teeth|brush your teeth|wash my hands|wash your hands|exercise|go to the library|read books|draw pictures|play badminton)\b/.test(lower);
 const hasFrequency=/\b(every day|once a day|twice a day|three times a day|four times a day|once a week|twice a week|three times a week|four times a week)\b/.test(lower);
 const hasQuestion=/\bhow often do you\b/.test(lower);
 const hasEncouragement=/\bgood for you\b/.test(lower);
 const activity='(?:eat vegetables|drink water|brush my teeth|wash my hands|exercise|go to the library|read books|draw pictures|play badminton)';
 const freq='(?:every day|(?:once|twice|(?:three|four|five|six|seven) times) a (?:day|week))';
 const sentences=text.split(/[.!?\n]+/).map(s=>s.trim().replace(/^[QA]:\s*/i,'')).filter(Boolean);
 const hasSentenceStart=sentences.length>0&&sentences.every(s=>new RegExp('^(?:I '+activity+' '+freq+'|How often do you '+activity.replaceAll('my ','your ')+'|Good for you)$','i').test(s));
 const dimensions=[];
 dimensions.push({label:'활동 표현',ok:hasActivity,tip:'eat vegetables, read books처럼 어떤 활동인지 나타내요.'});
 dimensions.push({label:'빈도 표현',ok:hasFrequency||hasQuestion,tip:'every day, twice a week처럼 얼마나 자주인지 나타내요.'});
 dimensions.push({label:'문장·대화 틀',ok:hasSentenceStart&&(lessonId===1||hasQuestion||/\bi\b/.test(lower)||hasEncouragement),tip:'I … / How often do you …? 문장틀로 다시 읽어 보세요.'});
 const score=dimensions.filter(d=>d.ok).length;
 const tips=dimensions.filter(d=>!d.ok).map(d=>d.tip);
 if(text && !/[.!?]$/.test(text)) tips.push('문장 끝에 마침표나 물음표를 붙여 보세요.');
 if(!text) tips.push('응답을 입력하거나 말한 문장을 받아 적어 보세요.');
 return {score,max:3,dimensions,tips,summary:score===3?'핵심 표현이 잘 보여요. 소리 내어 읽고 뜻이 맞는지 확인해요.':score===0?'표현 도움말을 보며 한 문장씩 다시 만들어 봐요.':'좋은 시작이에요. 안내된 표현을 보완해 다시 확인해요.'};
}
export const modelLines = ['I read books every day.','I draw pictures twice a week.','I go to the library once a week.','I exercise three times a week.','I play badminton twice a week.','I drink water every day.'];
export const practicePrompts = {
 1:['내 생활 습관 한 가지를 활동 + 빈도로 써요.','다른 습관도 한 문장으로 쓰고 짝에게 읽어 주세요.'],
 2:['대화 1: How often …? / I …','대화 2: 다른 활동으로 묻고 답해요.','대화 3: 묻고 답한 뒤 칭찬 한마디!'],
 3:['습관 1: 질문과 들은 응답을 기록해요.','습관 2: 활동과 빈도를 모두 확인해요.','습관 3: 질문·응답을 쓰고 응원해요.']
};
export const checks = ['활동과 빈도를 함께 표현했어요.','짝과 묻고 답했어요. (혼자라면 두 역할로 말했어요.)','문장을 다시 읽고 스스로 점검했어요.'];
export const teacherFlow = [
 '단어 그림을 보고 아는 표현을 말합니다. 6개 어구와 6개 빈도 표현을 연결하고, 내가 고른 습관 2개를 짝에게 말합니다. 건강 수치를 평가하지 않습니다.',
 '질문 How often do you …?와 응답 I …를 조립합니다. your teeth → my teeth의 변화를 확인하고 활동을 바꾸어 3회 역할을 교대합니다.',
 '아래 A/B 정보 카드에서 상대 카드의 빈도를 가린 뒤 질문하고 답합니다. 읽어주기만 하지 않고 정보가 비어 있는 칸을 대화로 채웁니다.',
 '개인 또는 가상 인물의 습관을 3/4/5~6문장으로 작성합니다. 짝 발표 후 내용·표현·전달·협력을 점검하고 고쳐 쓴 문장을 남깁니다.'
];
export const roleCards = [
 {name:'A · 루미',items:['read books: every day','draw pictures: twice a week','go to the library: once a week']},
 {name:'B · 토비',items:['exercise: three times a week','play badminton: twice a week','drink water: every day']}
];
export function practiceCount(lesson,level) { return lesson===4 ? (levels.find(x=>x.id===level)?.writing ?? 4) : lesson===1 ? 2 : 3; }
export function pdfName(lesson,level) { return 'habit-quest-lesson-'+lesson+'-'+level+'.pdf'; }
