import json,sys
d=sys.argv[1]
for k in 'pcv':
  R=[json.loads(l) for l in open(f'{d}/{k}.txt',encoding='utf-8') if l.startswith('{')]
  w=sum(r['win'] for r in R);tw=[r['time'] for r in R if r['win']]
  hpl=[round(int(r['hp'].split(':')[1].split('/')[0])/int(r['hp'].split('/')[1])*100) for r in R if not r['win']]
  mine=[round(r['minE']/r['emax']*100) for r in R if r['win']]
  print(k,f'{w}/{len(R)}','winT',round(sum(tw)/len(tw)) if tw else '-','lossBossHP%',hpl,'winMinE%',mine,'err',sum(len(r['errors']) for r in R),sum(r.get('vpErr',0) for r in R))
