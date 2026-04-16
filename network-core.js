<!-- network-core.js -->
const NET = {
    db: null,
    myId: null,
    roomCode: null,
    roomRef: null,
    playerName: null,

    init(firebaseInstance) {
        this.db = firebaseInstance.database();
        // myId ve playerName login ekranından set edilecek
    },

    joinRoom(code) {
        this.roomCode = code.toUpperCase();
        this.roomRef = this.db.ref('rooms/' + this.roomCode);

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
            // Oyuncu ilk kez giriyor → sadece isim kaydediyoruz
            return this.roomRef.child('players/' + this.myId).update({
                name: this.playerName,
                joinedAt: Date.now()
                // team ve role yok → slotlarda görünmez
            });
        });

        // Canlı güncelleme
        this.roomRef.on('value', snap => {
            if (snap.exists()) ENGINE.update(snap.val());
        });
    },

    // 🔥 YENİ EKLENDİ: Rol seçme
    joinRole(team, role) {
        if (!this.roomRef) return alert("Oda bağlantısı yok!");

        this.roomRef.child('players/' + this.myId).update({
            team: team,
            role: role,
            joinedAt: Date.now()
        }).catch(err => {
            console.error(err);
            alert("Rol seçilemedi!");
        });
    },

    // Oda kodunu kopyala
    copyRoomCode() {
        if (!this.roomCode) return;
        navigator.clipboard.writeText(this.roomCode).then(() => {
            const el = document.getElementById('room-info');
            const original = el.textContent;
            el.textContent = "KOD KOPYALANDI ✓";
            setTimeout(() => el.textContent = original, 2000);
        });
    },

    // İsteğe bağlı: Rolü terk et (gelecekte lazım olabilir)
    leaveRole() {
        if (!this.roomRef) return;
        this.roomRef.child('players/' + this.myId).update({
            team: null,
            role: null
        });
    }
};