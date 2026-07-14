import Link from "next/link";

export default function TeslimatPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-inverse-surface pt-10 pb-20 fade-in">
      <div className="max-w-3xl mx-auto px-gutter bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
        <div className="mb-md">
          <Link href="/" className="text-primary hover:underline flex items-center gap-xs font-button-text">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Ana Sayfaya Dön
          </Link>
        </div>
        <h1 className="font-display-md text-primary mb-md border-b border-outline-variant pb-sm">Teslimat Koşulları</h1>
        <div className="prose dark:prose-invert max-w-none text-on-surface-variant font-body-md space-y-4">
          <p>Siparişlerinizin size en hızlı ve güvenli şekilde ulaşması için Türkiye'nin önde gelen kargo firmaları ve özel ambar taşıma şirketleri ile çalışmaktayız.</p>
          <h3 className="text-on-background font-headline-sm mt-6">1. Sipariş Hazırlık Süresi</h3>
          <p>Hafta içi saat 15:00'e kadar verilen standart e-ticaret siparişleriniz aynı gün kargoya teslim edilmektedir. 15:00'ten sonraki siparişleriniz ertesi iş günü işleme alınır. Toptan ve palet bazlı B2B siparişlerinizin hazırlık süresi ürün hacmine göre 1-3 iş günü sürebilmektedir.</p>
          <h3 className="text-on-background font-headline-sm mt-6">2. Teslimat Süresi</h3>
          <p>Kargoya teslim edilen siparişler, bulunduğunuz şehre ve kargo firmasının dağıtım ağına bağlı olarak ortalama 1-3 iş günü içerisinde adresinize teslim edilir. Mobil bölgeler ve köyler için bu süre uzayabilir.</p>
          <h3 className="text-on-background font-headline-sm mt-6">3. Kargo Ücretleri ve Ağır Yükler</h3>
          <p>Belli bir tutarın (örn: 10.000 TL) üzerindeki siparişlerde kargo ücretsizdir. Kablo makaraları, ağır panolar ve endüstriyel projektör direkleri gibi standart kargo limitlerini aşan yükler ambar ile gönderilir ve ambar ücretleri alıcıyla mutabık kalınarak organize edilir.</p>
          <h3 className="text-on-background font-headline-sm mt-6">4. Teslim Alırken Dikkat Edilmesi Gerekenler</h3>
          <p>Kargonuzu teslim alırken paket üzerinde hasar, ezik veya yırtık olup olmadığını kontrol ediniz. Herhangi bir hasar durumunda kargo görevlisine "Hasar Tespit Tutanağı" tutturmanız zorunludur.</p>
        </div>
      </div>
    </div>
  );
}
