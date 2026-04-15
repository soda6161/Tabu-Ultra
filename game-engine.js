const ENGINE = {
    roomData: null,
    timerInterval: null,

    words: [
        { m: "BUZDOLABI", f: ["Soğuk", "Yemek", "Mutfak", "Beyaz eşya", "Dondurucu"] },
        { m: "AVUKAT", f: ["Mahkeme", "Hakim", "Savunma", "Müvekkil", "Kanun"] },
        { m: "DİŞ FIRÇASI", f: ["Macun", "Ağız", "Temizlik", "Sabah", "Dişçi"] },
        { m: "KÜTÜPHANE", f: ["Kitap", "Sessizlik", "Raf", "Ödünç", "Çalışmak"] },
        { m: "ASANSÖR", f: ["Kat", "Düğme", "Çıkmak", "İnmek", "Bina"] },
        { m: "PİLOT", f: ["Uçak", "Gökyüzü", "Kokpit", "Havaalanı", "Kaptan"] },
        { m: "KAMPÜS", f: ["Üniversite", "Öğrenci", "Fakülte", "Bahçe", "Eğitim"] },
        { m: "ŞEMSİYE", f: ["Yağmur", "Islanmak", "Su", "Hava", "Güneş"] },
        { m: "TIYATRO", f: ["Sahne", "Oyuncu", "Perde", "Alkış", "Oyun"] },
        { m: "REÇETE", f: ["Doktor", "Eczane", "İlaç", "Hasta", "Kağıt"] },
        { m: "İTFAİYE", f: ["Yangın", "Su", "Hortum", "Kırmızı", "Siren"] },
        { m: "MÜZE", f: ["Tarihi", "Eser", "Sergi", "Gezi", "Sanat"] },
        { m: "PİYANO", f: ["Tuş", "Nota", "Enstrüman", "Çalmak", "Müzik"] },
        { m: "POSTACI", f: ["Mektup", "Kargo", "Dağıtmak", "Adres", "Kapı"] },
        { m: "HELİKOPTER", f: ["Pervane", "Uçmak", "Gökyüzü", "Pist", "Askeri"] },
        { m: "TELESKOP", f: ["Uzay", "Yıldız", "Gezegen", "Gözlem", "Astronomi"] },
        { m: "BERBER", f: ["Saç", "Sakal", "Makas", "Tıraş", "Koltuk"] },
        { m: "DALIŞ", f: ["Deniz", "Oksijen", "Tüp", "Balık", "Palet"] },
        { m: "SİRK", f: ["Palyaço", "Gösteri", "Çadır", "Hayvan", "Akrobat"] },
        { m: "ÇAMAŞIR MAKİNESİ", f: ["Kirli", "Deterjan", "Yıkamak", "Tambur", "Kıyafet"] },
        { m: "BİSİKLET", f: ["Pedal", "Tekerlek", "Sürmek", "Kask", "Zincir"] },
        { m: "GARSON", f: ["Restoran", "Sipariş", "Yemek", "Menü", "Bahşiş"] },
        { m: "FOTOĞRAF MAKİNESİ", f: ["Lens", "Çekmek", "Flaş", "Albüm", "Dijital"] },
        { m: "MİMAR", f: ["Bina", "Proje", "Çizim", "İnşaat", "Tasarım"] },
        { m: "TERMOMETRE", f: ["Derece", "Sıcaklık", "Hava", "Hasta", "Ölçmek"] },
        { m: "KAPTAN", f: ["Gemi", "Deniz", "Dümende", "Mürettebat", "Liman"] },
        { m: "DEDEKTİF", f: ["İpucu", "Suç", "İzlemek", "Gizem", "Polis"] },
        { m: "ASTRONOT", f: ["Uzay", "Roket", "Ay", "Mekik", "Kıyafet"] },
        { m: "LABORATUVAR", f: ["Deney", "Bilim", "Tüp", "Araştırma", "Kimya"] },
        { m: "ORKESTRA", f: ["Şef", "Çalgı", "Senfoni", "Konser", "Klasik"] },
        { m: "DONDURMA", f: ["Külah", "Soğuk", "Tatlı", "Meyveli", "Yaz"] },
        { m: "GÖZLÜK", f: ["Cam", "Çerçeve", "Göz", "Numara", "Uzağı görme"] },
        { m: "CÜZDAN", f: ["Para", "Kart", "Kimlik", "Deri", "Cep"] },
        { m: "KLAVYE", f: ["Tuş", "Yazı", "Bilgisayar", "Mouse", "Harf"] },
        { m: "BUZ PATENİ", f: ["Buz", "Kaymak", "Pist", "Ayakkabı", "Figür"] },
        { m: "GİTAR", f: ["Tel", "Akor", "Müzik", "Çalmak", "Pena"] },
        { m: "HAMAK", f: ["Sallanmak", "Ağaç", "Bahçe", "Yatmak", "Keyif"] },
        { m: "SAAT", f: ["Zaman", "Yelkovan", "Akrep", "Bilek", "Dakika"] },
        { m: "KUMBARA", f: ["Para", "Biriktirmek", "Bozuk", "Kutu", "Tasarruf"] },
        { m: "AYNA", f: ["Cam", "Yansıma", "Bakmak", "Görüntü", "Ters"] },
        { m: "KULAKLIK", f: ["Müzik", "Dinlemek", "Ses", "Bluetooth", "Kulak"] },
        { m: "TELEFON", f: ["Arama", "Ekran", "Akıllı", "Şarj", "Uygulama"] },
        { m: "YASTIK", f: ["Uyku", "Yumuşak", "Kılıf", "Baş", "Yatak"] },
        { m: "HAVLU", f: ["Banyo", "Islak", "Kurulanmak", "Su", "Pamuk"] },
        { m: "KAHVE", f: ["Fincan", "Sıcak", "Kafein", "Şeker", "Çay"] },
        { m: "ŞEKERLEME", f: ["Tatlı", "Çocuk", "Bayram", "Renkli", "Çikolata"] },
        { m: "KALEMTRAŞ", f: ["Kalem", "Açmak", "Çöp", "Uç", "Kırtasiye"] },
        { m: "SÖZLÜK", f: ["Kelime", "Anlam", "Dil", "Alfabe", "Kitap"] },
        { m: "KÜREK", f: ["Toprak", "Bahçe", "Kazmak", "Sap", "İnşaat"] },
        { m: "MAKAS", f: ["Kesmek", "Kağıt", "El işi", "Berber", "Keskin"] },
        { m: "MANGAL", f: ["Et", "Ateş", "Kömür", "Piknik", "Tavuk"] },
        { m: "PAZAR", f: ["Meyve", "Sebze", "Alışveriş", "Tezgah", "Ucuz"] },
        { m: "SÜPÜRGE", f: ["Temizlik", "Toz", "Yer", "Elektrikli", "Çöp"] },
        { m: "VALİZ", f: ["Yolculuk", "Eşya", "Bavul", "Tekerlek", "Tatil"] },
        { m: "DUVAR", f: ["Bina", "Tuğla", "Boya", "Çerçeve", "Oda"] },
        { m: "MERDİVEN", f: ["Basamak", "Çıkmak", "İnmek", "Kat", "Yüksek"] },
        { m: "KAPI", f: ["Anahtar", "Kilit", "Giriş", "Kol", "Oda"] },
        { m: "PENCERE", f: ["Cam", "Dışarı", "Perde", "Manzara", "Hava"] },
        { m: "ÇATAL", f: ["Kaşık", "Bıçak", "Yemek", "Sofra", "Metal"] },
        { m: "CİPS", f: ["Patates", "Paket", "Atıştırmalık", "Yağlı", "Tuzlu"] },
        { m: "ÇAYDANLIK", f: ["Çay", "Demlemek", "Su", "Kaynamak", "Sıcak"] },
        { m: "TERLİK", f: ["Ayak", "Ev", "Ayakkabı", "Yumuşak", "Taban"] },
        { m: "KEMER", f: ["Pantolon", "Bel", "Toka", "Sıkmak", "Deri"] },
        { m: "ÇANTA", f: ["Sırt", "Eşya", "Taşımak", "Okul", "Fermuar"] },
        { m: "SABUN", f: ["El", "Yıkamak", "Köpük", "Temizlik", "Banyo"] },
        { m: "ŞAMPUAN", f: ["Saç", "Duş", "Köpük", "Yıkamak", "Banyo"] },
        { m: "TAVA", f: ["Yumurta", "Pişirmek", "Mutfak", "Yağ", "Sap"] },
        { m: "ÜTÜ", f: ["Kıyafet", "Kırışık", "Sıcak", "Buhar", "Masa"] },
        { m: "PERDE", f: ["Pencere", "Güneş", "Korniş", "Tül", "Oda"] },
        { m: "HALI", f: ["Yer", "Kilim", "Yumuşak", "Oda", "Dokuma"] },
        { m: "LAMBA", f: ["Işık", "Gece", "Aydınlık", "Ampul", "Elektrik"] },
        { m: "MASA", f: ["Sandalye", "Üst", "Yemek", "Ayak", "Mobilya"] },
        { m: "KOLTUK", f: ["Oturmak", "Salon", "Takım", "Yumuşak", "Kanepe"] },
        { m: "YATAK", f: ["Uyku", "Gece", "Yastık", "Yorgan", "Dinlenmek"] },
        { m: "YORGAN", f: ["Uyku", "Örtmek", "Sıcak", "Yatak", "Kış"] },
        { m: "DOLAP", f: ["Eşya", "Kıyafet", "Mutfak", "Raf", "Kapak"] }
    ],

    update(data) {
        this.roomData = data;
        const me = data.players?.[NET.myId];
        if (!me) return;

        if (data.status === 'playing') {
            this.renderGame(me, data);
        } else {
            this.renderLobby(data);
        }
    },

    renderLobby(data) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-lobby').classList.add('active');
        document.getElementById('room-code-display').textContent = NET.roomCode || "-----";

        const redNarr = [], redGuess = [], blueNarr = [], blueGuess = [];
        Object.values(data.players || {}).forEach(p => {
            if (!p.team || !p.role) return;
            const target = (p.team === 'red') 
                ? (p.role === 'anlatici' ? redNarr : redGuess)
                : (p.role === 'anlatici' ? blueNarr : blueGuess);
            target.push(p.name || "Oyuncu");
        });

        // Baloncuklu gösterim
        document.getElementById('slot-red-narrator').innerHTML = redNarr.map(n => `<span class="player-bubble">${n}</span>`).join('') || '<span style="opacity:0.5">Boş</span>';
        document.getElementById('slot-red-guesser').innerHTML = redGuess.map(n => `<span class="player-bubble">${n}</span>`).join('') || '<span style="opacity:0.5">Boş</span>';
        document.getElementById('slot-blue-narrator').innerHTML = blueNarr.map(n => `<span class="player-bubble">${n}</span>`).join('') || '<span style="opacity:0.5">Boş</span>';
        document.getElementById('slot-blue-guesser').innerHTML = blueGuess.map(n => `<span class="player-bubble">${n}</span>`).join('') || '<span style="opacity:0.5">Boş</span>';

        this.checkStartButton();
    },

    checkStartButton() {
        const btn = document.getElementById('btn-start-game');
        if (!this.roomData?.players) {
            btn.style.opacity = "0.4";
            btn.style.pointerEvents = "none";
            return;
        }

        let redNarr = 0, redGuess = 0, blueNarr = 0, blueGuess = 0;

        Object.values(this.roomData.players).forEach(p => {
            if (p.team === 'red') {
                p.role === 'anlatici' ? redNarr++ : redGuess++;
            } else if (p.team === 'blue') {
                p.role === 'anlatici' ? blueNarr++ : blueGuess++;
            }
        });

        // Sınırlar: Anlatıcı max 1, Dinleyici max 7 her takım için
        const canStart = 
            (redNarr >= 1 && redNarr <= 1 && redGuess >= 1 && redGuess <= 7) ||
            (blueNarr >= 1 && blueNarr <= 1 && blueGuess >= 1 && blueGuess <= 7);

        btn.style.opacity = canStart ? "1" : "0.4";
        btn.style.pointerEvents = canStart ? "auto" : "none";
    },

    renderGame(me, data) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById('screen-game');
        screen.classList.add('active');

        const team = me.team === 'blue' ? 'blue' : 'red';
        const roleClass = me.role === 'anlatici' ? 'narrator' : 'listener';
        screen.className = `screen active ${roleClass}-${team}`;

        const isNarrator = me.role === 'anlatici';

        document.getElementById('narrator-controls').style.display = isNarrator ? 'flex' : 'none';
        document.getElementById('listener-controls').style.display = isNarrator ? 'none' : 'flex';

        document.getElementById('score-display').textContent = `K: ${data.scoreRed || 0} | M: ${data.scoreBlue || 0}`;

        if (isNarrator && data.currentWord) {
            document.getElementById('word-main').textContent = data.currentWord.m;
            document.getElementById('word-forbidden').innerHTML = data.currentWord.f.join('<br>');
        } else {
            document.getElementById('word-main').textContent = "???";
            document.getElementById('word-forbidden').innerHTML = "ARKADAŞINI DİNLE!";
        }

        this.startTimer();
    },

    startGame() {
        if (!NET.roomRef) return alert("Oda bağlantısı kurulamadı!");
        const word = this.words[Math.floor(Math.random() * this.words.length)];
        NET.roomRef.update({
            status: 'playing',
            currentWord: word,
            scoreRed: 0,
            scoreBlue: 0
        });
    },

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        let time = 60;
        const timerEl = document.getElementById('timer-display');
        timerEl.textContent = `00:${time}`;

        this.timerInterval = setInterval(() => {
            time--;
            timerEl.textContent = `00:${time < 10 ? '0' : ''}${time}`;
            if (time <= 0) {
                clearInterval(this.timerInterval);
                this.nextWord();
            }
        }, 1000);
    },

    reportCorrect() {
        const teamKey = this.roomData.players[NET.myId].team === 'blue' ? 'scoreBlue' : 'scoreRed';
        NET.roomRef.child(teamKey).set((this.roomData[teamKey] || 0) + 1);
        this.nextWord();
        this.flash('rgba(0, 255, 0, 0.5)');
    },

    reportTabu() {
        const teamKey = this.roomData.players[NET.myId].team === 'blue' ? 'scoreBlue' : 'scoreRed';
        NET.roomRef.child(teamKey).set((this.roomData[teamKey] || 0) - 1);
        this.nextWord();
        this.flash('rgba(255, 0, 0, 0.5)');
    },

    passCard() {
        this.nextWord();
        this.flash('rgba(255, 165, 0, 0.5)');
    },

    nextWord() {
        const word = this.words[Math.floor(Math.random() * this.words.length)];
        NET.roomRef.update({ currentWord: word });
    },

    submitGuess() {
        const input = document.getElementById('guess-input');
        if (input.value.trim()) {
            alert(`Tahminin: "${input.value.trim()}"\nArkadaşların duydu! 🔥`);
            input.value = '';
        }
    },

    flash(color) {
        const f = document.getElementById('flash-overlay');
        f.style.background = color;
        f.style.display = 'block';
        setTimeout(() => f.style.display = 'none', 300);
    }
};