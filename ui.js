// ui.js
const UI = {
    renderClassroom(players) {
        const grid = document.getElementById('view-classroom');
        if (!grid) return;
        grid.innerHTML = players.map(p => {
            const totalCulture = Object.values(p.culture).reduce((a,b)=>a+b,0);
            const totalOI = Object.values(p.oi).reduce((a,b)=>a+b,0);
            const total = totalCulture + totalOI;
            const talentTags = p.talents.map(t => 
                `<span class="tag tag-pos" title="${t.d}">${t.n}</span>`
            ).join('');
            return `
                <div class="stu-card">
                    <div class="stu-header">
                        <span class="stu-name">${p.name}</span>
                        <span class="stu-label">综合 ${Math.round(total)}</span>
                    </div>
                    <div class="tag-pool">${talentTags}</div>
                    <div style="font-size:.7em; margin:4px 0;">
                        <b>文化</b> ${Object.values(p.culture).join(' · ')}
                    </div>
                    <div style="font-size:.7em; margin:4px 0;">
                        <b>OI</b> DS${p.oi.ds} NT${p.oi.nt} 图${p.oi.graph} 串${p.oi.str} DP${p.oi.dp}
                    </div>
                    <div style="font-size:.65em; color:var(--text-muted);">
                        思维${p.thinking} 代码${p.coding} 顽皮${Math.round(p.naughty*100)}%
                    </div>
                    <div class="status-row">
                        <div class="status-item">
                            <span class="label">心情</span>
                            <span class="value">${Math.round(p.mood)}</span>
                            <div class="stress-bar"><div class="stress-fill" style="width:${p.mood}%;background:var(--btn-success)"></div></div>
                        </div>
                        <div class="status-item">
                            <span class="label">压力</span>
                            <span class="value">${Math.round(p.stress)}</span>
                            <div class="stress-bar"><div class="stress-fill" style="width:${p.stress}%;background:var(--btn-danger)"></div></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    updateHeader(game) {
        document.getElementById('ui-time').textContent = `${game.year}/${game.month} W${game.week}`;
        document.getElementById('ui-money').textContent = Math.round(game.money);
        document.getElementById('ui-ap').textContent = game.ap;
        document.getElementById('ap-max-txt').textContent = `/${game.maxAp}`;
        // 简单倒计时
        const targetYear = 2026, targetMonth = 6, targetWeek = 1;
        let totalMonths = (targetYear - game.year) * 12 + (targetMonth - game.month);
        let totalWeeks = totalMonths * 4 + (targetWeek - game.week);
        if (totalWeeks < 0) totalWeeks = 0;
        document.getElementById('countdown').textContent = `⏳ 剩余 ${totalWeeks} 周`;
    },

    switchTab(id) {
        document.querySelectorAll('.panel-content').forEach(e => e.classList.remove('active'));
        document.querySelectorAll('.sidebar .tab-btn').forEach(e => e.classList.remove('active'));
        document.getElementById(`panel-${id}`).classList.add('active');
        const btns = document.querySelectorAll('.sidebar .tab-btn');
        if (id === 'action') btns[0].classList.add('active');
        else btns[1].classList.add('active');
    },

    toggleMenu(id) {
        const e = document.getElementById(id);
        if (e) e.classList.toggle('active');
    },

    closeModal(id) {
        document.getElementById(id).classList.add('hidden');
    },

    showHelp() {
        document.getElementById('help-modal').classList.remove('hidden');
    },

    openChartPage() {
        document.getElementById('chart-page').style.display = 'flex';
    },
    closeChartPage() {
        document.getElementById('chart-page').style.display = 'none';
    }
};
