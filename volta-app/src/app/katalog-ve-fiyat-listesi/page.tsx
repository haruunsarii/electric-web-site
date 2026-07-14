"use client";

export default function KatalogPage() {
  return (
    <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-24 pb-xl fade-in">
      <div className="max-w-container-max mx-auto px-gutter mb-xl text-center">
        <h1 className="font-display-md text-primary font-bold mb-xs">Katalog & Fiyat Listesi</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          En güncel ürün kataloglarımızı ve fiyat listelerimizi PDF formatında cihazınıza indirebilir veya tarayıcınız üzerinden doğrudan inceleyebilirsiniz.
        </p>
      </div>

      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          
          {/* Catalog Item 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
            <div className="bg-surface-variant h-48 relative flex items-center justify-center p-md">
              <span className="material-symbols-outlined text-[80px] text-primary/40 group-hover:scale-110 transition-transform">picture_as_pdf</span>
              <div className="absolute top-sm right-sm bg-error text-on-error font-label-technical px-2 py-1 rounded text-[10px] font-bold">YENİ</div>
            </div>
            <div className="p-lg flex flex-col flex-grow">
              <h2 className="font-headline-sm text-primary mb-xs">2024 Genel Ürün Kataloğu</h2>
              <p className="font-body-sm text-on-surface-variant mb-lg flex-grow">
                Tüm şalt malzemeleri, aydınlatma armatürleri ve otomasyon ürünlerimizin teknik özelliklerini içeren kapsamlı genel kataloğumuz.
              </p>
              <div className="flex gap-sm">
                <button 
                  onClick={() => alert("Katalog PDF dosyası sisteme yüklendiğinde buradan inecektir.")}
                  className="flex-1 bg-primary text-on-primary font-button-text py-sm rounded hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors flex items-center justify-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  İndir (15 MB)
                </button>
              </div>
            </div>
          </div>

          {/* Catalog Item 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
            <div className="bg-surface-variant h-48 relative flex items-center justify-center p-md">
              <span className="material-symbols-outlined text-[80px] text-secondary/40 group-hover:scale-110 transition-transform">picture_as_pdf</span>
            </div>
            <div className="p-lg flex flex-col flex-grow">
              <h2 className="font-headline-sm text-primary mb-xs">2024 Bayi Fiyat Listesi</h2>
              <p className="font-body-sm text-on-surface-variant mb-lg flex-grow">
                Sadece yetkili bayilerimiz için hazırlanmış olan güncel iskontolu fiyat listemiz. (Şifre gerektirir).
              </p>
              <div className="flex gap-sm">
                <button 
                  onClick={() => alert("Bayi girişinden sonra erişilebilir olacaktır.")}
                  className="flex-1 bg-surface-container-high text-on-surface font-button-text py-sm rounded hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  Bayi Girişi Yap
                </button>
              </div>
            </div>
          </div>

          {/* Catalog Item 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
            <div className="bg-surface-variant h-48 relative flex items-center justify-center p-md">
              <span className="material-symbols-outlined text-[80px] text-tertiary/40 group-hover:scale-110 transition-transform">picture_as_pdf</span>
            </div>
            <div className="p-lg flex flex-col flex-grow">
              <h2 className="font-headline-sm text-primary mb-xs">Aydınlatma Proje Çözümleri</h2>
              <p className="font-body-sm text-on-surface-variant mb-lg flex-grow">
                Mimari ve endüstriyel aydınlatma projeleriniz için özel tasarım ürün kataloğumuz.
              </p>
              <div className="flex gap-sm">
                <button 
                  onClick={() => alert("Katalog PDF dosyası sisteme yüklendiğinde buradan inecektir.")}
                  className="flex-1 bg-surface border border-outline text-primary font-button-text py-sm rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Görüntüle
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
