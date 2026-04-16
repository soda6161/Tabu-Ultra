const NET = {
    // ... (Firebase Config ve Init kısımları aynı) ...

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
                name: this.playerName,
                team: team,
                role: role
            });
        });
    }
};