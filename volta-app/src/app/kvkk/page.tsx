import Link from "next/link";

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-inverse-surface pt-10 pb-20 fade-in">
      <div className="max-w-3xl mx-auto px-gutter bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
        <div className="mb-md">
          <Link href="/" className="text-primary hover:underline flex items-center gap-xs font-button-text">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Ana Sayfaya Dön
          </Link>
        </div>
        <h1 className="font-display-md text-primary mb-md border-b border-outline-variant pb-sm">KVKK Aydınlatma Metni</h1>
        <div className="prose dark:prose-invert max-w-none text-on-surface-variant font-body-md space-y-4">
          <p>Volta Electric olarak, 6698 Sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verilerinizin güvenliğine ve gizliliğine büyük önem vermekteyiz.</p>
          <h3 className="text-on-background font-headline-sm mt-6">1. İşlenen Kişisel Verileriniz</h3>
          <p>Sitemize üye olurken, alışveriş yaparken veya iletişim formu doldururken; adınız, soyadınız, e-posta adresiniz, telefon numaranız, fatura ve teslimat adresleriniz ile kurumsal müşterilerimiz (B2B) için vergi numarası bilgileriniz işlenmektedir.</p>
          <h3 className="text-on-background font-headline-sm mt-6">2. Kişisel Verilerin İşlenme Amacı</h3>
          <p>Toplanan kişisel verileriniz; siparişlerinizin teslim edilmesi, fatura düzenlenmesi, satış sonrası destek (garanti ve iade) hizmetlerinin sunulması ve yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.</p>
          <h3 className="text-on-background font-headline-sm mt-6">3. Verilerin Aktarımı</h3>
          <p>Kişisel verileriniz, siparişinizin size ulaşması için kargo şirketleriyle ve faturalandırma işlemleri için e-fatura altyapı sağlayıcılarıyla güvenli bir şekilde paylaşılmaktadır. Bunun dışında üçüncü şahıslarla ticari amaçla veri paylaşımı kesinlikle yapılmaz.</p>
        </div>
      </div>
    </div>
  );
}
