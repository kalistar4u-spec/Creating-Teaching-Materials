import {test,expect} from '@playwright/test';

test('student submits writing to the configured receiver and checks the receipt',async({page,context})=>{
 const endpoint='https://script.google.com/macros/s/TEST/exec';
 await page.route('**/teacher-submission.json',route=>route.fulfill({json:{endpoint}}));
 let payload:any;
 await context.route(endpoint,async route=>{payload=JSON.parse(new URLSearchParams(route.request().postData()||'').get('payload')||'{}');await route.fulfill({contentType:'text/html',body:'<h1>제출 완료</h1>'});});
 await page.goto('#lesson-1');await page.getByRole('tab',{name:'3 말하고 쓰기'}).click();
 await expect(page.getByRole('button',{name:'선생님께 제출 · 새 창'})).toBeDisabled();
 await page.locator('textarea').nth(0).fill('I read books every day.');await page.locator('textarea').nth(1).fill('I exercise twice a week.');
 await page.getByLabel('수업 코드',{exact:true}).fill('TEST-CODE');await page.getByLabel('학급',{exact:true}).fill('6학년 1반');await page.getByLabel('학생 번호',{exact:true}).fill('7');
 const popupPromise=page.waitForEvent('popup');await page.getByRole('button',{name:'선생님께 제출 · 새 창'}).click();
 const popup=await popupPromise;await expect(popup.getByRole('heading')).toHaveText('제출 완료');
 expect(payload.studentNumber).toBe('7');expect(payload.writing).toEqual(['I read books every day.','I exercise twice a week.']);expect(payload.lesson).toBe(1);expect(payload).not.toHaveProperty('score');
});
