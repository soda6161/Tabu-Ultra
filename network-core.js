joinRoom(code) {
    this.roomRef = this.db.ref('rooms/' + code);

    this.roomRef.once('value').then(snap => {
        if (!snap.exists()) {
            return this.roomRef.set({ status: 'lobby', scoreRed: 0, scoreBlue: 0, players: {} });
        }
    }).then(() => {
        // 🔥 ARTIK OTOMATİK BLUE ANLATICI ATAMIYORUZ
        return this.roomRef.child('players/' + this.myId).update({
            name: this.playerName,
            joinedAt: Date.now()
            // team ve role yok → oyuncu rol seçene kadar slotlarda görünmez
        });
    });

    this.roomRef.on('value', snap => {
        if (snap.exists()) ENGINE.update(snap.val());
    });
},