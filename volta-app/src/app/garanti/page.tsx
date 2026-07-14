import Link from "next/link";

export default function GarantiPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-inverse-surface pt-10 pb-20 fade-in">
      <div className="max-w-3xl mx-auto px-gutter bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
        <div className="mb-md">
          <Link href="/" className="text-primary hover:underline flex items-center gap-xs font-button-text">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Ana Sayfaya Dön
          </Link>
        </div>
        <h1 className="font-display-md text-primary mb-md border-b border-outline-variant pb-sm">Garanti Koşulları</h1>
        <div className="prose dark:prose-invert max-w-none text-on-surface-variant font-body-md space-y-4">
          <p>Volta Electric olarak sattığımız tüm endüstriyel aydınlatma ve elektrik ürünleri, üretici firmaların garantisi altındadır.</p>
          <h3 className="text-on-background font-headline-sm mt-6">1. Garanti Süresi</h3>
          <p>Ürünlerimizin garanti süresi fatura tarihinden itibaren aksi belirtilmedikçe standart olarak 2 (iki) yıldır. B2B (kurumsal) projelerde projeye özel uzatılmış garanti koşulları uygulanabilir.</p>
          <h3 className="text-on-background font-headline-sm mt-6">2. Garanti Kapsamı</h3>
          <p>Ürünün kullanım kılavuzunda yer alan hususlara aykırı kullanılmasından kaynaklanan arızalar garanti kapsamı dışındadır. (Örn: Yanlış voltaj bağlantısı, fiziksel darbe, su alma - IP sınıfı dışı kullanım vb.)</p>
          <h3 className="text-on-background font-headline-sm mt-6">3. Arıza Durumunda Yapılması Gerekenler</h3>
          <p>Garanti süresi içinde arızalanan ürünleri, faturasıyla birlikte teknik servisimize veya yetkili bayilerimize ulaştırmanız gerekmektedir. Kargo gönderimlerinde kargo ücreti alıcıya aittir.</p>
        </div>
      </div>
    </div>
  );
}
