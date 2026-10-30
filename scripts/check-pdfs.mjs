import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';
import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
const dir='public/pdf',out='tmp/pdf-review';
await mkdir(out,{recursive:true});
const files=(await readdir(dir)).filter(f=>f.endsWith('.pdf')).sort();
assert.equal(files.length,16);
const thumbs=[];
for(const file of files){
 const bytes=new Uint8Array(await readFile(path.join(dir,file)));
 const pdf=await PDFDocument.load(bytes);
 const expected=file.includes('lesson-')?2:8;
 assert.equal(pdf.getPageCount(),expected,file);
 const doc=await getDocument({data:bytes,useSystemFonts:true,standardFontDataUrl:path.resolve('node_modules/pdfjs-dist/standard_fonts')+path.sep}).promise;
 for(let i=1;i<=doc.numPages;i++){
  const page=await doc.getPage(i),content=await page.getTextContent();
  const text=content.items.map(x=>x.str||'').join('').replace(/\s+/g,'');
  assert(text.includes('HABIT QUEST')||text.includes('HABIT'),'missing header '+file);
  assert(text.includes('습관')||text.includes('문장')||text.includes('표현'),'missing Korean '+file);
  assert(!text.includes('\uFFFD'),'replacement char '+file);
  if(file.includes('-all-'))continue;
  const view=page.getViewport({scale:1.3});const canvas=createCanvas(Math.ceil(view.width),Math.ceil(view.height));
  await page.render({canvasContext:canvas.getContext('2d'),viewport:view}).promise;
  await writeFile(path.join(out,file+'-'+i+'.png'),canvas.toBuffer('image/png'));
  thumbs.push({label:file.replace('habit-quest-','')+' p'+i,canvas});
 }
 console.log(file+': '+expected+' pages / Korean text OK');
 await doc.destroy();
}
for(let start=0;start<thumbs.length;start+=8){
 const sheet=createCanvas(1200,930),ctx=sheet.getContext('2d');ctx.fillStyle='#e5e9ee';ctx.fillRect(0,0,1200,930);
 for(const [j,t] of thumbs.slice(start,start+8).entries()){
  const x=j%4*300+10,y=Math.floor(j/4)*465+24;
  ctx.fillStyle='#26364c';ctx.font='11px sans-serif';ctx.fillText(t.label,x,y-8);
  ctx.drawImage(t.canvas,x,y,280,396);
 }
 await writeFile(path.join(out,'contact-'+start/8+'.png'),sheet.toBuffer('image/png'));
}
console.log('Validated 16 PDFs; rendered all 32 unique pages for visual review.');
