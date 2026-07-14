import Link from "next/link";

export default function KurumsalPage() {
  return (
    <main className="min-h-screen bg-surface dark:bg-inverse-surface pt-24 pb-xl fade-in">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-gutter mb-2xl">
        <div className="bg-surface-container-low rounded-3xl p-xl md:p-3xl border border-outline-variant text-center">
          <h1 className="font-display-lg text-primary font-bold mb-md">Geleceğin Enerjisi,<br/>Bugünün Güvencesiyle.</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Volta Electric olarak, endüstriyel ve bireysel enerji ihtiyaçlarına modern, güvenilir ve sürdürülebilir çözümler sunuyoruz. 
            Yılların getirdiği tecrübe ile sektörde kalite ve güvenin adresiyiz.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-container-max mx-auto px-gutter mb-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div className="bg-surface-container-lowest p-xl border border-outline-variant rounded-2xl hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-[32px] text-primary">visibility</span>
            </div>
            <h2 className="font-headline-lg text-primary mb-sm">Vizyonumuz</h2>
            <p className="font-body-md text-on-surface-variant">
              Sektördeki teknolojik gelişmeleri yakından takip ederek, global standartlarda yenilikçi ürünler sunmak. 
              Sürdürülebilir enerji dönüşümünde sadece Türkiye'de değil, bölgesel bir lider olmak.
            </p>
          </div>
          
          <div className="bg-surface-container-lowest p-xl border border-outline-variant rounded-2xl hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-[32px] text-secondary">flag</span>
            </div>
            <h2 className="font-headline-lg text-primary mb-sm">Misyonumuz</h2>
            <p className="font-body-md text-on-surface-variant">
              Müşterilerimizin ihtiyaçlarına en uygun elektrik ve otomasyon malzemelerini, rekabetçi fiyatlar ve 
              uzman teknik destek ile sunmak. Güvenlikten taviz vermeden projelerinizi hayata geçirmenize yardımcı olmak.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-2xl mb-2xl">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg text-center">
            <div>
              <div className="font-display-md text-on-primary font-bold mb-xs">15+</div>
              <div className="font-label-large text-on-primary/80 uppercase tracking-wider">Yıllık Tecrübe</div>
            </div>
            <div>
              <div className="font-display-md text-on-primary font-bold mb-xs">2000+</div>
              <div className="font-label-large text-on-primary/80 uppercase tracking-wider">Ürün Çeşidi</div>
            </div>
            <div>
              <div className="font-display-md text-on-primary font-bold mb-xs">50+</div>
              <div className="font-label-large text-on-primary/80 uppercase tracking-wider">Global Marka</div>
            </div>
            <div>
              <div className="font-display-md text-on-primary font-bold mb-xs">%100</div>
              <div className="font-label-large text-on-primary/80 uppercase tracking-wider">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-container-max mx-auto px-gutter text-center">
        <h2 className="font-headline-md text-primary mb-md">Bizimle Çalışmak İster Misiniz?</h2>
        <p className="font-body-md text-on-surface-variant max-w-xl mx-auto mb-lg">
          Projeleriniz için özel fiyat teklifleri almak, teknik konularda danışmak veya ürünlerimiz hakkında detaylı bilgi edinmek için uzman ekibimizle iletişime geçin.
        </p>
        <Link 
          href="/iletisim"
          className="inline-block bg-primary text-on-primary font-button-text px-xl py-md rounded-full hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shadow-sm"
        >
          İletişime Geçin
        </Link>
      </section>
    </main>
  );
}
