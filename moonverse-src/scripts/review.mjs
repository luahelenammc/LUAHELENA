import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseUrl=process.env.MOONVERSE_REVIEW_URL||'http://127.0.0.1:4173/moonverse/';
const sourceRoot=path.resolve(new URL('..',import.meta.url).pathname);
const siteRoot=path.resolve(sourceRoot,'..','moonverse');
const outputRoot=path.join(sourceRoot,'review-artifacts');
const screenshotsRoot=path.join(outputRoot,'screenshots');
fs.rmSync(outputRoot,{recursive:true,force:true}); fs.mkdirSync(screenshotsRoot,{recursive:true});
const publicIndex=JSON.parse(fs.readFileSync(path.join(siteRoot,'assets','search-index.json'),'utf8'));
const rooms=JSON.parse(fs.readFileSync(path.join(sourceRoot,'v4','rooms.json'),'utf8')).rooms;
const entryRoutes=publicIndex.map(item=>{const relative=new URL(item.url,'https://moonverse.local').pathname.replace(/^\/moonverse\//,'');const slug=relative.replace(/^entry\//,'').replace(/\/$/,'');return [`article-${slug}`,relative]});
const routes=[
 ['hall',''],['wiki','wiki/'],['timeline','timeline/'],['atlas','atlas/'],['albums','albums/'],['memory','memory/'],['about','about/'],
 ...rooms.map(r=>[`room-${r.id}`,`room/${r.id}/`]),...entryRoutes,
 ['search-maresia','search/?q=maresia'],['search-moon','search/?q=Moon%20Source'],['search-lithia','search/?q=L%C3%ADthia']
];
const viewports=[['desktop',{width:1440,height:1000}],['tablet',{width:1024,height:768}],['mobile',{width:390,height:844}]];
const browser=await chromium.launch({headless:true});
const report={baseUrl,generatedAt:new Date().toISOString(),publicEntriesExpected:publicIndex.length,entryRoutesReviewed:entryRoutes.length,pages:[],accessibility:[],consoleErrors:[],pageErrors:[],failures:[]};
try{
 for(const [vpName,viewport] of viewports){
  const context=await browser.newContext({viewport,colorScheme:'light'});const page=await context.newPage();
  page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push({viewport:vpName,text:m.text()})});
  page.on('pageerror',e=>report.pageErrors.push({viewport:vpName,text:e.message}));
  for(const [name,relative] of routes){
   const url=new URL(relative,baseUrl).toString();const response=await page.goto(url,{waitUntil:'networkidle'});const status=response?.status()??0;
   const metrics=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1')?.textContent?.trim()||'',scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,lang:document.documentElement.lang}));
   const shot=path.join(screenshotsRoot,`${name}-${vpName}.png`);await page.screenshot({path:shot,fullPage:true});
   report.pages.push({name,viewport:vpName,url,status,screenshot:path.relative(outputRoot,shot),...metrics});
   if(status!==200)report.failures.push(`${name}/${vpName}: HTTP ${status}`);
   if(!metrics.h1)report.failures.push(`${name}/${vpName}: missing h1`);
   if(metrics.lang!=='pt-BR')report.failures.push(`${name}/${vpName}: html lang is ${metrics.lang||'missing'}`);
   if(metrics.scrollWidth>metrics.clientWidth+1)report.failures.push(`${name}/${vpName}: horizontal overflow ${metrics.scrollWidth}px > ${metrics.clientWidth}px`);
   if(vpName==='desktop'){
    const axe=await new AxeBuilder({page}).analyze();const serious=axe.violations.filter(v=>['serious','critical'].includes(v.impact||''));
    report.accessibility.push({name,url,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.length})),seriousOrCritical:serious.length});
    if(serious.length)report.failures.push(`${name}: ${serious.length} serious/critical axe violation(s)`);
   }
  }
  await context.close();
 }
 const night=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'});const p=await night.newPage();await p.goto(baseUrl,{waitUntil:'networkidle'});await p.locator('[data-theme-toggle]').click();await p.screenshot({path:path.join(screenshotsRoot,'hall-night-desktop.png'),fullPage:true});const applied=await p.evaluate(()=>document.documentElement.dataset.theme||'light');if(applied!=='night')report.failures.push(`theme toggle did not apply night theme; received ${applied}`);await night.close();
}finally{await browser.close()}
if(entryRoutes.length!==publicIndex.length)report.failures.push(`entry route coverage mismatch: ${entryRoutes.length}/${publicIndex.length}`);
if(report.consoleErrors.length)report.failures.push(`${report.consoleErrors.length} browser console error(s)`);
if(report.pageErrors.length)report.failures.push(`${report.pageErrors.length} uncaught page error(s)`);
fs.writeFileSync(path.join(outputRoot,'review-report.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(outputRoot,'review-summary.md'),`# Moonverse V4 browser review\n\n- Public entries: ${report.publicEntriesExpected}\n- Entry routes: ${report.entryRoutesReviewed}\n- Pages/viewports: ${report.pages.length}\n- Desktop axe audits: ${report.accessibility.length}\n- Console errors: ${report.consoleErrors.length}\n- Page errors: ${report.pageErrors.length}\n- Failures: ${report.failures.length}\n\n${report.failures.length?report.failures.map(x=>`- ${x}`).join('\n'):'All browser review gates passed.'}\n`);
if(report.failures.length){console.error('Moonverse V4 browser review failed:');report.failures.forEach(x=>console.error(`- ${x}`));process.exit(1)}
console.log(`Moonverse V4 browser review passed: ${report.entryRoutesReviewed} articles, ${report.pages.length} screenshots, ${report.accessibility.length} axe audits.`);
