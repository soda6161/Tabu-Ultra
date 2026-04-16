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
        const name = document.getElementById('login-name-input').value.trim();
        if (!name) return alert("İsim yaz!");
        localStorage.setItem('tabu_player_name', name);
        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        window.location.href = `?room=${code}`;
    },
    joinRoom(code) {
        this.roomCode = code.toUpperCase();
        this.roomRef = this.db.ref('rooms/' + this.roomCode);
        this.playerName = localStorage.getItem('tabu_player_name') || "Oyuncu";
        this.roomRef.on('value', snap => { if (snap.exists()) ENGINE.update(snap.val()); });
        // Odaya girince otomatik "boş" olarak kaydet
        this.roomRef.child('players/' + this.myId).update({ name: this.playerName });
    },
    joinRole(team, role) {
        if (!this.roomRef) return;
        this.roomRef.child('players/' + this.myId).update({ team, role });
    }
};
NET.init();