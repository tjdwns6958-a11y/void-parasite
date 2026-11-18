#!/bin/bash
cd /home/claude/play
run(){ PRE="s.plv=8;s.molts=5;s.lin=$2;s.cry=s.lin.c>=2?2:0;s.feast=s.lin.p>=2?2:0;s.recalc();if(s.wormSkin)s.wormSkin();s.en=s.emax;s.nextZone();" node run.js $1 8 300 9999 > z2/$1.log 2>&1; }
run PZ_P "{p:2,c:1,v:0}" & run PZ_C "{p:1,c:2,v:0}" & wait
run PZ_V "{p:0,c:1,v:2}" & run PZ_N "{p:0,c:0,v:0}" & wait
