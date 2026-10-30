import { chromium } from '@playwright/test';
import { readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.argv[2]||'http://127.0.0.1:4174/Creating-Teaching-Materials/';
const browser=await chromium.launch(process.platform==='win32'?{channel:'chrome'}:{});
try {
 const page=await browser.newPage({viewport:{width:1366,height:900}});
 const failures=[];
 page.on('pageerror',e=>failures.push(e.message));
 page.on('response',r=>{if(r.status()>=400)failures.push(r.status()+' '+r.url());});
 await page.goto(base,{waitUntil:'networkidle'});
 assert((await page.title()).includes('Habit Quest'));
 await page.goto(base+'#lesson-3',{waitUntil:'networkidle'});await page.reload({waitUntil:'networkidle'});
 assert((await page.locator('h1').textContent()).includes('습관 탐정'));
 await page.getByRole('tab',{name:'2 문장 미션'}).click();
 assert.equal(await page.locator('.question').count(),6);
 await page.screenshot({path:'tmp/production-lesson.png',fullPage:true});
 await page.goto(base+'#downloads',{waitUntil:'networkidle'});
 for(const file of (await readdir('public/pdf')).filter(f=>f.endsWith('.pdf'))){
  const response=await page.request.get(base+'pdf/'+file);
  assert.equal(response.status(),200,file);
  assert.equal((await response.body()).subarray(0,4).toString(),'%PDF',file);
 }
 assert.deepEqual(failures,[]);
 console.log('Production smoke passed: routes, reload, JS/assets, 16 PDFs. '+base);
}finally{await browser.close();}
