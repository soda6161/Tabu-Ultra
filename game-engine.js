const ENGINE = {
    roomData: null,
    words: [], // kelimeler.txt'den yüklenecek

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
        } catch (e) {
            this.words = [{ m: "ÖRNEK", f: ["Yasak1", "Yasak2", "Yasak3", "Yasak4", "Yasak5"] }];
        }
    },

    update(data) {
        this.roomData = data;
        if (data.status === 'playing') {
            this.renderGame(data);
        } else {
            this.renderLobby(data);
        }
    },

    renderLobby(data) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-lobby').classList.add('active');
        document.getElementById('room-code-display').textContent = NET.roomCode;
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
            scoreBlue: 0
        });
    },

    renderGame(data) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById('screen-game');
        screen.classList.add('active');
        
        const me = data.players[NET.myId];
        const team = me.team === 'blue' ? 'blue' : 'red';
        const role = me.role === 'anlatici' ? 'narrator' : 'listener';
        
        // Dinamik Arka Plan Değişimi
        screen.className = `screen active ${role}-${team}`;

        const isAnlatici = me.role === 'anlatici';
        document.getElementById('narrator-controls').style.display = isAnlatici ? 'flex' : 'none';
        
        if (isAnlatici) {
            document.getElementById('word-main').textContent = data.currentWord.m;
            document.getElementById('word-forbidden').innerHTML = data.currentWord.f.join('<br>');
        } else {
            document.getElementById('word-main').textContent = "???";
            document.getElementById('word-forbidden').textContent = "ARKADAŞINI DİNLE!";
        }
    },

    reportCorrect() {
        const teamKey = this.roomData.players[NET.myId].team === 'blue' ? 'scoreBlue' : 'scoreRed';
        NET.roomRef.child(teamKey).set((this.roomData[teamKey] || 0) + 1);
        this.nextWord();
        this.flash('rgba(0, 255, 0, 0.4)');
    },

    reportTabu() {
        const teamKey = this.roomData.players[NET.myId].team === 'blue' ? 'scoreBlue' : 'scoreRed';
        NET.roomRef.child(teamKey).set((this.roomData[teamKey] || 0) - 1);
        this.nextWord();
        this.flash('rgba(255, 0, 0, 0.4)');
    },

    nextWord() {
        const word = this.words[Math.floor(Math.random() * this.words.length)];
        NET.roomRef.update({ currentWord: word });
    },

    flash(color) {
        const f = document.getElementById('flash-overlay');
        f.style.background = color; f.style.display = 'block';
        setTimeout(() => f.style.display = 'none', 200);
    }
};

ENGINE.init();