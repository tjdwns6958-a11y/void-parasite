const {chromium}=require('playwright');const [,,html,out]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1260,height:800},deviceScaleFactor:2});
await p.addInitScript(()=>{let a=7;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
await p.goto('file://'+__dirname+'/'+html);await p.waitForTimeout(800);await p.screenshot({path:out,fullPage:true});await b.close()})();
