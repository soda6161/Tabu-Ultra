const DISCORD_CLIENT_ID = "1493662242862923806";
const FIREBASE_CONFIG = {
    apiKey: "BHvUIxCOTsP2bY0QcPBQWzdC8K6tY2IrEnuSgh3TQgt0vi0_jrJIfnq9JTFUN41sY5kXHXiHvnAsCP3pf75HadU", 
    databaseURL: "https://suheylbul-default-rtdb.firebaseio.com"
};

const NET = {
    db: null, roomRef: null, myId: null, roomCode: null, playerName: "Oyuncu",
    init() {
        if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
        this.db = firebase.database();
        this.myId = localStorage.getItem('tabu_uid') || Math.random().toString(36).substring(2, 10);
        localStorage.setItem('tabu_uid', this.myId);
        const params = new URLSearchParams(window.location.search);
        this.roomCode = params.get('room');
        if (this.roomCode) this.joinRoom(this.roomCode);
    },
    createRoom() {
        const name = document.getElementById('login-name-input').value || "Oyuncu";
        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        localStorage.setItem('tabu_player_name', name);
        window.location.search = `?room=${code}`;
    },
    joinRoom(code) {
        this.roomRef = this.db.ref('rooms/' + code);
        this.playerName = localStorage.getItem('tabu_player_name') || "Oyuncu";
        this.roomRef.on('value', snap => { if (snap.exists()) ENGINE.update(snap.val()); });
    },
    joinRole(team, role) {
        if (!this.roomRef) return;
        this.roomRef.once('value', snap => {
            const players = snap.val().players || {};
            
            if (role === 'anlatici') {
                const hasNarrator = Object.values(players).some(p => p.team === team && p.role === 'anlatici');
                if (hasNarrator) return alert("Bu takımın anlatıcısı dolu!");
            }
            
            if (role === 'dinleyici') {
                const count = Object.values(players).filter(p => p.team === team && p.role === 'dinleyici').length;
                if (count >= 6) return alert("Bu takımda dinleyici sınırı doldu (Maks 6)!");
            }

            this.roomRef.child('players/' + this.myId).set({
                name: this.playerName, team, role
            });
        });
    }
};
NET.init();