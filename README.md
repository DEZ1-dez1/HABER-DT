Türkiye Canlı Haber Takip Sistemi
Modern, hızlı ve karanlık temalı bir RSS tabanlı haber takip uygulamasıdır.
Türkiye’nin önde gelen haber kaynaklarından verileri gerçek zamanlı olarak çeker, otomatik olarak kategorilere ayırır ve görsellerle birlikte sunar.
Özellikler
Çoklu haber kaynağı desteği (TRT Haber, Hürriyet, Habertürk, Sözcü vb.)
RSS içeriğindeki tüm alanların kullanımı (başlık, bağlantı, görsel, kategori)
Akıllı anahtar kelime tabanlı kategori sistemi
Koyu tema (dark mode)
Otomatik yenileme ile canlı güncelleme
Hata yakalama ve bağlantı uyarı sistemi
Mobil uyumlu tasarım

Proje Yapısı:
project/
|-index.html
|-style.css
|-script.js

Kullanılan Teknolojiler:
HTML5
CSS3
JavaScript (Vanilla JS)
RSS to JSON API

Kategori Sistemi:
Uygulama RSS verilerinden gelen kategori alanlarını ve haber başlıklarını analiz eder.
Türkçe karakter normalize edilir ve
anahtar kelimeler ile
Gündem
Spor
Ekonomi
Dünya
Teknoloji
başlıkları altında otomatik sınıflandırma yapılır.

Hata Yönetimi:
İnternet bağlantısı yoksa uyarı gösterilir.
RSS kaynağı cevap vermezse kullanıcı bilgilendirilir.
Boş veri gelmesi durumunda sistem güvenli şekilde çalışmaya devam eder.

Lisans: MIT License
