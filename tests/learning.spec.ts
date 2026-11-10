import { test,expect } from '@playwright/test';
import { getExercises,levels,lessons,practiceCount,modelLines,pdfName,assessExpression } from '../src/content.mjs';

test('scrambled sentence tokens are not presented in answer order',()=>{
 for(const level of levels) for(const lesson of lessons) for(const q of getExercises(lesson.id,level.id)) if(q.type==='order') expect(q.tokens?.join(' ')).not.toBe(q.answer);
});
test('writing and speaking expressions receive formative feedback and export for the teacher',async({page})=>{
 await page.goto('#lesson-1');await page.getByRole('tab',{name:'3 말하고 쓰기'}).click();
 const first=page.locator('.writing-field').first();
 await first.locator('textarea').fill('I read books every day.');
 await first.getByRole('textbox',{name:'말한 문장 응답 1'}).fill('I read books every day.');
 await expect(first.locator('.response-check').nth(0)).toContainText('3/3');
 await expect(first.locator('.response-check').nth(1)).toContainText('3/3');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'교사 피드백 저장'}).click();
 const file=await download;expect(file.suggestedFilename()).toContain('teacher-feedback.csv');
 expect(assessExpression('I read books every day.',1).score).toBe(3);
 expect(assessExpression('',1).tips.length).toBeGreaterThan(0);
});

for(const level of levels) for(const lesson of lessons) test(level.id+' lesson '+lesson.id+' complete and persist',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('#lesson-'+lesson.id);
 await page.getByRole('region',{name:'난이도 선택'}).getByRole('button',{name:new RegExp(level.name)}).click();
 await expect(page.getByRole('heading',{level:1})).toHaveText(lesson.title);
 await page.getByRole('tab',{name:'2 문장 미션'}).click();
 const tasks=getExercises(lesson.id,level.id);
 for(let i=0;i<tasks.length;i++){
  const q=tasks[i]; const card=page.locator('.question').nth(i);
  await expect(card.getByRole('button',{name:'정답 확인'})).toBeDisabled();
  if(q.type==='choice') await card.getByRole('button',{name:q.answer,exact:true}).click();
  else if(q.type==='order') {for(const token of q.answer.split(' ')) await card.locator('.tokens button:enabled').filter({hasText:new RegExp('^'+token.replace(/[.*+?^$()|[\]\\]/g,'\\$&')+'$')}).first().click();}
  else await card.getByRole('textbox').fill(q.answer);
  await card.getByRole('button',{name:'정답 확인'}).click();
  await expect(card.locator('.feedback')).toContainText('잘했어요');
 }
 await expect(page.locator('.score-pill')).toHaveText('6 / 6 정답');
 await page.getByRole('tab',{name:'3 말하고 쓰기'}).click();
 await page.getByRole('button',{name:'퀘스트 완료하고 배지 받기'}).click();
 await expect(page.getByRole('status')).toContainText('표현 활동');
 const count=practiceCount(lesson.id,level.id);
 for(let i=0;i<count;i++) await page.locator('textarea').nth(i).fill(modelLines[i]);
 for(const box of await page.getByRole('checkbox').all())await box.check();
 await page.getByRole('button',{name:'퀘스트 완료하고 배지 받기'}).click();
 await expect(page.getByRole('button',{name:'배지 획득 완료!'})).toBeVisible();
 await page.reload();
 await page.getByRole('tab',{name:'3 말하고 쓰기'}).click();
 await expect(page.locator('textarea').first()).toHaveValue(modelLines[0]);
 await expect(page.getByRole('button',{name:'배지 획득 완료!'})).toBeVisible();
 const link=page.getByRole('link',{name:'이 활동지 PDF'});
 const response=await page.request.get((await link.getAttribute('href'))!);
 expect(response.status()).toBe(200);expect((await response.body()).subarray(0,4).toString()).toBe('%PDF');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(errors).toEqual([]);
});
test('home, responsive layout and downloads',async({page},info)=>{
 await page.goto('');
 await expect(page.getByRole('heading',{level:1})).toContainText('레벨 업');
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'tmp/home-'+info.project.name+'.png',fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('#downloads');
 for(const level of levels){
  await page.getByRole('region',{name:'난이도 선택'}).getByRole('button',{name:new RegExp(level.name)}).click();
  for(const a of await page.locator('a[download]').all()){
   const href=await a.getAttribute('href');const response=await page.request.get(href!);
   expect(response.status()).toBe(200);expect((await response.body()).subarray(0,4).toString()).toBe('%PDF');
  }
 }
 await page.goto('#teacher');await expect(page.getByRole('heading',{name:'표현 평가 기준'})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('wrong answer, hint, level isolation and reset',async({page})=>{
 await page.goto('#lesson-1');await page.getByRole('tab',{name:'2 문장 미션'}).click();
 const card=page.locator('.question').first();
 await card.getByRole('button',{name:'drink water',exact:true}).click();await card.getByRole('button',{name:'정답 확인'}).click();
 await expect(card.locator('.feedback')).toContainText('조금만 더');
 await card.getByRole('button',{name:'힌트'}).click();await expect(card.locator('.hint')).toBeVisible();
 await card.getByRole('button',{name:'eat vegetables',exact:true}).click();await card.getByRole('button',{name:'정답 확인'}).click();
 await expect(card.locator('.feedback')).toContainText('잘했어요');
 await page.getByRole('region',{name:'난이도 선택'}).getByRole('button',{name:/기초/}).click();await expect(page.locator('.score-pill')).toHaveText('0 / 6 정답');
 await page.getByRole('region',{name:'난이도 선택'}).getByRole('button',{name:/기본/}).click();await expect(page.locator('.score-pill')).toHaveText('1 / 6 정답');
 await page.getByRole('button',{name:'이 기기의 학습 기록 초기화'}).click();await page.getByRole('button',{name:'취소',exact:true}).click();
 await expect(page.locator('.score-pill')).toHaveText('1 / 6 정답');
 await page.getByRole('button',{name:'이 기기의 학습 기록 초기화'}).click();await page.getByRole('button',{name:'모두 초기화'}).click();
 await expect(page.locator('.score-pill')).toHaveText('0 / 6 정답');
});
test('invalid storage and unavailable audio remain usable',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('habit-quest-v1','{"bad":true}');Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],cancel:()=>{}},configurable:true});});
 await page.goto('#lesson-1');
 await page.getByRole('button',{name:'eat vegetables 듣기',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('영어 음성을 찾지 못했어요');
 await page.getByRole('tab',{name:'2 문장 미션'}).click();await expect(page.locator('.question')).toHaveCount(6);
});
