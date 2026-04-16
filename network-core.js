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
            const savedName = localStorage.getItem('tabu_player_name');
            if (savedName) {
                this.forceShowLobby();
                this.joinRoom(this.roomCode);
            } else {
                document.getElementById('join-code-input').value = this.roomCode;
            }
        }
    },

    createRoom() {
        const name = document.getElementById('login-name-input').value.trim() || "Oyuncu";
        this.playerName = name;
        localStorage.setItem('tabu_player_name', name);

        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        this.roomCode = code;
        console.log("📌 Yeni oda oluşturuldu:", code);
        window.location.href = `?room=${code}`;
    },

    manualJoin() {
        const name = document.getElementById('login-name-input').value.trim();
        if (!name) {
            alert("Lütfen önce isminizi girin!");
            document.getElementById('login-name-input').focus();
            return;
        }
        this.playerName = name;
        localStorage.setItem('tabu_player_name', name);
        let code = this.roomCode || document.getElementById('join-code-input').value.trim().toUpperCase();
        if (!code || code.length !== 5) return alert("5 karakterlik oda kodu girin!");
        window.location.href = `?room=${code}`;
    },

    forceShowLobby() {
        // HEMEN login'i kapat, lobby'yi aç
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-lobby').classList.add('active');
        document.getElementById('room-code-display').textContent = this.roomCode;
        console.log("✅ Lobby ekranı zorla gösterildi");
    },

    joinRoom(code) {
        this.roomRef = this.db.ref('rooms/' + code);

        // Oda yoksa oluştur
        this.roomRef.once('value').then(snap => {
            if (!snap.exists()) {
                console.log("🆕 Yeni oda Firebase'e kaydediliyor...");
                return this.roomRef.set({
                    status: 'lobby',
                    scoreRed: 0,
                    scoreBlue: 0,
                    players: {}
                });
            }
        }).then(() => {
            // Oyuncuyu ekle
            console.log("👤 Oyuncu ekleniyor:", this.playerName);
            return this.roomRef.child('players/' + this.myId).update({
                name: this.playerName,
                team: null,
                role: null,
                joinedAt: Date.now()
            });
        }).catch(err => {
            console.error("❌ Firebase hatası:", err);
            alert("Firebase hatası: " + err.message);
        });

        // Gerçek zamanlı dinle
        this.roomRef.on('value', snap => {
            if (snap.exists()) {
                console.log("📡 Firebase verisi geldi, ENGINE.update çağrılıyor");
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