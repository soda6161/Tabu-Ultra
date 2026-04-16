const FIREBASE_CONFIG = {
    apiKey: "BHvUIxCOTsP2bY0QcPBQWzdC8K6tY2IrEnuSgh3TQgt0vi0_jrJIfnq9JTFUN41sY5kXHXiHvnAsCP3pf75HadU",
    databaseURL: "https://suheylbul-default-rtdb.firebaseio.com"
};

const NET = {
    db: null,
    roomRef: null,
    myId: null,
    roomCode: null,
    playerName: "Oyuncu",

    init() {
        if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
        this.db = firebase.database();
        this.myId = localStorage.getItem('tabu_uid') || Math.random().toString(36).substring(2, 10);
        localStorage.setItem('tabu_uid', this.myId);

        const params = new URLSearchParams(window.location.search);
        this.roomCode = params.get('room');

        if (this.roomCode) {
            const savedName = localStorage.getItem('tabu_player_name');
            if (savedName) {
                // İsim zaten var (oda kuran kişi veya daha önce oynayan) — direkt bağlan
                this.playerName = savedName;
                this._connectToRoom(this.roomCode);
            } else {
                // İsim yok — login ekranında kal, UI'yi ayarla
                document.getElementById('btn-create-room').style.display = 'none';
                document.getElementById('divider-text').style.display = 'none';
                document.getElementById('join-code-input').style.display = 'none';
                document.getElementById('btn-manual-join').textContent = 'ODAYA KATIL';
            }
        }
        // roomCode yoksa: normal login ekranı, hiçbir şey yapma
    },

    createRoom() {
        const name = document.getElementById('login-name-input').value.trim();
        if (!name) {
            alert("Lütfen önce isminizi girin!");
            document.getElementById('login-name-input').focus();
            return;
        }
        localStorage.setItem('tabu_player_name', name);
        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        window.location.href = '?room=' + code;
        // Sayfa yeniden yüklenecek, init() ismi localStorage'dan alıp _connectToRoom çağıracak
    },

    manualJoin() {
        const name = document.getElementById('login-name-input').value.trim();
        if (!name) {
            alert("Lütfen önce isminizi girin!");
            document.getElementById('login-name-input').focus();
            return;
        }
        localStorage.setItem('tabu_player_name', name);

        const code = this.roomCode
            ? this.roomCode
            : document.getElementById('join-code-input').value.trim().toUpperCase();

        if (!code || code.length !== 5) return alert("5 karakterlik oda kodu girin!");

        if (this.roomCode) {
            // URL'den geldi, sayfa zaten doğru — direkt bağlan
            this.playerName = name;
            this._connectToRoom(code);
        } else {
            // Manuel kod — URL'e git, sayfa yenilenecek
            window.location.href = '?room=' + code;
        }
    },

    _connectToRoom(code) {
        this.roomRef = this.db.ref('rooms/' + code);

        this.roomRef.once('value').then(snap => {
            if (!snap.exists()) {
                return this.roomRef.set({ status: 'lobby', scoreRed: 0, scoreBlue: 0, players: {} });
            }
        }).then(() => {
            return this.roomRef.child('players/' + this.myId).update({
                name: this.playerName,
                team: null,
                role: null,
                joinedAt: Date.now()
            });
        }).then(() => {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById('screen-lobby').classList.add('active');
            document.getElementById('room-code-display').textContent = code;
        }).catch(err => {
            alert("Firebase hatası: " + err.message);
        });

        this.roomRef.on('value', snap => {
            if (snap.exists()) ENGINE.update(snap.val());
        });
    },

    joinRole(team, role) {
        if (this.roomRef) this.roomRef.child('players/' + this.myId).update({ team, role });
    },

    copyRoomCode() {
        if (this.roomCode) navigator.clipboard.writeText(this.roomCode).then(() => alert("Oda kodu kopyalandı: " + this.roomCode));
    }
};

NET.init();