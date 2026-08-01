// game.js
const Game = {
    init(players) {
        this.players = players;
        this.money = 5000;
        this.ap = 3;
        this.maxAp = 3;
        this.week = 1;
        this.month = 9;
        this.year = 2025;
        this.isGraduated = false;
        UI.renderClassroom(this.players);
        UI.updateHeader(this);
        this.log('集训开始！');
        // 初始存档
        this.save();
    },

    nextTurn() {
        if (this.isGraduated) return;
        this.week++;
        if (this.week > 4) {
            this.week = 1;
            this.month++;
            if (this.month > 12) { this.month = 1; this.year++; }
            this.ap = this.maxAp;
        }
        this.money += 300 + this.players.length * 50;
        this.players.forEach(p => {
            p.stress = Math.max(0, p.stress - 5);
            p.mood = Math.min(100, p.mood + 2);
        });
        UI.renderClassroom(this.players);
        UI.updateHeader(this);
        this.log(`第${this.year}/${this.month} W${this.week} 结束`);
        this.save();
    },

    doAction(cat, sub) {
        if (this.ap < 1) return alert('行动力不足！');
        this.ap -= 1;
        this.log(`执行了 ${cat} - ${sub}`);
        UI.updateHeader(this);
        this.save();
    },

    log(msg) {
        const area = document.getElementById('log-area');
        const timeStr = `${this.year}/${String(this.month).padStart(2,'0')} W${this.week}`;
        area.innerHTML = `<div class="log-entry"><span class="log-time">[${timeStr}]</span> ${msg}</div>` + area.innerHTML;
    },

    confirmBackToMenu() {
        if (confirm('确认回到选人页面？进度将丢失。')) {
            localStorage.removeItem('oi_players');
            window.location.href = 'index.html';
        }
    },

    save() {
        const data = {
            players: this.players,
            money: this.money,
            ap: this.ap,
            maxAp: this.maxAp,
            week: this.week,
            month: this.month,
            year: this.year,
            isGraduated: this.isGraduated
        };
        localStorage.setItem('oi_save', JSON.stringify(data));
    },

    load() {
        const raw = localStorage.getItem('oi_save');
        if (!raw) return null;
        try {
            const data = JSON.parse(raw);
            this.players = data.players;
            this.money = data.money;
            this.ap = data.ap;
            this.maxAp = data.maxAp;
            this.week = data.week;
            this.month = data.month;
            this.year = data.year;
            this.isGraduated = data.isGraduated || false;
            return data;
        } catch (e) {
            return null;
        }
    }
};
