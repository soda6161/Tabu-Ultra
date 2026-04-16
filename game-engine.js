const ENGINE = {
    roomData: null,
    timerInterval: null,

    // ====================== 240 ANA KELİME (1 ANA + 5 YASAKLI) ======================
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
        { m: "DOLAP", f: ["Eşya", "Kıyafet", "Mutfak", "Raf", "Kapak"] },
        { m: "BUZ", f: ["Su", "Soğuk", "Donmak", "Küp", "İçecek"] },
        { m: "BALON", f: ["Şişirmek", "Uçan", "Renkli", "Parti", "Patlamak"] },
        { m: "UÇURTMA", f: ["Rüzgar", "Gökyüzü", "İp", "Kuyruk", "Uçmak"] },
        { m: "SATRANÇ", f: ["Mat", "Şah", "Kale", "Tahta", "Oyun"] },
        { m: "TAVLA", f: ["Zar", "Pul", "Mars", "Ahşap", "Oyun"] },
        { m: "DOMİNO", f: ["Taş", "Devrilmek", "Sayı", "Nokta", "Oyun"] },
        { m: "BİLARDO", f: ["Istaka", "Top", "Delik", "Masa", "Yeşil"] },
        { m: "OKEY", f: ["Taş", "Istaka", "Per", "Çift", "Oyun"] },
        { m: "KUMAR", f: ["Casino", "Para", "Kaybetmek", "Oyun", "Kağıt"] },
        { m: "DARTS", f: ["Ok", "Hedef", "Tahta", "Atmak", "Puan"] },
        { m: "FUTBOL", f: ["Gol", "Kale", "Top", "Saha", "Maç"] },
        { m: "BASKETBOL", f: ["Pota", "Basket", "Top", "Smaç", "Turnike"] },
        { m: "VOLEYBOL", f: ["File", "Manşet", "Smaç", "Servis", "Saha"] },
        { m: "TENİS", f: ["Raket", "Top", "File", "Kort", "Set"] },
        { m: "YÜZME", f: ["Havuz", "Deniz", "Kulaç", "Su", "Mayo"] },
        { m: "BOKS", f: ["Eldiven", "Ring", "Yumruk", "Maç", "Nakavt"] },
        { m: "GÜREŞ", f: ["Minder", "Pehlivan", "Yağlı", "Rakip", "Spor"] },
        { m: "KOŞU", f: ["Maraton", "Hız", "Parkur", "Ayakkabı", "Yarış"] },
        { m: "KAYAK", f: ["Kar", "Dağ", "Soğuk", "Spor", "Pist"] },
        { m: "OKÇULUK", f: ["Yay", "Hedef", "Ok", "Atmak", "Kiriş"] },
        { m: "SÖRF", f: ["Dalga", "Deniz", "Tahta", "Sahil", "Su"] },
        { m: "PARAŞÜT", f: ["Atlamak", "Uçak", "Hava", "Gökyüzü", "İniş"] },
        { m: "BALIK TUTMAK", f: ["Olta", "Deniz", "Kanca", "Yem", "Göl"] },
        { m: "KAMP", f: ["Çadır", "Uyku tulumu", "Ateş", "Doğa", "Orman"] },
        { m: "DAĞCILIK", f: ["Tırmanmak", "Zirve", "Kaya", "İp", "Dağ"] },
        { m: "YOGA", f: ["Esneklik", "Mat", "Nefes", "Meditasyon", "Hareket"] },
        { m: "DANS", f: ["Müzik", "Ritim", "Hareket", "Sahne", "Bale"] },
        { m: "RADYO", f: ["Ses", "Müzik", "Yayın", "Anten", "Dinlemek"] },
        { m: "TELEVİZYON", f: ["Ekran", "Kanal", "Dizi", "Kumanda", "İzlemek"] },
        { m: "GAZETE", f: ["Haber", "Kağıt", "Manşet", "Okumak", "Köşe yazısı"] },
        { m: "DERGİ", f: ["Kapak", "Sayfa", "Abone", "Fotoğraf", "Haftalık"] },
        { m: "ZARF", f: ["Mektup", "Kağıt", "Pul", "Posta", "Mazbata"] },
        { m: "PASAPORT", f: ["Vize", "Yurtdışı", "Sınır", "Kimlik", "Yolculuk"] },
        { m: "CÜBBE", f: ["Hakim", "Avukat", "Mezuniyet", "Tören", "Kıyafet"] },
        { m: "STADYUM", f: ["Maç", "Seyirci", "Futbol", "Tribün", "Koltuk"] },
        { m: "SİNEMA", f: ["Film", "Mısır", "Beyaz perde", "Koltuk", "Bilet"] },
        { m: "BİLET", f: ["Otobüs", "Konser", "Giriş", "Kağıt", "Yolculuk"] },
        { m: "ECZANE", f: ["İlaç", "Reçete", "Doktor", "Medikal", "Sağlık"] },
        { m: "HASTANE", f: ["Doktor", "Hemşire", "Ameliyat", "Hasta", "Serum"] },
        { m: "OKUL", f: ["Öğrenci", "Öğretmen", "Sınıf", "Ders", "Zil"] },
        { m: "ÜNİVERSİTE", f: ["Kampüs", "Profesör", "Diploma", "Mezun", "Fakülte"] },
        { m: "KANTİN", f: ["Okul", "Yemek", "Tost", "Sıra", "Çay"] },
        { m: "OTOBÜS", f: ["Durak", "Yolcu", "Şoför", "Ulaşım", "Tekerlek"] },
        { m: "METRO", f: ["Tren", "Yer altı", "İstasyon", "Ray", "Ulaşım"] },
        { m: "GEMİ", f: ["Deniz", "Liman", "Kaptan", "Yelken", "Su"] },
        { m: "UÇAK", f: ["Kanat", "Havaalanı", "Pilot", "Uçmak", "Hostes"] },
        { m: "TRAFİK", f: ["Araba", "Lamba", "Sıkışık", "Yol", "Polis"] },
        { m: "OTOPARK", f: ["Araba", "Park etmek", "Katlı", "Plaka", "Alan"] },
        { m: "BENZİN İSTASYONU", f: ["Yakıt", "Mazot", "Pompa", "Depo", "Market"] },
        { m: "BANKA", f: ["Para", "Kredi", "Hesap", "ATM", "Gişe"] },
        { m: "ADLİYE", f: ["Mahkeme", "Davalı", "Hakim", "Savcı", "Duruşma"] },
        { m: "KARAKOL", f: ["Polis", "Emniyet", "Gözaltı", "Suçlu", "İfade"] },
        { m: "PASTANE", f: ["Pasta", "Börek", "Tatlı", "Unlu mamul", "Fırın"] },
        { m: "KASAP", f: ["Et", "Kıyma", "Bıçak", "Tavuk", "Sucuk"] },
        { m: "MANAV", f: ["Meyve", "Sebze", "Kilo", "Tartı", "Tezgah"] },
        { m: "MARKET", f: ["Alışveriş", "Sepet", "Kasa", "Reyon", "Fiş"] },
        { m: "KUAFÖR", f: ["Saç", "Fön", "Boya", "Kadın", "Makas"] },
        { m: "KÖY", f: ["Tarla", "Çiftçi", "Hayvan", "Muhtar", "Kasaba"] },
        { m: "ORMAN", f: ["Ağaç", "Yeşil", "Doğa", "Hayvan", "Oksijen"] },
        { m: "DENİZ", f: ["Su", "Mavi", "Dalga", "Tuzlu", "Plaj"] },
        { m: "GÖL", f: ["Su", "Tatlı", "Kenar", "Balık", "Durgun"] },
        { m: "NEHİR", f: ["Akarsu", "Dere", "Irmak", "Akıntı", "Su"] },
        { m: "ŞELALE", f: ["Su", "Akmak", "Yüksek", "Doğa", "Kayalık"] },
        { m: "DAĞ", f: ["Zirve", "Tırmanış", "Yüksek", "Kar", "Tepe"] },
        { m: "MAĞARA", f: ["Karanlık", "Taş", "Yer altı", "Yarasa", "Sarkıt"] },
        { m: "ADA", f: ["Deniz", "Kara", "Etrafı sarılı", "Palmiye", "Tatil"] },
        { m: "ÇÖL", f: ["Kum", "Sıcak", "Deve", "Su", "Vaha"] },
        { m: "GÜNEŞ", f: ["Sarı", "Sıcak", "Gökyüzü", "Yıldız", "Işık"] },
        { m: "AY", f: ["Gece", "Uydu", "Karanlık", "Hilal", "Dolunay"] },
        { m: "YILDIZ", f: ["Gece", "Parlak", "Uzay", "Gökyüzü", "Dilek"] },
        { m: "BULUT", f: ["Yağmur", "Gökyüzü", "Beyaz", "Pamuk", "Hava"] },
        { m: "YAĞMUR", f: ["Su", "Bulut", "Islanmak", "Şemsiye", "Damla"] },
        { m: "KAR", f: ["Beyaz", "Soğuk", "Kış", "Buz", "Tatil"] },
        { m: "RÜZGAR", f: ["Hava", "Esinti", "Fırtına", "Yelken", "Uçurtma"] },
        { m: "ŞİMŞEK", f: ["Gök gürültüsü", "Işık", "Çakmak", "Yağmur", "Bulut"] },
        { m: "DEPREM", f: ["Sarsıntı", "Yer", "Fay hattı", "Enkaz", "Yıkım"] },
        { m: "YANGIN", f: ["Ateş", "Duman", "İtfaiye", "Orman", "Söndürmek"] },
        { m: "SEL", f: ["Su", "Yağmur", "Baskın", "Felaket", "Akıntı"] },
        { m: "ÇIĞ", f: ["Kar", "Dağ", "Kaymak", "Felaket", "Ses"] },
        { m: "FIRTINA", f: ["Rüzgar", "Yağmur", "Deniz", "Şiddetli", "Hava"] },
        { m: "HORTUM", f: ["Rüzgar", "Dönmek", "Hava", "Felaket", "Toz"] },
        { m: "İKLİM", f: ["Hava durumu", "Mevsim", "Sıcaklık", "Bölge", "Akdeniz"] },
        { m: "BAHAR", f: ["Mevsim", "Çiçek", "Yaz", "Kış", "Doğa"] },
        { m: "YAZ", f: ["Sıcak", "Güneş", "Tatil", "Deniz", "Mevsim"] },
        { m: "KIŞ", f: ["Soğuk", "Kar", "Mevsim", "Aralık", "Mont"] },
        { m: "SONBAHAR", f: ["Yaprak", "Eylül", "Mevsim", "Yağmur", "Sarı"] },
        { m: "GÖKKUŞAĞI", f: ["Renk", "Yağmur", "Güneş", "Yedi", "Gökyüzü"] },
        { m: "ÇİÇEK", f: ["Bitki", "Gül", "Bahçe", "Güzel koku", "Renkli"] },
        { m: "AĞAÇ", f: ["Yaprak", "Dal", "Kök", "Orman", "Odun"] },
        { m: "ÇİMEN", f: ["Yeşil", "Bahçe", "Yer", "Ot", "Kesmek"] },
        { m: "TOPRAK", f: ["Yer", "Çamur", "Bitki", "Kazmak", "Kahverengi"] },
        { m: "TAŞ", f: ["Sert", "Kaya", "Yer", "Kum", "Çakıl"] },
        { m: "MADEN", f: ["Yer altı", "Kömür", "Altın", "Çıkarmak", "Demir"] },
        { m: "ALTIN", f: ["Sarı", "Değerli", "Takı", "Kuyumcu", "Bilezik"] },
        { m: "GÜMÜŞ", f: ["Gri", "Takı", "Kolye", "Değerli", "Metal"] },
        { m: "DEMİR", f: ["Metal", "Sert", "İnşaat", "Sanayi", "Çelik"] },
        { m: "BAKIR", f: ["Tel", "Metal", "Mutfak", "Kızıl", "İletken"] },
        { m: "ELMAS", f: ["Değerli", "Taş", "Yüzük", "Parlak", "Sert"] },
        { m: "PETROL", f: ["Yakıt", "Benzin", "Yer altı", "Varil", "Siyah altın"] },
        { m: "ELEKTRİK", f: ["Lamba", "Kablo", "Akım", "Enerji", "Çarpmak"] },
        { m: "MIKNATIS", f: ["Çekmek", "Kutup", "Demir", "İtmek", "Metal"] },
        { m: "FOTOĞRAF", f: ["Resim", "Kamera", "Çerçeve", "Albüm", "Anı"] },
        { m: "RESİM", f: ["Tablo", "Boya", "Ressam", "Sanat", "Kağıt"] },
        { m: "HEYKEL", f: ["Taş", "Sanatçı", "Müze", "Kil", "Eser"] },
        { m: "ŞİİR", f: ["Şair", "Mısra", "Kitap", "Duygu", "Edebiyat"] },
        { m: "ROMAN", f: ["Kitap", "Yazar", "Sayfa", "Hikaye", "Edebiyat"] },
        { m: "MASAL", f: ["Çocuk", "Uyku", "Anlatmak", "Dev", "Prenses"] },
        { m: "EFSANE", f: ["Hikaye", "Tarih", "Mitoloji", "Halk", "Gerçek dışı"] },
        { m: "BİLMECİ", f: ["Soru", "Cevap", "Akıl", "Eğlence", "Saklamak"] },
        { m: "ŞARKI", f: ["Müzik", "Ses", "Melodi", "Söylemek", "Beste"] },
        { m: "BALO", f: ["Dans", "Kıyafet", "Maske", "Gece", "Davet"] },
        { m: "PARTİ", f: ["Eğlence", "Müzik", "Doğum günü", "Arkadaş", "Kutlama"] },
        { m: "DÜĞÜN", f: ["Gelin", "Damat", "Yüzük", "Nikah", "Halay"] },
        { m: "CENAZE", f: ["Ölüm", "Tabut", "Mezarlık", "Taziye", "Tören"] },
        { m: "BAYRAM", f: ["Tatil", "Kutlama", "Ziyaret", "Şeker", "Milli"] },
        { m: "HEDİYE", f: ["Paket", "Vermek", "Sürpriz", "Almak", "Kutlama"] },
        { m: "OYUNCAK", f: ["Çocuk", "Bebek", "Araba", "Oynamak", "Hediye"] },
        { m: "MASKE", f: ["Yüz", "Gizlemek", "Kostüm", "Tiyatro", "Pandemi"] },
        { m: "MAKYAJ", f: ["Yüz", "Ruj", "Boya", "Kadın", "Kozmetik"] },
        { m: "PARFÜM", f: ["Koku", "Şişe", "Sıkmak", "Güzel", "Deodorant"] },
        { m: "TARAK", f: ["Saç", "Düzeltmek", "Fırça", "Berber", "Kıl"] },
        { m: "TOKA", f: ["Saç", "Bağlamak", "Kadın", "Aksesuar", "Lastik"] },
        { m: "KÜPE", f: ["Kulak", "Takı", "Aksesuar", "Mücevher", "Delik"] },
        { m: "KOLYE", f: ["Boyun", "Takı", "Zincir", "Mücevher", "Altın"] },
        { m: "BİLEZİK", f: ["Bilek", "Altın", "Takı", "Kol", "Kuyumcu"] },
        { m: "YÜZÜK", f: ["Parmak", "Elmas", "Evlilik", "Altın", "Takı"] },
        { m: "AYAKKABI", f: ["Ayak", "Bağcık", "Taban", "Yürümek", "Çizme"] },
        { m: "ÇORAP", f: ["Ayak", "Giymek", "Pamuk", "Kirli", "Tek"] },
        { m: "PANTOLON", f: ["Kot", "Giymek", "Bacak", "Kemer", "Kumaş"] },
        { m: "CEKET", f: ["Mont", "Giymek", "Düğme", "Kış", "Takım"] },
        { m: "GÖMLEK", f: ["Düğme", "Yaka", "Ütü", "Giymek", "Kumaş"] },
        { m: "ELBİSE", f: ["Kadın", "Giymek", "Kıyafet", "Tek parça", "Etek"] },
        { m: "ETEK", f: ["Kadın", "Giymek", "Bacak", "Kısa", "Uzun"] },
        { m: "ŞAPKA", f: ["Baş", "Takmak", "Güneş", "Bere", "Kep"] },
        { m: "ELDİVEN", f: ["El", "Kış", "Soğuk", "Parmak", "Yün"] },
        { m: "ATKI", f: ["Boyun", "Kış", "Soğuk", "Yün", "Örmek"] },
        { m: "MONT", f: ["Kış", "Soğuk", "Giymek", "Fermuar", "Kalın"] },
        { m: "ANAHTAR", f: ["Kilit", "Kapı", "Çelik", "Açmak", "Metal"] },
        { m: "ÇAKMAK", f: ["Ateş", "Yakmak", "Sigara", "Gaz", "Mum"] },
        { m: "KİBRİT", f: ["Ateş", "Yakmak", "Kutu", "Çöp", "Yanmak"] },
        { m: "MUM", f: ["Işık", "Yakmak", "Fitil", "Erimek", "Doğum günü"] },
        { m: "FENER", f: ["Işık", "Karanlık", "Pil", "Aydınlatmak", "Gece"] },
        { m: "PİL", f: ["Enerji", "Elektrik", "Kumanda", "Şarj", "Cihaz"] },
        { m: "KABLO", f: ["Elektrik", "Tel", "Bağlantı", "Şarj", "Bakır"] },
        { m: "PRİZ", f: ["Elektrik", "Fiş", "Takmak", "Duvar", "Enerji"] },
        { m: "BİLGİSAYAR", f: ["Ekran", "Klavye", "Mouse", "İnternet", "Laptop"] },
        { m: "FARE (MOUSE)", f: ["Tıklamak", "Bilgisayar", "İmleç", "Kablosuz", "Tekerlek"] },
        { m: "HOPARLÖR", f: ["Ses", "Müzik", "Dinlemek", "Yüksek", "Bas"] },
        { m: "YAZICI", f: ["Kağıt", "Çıkartmak", "Mürekkep", "Bilgisayar", "Fotokopi"] },
        { m: "TARAYICI", f: ["Kağıt", "Bilgisayar", "Dijital", "Kopyalamak", "Belge"] }
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

        document.getElementById('slot-red-narrator').innerHTML = redNarr.map(n => `<span class="player-bubble">${n}</span>`).join('') || '<span style="opacity:0.5">Boş</span>';
        document.getElementById('slot-red-guesser').innerHTML = redGuess.map(n => `<span class="player-bubble">${n}</span>`).join('') || '<span style="opacity:0.5">Boş</span>';
        document.getElementById('slot-blue-narrator').innerHTML = blueNarr.map(n => `<span class="player-bubble">${n}</span>`).join('') || '<span style="opacity:0.5">Boş</span>';
        document.getElementById('slot-blue-guesser').innerHTML = blueGuess.map(n => `<span class="player-bubble">${n}</span>`).join('') || '<span style="opacity:0.5">Boş</span>';

        this.checkStartButton();
    },

    checkStartButton() {
        const btn = document.getElementById('btn-start-game');
        let redNarr = 0, redGuess = 0, blueNarr = 0, blueGuess = 0;

        Object.values(this.roomData.players || {}).forEach(p => {
            if (p.team === 'red') {
                if (p.role === 'anlatici') redNarr++;
                else if (p.role === 'dinleyici') redGuess++;
            } else if (p.team === 'blue') {
                if (p.role === 'anlatici') blueNarr++;
                else if (p.role === 'dinleyici') blueGuess++;
            }
        });

        const canStart = (redNarr === 1 && redGuess === 1) && (blueNarr === 1 && blueGuess === 1);

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
        if (!NET.roomRef) return alert("Oda bağlantısı yok!");
        const word = this.words[Math.floor(Math.random() * this.words.length)];
        NET.roomRef.update({ status: 'playing', currentWord: word, scoreRed: 0, scoreBlue: 0 });
    },

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        let time = 60;
        const timerEl = document.getElementById('timer-display');
        timerEl.textContent = `00:${time}`;

        this.timerInterval = setInterval(() => {
            time--;
            timerEl.textContent = `00:${time < 10 ? '0' : ''}${time}`;
            if (time <= 0) this.nextWord();
        }, 1000);
    },

    reportCorrect() {
        const teamKey = this.roomData.players[NET.myId].team === 'blue' ? 'scoreBlue' : 'scoreRed';
        NET.roomRef.child(teamKey).set((this.roomData[teamKey] || 0) + 1);
        this.nextWord();
        this.flash('rgba(0,255,0,0.5)');
    },

    reportTabu() {
        const teamKey = this.roomData.players[NET.myId].team === 'blue' ? 'scoreBlue' : 'scoreRed';
        NET.roomRef.child(teamKey).set((this.roomData[teamKey] || 0) - 1);
        this.nextWord();
        this.flash('rgba(255,0,0,0.5)');
    },

    passCard() {
        this.nextWord();
        this.flash('rgba(255,165,0,0.5)');
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
    },

    canJoinRole(team, role) {
        if (!this.roomData?.players) return true;
        let count = 0;
        Object.values(this.roomData.players).forEach(p => {
            if (p.team === team && p.role === role) count++;
        });
        return count < 1;
    }
};