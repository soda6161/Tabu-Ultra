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
        this.playerName = localStorage.getItem('tabu_player_name') || "Oyuncu";

        const params = new URLSearchParams(window.location.search);
        this.roomCode = params.get('room');

        if (this.roomCode) {
            console.log("🔥 Oda kodu algılandı:", this.roomCode);
            this.forceShowLobby();
            this.joinRoom(this.roomCode);
        }
    },

    createRoom() {
        const name = document.getElementById('login-name-input').value.trim() || "Oyuncu";
        this.playerName = name;
        localStorage.setItem('tabu_player_name', name);

        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        this.roomCode = code;
        window.location.href = `?room=${code}`;
    },

    manualJoin() {
        const name = document.getElementById('login-name-input').value.trim();
        if (!name) return alert("Lütfen isminizi yazın!");
        this.playerName = name;
        localStorage.setItem('tabu_player_name', name);

        let code = document.getElementById('join-code-input').value.trim().toUpperCase();
        if (code.length !== 5) return alert("5 karakterlik oda kodu girin!");
        window.location.href = `?room=${code}`;
    },

    forceShowLobby() {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-lobby').classList.add('active');
        document.getElementById('room-code-display').textContent = this.roomCode;
    },

    joinRoom(code) {
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
                team: 'blue',
                role: 'anlatici',
                joinedAt: Date.now()
            });
        }).catch(err => console.error("Firebase hatası:", err));

        this.roomRef.on('value', snap => {
            if (snap.exists()) ENGINE.update(snap.val());
        });
    },

    joinRole(team, role) {
        if (this.roomRef) {
            this.roomRef.child('players/' + this.myId).update({ 
                team: team, 
                role: role 
            });
        }
    },

    copyRoomCode() {
        if (this.roomCode) navigator.clipboard.writeText(this.roomCode).then(() => alert("Kodu kopyaladım: " + this.roomCode));
    }
};

NET.init();