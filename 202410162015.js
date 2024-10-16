// 计算过程：第一版脚本，有浮点数精度误差问题导致X坐标总增量算出15

// 随手写的JavaScript，网上不可能找到一样的屎山，一次性代码不做后续维护
// -- 2024 1016 2015
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

闭合角差：${da=((sum+90)%180-90)*3600|0}

改正角值：${ada=-da/count}

改正后角值：
${cangs=angs.map(e=>e+ada/3600),cangs.map(e=>d3(e))}

方位角：
${gn=g,absg=cangs.map(e=>(gn+=e,gn+=gn<180?180:-180)),absg.unshift(g),absg.map(e=>d3(e))}
${absg.pop(),''}
坐标增量(X)：
${dx=absg.map((e,i)=>cos(e/180*PI)*len[i]),dx.map(dig)}

X坐标总增量：
${ref=dig(dx.reduce((a,b)=>a+b,0))}

X坐标改正量：
${ref=len.map(e=>dig(-ref*e/sumlen)),ref.map(e=>floor(e*1000))}

X坐标总改正量：
${ref.reduce((a,b)=>a+b*1000,0)}
  
X坐标改正后增量：
${ref=dx.map((a,i)=>dig(ref[i]+a))}

X坐标值：
${gn=startx,ref.map(e=>gn+=e).map(dig)}


坐标增量(Y)：
${dy=absg.map((e,i)=>sin(e/180*PI)*len[i]),dy.map(dig)}

Y坐标总增量：
${ref=dig(dy.reduce((a,b)=>a+b,0))}

Y坐标改正量：
${ref=len.map(e=>dig(-ref*e/sumlen)),ref.map(e=>floor(e*1000))}

Y坐标改正后增量：
${ref=dy.map((a,i)=>dig(ref[i]+a))}

Y坐标值：
${gn=starty,ref.map(e=>gn+=e).map(dig)}


`
),debug=1,dig=//e=>Math.round(e*1000)/1000
e=>+e.toFixed(3)
,gn,ref
,startx=567.432,starty=675.345
,dx,dy,xcor,ycor // 命名参考：netlogo
,ang=(a,b,c)=>+a+b/60+c/3600
,{floor,sin,cos,PI}=Math
,d3=n=>`${floor(n)}°${floor(n*60%60)}′${(n*3600%60).toFixed(0)}″`
,count=5
,g=debug?ang(96,51,36):ang(105,28,20)
,raw_angs=debug?`108 27 14 
84 10 26 
135 47 37 
90 06 48 
121 28 05`:`96°29′56″
132°25′38″
131°30′12″
100°25′42″
90°39′18″
168°29′32″`
,angs=raw_angs.split('\n').map(e=>ang(...e.split(/\W/g)))
,len=(debug?`201.584 
263.368 
240.891 
200.453 
231.537 `:`
71.215
70.166
66.867
114.246
59.851
`).split('\n').map(e=>+e)
;t=Date.now()
;main()
;console.log(Date.now()-t)


/*
* 计算过程(最终采用版本)，避开小数就没有浮点数精度误差了
* debug为1时使用测试数据并且计算结果完全正确(X坐标总增量为16)
* debug为0时使用待计算数据
*/
// 随手写的JavaScript，网上不可能找到一样的屎山，一次性代码不做后续维护
// -- 2024/10/16 20:15:03
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

闭合角差：${da=round(((sum+90)%180-90)*3600)}

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
,startx=567.432,starty=675.345
,dx,dy,xcor,ycor // 命名参考：netlogo
,ang=(a,b,c)=>+a+b/60+c/3600
,{floor,round,ceil,sin,cos,PI}=Math
,d3=n=>`${floor(n)}°${floor(n*60%60)}′${(n*3600%60).toFixed(0)}″`
,count=5
,g=ang(96,51,36)
,raw_angs=debug?`108 27 14 
84 10 26 
135 47 37 
90 06 48 
121 28 05`:`96°29′56″
132°25′38″
131°30′12″
100°25′42″
90°39′18″
168°29′32″`
,angs=raw_angs.split('\n').map(e=>ang(...e.split(/\W/g)))
,len=(debug?`201.584 
263.368 
240.891 
200.453 
231.537 `:`67.762
71.215
70.166
66.867
114.246
59.851`).split('\n').map(e=>+e)
;t=Date.now()
;debug||(count=6,startx=544.132,starty=301.345,g=ang(105,28,20))
;main()
;console.log(Date.now()-t)

/* 计算结果：
站点数6


边长：
67.762
71.215
70.166
66.867
114.246
59.851

总边长：
450.107


观测角值:
96°29′56″
132°25′38″
131°30′12″
100°25′42″
90°39′18″
168°29′32″

求和:
720°0′18″

闭合角差：18

误差校验：
720°0′0″
720°0′18″
-0.004999999999881766
±24

改正角值：-3

改正后角值：
96°29′53″,132°25′35″,131°30′9″,100°25′39″,90°39′15″,168°29′29″

方位角：
105°28′20″,21°58′13″,334°23′48″,285°53′57″,206°19′36″,116°58′51″,105°28′20″

X坐标增量：
-18.077,66.043,63.276,18.318,-102.396,-27.154

X坐标总增量(m)：
0.01

X坐标改正量(mm)：
-2,-2,-2,-1,-3,-1

X坐标总改正量(mm)：
-10
  
X坐标改正后增量：(m)
-18.079,66.041,63.274,18.317,-102.399,-27.155

X坐标值：
526.053,592.095,655.369,673.686,571.287,544.132

Y坐标增量：
-18.077,66.043,63.276,18.318,-102.396,-27.154

Y坐标总增量(m)：
-0.011

Y坐标改正量(mm)：,,,
2,2,2,2,3,1

Y坐标总改正量(mm)：
11
  
Y坐标改正后增量(m):
65.308,26.645,-30.319,-64.307,-50.664,53.338

Y坐标值：
366.653,393.297,362.978,298.671,248.007,301.345

K值校验(fx,fy,f,k):
0.01
-0.011
15
6000
        
*/
