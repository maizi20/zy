/*
https://github.com/maizi20/zy/blob/main/202410162201.js
*/
var main=()=>console.log(
`
站点数${count}

边长：
${len.join('\n')}

总边长：
${sumlen=dig(len.reduce((a,b)=>a+b,0))}

观测角值:
${raw_angs}

求和:
${sum=angs.reduce((a,b)=>a+b,0),d3(sum)}

闭合角差：${da=round(((sum+ang_start-ang_end+90)%180-90)*3600)}
${d3(da/3600)}

误差校验：
${d3((count-2)*180)}
${d3(sum)}
${(count-2)*180-sum}
±${fb=round(10*(count**0.5))}

改正角值：${ada=-da/count}

改正后角值：
${cangs=angs.map(e=>e+ada/3600),cangs.map(e=>d3(e))}

方位角：
${gn=g,absg=cangs.map(e=>(gn+=e,gn+=gn<180?180:-180)),absg.unshift(g),absg.map(e=>d3(e))}
${absg.pop(),''}

X坐标增量：
${dx=absg.map((e,i)=>round(cos(e/180*PI)*len[i]*1000)),dx.map(e=>e/1000)}

X坐标总增量(m)：
${fx=ref=dig(dx.reduce((a,b)=>a+b,0)),ref/1000}

X坐标闭合差
${ref+=(startx-endx)*1000|0,ref/1000}

X坐标改正量(mm)：
${ref=len.map(e=>dig(-ref*e/sumlen)),ref.map(round)}

X坐标总改正量(mm)：
${ref.reduce((a,b)=>a+b*1000,0)/1000}
  
X坐标改正后增量：(m)
${ref=dx.map((a,i)=>dig(ref[i]+a)),ref.map(e=>round(e)/1000)}

X坐标值：
${gn=startx*1000,ref.map(e=>gn+=e).map(e=>round(e)/1000)}

Y坐标增量：
${dy=absg.map((e,i)=>round(sin(e/180*PI)*len[i]*1000)),dx.map(e=>e/1000)}

Y坐标总增量(m)：
${fy=ref=dig(dy.reduce((a,b)=>a+b,0)),ref/1000}


X坐标闭合差
${ref+=(starty-endy)*1000|0,ref/1000}

Y坐标改正量(mm)：,,,
${ref=len.map(e=>dig(-ref*e/sumlen)),ref.map(round)}

Y坐标总改正量(mm)：
${ref.reduce((a,b)=>a+b*1000,0)/1000}
  
Y坐标改正后增量(m):
${ref=dy.map((a,i)=>dig(ref[i]+a)),ref.map(e=>round(e)/1000)}

Y坐标值：
${gn=starty*1000,ref.map(e=>gn+=e).map(e=>round(e)/1000)}

K值校验(fx,fy,f,k):
${fx/1000}
${fy/1000}
${f=round((fx**2+fy**2)**0.5)}
${((f*sumlen/1000)|0)*1000}

`
),debug=0,dig=//e=>Math.round(e*1000)/1000
e=>+e.toFixed(3)
,gn,ref,fb,fx,fy,f
,startx=8345.871,starty=5216.602
,endx=4467.524,endy=8404.762
,dx,dy,xcor,ycor // 命名参考：netlogo
,ang=(a,b,c)=>+a+b/60+c/3600
,{floor,round,ceil,sin,cos,PI}=Math
,d3=n=>`${n<0?(n*=-1,'-'):''}${floor(n)}°${floor(n*60%60)}′${(n*3600%60).toFixed(0)}″`
,count=5
// ,g=ang(21,56,45)
,ang_start=ang(161,44,07)
,ang_end=ang(249,30,27.8)
,g=ang_start
,raw_angs=`85°30′21.1″
254°32′32.2″
131°04′33.3″
272°20′20.2″
244°18′30.0″`
,angs=raw_angs.split('\n').map(e=>ang(...e.split(/\W/g)))
,len=(`1000
1474.444
1424.717
1749.322
1950.412
1000`).split('\n').map(e=>+e)
;t=Date.now()
  endx=4817.605,endy=9341.482 
;main()
/* 用最后两个点作品计算方位角为
Math.asin((4817.605 
-
4467.524 )/(9341.482 
-
8404.762 ))/Math.PI*180
=21.945882650689825,即21°56′45″
*/

/*计算结果：
站点数5

边长：
1000
1474.444
1424.717
1749.322
1950.412
1000

总边长：
8598.895

观测角值:
85°30′21.1″
254°32′32.2″
131°04′33.3″
272°20′20.2″
244°18′30.0″

求和:
987°46′16″

闭合角差：-5
-0°0′5″

误差校验：
540°0′0″
987°46′16″
-447.77111111111117
±22

改正角值：1

改正后角值：
85°30′22″,254°32′33″,131°4′34″,272°20′21″,244°18′31″

方位角：
161°44′7″,67°14′29″,141°47′2″,92°51′36″,185°11′57″,249°30′28″


X坐标增量：
-949.619,570.388,-1119.376,-87.284,-1942.387

X坐标总增量(m)：
-3528.278

X坐标闭合差
-0.013

X坐标改正量(mm)：
2,2,2,3,3,2

X坐标总改正量(mm)：
13.001
  
X坐标改正后增量：(m)
-949.617,570.39,-1119.374,-87.281,-1942.384

X坐标值：
7396.254,7966.644,6847.27,6759.989,4817.604

Y坐标增量：
-949.619,570.388,-1119.376,-87.284,-1942.387

Y坐标总增量(m)：
4124.828


X坐标闭合差
-0.052

Y坐标改正量(mm)：,,,
6,9,9,11,12,6

Y坐标总改正量(mm)：
52
  
Y坐标改正后增量(m):
313.414,1359.657,881.381,1747.154,-176.731

Y坐标值：
5530.016,6889.673,7771.054,9518.207,9341.476

K值校验(fx,fy,f,k):
-3528.278
4124.828
5427979
46674621000


*/
