#!/bin/bash
# 2구역 직행 테스트: $1=태그 $2=계통 배치(JSON) $3=판 수
cd /home/claude/play
PRE="s.plv=8;s.molts=3;s.lin=$2;s.cry=s.lin.c>=2?2:0;s.recalc();if(s.wormSkin)s.wormSkin();s.en=s.emax;s.nextZone();" GUIDE=1 LIN=${4:-mix} node run.js $1 ${3:-4} 420 200
