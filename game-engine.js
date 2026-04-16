const ENGINE = {
    roomData: null,
    words: [], // Burası otomatik dolacak

    async init() {
        await this.loadWords();
    },

    async loadWords() {
        try {
            const response = await fetch('kelimeler.txt');
            const text = await response.text();
            const lines = text.split('\n').map(l => l.trim()).filter(l => l !== "");
            
            let currentWord = null;
            let forbidden = [];

            lines.forEach(line => {
                if (line === line.toUpperCase() && line.length > 1 && !line.includes(":")) {
                    if (currentWord) this.words.push({ m: currentWord, f: forbidden });
                    currentWord = line;
                    forbidden = [];
                } else if (currentWord && forbidden.length < 5) {
                    forbidden.push(line);
                }
            });
            if (currentWord) this.words.push({ m: currentWord, f: forbidden });
            console.log(`${this.words.length} kelime başarıyla yüklendi!`);
        } catch (e) {
            console.error("Kelimeler yüklenemedi, manuel liste kullanılıyor.");
            this.words = [{ m: "ÖRNEK", f: ["Yasak1", "Yasak2", "Yasak3", "Yasak4", "Yasak5"] }];
        }
    },

    update(data) {
        this.roomData = data;
        if (data.status === 'playing') this.renderGame(data);
        else this.renderLobby(data);
    },

    renderLobby(data) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-lobby').classList.add('active');
        document.getElementById('room-code-display').textContent = NET.roomCode;

        const slots = ['slot-red-narrator', 'slot-red-guesser', 'slot-blue-narrator', 'slot-blue-guesser'];
        slots.forEach(s => document.getElementById(s).innerHTML = "");

        Object.values(data.players || {}).forEach(p => {
            const roleKey = p.role === 'anlatici' ? 'narrator' : 'guesser';
            const el = document.getElementById(`slot-${p.team}-${roleKey}`);
            if (el) el.innerHTML += `<div class="player-name">${p.name}</div>`;
        });
    },

    startGame() {
        const p = Object.values(this.roomData.players || {});
        const rN = p.find(x => x.team === 'red' && x.role === 'anlatici');
        const bN = p.find(x => x.team === 'blue' && x.role === 'anlatici');
        const rG = p.filter(x => x.team === 'red' && x.role === 'dinleyici').length;
        const bG = p.filter(x => x.team === 'blue' && x.role === 'dinleyici').length;

        if (!rN || !bN || rG < 1 || bG < 1) {
            return alert("Hata: Her takıma 1 Anlatıcı ve en az 1 Dinleyici lazım! (Toplam 4 kişi)");
        }

        const randomWord = this.words[Math.floor(Math.random() * this.words.length)];
        NET.roomRef.update({
            status: 'playing',
            currentWord: randomWord,
            scoreRed: 0, 
            scoreBlue: 0,
            startTime: Date.now()
        });
    },

    renderGame(data) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-game').classList.add('active');
        const me = data.players[NET.myId];
        
        const wordMain = document.getElementById('word-main');
        const wordForbidden = document.getElementById('word-forbidden');
        
        if (me.role === 'anlatici') {
            wordMain.textContent = data.currentWord.m;
            wordForbidden.innerHTML = data.currentWord.f.join('<br>');
            document.getElementById('narrator-controls').style.display = 'flex';
        } else {
            wordMain.textContent = "???";
            wordForbidden.textContent = "ARKADAŞINI DİNLE!";
            document.getElementById('narrator-controls').style.display = 'none';
        }
    }
};

ENGINE.init();