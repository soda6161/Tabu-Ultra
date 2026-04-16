/* network-core.js - Update */
const NET = {
    // ... diğer değişkenler ...

    createRoom() {
        const name = document.getElementById('login-name-input').value.trim();
        if (name.length < 2) return alert("Önce karizmatik bir isim yaz!");
        
        localStorage.setItem('tabu_player_name', name);
        const code = Math.random().toString(36).substring(2, 7).toUpperCase();
        window.location.search = `?room=${code}`;
    },

    manualJoin() {
        const name = document.getElementById('login-name-input').value.trim();
        const code = document.getElementById('join-code-input').value.trim().toUpperCase();
        
        if (name.length < 2) return alert("İsim yazmadan nereye?");
        if (code.length < 5) return alert("Eksik kod yazdın reis.");

        localStorage.setItem('tabu_player_name', name);
        window.location.search = `?room=${code}`;
    },

    copyRoomCode() {
        navigator.clipboard.writeText(this.roomCode);
        alert("Kod kopyalandı! Arkadaşlarına Discord'dan yapıştır.");
    }
};