// player.js
function createPlayer(name) {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randf = (min, max) => Math.random() * (max - min) + min;

    // 随机抽取1~3个特质
    const talentPool = CONFIG.TALENTS;
    const shuffled = talentPool.sort(() => Math.random() - 0.5);
    const count = rand(1, 3);
    const talents = shuffled.slice(0, count);

    // 文化课初始 (30~120)
    const culture = {};
    CONFIG.CULTURE_SUBJECTS.forEach(sub => {
        culture[sub] = rand(30, 120);
    });

    // OI专项初始 (20~90)
    const oi = {};
    CONFIG.OI_SUBJECTS.forEach(sub => {
        oi[sub] = rand(20, 90);
    });

    // 应用特质效果
    talents.forEach(t => {
        if (t.effect) {
            for (let key in t.effect) {
                const val = t.effect[key];
                if (key === 'all') {
                    for (let k in culture) culture[k] = Math.round(culture[k] * (1 + val));
                    for (let k in oi) oi[k] = Math.round(oi[k] * (1 + val));
                } else if (key === 'randomPenalty') {
                    const allSubs = [...CONFIG.CULTURE_SUBJECTS, ...CONFIG.OI_SUBJECTS];
                    const pick = allSubs[Math.floor(Math.random() * allSubs.length)];
                    if (culture[pick] !== undefined) culture[pick] = Math.max(0, culture[pick] - val);
                    else if (oi[pick] !== undefined) oi[pick] = Math.max(0, oi[pick] - val);
                } else if (key === 'stressSens') {
                    // 只是标记
                } else if (key === 'thinking' || key === 'coding') {
                    // 单独处理
                } else {
                    const parts = key.split('.');
                    if (parts.length === 2) {
                        if (parts[0] === 'culture' && culture[parts[1]] !== undefined) {
                            culture[parts[1]] = Math.min(150, culture[parts[1]] + val);
                        } else if (parts[0] === 'oi' && oi[parts[1]] !== undefined) {
                            oi[parts[1]] = Math.min(100, oi[parts[1]] + val);
                        }
                    }
                }
            }
        }
    });

    let thinking = rand(30, 90);
    let coding = rand(30, 90);
    talents.forEach(t => {
        if (t.effect && t.effect.thinking) thinking = Math.min(100, thinking + t.effect.thinking);
        if (t.effect && t.effect.coding) coding = Math.min(100, coding + t.effect.coding);
    });

    const effArts = randf(0.7, 1.3);
    const effSci = randf(0.7, 1.3);
    const naughty = randf(0, 0.5);
    const mood = rand(30, 80);
    const stress = rand(10, 50);

    return {
        name: name,
        culture: culture,
        oi: oi,
        thinking: thinking,
        coding: coding,
        effArts: effArts,
        effSci: effSci,
        naughty: naughty,
        mood: mood,
        stress: stress,
        talents: talents,
        history: { scores: [], oiScores: [] }
    };
}
