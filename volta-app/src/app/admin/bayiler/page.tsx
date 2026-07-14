import { prisma } from "@/lib/prisma";

export default async function AdminBayilerPage() {
  const applications = await prisma.dealerApplication.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-lg">
        <h1 className="font-display-sm text-primary font-bold">Bayilik Başvuruları</h1>
      </div>

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="p-md font-label-large text-on-surface-variant font-bold">Tarih</th>
                <th className="p-md font-label-large text-on-surface-variant font-bold">Firma Adı</th>
                <th className="p-md font-label-large text-on-surface-variant font-bold">Yetkili</th>
                <th className="p-md font-label-large text-on-surface-variant font-bold">İletişim</th>
                <th className="p-md font-label-large text-on-surface-variant font-bold">Durum</th>
                <th className="p-md font-label-large text-on-surface-variant font-bold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-xl text-center text-on-surface-variant font-body-md">
                    Henüz bekleyen veya onaylanmış bayilik başvurusu bulunmuyor.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors">
                    <td className="p-md font-body-sm text-on-surface-variant">
                      {new Date(app.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="p-md font-body-md text-on-surface">
                      {app.companyName}<br/>
                      <span className="text-[12px] text-on-surface-variant">VN: {app.taxNumber}</span>
                    </td>
                    <td className="p-md font-body-md text-on-surface">{app.contactName}</td>
                    <td className="p-md font-body-sm text-on-surface-variant">
                      {app.phone}<br/>
                      {app.email}
                    </td>
                    <td className="p-md">
                      <span className={`inline-block px-2 py-1 rounded-full text-[12px] font-bold ${
                        app.status === "Bekliyor" ? "bg-tertiary-container text-on-tertiary-container" : 
                        app.status === "Onaylandı" ? "bg-primary-container text-on-primary-container" : 
                        "bg-error-container text-on-error-container"
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-md text-right">
                      {app.status === "Bekliyor" ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            className="bg-primary text-on-primary px-3 py-1 rounded font-button-text text-[12px] hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors"
                            title="Onayla (Prototip)"
                          >
                            Onayla
                          </button>
                          <button 
                            className="bg-error text-on-error px-3 py-1 rounded font-button-text text-[12px] hover:bg-error-container hover:text-on-error-container transition-colors"
                            title="Reddet (Prototip)"
                          >
                            Reddet
                          </button>
                        </div>
                      ) : (
                        <span className="text-on-surface-variant text-[12px]">İşlem Tamamlandı</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
