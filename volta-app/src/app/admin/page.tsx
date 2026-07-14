import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [ordersCount, productsCount, orders] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.order.findMany({ select: { totalAmount: true } }),
  ]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Get 5 most recent orders for a quick preview
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-lg fade-in">
      <div>
        <h1 className="font-display-sm text-primary mb-xs">Genel Bakış</h1>
        <p className="font-body-md text-on-surface-variant">
          Mağazanızın güncel özet durumu.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">payments</span>
          </div>
          <div>
            <p className="font-body-sm text-on-surface-variant mb-base">Toplam Ciro</p>
            <h3 className="font-headline-lg text-primary">{totalRevenue.toLocaleString("tr-TR")} ₺</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
          <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
          </div>
          <div>
            <p className="font-body-sm text-on-surface-variant mb-base">Toplam Sipariş</p>
            <h3 className="font-headline-lg text-primary">{ordersCount}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
          <div className="w-14 h-14 bg-tertiary/10 rounded-full flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[28px]">inventory_2</span>
          </div>
          <div>
            <p className="font-body-sm text-on-surface-variant mb-base">Aktif Ürün Sayısı</p>
            <h3 className="font-headline-lg text-primary">{productsCount}</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mt-md">
        <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface">
          <h2 className="font-headline-sm text-primary">Son Siparişler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant font-label-technical text-on-surface-variant">
                <th className="p-md font-normal">Sipariş No</th>
                <th className="p-md font-normal">Müşteri</th>
                <th className="p-md font-normal">Tutar</th>
                <th className="p-md font-normal">Durum</th>
                <th className="p-md font-normal">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-xl text-center text-on-surface-variant font-body-md">
                    Henüz hiç sipariş bulunmuyor.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-outline-variant hover:bg-surface-container/50 transition-colors">
                    <td className="p-md font-body-md text-primary font-bold">{order.orderNumber}</td>
                    <td className="p-md font-body-md text-on-surface">{order.customerName}</td>
                    <td className="p-md font-body-md text-on-surface font-bold">{order.totalAmount.toFixed(2)} ₺</td>
                    <td className="p-md">
                      <span className="inline-block px-sm py-[2px] rounded-full text-[12px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-md font-body-sm text-on-surface-variant">
                      {new Date(order.createdAt).toLocaleDateString("tr-TR")}
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
