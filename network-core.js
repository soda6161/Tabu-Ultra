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
            // Oda kodu URL'den geldi — önce isim ekranında kal, join butonunu düzenle
            this.showJoinMode(this.roomCode);
        }
    },

    showJoinMode(code) {
        // Login ekranı zaten aktif, sadece UI'yi ayarla
        const createBtn = document.getElementById('btn-create-room');
        const divider = document.getElementById('divider-text');
        const codeInput = document.getElementById('join-code-input');
        const joinBtn = document.getElementById('btn-manual-join');

        if (createBtn) createBtn.style.display = 'none';
        if (divider) divider.style.display = 'none';
        if (codeInput) codeInput.style.display = 'none';
        if (joinBtn) joinBtn.textContent = 'ODAYA KATIL';
    },

    createRoom() {
        const name = document.getElementById('login-name-input').value.trim();
        if (!name) {
            alert("Lütfen önce isminizi girin!");
            document.getElementById('login-name-input').focus();
            return;
        }
        this.playerName = name;
        localStorage.setItem('tabu_player_name', name);

        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        this.roomCode = code;
        this._initRoom(code);
    },

    manualJoin() {
        const name = document.getElementById('login-name-input').value.trim();
        if (!name) {
            alert("Lütfen önce isminizi girin!");
            document.getElementById('login-name-input').focus();
            return;
        }

        let code = this.roomCode || document.getElementById('join-code-input').value.trim().toUpperCase();
        if (!code || code.length !== 5) return alert("5 karakterlik oda kodu girin!");

        this.playerName = name;
        localStorage.setItem('tabu_player_name', name);
        this.roomCode = code;
        this._initRoom(code);
    },

    _initRoom(code) {
        this.roomRef = this.db.ref('rooms/' + code);

        this.roomRef.once('value').then(snap => {
            if (!snap.exists()) {
                return this.roomRef.set({
                    status: 'lobby',
                    scoreRed: 0,
                    scoreBlue: 0,
                    players: {}
                });
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
            window.history.replaceState({}, '', '?room=' + code);
        }).catch(err => {
            console.error("Firebase hatasi:", err);
            alert("Firebase hatası: " + err.message);
        });

        this.roomRef.on('value', snap => {
            if (snap.exists()) {
                ENGINE.update(snap.val());
            }
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