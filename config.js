// config.js
const CONFIG = {
    CULTURE_SUBJECTS: ['chi', 'mat', 'eng', 'phy', 'che', 'bio'],
    CULTURE_NAMES: { chi:'语文', mat:'数学', eng:'英语', phy:'物理', che:'化学', bio:'生物' },
    OI_SUBJECTS: ['ds', 'nt', 'graph', 'str', 'dp'],
    OI_NAMES: { ds:'数据结构', nt:'数论', graph:'图论', str:'字符串', dp:'动态规划' },
    TALENTS: [
        { id: 't1', n: '思维敏锐', t: 'pos', d: '思维能力+10', effect: { thinking: 10 } },
        { id: 't2', n: '代码手速', t: 'pos', d: '代码能力+10', effect: { coding: 10 } },
        { id: 't3', n: '数学功底', t: 'pos', d: '数论+15', effect: { 'oi.nt': 15 } },
        { id: 't4', n: '图论大师', t: 'pos', d: '图论+15', effect: { 'oi.graph': 15 } },
        { id: 't5', n: 'DP王者', t: 'pos', d: 'DP+15', effect: { 'oi.dp': 15 } },
        { id: 't6', n: '英语大佬', t: 'pos', d: '英语+15', effect: { 'culture.eng': 15 } },
        { id: 'n1', n: '粗心', t: 'neg', d: '所有能力-5%', effect: { all: -0.05 } },
        { id: 'n2', n: '玻璃心', t: 'neg', d: '压力容易上升', effect: { stressSens: 1.2 } },
        { id: 'n3', n: '偏科', t: 'neg', d: '随机一门-20', effect: { randomPenalty: 20 } },
    ]
};
