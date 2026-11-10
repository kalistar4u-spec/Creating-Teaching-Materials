import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests',timeout:60000,expect:{timeout:10000},fullyParallel:true,workers:2,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:4173/Creating-Teaching-Materials/',trace:'retain-on-failure'},
 projects:process.env.CI?[{name:'chromium',use:{browserName:'chromium'}}]:[
 {name:'chrome',use:{channel:'chrome',viewport:{width:1440,height:1000}}},
 {name:'edge',use:{channel:'msedge',viewport:{width:1366,height:900}}},
 {name:'mobile',use:{channel:'chrome',viewport:{width:390,height:844},isMobile:true,hasTouch:true}}
 ],
 webServer:{command:`"${process.execPath}" node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4173`,url:'http://127.0.0.1:4173/Creating-Teaching-Materials/',reuseExistingServer:!process.env.CI,timeout:30000}
});
