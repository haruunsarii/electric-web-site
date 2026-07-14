import Link from "next/link";

export default function IadePage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-inverse-surface pt-10 pb-20 fade-in">
      <div className="max-w-3xl mx-auto px-gutter bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
        <div className="mb-md">
          <Link href="/" className="text-primary hover:underline flex items-center gap-xs font-button-text">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Ana Sayfaya Dön
          </Link>
        </div>
        <h1 className="font-display-md text-primary mb-md border-b border-outline-variant pb-sm">İade Politikası</h1>
        <div className="prose dark:prose-invert max-w-none text-on-surface-variant font-body-md space-y-4">
          <p>Müşteri memnuniyeti bizim için önceliklidir. Satın aldığınız ürünü koşulsuz iade etme hakkınız bulunmaktadır.</p>
          <h3 className="text-on-background font-headline-sm mt-6">1. İade Süresi</h3>
          <p>Ürünü teslim aldığınız tarihten itibaren 14 (on dört) gün içerisinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahipsiniz. B2B alımlarda bu süre sözleşme şartlarına göre değişiklik gösterebilir.</p>
          <h3 className="text-on-background font-headline-sm mt-6">2. İade Koşulları</h3>
          <p>İade edilecek ürünün ticari vasfını yitirmemiş, ambalajının bozulmamış ve ürünün kullanılmamış olması gerekmektedir. Kablo, özel kesim led gibi siparişe özel hazırlanan ürünlerde iade kabul edilmemektedir.</p>
          <h3 className="text-on-background font-headline-sm mt-6">3. İade Süreci</h3>
          <p>İade işlemini başlatmak için iletişim formumuz üzerinden veya müşteri hizmetlerimizi arayarak iade talebi oluşturmalısınız. Tarafınıza iletilecek olan kargo anlaşma numarası ile ürünleri ücretsiz olarak geri gönderebilirsiniz.</p>
          <h3 className="text-on-background font-headline-sm mt-6">4. Ücret İadesi</h3>
          <p>Ürünler depomuza ulaşıp kalite kontrol ekiplerimizce incelendikten sonra 1-3 iş günü içerisinde ödeme yaptığınız kredi kartına/hesaba para iadeniz sağlanacaktır.</p>
        </div>
      </div>
    </div>
  );
}
