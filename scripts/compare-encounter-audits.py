"""Compare paired gameplay audit rows; percentages describe loadouts, not players."""
import argparse
import collections
import json
from pathlib import Path
from statistics import mean

parser = argparse.ArgumentParser()
for flag in ('before', 'after', 'before-bosses', 'after-bosses', 'output'):
    parser.add_argument('--' + flag, required=True, type=Path)
a = parser.parse_args()

def read(p):
    return [json.loads(line) for line in p.read_text().splitlines() if line]

def key(r):
    return tuple(r[k] for k in ('id', 'classId', 'build', 'seed', 'depth'))

before = read(a.before) + read(a.before_bosses)
after = read(a.after) + read(a.after_bosses)
b = {key(r): r for r in before}
n = {key(r): r for r in after}
assert len(b) == len(before) and len(n) == len(after), 'Duplicate fixture'
assert b.keys() == n.keys(), 'Unpaired fixtures'
metadata = json.loads(a.after.with_suffix('.metadata.json').read_text())
encounters = {e['id']: e for e in metadata['encounters']}
assert len(encounters) == 350
ordinary_keys = [k for k in n if encounters[k[0]]['role'] != 'boss']
metrics = ['won', 'timeout', 'seconds', 'hpPct', 'damageTaken', 'healing', 'attacks', 'silenceSeconds', 'phaseTwoSeconds', 'enemyRemainingPct']
unchanged = sum(all(b[k][m] == n[k][m] for m in metrics) for k in ordinary_keys)
assert unchanged == len(ordinary_keys), 'Unexpected ordinary/elite combat change'
groups = collections.defaultdict(list)
for k in n:
    groups[(k[0], k[2], k[4])].append(k)
results = []
for (id, build, depth), keys in groups.items():
    e = encounters[id]
    results.append({'id': id, 'enemy': e['enemy'], 'dungeon': e['dungeonName'], 'tier': e['tier'], 'role': e['role'], 'build': build, 'depth': depth, 'fights': len(keys),
                    'beforeWins': sum(b[k]['won'] for k in keys), 'afterWins': sum(n[k]['won'] for k in keys),
                    'beforeMeanHpPct': round(mean(b[k]['hpPct'] for k in keys), 2), 'afterMeanHpPct': round(mean(n[k]['hpPct'] for k in keys), 2)})
summary = {'beforeVersion': '0.30.10', 'afterVersion': metadata['version'], 'mode': 'normal', 'seed': 123456,
           'classes': 19, 'encounters': 350, 'pairedFights': len(n), 'primaryFights': len(read(a.after)),
           'additionalBossFights': len(read(a.after_bosses)), 'unchangedOrdinaryAndEliteFights': unchanged,
           'primaryWinsBefore': sum(r['won'] for r in read(a.before)), 'primaryWinsAfter': sum(r['won'] for r in read(a.after)),
           'note': 'One deterministic seed. The preceding three-seed audit showed no variation for these primary fixtures. Clear counts describe class loadouts, not live player probabilities.',
           'bossResults': [r for r in results if r['role'] == 'boss']}
a.output.write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps({k: v for k, v in summary.items() if k != 'bossResults'}, indent=2))
